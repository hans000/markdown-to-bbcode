import { useEffect, useState } from "react"
import { root } from "../main"
import { mergeEvent, bindEvent, getParams, join } from "../utils"

export function useModifyFullscreen() {
    const [isPlantext, setIsPlantext] = useState(false)
    useEffect(() => {
        const fullscreen = document.getElementById('e_fullswitcher')
        const e_controls = document.getElementById('e_controls')
        const e_switcher = document.getElementById('e_switcher')
        const e_iframe = document.getElementById('e_iframe')
        if (fullscreen && e_controls && e_switcher && e_iframe) {
            const parent = fullscreen.parentElement!
            const node = document.createElement('a')
            node.innerText = e_controls.classList.contains('fullscreen') ? '返回' : '全屏'
            node.title = '全屏/返回 - by hans0000'
            node.href = 'javascript:;'
            node.id = 'e_fullswitcher'
            parent.insertBefore(node, fullscreen)
            parent.removeChild(fullscreen)
            return mergeEvent(
                bindEvent(node, 'click', (ev: Event) => {
                    editorfull()
                    if (e_controls.classList.contains('fullscreen')) {
                        e_controls.classList.remove('fullscreen')
                        root.style.width = '480px'
                        root.style.height = e_iframe.style.height
                    } else {
                        e_controls.classList.add('fullscreen')
                    }
                }),
                bindEvent(e_switcher, 'click', (ev: any) => {
                    const checked = ev.target.checked
                    setIsPlantext(checked)
                })
            )
        }
    }, [isPlantext])
}

export function useUpdateHeight() {
    useEffect(() => {
        const iframe = document.getElementById('e_iframe')
        if (iframe) {
            const observer = new MutationObserver((list) => {
                root.style.height = (list[0].target as HTMLElement).style.height
            })
    
            observer.observe(iframe, {
                attributes: true,
                subtree: false,
                attributeFilter: ['style']
            })
    
            return () => {
                observer.disconnect()
            }
        }
    }, [])
}

export function useUploadImage() {
    useEffect(() => {
        const node = document.getElementById('e_image_menu')
        if (node) {
            const observer = new MutationObserver((list) => {
                const children = node.querySelectorAll('#imgattachlist a') as any as HTMLAnchorElement[]
                Array.from(children).forEach((child) => {
                    const id = child.id.slice(11)
                    child.title = id
                    child.dataset.id = id
                    child.addEventListener('click', () => {
                        navigator.clipboard.writeText(id)
                    })
                })
            })
    
            observer.observe(node, {
                attributes: true,
                subtree: false,
                attributeFilter: ['style']
            })
    
            return () => {
                observer.disconnect()
            }
        }
    }, [])
}

export function useRemoveStyle() {
    useEffect(() => {
        const node = document.getElementById('e_controls')
        if (node) {
            const observer = new MutationObserver((list) => {
                (list[0].target as HTMLElement).removeAttribute('style')
            })
    
            observer.observe(node, {
                attributes: true,
                subtree: false,
                attributeFilter: ['style']
            })
    
            return () => {
                observer.disconnect()
            }
        }
    }, [])
}

export function useToggleRedoUndo(visible: boolean) {
    useEffect(() => {
        const container = document.querySelector('.hs-md')
        if (container) {
            visible ? container.classList.remove('hidden') : container.classList.add('hidden')
        }
        const redoundo = document.querySelector('.b2r.nbl.nbr') as HTMLDivElement
        if (redoundo) {
            redoundo.style.visibility = visible ?  'hidden' : 'visible'
        }
    }, [visible])
}

export function useLoadTemplate(setValue: any, setVisible: any, editorRef: any) {
    useEffect(() => {
        const bar = document.getElementById('e_button') as HTMLDivElement
        if (bar) {
            const container = document.createElement('div')
            container.className = 'hs-template'
            container.innerHTML = `
                <select title='套用模板'><option value=''>选择模板</option></select>
                <div>
                    <a title='复制当前模板' class='hs-copy' href="javascript:;"></a>
                    <a title='应用当前模板' class='hs-apply' href="javascript:;"></a>
                    <a title='启用双栏模式，ctrl + |' href="javascript:;" class='hs-run'></a>
                </div>
                `
            bar.appendChild(container)
            try {
                const select =  bar.querySelector('select') as HTMLSelectElement
                const copy =  bar.querySelector('.hs-copy')
                const apply =  bar.querySelector('.hs-apply')
                const mode =  bar.querySelector('.hs-run')
                const templateList: any[] = []
                const baseUrl = window.__baseUrl__ || import.meta.env.VITE_APP_BASE_URL
                const configUrl = join(baseUrl, './config.json')
                fetch(configUrl).then(res => res.json()).then((config) => {
                    const list =  config.list as Array<{ name: string, description: string, templateId: string }>
                    Promise.allSettled(list.map(item => {
                        const url = join((/https?:/.test(item.templateId) ? '' : baseUrl), item.templateId)
                        return fetch(url)
                            .then(res => res.text())
                            .then((content: string) => {
                                return {
                                    name: item.name,
                                    description: item.description,
                                    content,
                                }
                            })
                    })).then(result => {
                        const fragment = document.createDocumentFragment()
                        const select =  bar.querySelector('select') as HTMLSelectElement
                        result.forEach(res => {
                            if (res.status === 'fulfilled') {
                                const info = res.value
                                templateList.push(info)
                                const option = document.createElement('option')
                                option.title = info.description
                                option.value = info.name
                                option.textContent = info.name
                                fragment.append(option)
                            }
                        })
                        select.appendChild(fragment)
                    })
                })

                return mergeEvent(
                    bindEvent(copy, 'click', () => {
                        const info = templateList[select.selectedIndex - 1]
                        if (info) {
                            navigator.clipboard.writeText(info.content)
                        }
                    }),
                    bindEvent(apply, 'click', () => {
                        const info = templateList[select.selectedIndex - 1]
                        if (info) {
                            setValue(info.content)
                        }
                    }),
                    bindEvent(mode, 'click', () => {
                        const { tid, pid } = getParams()
                        if (tid && pid) {
                            setVisible((v: boolean) => !v)
                        } else {
                            alert('必须处于草稿或已发表状态，请先发表或保存为草稿')
                        }
                    }),
                    bindEvent(window, 'keydown', (ev: KeyboardEvent) => {
                        if (ev.code === 'Backslash' && ev.ctrlKey) {
                            ev.preventDefault()
                            const { tid, pid } = getParams()
                            if (tid && pid) {
                                setVisible((v: boolean) => !v)
                            } else {
                                alert('必须处于草稿或已发表状态，请先发表或保存为草稿')
                            }
                        }
                    }),
                )
            } catch (error) {
                console.error(error)
            }
        }
    }, [])
}