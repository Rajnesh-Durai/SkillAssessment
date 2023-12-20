import React, { useState } from 'react'
import '../../css/codeEditor.css'
import Editor from '@monaco-editor/react'

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || '')

  const handleEditorChange = (value) => {
    setValue(value)
    onChange('code', value)
  }

  return (
    <div className="test-box">
      <Editor
        height="50vh"
        width={`110%`}
        language={language || 'javascript'}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  )
}
export default CodeEditorWindow
