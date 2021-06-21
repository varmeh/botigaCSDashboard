type headers = {
  authorization?: string | null | undefined;
};
export interface APIResponse<T = any> {
  data: T;
  message: string;
  status: boolean;
  headers: headers;
}
