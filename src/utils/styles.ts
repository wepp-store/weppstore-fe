export const bindClassNames =
  (styles: { [key: string]: string }) =>
  (...classNames: string[]) => {
    return classNames.map((className) => styles[className]).join(' ');
  };
