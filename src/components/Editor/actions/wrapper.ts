export function createWordWapperAction(editor: any) {
    return {
        id: 'toggle-wordwrap',
        label: 'Toggle WordWrap',
        contextMenuGroupId: 'mdx2bbscode',
        keybinding: [
            monaco.KeyMod.Alt | monaco.KeyCode.KeyZ,
        ],
        run() {
            editor.updateOptions({
                wordWrap: editor.getOption(118) === 'off' ? 'on' : 'off',
            })
        },
    }
}