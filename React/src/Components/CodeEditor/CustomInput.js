import React from 'react'
import { classnames } from '../../utils/general'
import '../../css/codeEditor.css'

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {' '}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom Input`}
        className='textbox-input'
      ></textarea>
    </>
  )
}

export default CustomInput
