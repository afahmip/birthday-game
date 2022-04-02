const wait = (time: number): Promise<any> =>
  new Promise((resolve) => setTimeout(resolve, time));

export { wait };
