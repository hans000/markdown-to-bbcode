function regionProposal(monaco: any, range: any) {
    return [
        {
			label: 'region hide',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个隐藏信息区域',
			insertText: '#region hide${1:=d999,666}\n${2:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region spoiler',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个折叠区域',
			insertText: '#region spoiler\n${1:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region free',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个免费信息区域',
			insertText: '#region free\n${1:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region align',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个文字排布方式区域',
			insertText: '#region ${1:left}\n${2:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region float',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个浮动区域',
			insertText: '#region float=${1:left}\n${2:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region table',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个table区域',
			insertText: '#region table${1:=${2:100%}}\n${3:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region tablerow',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个table row区域',
			insertText: '#region tr${1:=${2:red}}\n${3:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'region tablecell',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '创建一个table row区域',
			insertText: '#region td${1:=${2:50%}}\n${3:text}\n#endregion',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
        {
			label: 'config',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '配置区域',
			insertText: '---\n${1:config info}\n---\n',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
		},
    ]
}

function configProposal(monaco: any, range: any) {
    return [
		{
			label: 'postbg',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '背景图案',
			insertText: 'postbg: ${1:2.jpg}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
		},
		{
			label: 'password',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '设置密码',
			insertText: 'password: ${1:123456}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
		},
        {
			label: 'style',
			kind: monaco.languages.CompletionItemKind.Snippet,
			documentation: '设置样式',
			insertText: '${1:h2}: { color: "${2:#f00}", backcolor: "${3:#000}", size: ${4:6} }',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
        }
    ]
}

export function completionProvider(monaco: any) {
    monaco.languages.registerCompletionItemProvider('markdown', {
        provideCompletionItems(model: any, position: any) {
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            }
            
            if (word.startColumn === 1) {
                return { suggestions: [...regionProposal(monaco, range), ...configProposal(monaco, range)] }
            }
            return { suggestions: [] }
        }
    });
}