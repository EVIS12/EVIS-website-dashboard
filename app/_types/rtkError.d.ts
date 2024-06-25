import '@reduxjs/toolkit';
import '@reduxjs/toolkit/dist/query';

declare module '@reduxjs/toolkit' {
  interface SerializedError {
    status: number;
    data: {
      key: string;
    };
    originalStatus: number;
  }
}

declare module '@reduxjs/toolkit/dist/query' {
  interface FetchBaseQueryError {
    status: number;
    data: {
      key: string;
    };
    originalStatus: number;
  }
}
