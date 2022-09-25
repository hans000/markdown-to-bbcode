import { FontStyle } from "../core/typing"
import { INLINE_CHAR } from "./constants"

export function wrapStyle(text: string, style: FontStyle = {}) {
    return (
        (style.inline ? INLINE_CHAR : '') +
        Object.entries(style).reduce((acc, [key, val]) => {
            if (typeof val === 'boolean' && val) {
                const k: string | undefined = {
                    bold: 'b',
                    italic: 'em',
                    strikethrough: 'del',
                    underline: 'u',
                    inline: '',
                }[key]
                if (k) {
                    return `[${k}]${acc}[/${k}]`
                }
                return acc
            }
            return `[${key}=${val}]${acc}[/${key}]`
        }, text)
    )
}

export function merge(target: any, source: any) {
    if (! isObject(target)) return source
    if (! isObject(source)) return target

    return Object.keys(source).reduce(
        (acc: any, key) => {
            acc[key] = merge(target[key], source[key])
            return acc
        },
        target
    )
}

export function isObject(obj: any) {
    return obj && typeof obj === 'object'
}

export function clone(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}

export function getParams() {
    const params = new URLSearchParams(location.search)
    const tid = params.get('tid')
    const pid = params.get('pid')
    return { tid, pid }
}

export function genKey(tid: string, pid: string) {
    return `tid=${tid}&pid=${pid}`
}

export function bindEvent(node: any, type: string, handle: any) {
    node.addEventListener(type, handle)
    return () => {
        node.removeEventListener(type, handle)
    }
}

export function mergeEvent(...args: Function[]) {
    return () => args.forEach(h => h())
}

export function filterUndefined(obj: any) {
    return Object.keys(obj).reduce<any>((acc, key) => {
        const val = obj[key]
        if (val !== undefined) {
            acc[key] = val
        }
        return acc
    }, {})
}

export function rgb2hex({ r, g, b, a }: any) {
    const arr = [r, g, b]
    if (a !== 255) arr.push(a)
    return '#' + arr.map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function hex2rgb(hex: string) {
    let alpha = false
    let h = hex.slice(hex.startsWith('#') ? 1 : 0)
    if (h.length === 3) h = [...h].map(x => x + x).join('')
    else if (h.length === 8) alpha = true
    const hh = parseInt(h, 16)
    return {
        r: hh >>> (alpha ? 24 : 16),
        g: (hh & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8),
        b: (hh & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0),
        a: alpha ? (hh & 0x000000ff) : 255,
    }
}

export function join(...args: string[]) {
    const result: string[] = []
    const pathArr = args.join('/').split("/")
    pathArr.forEach(val => {
        if (val === "..") {
            result.pop()
        } else if (val !== "" && val !== "." || val === '' && result.length === 1 && /^https?:$/.test(result[0])) {
            result.push(val)
        }
    })
    return result.join("/")
}