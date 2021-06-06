interface data {
  message: string;
}

interface response {
  data: data;
}

interface error {
  response: response;
}

export type errorType = null | string | error;
