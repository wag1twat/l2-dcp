interface Postfixes {
  billion: string;
  trillion: string;
}

export const useAdenasValue = (postfixes: Postfixes) => {
  return (adenas: number) => {
    if (Math.abs(adenas) >= 1.0e3) {
      return `${adenas / 1.0e3} ${postfixes.trillion}`;
    }
    return `${adenas} ${postfixes.billion}`;
  };
};
