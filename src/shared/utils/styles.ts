export const bindClassNames =
  (styles: { [key: string]: string }) =>
  (...classNames: string[]) => {
    return classNames.map((className) => styles[className]).join(' ');
  };

/** rem to pixel */
export const px = (pixel: number) => `${pixel / 16}rem`;

/** to em */
export const em = (pixel: number) => `${pixel / 16}em`;
