export const installLink = (weppUrl: string | undefined) => {
  if (!weppUrl) return '#';
  // return `${weppUrl}#wepp-install-modal-v${name}-v${logoUrl}`;
  return `${weppUrl}#wepp-install-modal`;
};
