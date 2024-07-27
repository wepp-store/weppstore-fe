export const installLink = (
  name: string | undefined,
  weppUrl: string | undefined,
  logoUrl: string | undefined | null
) => {
  if (!weppUrl || !logoUrl) return '#';
  // return `${weppUrl}#wepp-install-modal-v${name}-v${logoUrl}`;
  return `${weppUrl}#wepp-install-modal`;
};
