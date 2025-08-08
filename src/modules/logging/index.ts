import logger, { Logger } from "./logger";
import { LogLevel, LogOutputFormat, LoggerConfig } from "./loggerConfig";
import { formatLogMessage, formatTimestamp } from "./logFormatter";

enum LOGGING_TAGS {
  ERROR = "ERROR",
  OPERATION = "OPERATION",
  API_REQUEST = "API_REQUEST",
  API_RESPONSE = "API_RESPONSE",
  REQUEST = "REQUEST",
  RESPONSE = "RESPONSE",
  SECURITY = "SECURITY",
  STARTUP = "STARTUP",
  SYSTEM = "SYSTEM",
  DATABASE = "DATABASE",
  LOG = "LOG",
  WARNING = "WARNING",
  TELEGRAM_MIDDLEWARE = "TELEGRAM_MIDDLEWARE",
  EXTERNAL_API_CALL = "EXTERNAL_API_CALL"
}

// Export all components
export { logger as default, Logger, LogLevel, LogOutputFormat, LoggerConfig, formatLogMessage, formatTimestamp, LOGGING_TAGS };
