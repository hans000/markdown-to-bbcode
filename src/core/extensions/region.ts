import { marked } from "marked"
import { INLINE_CHAR } from "../../utils/constants"
import BaseExtension from "./base"

const rules = [
    { element: 'free', identifier: 'free', bool: true },
    { element: 'hide', identifier: 'hide', bool: true },
    
    { element: 'align', identifier: 'left', enum: true },
    { element: 'align', identifier: 'center', enum: true },
    { element: 'align', identifier: 'right', enum: true },

    { element: 'b', identifier: 'b', bool: true },
    { element: 'b', identifier: 'bold', bool: true },
    { element: 'i', identifier: 'i', bool: true },
    { element: 'i', identifier: 'italic', bool: true },
    { element: 'u', identifier: 'u', bool: true },
    { element: 'u', identifier: 'underline', bool: true },
    { element: 's', identifier: 's', bool: true },
    { element: 's', identifier: 'strikethrough', bool: true },

    { element: 'color', identifier: 'color' },
    { element: 'backcolor', identifier: 'backcolor' },
    { element: 'size', identifier: 'size' },
    { element: 'font', identifier: 'font' },
    { element: 'float', identifier: 'float' },

    { element: 'tr', identifier: 'tablerow' },
    { element: 'tr', identifier: 'tr' },
    { element: 'td', identifier: 'tablecell' },
    { element: 'td', identifier: 'td' },
    { element: 'table', identifier: 'table' },

    {element: '', identifier: 'inline', bool: true }
]


function parseMode(raw: string | undefined) {
    if (raw) {
        const list = raw.trim().split(/\s+/).reverse()
        return list.map(mode => {
            let element = 'spoiler'
            let attr = ''

            for (const rule of rules) {
                if (rule.bool) {
                    if (rule.identifier === mode) {
                        return { element: rule.element, attr: '' }
                    } else {
                        continue
                    }
                }
                if (rule.enum) {
                    if (rule.identifier === mode) {
                        return { element: rule.element, attr: '=' + rule.identifier }
                    } else {
                        continue
                    }
                }
                if (mode.startsWith(rule.identifier)) {
                    return { element: rule.element, attr: mode.slice(rule.identifier.length)}
                }
            }
            return { element, attr }
        })
    }
    return [ { element: 'spoiler', attr: '', } ]
}

const EXT_NAME = 'region'

/**
 * 区域生成
 */
export default class RegionExtension extends BaseExtension {
    public static override run() {
        marked.use({
            extensions: [
                {
                    name: EXT_NAME,
                    level: 'block',
                    start(src) {
                        return src.match(/^#region(.*)/im)?.index
                    },
                    tokenizer(src) {
                        const list = src.split('\n')
                        let count = 0
                        let raw = ''
                        let mode = ''
                        let text = ''
                        const ruleStart = /^#region((?=\s+)(.*)|\s*)/i
                        const ruleEnd = /^#endregion\s*/i
                        for (let i = 0; i < list.length; i++) {
                            const line = list[i]
                            raw += line + '\n'
                            if (i === 0) {
                                const match = ruleStart.exec(line)
                                if (match) {
                                    mode = match[1]
                                    count++
                                    continue
                                } else {
                                    return
                                }
                            }
                            if (ruleStart.test(line)) {
                                count++
                                text += line + '\n'
                                continue
                            }
                            if (ruleEnd.test(line)) {
                                count--
                                if (count === 0) {
                                    break
                                } else {
                                    text += line + '\n'
                                    continue
                                }
                            }
                            text += line + '\n'
                        }
                        if (count === 0) {
                            const token = {
                                type: EXT_NAME,
                                raw,
                                mode,
                                text,
                            }
                            return token
                        }
                    },
                    renderer(token) {
                        // 解析模式
                        const modeList = parseMode(token.mode)
                        const filterList = modeList.filter(mode => !!mode.element)
                        const isInline = modeList.length !== filterList.length
                        // 转义#
                        const text = token.text.replace(/\#/g, '#')
                        return (
                            (isInline ? INLINE_CHAR : '') +
                            filterList.reduce(
                                (acc, { element, attr }) => {
                                    return `[${element}${attr}]${acc}[/${element}]`
                                },
                                marked.parse(text).trimEnd()
                            ) + '\n'
                        )
                    }
                }
            ]
        })
    }
}