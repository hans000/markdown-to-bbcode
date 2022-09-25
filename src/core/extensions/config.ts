import { FontStyle } from './../typing';
import { marked } from "marked"
import { load } from "js-yaml"
import { Config } from "../typing"
import { GlobalConfig } from '.';
import BaseExtension from './base';
import { filterUndefined } from '../../utils';

const styleKeys = ['color', 'backcolor', 'font', 'bold', 'italic', 'strikethrough', 'size', 'underline', 'align', 'inline']

function pickFontStyle(obj: any): FontStyle | undefined {
    if (obj) {
        return Object.keys(obj).reduce<any>((acc, key) => {
            const value = obj[key]
            if (styleKeys.includes(key) && value !== null) {
                acc[key] = value
            }
            return acc
        }, {})
    }
}

const EXT_NAME = 'config'

/**
 * 配置生成
 */
export default class ConfigExtension extends BaseExtension {
    public static override run() {
        marked.use({
            extensions: [
                {
                    name: EXT_NAME,
                    level: 'block',
                    tokenizer(src) {
                        const rule = /^---\s*([\s\S]*?)---\s*(?:\n|$)/
                        const match = rule.exec(src)
                        if (match) {
                            const token = {
                                type: EXT_NAME,
                                raw: match[0],
                                text: match[1].trim(),
                                pop: false
                            }
                            if (token.text === '') {
                                token.pop = true
                            }
                            return token
                        }
                    },
                    renderer(token) {
                        const obj: Record<string, any> | string = load(token.text) as any
                        if (token.pop || typeof obj === 'string') {
                            GlobalConfig.pop()
                            return ''
                        }
                        const patch: Config = {
                            password: obj.password,
                            postbg: obj.postbg,
                            h1: pickFontStyle(obj.h1),
                            h2: pickFontStyle(obj.h2),
                            h3: pickFontStyle(obj.h3),
                            h4: pickFontStyle(obj.h4),
                            h5: pickFontStyle(obj.h5),
                            h6: pickFontStyle(obj.h6),
                            text: pickFontStyle(obj.text),
                            strong: pickFontStyle(obj.strong),
                            em: pickFontStyle(obj.em),
                            del: pickFontStyle(obj.del),
                            paragraph: pickFontStyle(obj.paragraph),
                            link: pickFontStyle(obj.link),
                            list: pickFontStyle(obj.list),
                            listitem: pickFontStyle(obj.listitem),
                            table: obj.table,
                            tablerow: obj.tablerow,
                            tablecell: obj.tablecell,
                        }
                        
                        const config = GlobalConfig.push(filterUndefined(patch))
                        const { password, postbg } = config
                        let str = ''
                        if (password) {
                            str += `[password]${password}[/password]`
                        }
                        if (postbg) {
                            str += `[postbg]${postbg}[/postbg]`
                        }
                        return str;
                    },
                }
            ]
        })
    }
}