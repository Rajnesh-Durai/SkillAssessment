import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import InputAdornment from '@mui/material/InputAdornment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import kaniniLogo from '../../assets/formlogo.png'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import Basic from '../../assets/Basic.png'
import Intermediate from '../../assets/Intermediate.png'
import Advanced from '../../assets/Advanced.png'

const AssessedTo = () => {
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [isInputActive2, setIsInputActive2] = useState(false);
  const [department, setDepartment] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [isTextFieldClicked, setIsTextFieldClicked] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [newTopicName, setNewTopicName] = useState('')
  const [getAllEmp, setNewEmp] = useState([])
  const [getEmpName, setEmpName] = useState([])
  const [topicName, setTopicName] = useState([])
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([])
  const [questionNo, setQuestionNo] = useState('')
  const [getTopicNamed, setTopicNamed] = useState([])
  const [formValuesList, setFormValuesList] = useState([])
  const [updateDateValue, setUpdateDateValue] = useState('')
  const [selectedItems, setselectedItems] = useState({
    deptid: 0,
    skillid: 0,
    topicid: [0],
  })

  useEffect(()=>{
    fetchDepartments();
    PostData()
    fetchEmployee()
  },[]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        'https://localhost:7281/api/GetAllDepartment',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const data = await response.json()
      setDepartments(data)
    } catch (error) {
      toast.error('Failed to Fetch')
    }
  }

  const toggleDrawer2 = (open, target, assid) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsDrawerOpen2(open)
    setOpen2(false)
    fetchDepartments()
    AssignButton(assid)
  }
  const closeEdit2 = () => {
    toggleDrawer2(false)
  }
  const AssignButton = (assid) => {
    fetch(
      `https://localhost:7281/api/AssessmentData/GetSideBarDetails?id=${assid}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    )
      .then(async (data) => {
        const myData = await data.json()
        setEditRow(myData)
      })
  }

  const handleInputMouseDown2 = () => {
    setIsInputActive2(true)
  }

  const handleInputBlur2 = () => {
    setIsInputActive2(true)
  }

  const edithandleChange = (event) => {
    setDepartment(event.target.value)
  }
  
  const edithandleOpen2 = () => {
    setEditOpen(true)
  }

  const edithandleClose2 = () => {
    setEditOpen(false)
  }
  const handleClick = (event) => {
    event.stopPropagation()
    setIsTextFieldClicked(true)
  }

  const handlePersonChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
    const selectedNames = Array.isArray(value) ? value : [value]
    const selectedIds = selectedNames.map((name) => {
      const employee = getAllEmp.find((emp) => emp.name === name)
      if (employee) {
        setEmpName((prevNames) => [...prevNames, employee.name])
        return employee.empId
      } else {
        return null
      }
    })
    setSelectedEmployeeIds(selectedIds)
  }

  const renderValue = (selected) => {
    if (selected.length === 0) {
      return 'Select'
    }
    if (selected.length <= 2) {
      return selected.join(', ')
    }
    return `${selected.slice(0, 2).join(', ')} & ${selected.length - 2} more (${selected.length
      })`
  }

  const handleTopicChangeinDrawer = (event) => {
    const {
      target: { value },
    } = event
    setTopicName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const handleDateChange = (newValue) => {
    setUpdateDateValue(dayjs(newValue).format('YYYY-MM-DD'))
  }
  const currentDate = new Date().toISOString().slice(0, 10)
  const handleQuestionNoChange = (event) => {
    setQuestionNo(event.target.value)
  }

  const postUserAssessment = () => {
    const updatedFormValuesList = []
    for (let i = 0; i < selectedEmployeeIds.length; i++) {
      const id = selectedEmployeeIds[i]
      const formValues = {
        userId: id,
        assessmentId: editRow.assessmentId,
        numberOfTopics: editRow.numberOfTopic,
        numberOfQuestions: 1 * questionNo,
        totalTime: questionNo * 1,
        dateOfCreation: currentDate,
        dateOfCompletion: updateDateValue,
        description: editRow.description,
        assessmentHistoryId: null,
      }
      updatedFormValuesList.push(formValues)
    }
    setFormValuesList(updatedFormValuesList)
    postEmail()
  }

  //Fetch Employee
  const fetchEmployee = () => {
    fetch(
      `https://localhost:7281/HistoryTable/HistoryDetails?roleName=Employee`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    ).then(async (data) => {
      const myData = await data.json()
      setNewEmp(myData)
    })
  }

  //Post through api for assessed to
  const PostData = () => {
    //POST
    for (let i = 0; i < formValuesList.length; i++) {
      fetch(`https://localhost:7281/HistoryTable/PostExistingAssessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(formValuesList[i]),
      })
        .then((response) => response.json())
        .then((data) => {
        //  handleModalOpen()
        })
    }
  }

  const postEmail = () => {
    const updatedFormValuesList = []
    const currentDate = new Date()
    // Format the date to "yyyy-mm-dd" format
    const formattedDate = currentDate.toISOString().split('T')[0]
    for (let i = 0; i < selectedEmployeeIds.length; i++) {
      const id = selectedEmployeeIds[i]
      const formValues = {
        userId: id,
        assessmentId: editRow.assessmentId,
        sentTime: formattedDate,
      }
      updatedFormValuesList.push(formValues)
    }
    // Construct the names parameter based on the length of getEmpNames
    for (let i = 0; i < formValuesList.length; i++) {
      try {
        const url = `https://localhost:7281/api/AssessmentData/EmailPost`;
        const response = fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
          },
          body: JSON.stringify(formValuesList[i]),
        })
          .then((response) => response.json())
          .then((data) => {
           // handleModalOpen(true);
          })
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }
  }
  //select
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const handleNewTopicNameChange = (event) => {
    setNewTopicName(event.target.value)
  }

  const handleAddTopicName = () => {
    if (newTopicName.trim() !== '') {
      setTopicName((prevNames) => [...prevNames, newTopicName])
      setNewTopicName('')
    }
  }

  return (
    <div>
    <Drawer
      anchor="right"
      open={isDrawerOpen2}
      onClose={toggleDrawer2(false)}
      sx={{
        '& .MuiBackdrop-root.MuiModal-backdrop': {
          backgroundColor: '#143b6f48',
        },
      }}
    >
      <div className="EditSidebar">
        <div className="createFlex">
          <div className="create">Create Employee Assessment</div>
          <div onClick={closeEdit2} className="cursor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z"
                fill="#242D35"
              />
            </svg>
          </div>
        </div>
        <TextField
          helperText="Please enter the title of assessment that help you to manage"
          id="outlined-basic"
          variant="outlined"
          className="assessmentId"
          onMouseDown={handleInputMouseDown2}
          onBlur={handleInputBlur2}
          label={!isInputActive2 ? 'Enter Assessment ID' : ''}
          InputLabelProps={{
            shrink: true,
          }}
          value={editRow.assessmentId || ''}
          disabled
          sx={{
            margin: '0px 40px 0px 48px',
            maxWidth: '654px',
            height: '27px',
            marginBottom: '60px',
            marginTop: '36px',

            '& .MuiOutlinedInput-root': {
              width: '654px',
            },
          }}
        />
        <Box
          sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
        >
          <FormControl className="departmentBox">
            <InputLabel
              id="demo-simple-select-label"
              shrink={!isInputActive2}
            >
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editRow.department || ''}
              label={!isInputActive2 ? 'Department' : ''}
              onChange={edithandleChange}
              open={editOpen}
              onOpen={edithandleOpen2}
              onClose={edithandleClose2}
              sx={{ width: '654px' }}
              disabled
            >
              {editRow.department && (
                <MenuItem value={editRow.department}>
                  {editRow.department}
                </MenuItem>
              )}
              <MenuItem value="">
                <TextField
                  sx={{
                    width: '100%',
                    border: 'none',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      padding: '0px 10px',
                      color: '#1589CC',
                    },
                  }}
                  placeholder="+ Enter new department"
                  value={department}
                  onClick={handleClick}
                  InputProps={{
                    endAdornment: (
                      <>
                        {isTextFieldClicked && department && (
                          <Button variant="text">Add</Button>
                        )}
                      </>
                    ),
                  }}
                  onFocus={(e) => e.stopPropagation()}
                />
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <h3 className="selectLevel">Select Levels</h3>
        <FormControl>
          <RadioGroup row sx={{ marginLeft: '48px', width: '654px' }}>
            <FormControlLabel
              value="Basic"
              control={<Radio color="default" />}
              label={
                <React.Fragment>
                  <div className='skill-level-flex'>
                    <div><img src={Basic} alt='Basic' /></div>
                    <div className='skill-level-margin-left'>Basic</div>
                  </div>
                </React.Fragment>
              }
              labelPlacement="start"
              checked={editRow.skills === 'Basic'}
              disabled
            />
            <FormControlLabel
              value="Intermediate"
              control={<Radio color="default" />}
              sx={{ marginRight: '20px', marginLeft: '50px' }}
              label={
                <React.Fragment>
                  <div className='skill-level-flex'>
                    <div><img src={Intermediate} alt='Intermediate'/></div>
                    <div className='skill-level-margin-left'>Intermediate</div>
                  </div>
                </React.Fragment>
              }
              checked={editRow.skills === 'Intermediate'}
              labelPlacement="start"
              disabled
            />
            <FormControlLabel
              value="Advanced"
              control={<Radio color="default" />}
              label={
                <React.Fragment>
                  <div className='skill-level-flex'>
                    <div><img src={Advanced} alt='Advanced'/></div>
                    <div className='skill-level-margin-left'>Advanced</div>
                  </div>
                </React.Fragment>
              }
              sx={{ marginRight: 'px', marginLeft: '20px' }}
              labelPlacement="start"
              checked={editRow.skills === 'Advanced'}
              disabled
            />
            <FormControlLabel
              value="upskill"
              control={<Radio color="default" />}
              sx={{ marginRight: '0px', marginLeft: '50px' }}
              label={
                <React.Fragment>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                  >
                    <path
                      d="M4.3425 14.4L0 10.0575L4.3425 5.715L5.2875 6.66L2.565 9.3825H9.675V10.7325H2.565L5.2875 13.455L4.3425 14.4ZM13.6575 8.685L12.7125 7.74L15.435 5.0175H8.325V3.6675H15.435L12.7125 0.945L13.6575 0L18 4.3425L13.6575 8.685Z"
                      fill="#0C1116"
                    />
                  </svg>
                  &nbsp; upskill
                </React.Fragment>
              }
              labelPlacement="start"
              checked={editRow.skills === 'upskill'}
              disabled
            />
          </RadioGroup>
        </FormControl>
        <div>
          <FormControl
            sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
          >
            <InputLabel id="demo-multiple-checkbox-label">
              Employee profile
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handlePersonChange}
              input={<OutlinedInput label="Employee profile" />}
              renderValue={renderValue}
              MenuProps={MenuProps}
            >
              {getAllEmp.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  <Checkbox
                    checked={personName.indexOf(option.name) > -1}
                  />
                  <ListItemAvatar>
                    <div className='imageDiv'><img src={`https://localhost:7281/Images/${option.employeeImage}`} className='image'></img></div>
                  </ListItemAvatar>
                  <ListItemText primary={option.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
          >
            <InputLabel
              id="demo-multiple-checkbox-label"
              shrink={!isInputActive2}
            >
              Topics
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={editRow.topicName || []}
              label={!isInputActive2 ? 'Topics' : ''}
              onChange={handleTopicChangeinDrawer}
              input={<OutlinedInput label="Topics" />}
              renderValue={renderValue}
              MenuProps={MenuProps}
              disabled
            >
              <MenuItem>
                <TextField
                  sx={{
                    width: '100%',
                    border: 'none',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      padding: '0px 15px',
                      color: '#1589CC',
                    },
                  }}
                  value={newTopicName}
                  onChange={handleNewTopicNameChange}
                  placeholder="+ Enter new topic"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {newTopicName.trim() !== '' && (
                          <Button
                            variant="text"
                            onClick={handleAddTopicName}
                          >
                            Add
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="divideBox">
          <div>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {
                  marginLeft: '48px',
                  width: '300px',
                  marginTop: '36px',
                },
              }}
              Validate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label={'Total Questions'}
                variant="outlined"
                value={questionNo}
                onChange={handleQuestionNoChange}
              />
            </Box>
            <p
              className="questionsPara"
              style={{ marginLeft: '55px', marginTop: '15px' }}
            >
              Time alloted for a question is 90 sec.
            </p>
          </div>
          <div style={{ marginLeft: '-130px' }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              sx={{ width: '310px', marginTop: '36px' }}
            >
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label={'Date of Completion'}
                  sx={{ width: '330px', marginTop: '48px' }}
                  format="DD/MM/YYYY"
                  value={updateDateValue}
                  onChange={handleDateChange}
                  multiple
                  disablePast
                />
              </DemoContainer>
            </LocalizationProvider>
            <p
              className="datePara"
              style={{ marginLeft: '-0px', marginTop: '15px' }}
            >
              Valid till 11:59PM on the selected date
            </p>
          </div>
        </div>
        <Box
          sx={{
            '& .MuiTextField-root': {
              marginLeft: '48px',
              width: '654px',
              marginTop: '36px',
              marginBottom: '36px',
            },
          }}
        >
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={5}
            variant="outlined"
            value={editRow.description}
            disabled
          />
        </Box>
        <div className="mailButtons">
          <Stack spacing={2} direction="row">
            <Button
              className="cancelButton"
              onClick={toggleDrawer2(false)}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              className="sendButton"
              variant="outlined"
              onClick={postUserAssessment}
            >
              Send Mail
            </Button>
          </Stack>
        </div>
        <img
          src={kaniniLogo}
          className="formLogo"
          height="240px"
          width="240px"
          alt="Kanini Logo"
        />
      </div>
    </Drawer>
  </div>
  )
}

export default AssessedTo
