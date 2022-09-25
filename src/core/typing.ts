export interface FontStyle {
    color?: string
    backcolor?: string
    font?: string
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    inline?: boolean
    align?: 'left' | 'center' | 'right'
    size?: 2 | 3 | 4 | 5 | 6 | 7
}

export interface Config {
    password?: string
    postbg?: string
    h1?: FontStyle
    h2?: FontStyle
    h3?: FontStyle
    h4?: FontStyle
    h5?: FontStyle
    h6?: FontStyle
    text?: FontStyle
    strong?: FontStyle
    em?: FontStyle
    del?: FontStyle
    paragraph?: FontStyle
    link?: FontStyle
    list?: FontStyle
    listitem?: FontStyle
    table?: string
    tablerow?: string
    tablecell?: string
}