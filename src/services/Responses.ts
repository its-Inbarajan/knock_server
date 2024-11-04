export interface IApiResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  error?: string;
  response?: T;
}
