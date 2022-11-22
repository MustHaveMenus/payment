export function formatCreditCard(value: string) {
  return value
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function formatCreditCardExpireDate(event: KeyboardEvent) {
  if (!event.target) return '';
  const value = (event.target as HTMLInputElement)?.value ?? '';

  const code = event.keyCode;
  const allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return value;
  }

  return value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );
}

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function replaceAtIndex<T>(array: readonly T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
