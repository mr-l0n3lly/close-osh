declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLOSE_API_TOKEN: string;
      PORT: number;
      CLOSE_API_ENDPOINT: string;
      CLOSE_API_KEY: string;
      NODE_ENV: 'production' | 'development';
      CACHE_DURATION: number;
    }
  }
}


export type DataResponse<T> = {
  items: T[];
  total: number;
}

export type PaginatedRequest = {
  skip: number;
  limit: number;
}
