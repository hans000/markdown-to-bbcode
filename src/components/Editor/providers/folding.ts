
export function foldingProvider(monaco: any) {
    const ruleRegionStart = /^#region((?=\s+)(.*)|\s*)/i
    const ruleRegionEnd = /^#endregion\s*/i
    const ruleConfig = /^---.*/
    const ruleContent = /^===.*/

    monaco.languages.registerFoldingRangeProvider('markdown', {
        provideFoldingRanges: function (model: any) {
            const regionStack = []
            const configStack = []
            const contentStack = []
            const range = []
            for (let i = 1; i <= model.getLineCount(); i++) {
                const line = model.getLineContent(i)
                if (ruleRegionStart.test(line)) {
                    regionStack.push({
                        type: 'start',
                        lineNum: i,
                    })
                    continue
                }
                if (ruleRegionEnd.test(line)) {
                    if (regionStack.length === 0) {
                        continue
                    }
                    const last = regionStack.pop()!
                    range.push({
                        start: last.lineNum,
                        end: i,
                        kind: monaco.languages.FoldingRangeKind.Comment
                    })
                    continue
                }
                if (ruleConfig.test(line)) {
                    if (configStack.length === 0) {
                        configStack.push({
                            lineNum: i
                        })
                        continue
                    }
                    const last = configStack.pop()!
                    range.push({
                        start: last.lineNum,
                        end: i,
                        kind: monaco.languages.FoldingRangeKind.Comment
                    })
                }
                if (ruleContent.test(line)) {
                    if (contentStack.length) {
                        const last = contentStack.pop()!
                        range.push({
                            start: last.lineNum,
                            end: i - 1,
                            kind: monaco.languages.FoldingRangeKind.Region
                        })
                    }
                    contentStack.push({
                        lineNum: i
                    })
                }
            }
            const last = contentStack.pop()
            if (last) {
                range.push({
                    start: last.lineNum,
                    end: model.getLineCount(),
                    kind: monaco.languages.FoldingRangeKind.Region
                })
            }

            return range
        }
    });

}