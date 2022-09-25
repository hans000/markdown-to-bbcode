import Editor from "@monaco-editor/react"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useTransition } from 'react'
import { get, set } from 'idb-keyval'
import { getParams, genKey } from "../../utils"
import { completionProvider } from "./providers/completion"
import parse from "../../core"
import { foldingProvider } from "./providers/folding"
import { colorProvider } from "./providers/color"
import { createWordWapperAction } from "./actions/wrapper"

export default forwardRef(function MdEditor(props: {
    style?: React.CSSProperties
    value?: string
    onChange?: (value: string) => void
    visible?: boolean
}, ref) {
    const [value, setValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement | null>(document.getElementById('e_textarea') as HTMLTextAreaElement)
    const [, startTrasition] = useTransition()
    const mountedRef = useRef(false)
    const [editor, setEditor] = useState(null)

    useEffect(() => {
        if (props.value !== undefined && props.value !== value) {
            setValue(props.value)
        }
    }, [props.value])

    useEffect(() => {
        props.onChange?.(value)
        startTrasition(() => {
            if (mountedRef.current && textareaRef.current) {
                try {
                    textareaRef.current.value = parse(value)
                    editdoc.body.innerHTML = bbcode2html(textareaRef.current.value)
                    const { pid, tid } = getParams()
                    
                    if (pid && tid) {
                        const key = genKey(tid, pid)
                        set(key, value)
                    }
                } catch (error) {
                }
            }
        })
    }, [value])

    useImperativeHandle(
        ref,
        () => ({
            editor
        }),
        [editor],
    )

    return (
        <div className="hs-editor" style={props.style}>
            <Editor options={{
                colorDecorators: true,
            }} beforeMount={(monaco: any) => {
                completionProvider(monaco)
                foldingProvider(monaco)
                colorProvider(monaco)
            }} onMount={(editor: any) => {
                setEditor(editor)
                mountedRef.current = true
                editor.addAction(createWordWapperAction(editor))

                const { tid, pid } = getParams()
                if (tid && pid) {
                    get(genKey(tid, pid))
                        .then(text => {
                            if (text?.length) {
                                if (confirm('是否加载离线数据？')) {
                                    setValue(text)
                                }
                            }
                        })
                }
            }} value={value} onChange={(value = '') => {
                setValue(value)
                }} height={'100%'} defaultLanguage={'markdown'} />
        </div>
    )
})