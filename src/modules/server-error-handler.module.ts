import { FastifyInstance } from "fastify";
import requestLoggerMiddleware from "../middleware/request-logger.middleware";
import errorHandler from "../middleware/error-handler.middleware";
import logger, { LOGGING_TAGS } from "./logging/index";
/**
 * Register error handling and logging middleware with a Fastify instance
 * @param server Fastify server instance
 */
export function setupErrorHandling(server: FastifyInstance): void {
  // Set up request logging
  server.addHook("onRequest", requestLoggerMiddleware);

  // Set error handler
  server.setErrorHandler(errorHandler);

  // Add uncaught exception handler
  process.on("uncaughtException", (error) => {
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        type: "uncaughtException",
      },
      "uncaughtExceptionHandler",
      LOGGING_TAGS.ERROR
    );

    // In production, you might want to attempt graceful shutdown here
  });

  // Add unhandled rejection handler
  process.on("unhandledRejection", (reason, promise) => {
    logger.error(
      {
        reason,
        promise,
        type: "unhandledRejection",
      },
      "unhandledRejectionHandler",
      LOGGING_TAGS.ERROR
    );
  });

  logger.info("Error handling and logging middleware configured", setupErrorHandling.name, LOGGING_TAGS.STARTUP);
}

export default setupErrorHandling;
