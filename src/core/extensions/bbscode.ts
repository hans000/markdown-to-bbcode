import { marked } from "marked"
import { GlobalConfig } from "."
import { wrapStyle } from "../../utils"
import BaseExtension from "./base"

/**
 * bbscode生成
 */
export default class BBSCodeExtension extends BaseExtension {
    public static override run() {
        marked.use({
            gfm: true,
            breaks: true,
            renderer: {
                heading(text, level) {
                    const style = GlobalConfig.config[<'h1'>('h' + level)]
                    return `${wrapStyle(text, style)}\n`
                },
                text(text) {
                    const style = GlobalConfig.config.text
                    return wrapStyle(text, style)
                },
                strong(text) {
                    const style = GlobalConfig.config.strong
                    return `[b]${wrapStyle(text, style)}[/b]`
                },
                em(text) {
                    const style = GlobalConfig.config.em
                    return `[i]${wrapStyle(text, style)}[/i]`
                },
                del(text) {
                    const style = GlobalConfig.config.del
                    return `[s]${wrapStyle(text, style)}[/s]`
                },
                list(body, ordered) {
                    const list = GlobalConfig.config.list
                    return wrapStyle(`[list${ordered ? '=1' : ''}]\n${body}[/list]\n`, list)
                },
                listitem(text) {
                    const listitem = GlobalConfig.config.listitem
                    return `[*] ${wrapStyle(text, listitem)}\n`
                },
                paragraph(text) {
                    const style = GlobalConfig.config.paragraph
                    return `${wrapStyle(text, style)}${'\n'}`
                },
                link(href, title, text) {
                    if (text.startsWith('audio:')) {
                        return `[audio]${text.slice(6)}[/audio]`
                    }
                    if (text.startsWith('media:')) {
                        return `[media]${text.slice(6)}[/media]`
                    }
                    const style = GlobalConfig.config.link
                    return `[url=${href}]${wrapStyle(text, style)}[/url]`
                },
                image(href, title, text) {
                    if (href?.startsWith('http')) {
                        return `[img]${href}[/img]`
                    }
                    return `[attachimg]${href}[/attachimg]`
                },
                code(code, infostring, escaped) {
                    return `[code]${code}[/code]\n`
                },
                blockquote(src) {
                    return `[quote]${src}[/quote]\n`
                },
                hr() {
                    return '[hr]'
                },
                br() {
                    return '\n'
                },
                table(header, body) {
                    const width = GlobalConfig.config.table
                    return `[table${width ? '=' + width : ''}]\n${header}${body}[/table]\n`
                },
                tablecell(content, flags) {
                    const width = GlobalConfig.config.tablecell
                    content = marked.parse(content)
                    if (flags.align) {
                        content = `[align=${flags.align}]${content}[/align]`
                    }
                    return `[td${width ? '=' + width : ''}]${content}[/td]`
                },
                tablerow(content) {
                    const color = GlobalConfig.config.tablerow
                    return `[tr${color ? '=' + color : ''}]${content}[/tr]\n`
                }
            }
        })
    }
}