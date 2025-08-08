import { LOGGING_TAGS } from ".";
import { formatLogMessage } from "./logFormatter";
import { LoggerConfig, LogLevel, LogOutputFormat } from "./loggerConfig";

/**
 * Central logging service for the scaleup-ai-backend-service Chatbot
 *
 * Features:
 * - Different log levels (DEBUG, INFO, WARN, ERROR)
 * - Consistent formatting
 * - Tagged logging for better categorization
 * - Caller information for traceability
 * - Support for objects and error instances
 */
export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;

  private constructor() {
    this.config = {
      minLevel: LogLevel.INFO,
      format: LogOutputFormat.DETAILED,
      enableConsoleOutput: true,
      // Can be extended with file logging, etc.
    };
  }

  /**
   * Get singleton instance of the logger
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Configure the logger
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current logger configuration
   */
  public getConfig(): LoggerConfig {
    return { ...this.config };
  }

  /**
   * Log at DEBUG level
   */
  public debug(message: unknown, funcName?: string | symbol | ((...args: unknown[]) => unknown), tag = LOGGING_TAGS.LOG): void {
    this.logAtLevel(LogLevel.DEBUG, message, funcName, tag);
  }

  /**
   * Log at INFO level
   */
  public info(message: unknown, funcName?: string | symbol | ((...args: unknown[]) => unknown), tag = LOGGING_TAGS.LOG): void {
    this.logAtLevel(LogLevel.INFO, message, funcName, tag);
  }

  /**
   * Log at WARN level
   */
  public warn(message: unknown, funcName?: string | symbol | ((...args: unknown[]) => unknown), tag = LOGGING_TAGS.WARNING): void {
    this.logAtLevel(LogLevel.WARN, message, funcName, tag);
  }

  /**
   * Log at ERROR level
   */
  public error(message: unknown, funcName?: string | symbol | ((...args: unknown[]) => unknown), tag = LOGGING_TAGS.ERROR): void {
    this.logAtLevel(LogLevel.ERROR, message, funcName, tag);
  }

  /**
   * Log with custom level selection
   */
  private logAtLevel(level: LogLevel, message: unknown, funcName?: string | symbol | ((...args: unknown[]) => unknown), tag = LOGGING_TAGS.LOG): void {
    // Skip logging if level is below configured minimum
    if (level < this.config.minLevel) return;

    try {
      // Format function name
      const normalizedFuncName = this.normalizeFuncName(funcName);

      // Format the message
      const formattedMessage = formatLogMessage({
        level,
        tag,
        funcName: normalizedFuncName,
        message,
        format: this.config.format,
      });

      // Output to console
      if (this.config.enableConsoleOutput) {
        switch (level) {
          case LogLevel.ERROR:
            console.error(formattedMessage);
            break;
          case LogLevel.WARN:
            console.warn(formattedMessage);
            break;
          default:
            console.log(formattedMessage);
            break;
        }
      }

      // Here we can add additional outputs like file logging
    } catch (error) {
      // Fallback to basic logging if formatting fails
      console.error(`[LOGGER_ERROR] Failed to log message:`, error);
      console.error(`Original message:`, message);
    }
  }

  /**
   * Normalize function name input to string
   */
  private normalizeFuncName(func?: string | symbol | ((...args: any[]) => unknown)): string {
    try {
      if (!func) return "unknown";
      if (typeof func === "function") return func.name || "anonymous";
      if (typeof func === "symbol") return func.description || func.toString();
      return String(func);
    } catch (error) {
      this.error(`Error getting function name: ${error}`, "normalizeFuncName", LOGGING_TAGS.ERROR);
      return "unknown";
    }
  }
}

// Export default singleton instance
export default Logger.getInstance();
