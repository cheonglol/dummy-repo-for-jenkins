import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import logger, { LOGGING_TAGS } from "../modules/logging";

/**
 * Global error handler for the Fastify application
 * Processes all uncaught exceptions and returns standardized error responses
 */
export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  // Log the error with details
  logger.error(
    {
      error: error.message,
      stack: error.stack,
      url: request.url,
      method: request.method,
      params: request.params,
      query: request.query,
      headers: request.headers,
    },
    errorHandler.name,
    LOGGING_TAGS.ERROR
  );

  // Send generic error response
  reply.code(500).type("application/json").send({ error: error.message });
}

export default errorHandler;
