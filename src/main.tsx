import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.less'

const container = document.querySelector('.area')

export const root = document.createElement('div')

window.addEventListener('load', () => {
    const iframe = document.getElementById('e_iframe') as HTMLIFrameElement
    if (iframe) {
        const head = iframe.contentWindow!.document.head
        const style = document.createElement('style')
        style.innerText = `
        body {
            background-color: #fbf2db;
        }
        table td {
            border: 1px solid #E3EDF5;
        }
        .t_table:not([width]) {
            width: 100%;
        }
        div.quote {
            background: #F9F9F9 url(https://www.mcbbs.net/template/mcbbs/image/icon_quote_s.gif) no-repeat 20px 6px;
        }
        div.quote blockquote:last-child {
            background: url(https://www.mcbbs.net/template/mcbbs/image/icon_quote_e.gif) no-repeat 100% 100%;
        }
        br[style] {
            display: none;
        }
        blockquote {
            display: inline-block;
        }
        `
        head.appendChild(style)
    }
    
    if (container && container.parentElement?.id === 'e_body') {
        root.classList.add('hs-md')
        container.appendChild(root)
        
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        )
    }
})