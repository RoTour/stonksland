import type { TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

const JSONRPC2_TO_HTTP_CODE: Record<
  keyof typeof TRPC_ERROR_CODES_BY_KEY,
  number
> = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
};

export function getStatusCodeFromKey(code: keyof typeof TRPC_ERROR_CODES_BY_KEY) {
  return JSONRPC2_TO_HTTP_CODE[code] ?? 500;
}


export class AppError extends Error {
	code: TRPC_ERROR_CODE_KEY;
	constructor(code: TRPC_ERROR_CODE_KEY, message: string) {
		super(message);
		this.code = code;
		this.message = message;
	}
}
