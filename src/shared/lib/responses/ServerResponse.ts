import { ZodError } from "zod";

export interface ServerResponsePagination {
  take: number | undefined;
  skip: number | undefined;
  search: string | undefined;
  total: number | undefined;
  // TODO Фильтры
}

/**
 * Структура ответа сервера
 */
export class ServerResponse<T> {
  isOk: boolean;
  status: number;
  data: T;
  pagination: ServerResponsePagination | undefined;
  statusText: string | undefined = undefined;
  errorMessages: string[] | undefined = [];

  constructor(
    isOk: boolean,
    status: number,
    data: T,
    pagination?: ServerResponsePagination,
    statusText?: string,
    errorMessages?: string[],
  ) {
    this.isOk = isOk;
    this.status = status;
    this.data = data;
    this.pagination = pagination;
    this.statusText = statusText;
    this.errorMessages = errorMessages;
  }

  // 200
  static Ok<T>(
    data: T,
    pagination?: ServerResponsePagination,
    statusText?: string,
  ) {
    return new ServerResponse<T>(true, 200, data, pagination, statusText);
  }

  // 403
  static BadRequest(
    pagination?: ServerResponsePagination,
    statusText?: string,
  ) {
    return new ServerResponse(false, 403, undefined, pagination, statusText);
  }

  static NotFound(pagination?: ServerResponsePagination, statusText?: string) {
    return new ServerResponse(false, 404, undefined, pagination, statusText);
  }

  // 500
  static ServerError(
    error: unknown,
    pagination?: ServerResponsePagination,
    statusText?: string,
  ) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => {
        return err.message;
      });

      return new ServerResponse(
        false,
        500,
        undefined,
        pagination,
        statusText,
        errorMessages,
      );
    }

    if (error instanceof Error) {
      return new ServerResponse(false, 500, undefined, pagination, statusText, [
        error.message,
      ]);
    }

    return new ServerResponse(false, 500, undefined, pagination, statusText, [
      JSON.stringify(error, null, 2),
    ]);
  }
}
