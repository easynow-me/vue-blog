export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function validUsername(str: string) {
  const validMap = ['admin', 'editor'];
  return validMap.indexOf(str.trim()) >= 0;
}
