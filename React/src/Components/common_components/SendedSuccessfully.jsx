import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import successGif from '../../assets/Sent Successfully.gif'
import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard'


const SendedSuccessfully = () => {
  const [copyText, setCopyText] = useState('')
  const [modalopen, setModalOpen] = useState(false)
  const [isEmployeeDrawerOpen, setIsEmployeeDrawerOpen] = useState(false)

  const handleModalOpen = () => setModalOpen(true)

  const handleModalClose = () => setModalOpen(false)

  const handleCopyText = (e) => {
    setCopyText(e.target.value)
  }

  const copyToClipboard = () => {
  copy(copyText)
  toast.success(`You have copied "${copyText}"`)
  }

  const handleEmployeeDrawerClose = () => {
  setIsEmployeeDrawerOpen(false)
  }
  const routeToPage = () => {
    window.location.href = '/ExamPortal'
  }
    
  return (
    <div>
    <Modal
      open={modalopen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="closeIcon"
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            onClick={handleEmployeeDrawerClose}
          >
            <path
              d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z"
              fill="#717D8A"
            />
          </svg>
        </div>
        <img
          src={successGif}
          className="successGIF"
          alt="Sent Successfully"
          height="120px"
          width="120px"
        />
        <h1 className="modalHeading">Assessment assigned Successfully</h1>
        <p className="modalPara">
          The jobseeker assessment has been successfully sent through
          their respectful email id
        </p>
        <div className="linkBox">
          <div className="linkField">
            <TextField
              id="outlined-basic"
              label="Assessment link"
              variant="outlined"
              sx={{
                width: '380px',
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underlined',
              }}
              value="Assessment_Link_for_the_Generated_Assessment" // Set the initial value here
              onChange={handleCopyText}
              onClick={routeToPage}
            />
          </div>
          <div className="copyButton">
            <Button
              variant="outlined"
              onClick={copyToClipboard}
              sx={{
                padding: 1.7,
                color: '#717D8A',
                height: '50px',
                width: '100px',
                borderColor: '#717D8A',
                textTransform: 'none',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
              >
                <path
                  d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3.425H1.5V18.5H13.35V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H15.5C15.9 0 16.25 0.15 16.55 0.45C16.85 0.75 17 1.1 17 1.5V15.5C17 15.9 16.85 16.25 16.55 16.55C16.25 16.85 15.9 17 15.5 17H4.5ZM4.5 15.5H15.5V1.5H4.5V15.5ZM4.5 15.5V1.5V15.5Z"
                  fill="#717D8A"
                />
              </svg>
              &nbsp; Copy Link
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default SendedSuccessfully

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    height: 340,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  }