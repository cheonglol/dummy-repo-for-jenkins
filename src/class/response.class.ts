export interface IResponseMetadata {
  [key: string]: unknown;
}

/**
 * Standard API response wrapper
 */
export class Response<T = IResponseMetadata> {
  /** Human-readable content or message */
  public content: string;

  /** Optional structured metadata */
  public metadata?: T;

  /** ISO timestamp of response creation */
  public timestamp: string;

  constructor(params: { content: string; metadata?: T }) {
    this.content = params.content;
    this.metadata = params.metadata;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Create a successful response
   */
  public static createSuccessResponse<T>(content: string, metadata?: T): Response<T> {
    return new Response<T>({ content, metadata });
  }

  /**
   * Create an error response
   */
  public static createErrorResponse<T>(content: string, metadata?: T): Response<T> {
    return new Response<T>({ content, metadata });
  }
}
