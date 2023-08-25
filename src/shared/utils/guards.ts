export function isFunc(property: unknown): property is Function {
  return typeof property === 'function';
}
