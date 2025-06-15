export interface APICommonResponse<T> {
  status: number;
  message: string;
  data: T | null;
  error: string | null;
}
