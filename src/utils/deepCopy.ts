const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const symbolTag = '[object Symbol]'
const isNode = (node: any) => typeof node?.ELEMENT_NODE === 'number'

export default function deepCopy(target: any, map = new WeakMap()) {
    if (!target || !isObject(target) || isNode(target)) return target

    const objType = getObjType(target)
    const result = createObj(target, objType)

    // 防止循环引用，不会遍历已经在 map 中的对象，因为在上一层正在遍历
    if (map.get(target)) {
        return map.get(target)
    }

    map.set(target, result)

    // set
    if (objType == setTag) {
        for (const value of target) {
            result.add(deepCopy(value, map))
        }

        return result
    }

    // map
    if (objType == mapTag) {
        for (const [key, value] of target) {
            result.set(key, deepCopy(value, map))
        }

        return result
    }

    // 对象或数组
    if (objType == objectTag || objType == arrayTag) {
        for (const key in target) {
            result[key] = deepCopy(target[key], map)
        }

        return result
    }

    return result
}

function getObjType(obj: Object) {
    return Object.prototype.toString.call(obj)
}

function createObj(obj: any, type: string) {
    if (type == objectTag) return {}
    if (type == arrayTag) return []
    if (type == symbolTag) return Object(Symbol.prototype.valueOf.call(obj))

    return new obj.constructor(obj)
}

function isObject(target: any) {
    return typeof target === 'object'
}