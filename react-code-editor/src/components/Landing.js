import React, { useEffect, useState } from 'react'
import CodeEditorWindow from './CodeEditorWindow'
import axios from 'axios'
import { classnames } from '../utils/general'
import { languageOptions } from '../constants/languageOptions'
import '../../src/css/codeEditor.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import kaniniLogo from '../assets/kanini-logo.png'
import { defineTheme } from '../lib/defineTheme'
import useKeyPress from '../hooks/useKeyPress'
import OutputWindow from './OutputWindow'
import CustomInput from './CustomInput'
import OutputDetails from './OutputDetails'
import ThemeDropdown from './ThemeDropdown'
import LanguagesDropdown from './LanguagesDropdown'

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault)
  const [customInput, setCustomInput] = useState('')
  const [outputDetails, setOutputDetails] = useState(null)
  const [processing, setProcessing] = useState(null)
  const [theme, setTheme] = useState('cobalt')
  const [language, setLanguage] = useState(languageOptions[0])

  const enterPress = useKeyPress('Enter')
  const ctrlPress = useKeyPress('Control')

  const onSelectChange = (sl) => {
    console.log('selected Option...', sl)
    setLanguage(sl)
  }

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log('enterPress', enterPress)
      console.log('ctrlPress', ctrlPress)
      handleCompile()
    }
  }, [ctrlPress, enterPress])
  const onChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data)
        break
      }
      default: {
        console.warn('case not handled!', action, data)
      }
    }
  }
  const handleCompile = () => {
    setProcessing(true)
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    }
    const options = {
      method: 'POST',
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    }
    console.log(process.env.REACT_APP_RAPID_API_URL)
    axios
      .request(options)
      .then(function (response) {
        console.log('res.data', response.data)
        const token = response.data.token
        checkStatus(token)
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err
        console.log(err.response)
        // get error status
        let status = err.response.status
        console.log('status', status)
        if (status === 429) {
          console.log('too many requests', status)
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          )
        }
        setProcessing(false)
        console.log('catch block...', error)
      })
  }

  const checkStatus = async (token) => {
    console.log(token)
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
    }
    try {
      let response = await axios.request(options)
      let statusId = response.data.status?.id

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        showSuccessToast(`Compiled Successfully!`)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log('err', err)
      setProcessing(false)
      showErrorToast()
    }
  }

  function handleThemeChange(th) {
    const theme = th
    console.log('theme...', theme)

    if (['light', 'vs-dark'].includes(theme.value)) {
      setTheme(theme)
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme))
    }
  }
  useEffect(() => {
    defineTheme('oceanic-next').then((_) =>
      setTheme({ value: 'oceanic-next', label: 'Oceanic Next' })
    )
  }, [])

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: 'top-right',
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="code-main">
        <div className="code-cont1">
          <img
            id="kaniniLogo"
            src={kaniniLogo}
            alt="kaniniLogo"
            height={'128px'}
            width={'158px'}
          ></img>

          <div className="display-qn-left">
            <div className="code-qn-number">
              <h2>Question 1</h2>
            </div>
            <div className="code-qn">
              <div className="qn-headline">
                Write a code to get the input in the given format and print the
                output in the given format
              </div>
              <div className="qn-testcase-heading">
                <h3>Sample Input:</h3>
              </div>
              <div className="qn-testcase-input testcase">2</div>
              <div className="qn-testcase-heading">
                <h3>Sample Output:</h3>
              </div>
              <div className="qn-testcase-output testcase">2</div>
            </div>
          </div>
          <div className="custom-input">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </div>
          <div className="test-input">
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                'mt-4 border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0',
                !code ? 'opacity-50' : ''
              )}
            >
              {processing ? 'Processing...' : 'Compile and Execute'}
            </button>
          </div>
        </div>

        <div className="test-right">
          <div className="test-lang">
            <div className="language-button">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div className="">
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>
          </div>
          <div className="test-code">
            <div className="test-code-editor">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </div>

            <div className="test-output">
              <OutputWindow outputDetails={outputDetails} />

              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Landing
