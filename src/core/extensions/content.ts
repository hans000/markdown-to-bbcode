import { marked } from "marked"
import BaseExtension from "./base"

const EXT_NAME = 'content'

/**
 * 目录生成
 */
export default class ContentExtension extends BaseExtension {
    public static list: string[] = []

    public static override reset() {
        ContentExtension.list = []
    }

    public static getContent() {
        const list = ContentExtension.list
        if (list.length) {
            const content = list.reduce((acc, title, index) => {
                const i = index + 1
                const t = title || '目录' + i
                acc += `[#${i}]${t}\n`
                return acc
            }, '')
            return `[index]\n${content}[/index]\n`
        }
        return ''
    }

    public static override run() {
        marked.use({
            extensions: [
                {
                    name: EXT_NAME,
                    level: 'block',
                    tokenizer(src) {
                        const rule = /^===(.*?)\n([\s\S]*?)(?=(?:\n===|$))/
                        const match = rule.exec(src)
                        if (match) {
                            const token = {
                                type: EXT_NAME,
                                raw: match[0],
                                title: match[1].trim(),
                                text: match[2].trim(),
                            }
                            ContentExtension.list.push(token.title)
                            return token
                        }
                    },
                    renderer(token) {
                        return `${marked.parse(token.text)}[page]\n`
                    }
                }
            ]
        })
    }
}