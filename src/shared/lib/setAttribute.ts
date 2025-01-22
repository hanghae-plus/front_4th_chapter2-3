/**
 *
 * @param target 속성을 넣을 객체
 * @param key 속성의 키
 * @param value 속성의 값
 * @returns target에 key와 value를 추가한 객체
 */
const setAttributes = <T extends object, V>(
  target: T,
  key: string,
  value: V,
) => {
  return { ...target, [key]: value }
}

export { setAttributes }
