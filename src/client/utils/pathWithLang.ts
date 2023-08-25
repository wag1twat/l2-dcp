export const pathWithLang = (path: string) => {
  const lang = localStorage.getItem('lang');
  return `${path}?${lang}`;
};
