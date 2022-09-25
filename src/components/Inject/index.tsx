import ReactDOM from "react-dom"

export default function Inject() {
   
    const container = document.getElementById('e_controls')
    if (container) {
        const icon = document.createElement('i')
        icon.title = 'markdown by hans000'
        container.appendChild(icon)
        return ReactDOM.createPortal(<svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M96 672v-341.333333h85.333333l128 128 128-128h85.333334v341.333333h-85.333334v-220.586667l-128 128-128-128v220.586667h-85.333333m597.333333-341.333333h128v170.666666h106.666667l-170.666667 192-170.666666-192h106.666666z" fill="#740be1"></path></svg>, icon)
    } else {
        return null
    }
}