/**
 * null 또는 undefined 값을 가진 키를 제거한 새로운 객체를 반환합니다.
 */

// @TODO: 만들어보기!!
export const removeEmptyValues = <T extends Record<string, unknown>>(obj: T) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != null)) as Partial<T>
}
