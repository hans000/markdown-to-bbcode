import ExtManager from './extensions'

ExtManager.run()

export default function parse(raw: string) {
    return ExtManager.parse(raw)
}