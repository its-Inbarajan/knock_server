declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_STRING: string;
    PORT?: string; // optional variable
    NODE_ENV: "development" | "production" | "test"; // restrict NODE_ENV to specific values
  }
}
