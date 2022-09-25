import { marked } from "marked"
import { ENTER_CHAR } from "../../utils/constants"
import BaseExtension from "./base"

const EXT_NAME = 'enter'

/**
 * 目录生成
 */
export default class EnterExtension extends BaseExtension {
    public static list: string[] = []

    public static override run() {
        marked.use({
            extensions: [
                {
                    name: EXT_NAME,
                    level: 'block',
                    tokenizer(src) {
                        const rule = /^(\n\n+)/
                        const match = rule.exec(src)
                        if (match) {
                            const token = {
                                type: EXT_NAME,
                                raw: match[0],
                                text: match[1],
                            }
                            return token
                        }
                    },
                    renderer(token) {
                        return `${ENTER_CHAR.repeat(token.text.length - 1)}`
                    }
                }
            ]
        })
    }
}