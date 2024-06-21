declare global {
    namespace NodeJS {
      interface Global {
        _mongoClientPromise: Promise<any>;
      }
    }
  }
  
  export {};
  