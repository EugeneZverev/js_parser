import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const CodeComponentView = props => {
    return (
        <SyntaxHighlighter language="javascript" style={a11yLight}>
            {props.componentBody}
        </SyntaxHighlighter>
    )
}

export default CodeComponentView