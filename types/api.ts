export interface ApiSuccessResponse<T> {
  data: T
  message?: string
}

export interface ApiErrorResponse {
  error: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
