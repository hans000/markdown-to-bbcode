import MdEditor from './components/Editor'
import { useEffect, useRef, useState } from 'react';
import { useLoadTemplate, useModifyFullscreen, useRemoveStyle, useUpdateHeight, useUploadImage } from './hooks/app';
import { loader } from '@monaco-editor/react';
import { root } from './main';

loader.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.33.0/min/vs' }, })

function App() {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    const editorRef = useRef<{ editor: any }>(null)

    useEffect(() => {
        root.style.position = visible ? 'relative' : 'absolute'
    }, [visible])
    
    useUploadImage()
    useRemoveStyle()
    useUpdateHeight()
    useModifyFullscreen()
    useLoadTemplate(setValue, setVisible, editorRef)
    
    return (
        <>
            <MdEditor ref={editorRef} visible={visible} value={value} onChange={setValue}/>
        </>
    )
}

export default App
