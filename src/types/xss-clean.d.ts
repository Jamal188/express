declare module 'xss-clean' {
  const xssClean: () => express.RequestHandler;
  export default xssClean;
}

