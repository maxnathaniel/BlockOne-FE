const logger = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  return result;
};

export default logger;