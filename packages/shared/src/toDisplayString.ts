import { isArray, isMap, isObject, isPlainObject, isSet } from './index'

/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */
// 将插值元素转换为字符串
// 对象使用 JSON.stringify 转换;非对象使用 String 强转
export const toDisplayString = (val: unknown): string => {
  return val == null
    ? ''
    : isObject(val)
      ? JSON.stringify(val, replacer, 2)
      : String(val)
}

const replacer = (_key: string, val: any) => {
  if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
        ;(entries as any)[`${key} =>`] = val
        return entries
      }, {})
    }
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    }
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val)
  }
  return val
}
