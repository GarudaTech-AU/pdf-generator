export class ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  }
}
