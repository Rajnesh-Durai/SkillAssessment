import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Dots from '../../assets/ThreeDots.png'
import { useParams } from 'react-router-dom'
import close from '../../assets/close.png'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Correct from '../../assets/CorrectAns.png'
import Trash from '../../assets/Trash.png'
import axios from 'axios'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import successfully from '../../assets/Topic added successfully.gif'
import Navbar from '../../layouts/navbar/Navbar'
import AddTopic from '../../components/add topic/AddTopic'
import ImportCSV from '../../components/import csv/ImportCSV'
const style = {
    position: 'absolute',
    top: '33%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
  }
const AvailableQuestions = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null)
  const [editingItemId, setEditingItemId] = useState(null)
  const { topic, levelValue } = useParams()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [questionValues, setQuestionValues] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)
  const [open1, setOpen1] = React.useState(false)

  //AddQuestionButton
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [topicName, setTopicName] = useState('')
  useEffect(() => {
    const fetchTopicName = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7281/api/GetTopicName?id=${topic}`,
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          }
        )
        setTopicName(response.data)
        console.log(topicName)
      } catch (error) {
        console.error('Error fetching topic name:', error)
      }
    }

    fetchTopicName()
  }, [topic])

  const handleButtonClick = () => {
    setIsModalVisible(true)
  }
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }
  const [openImport, setOpenImport] = useState(false)
  const openImportDiv = () => {
    setOpenImport(true)
  }

  const [Questions, setQuestions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      console.log(levelValue)
      try {
        if (levelValue === 'empty') {
          const response = await axios.get(
            `https://localhost:7281/api/GetQuestionsByTopic?topicId=${topic}`,
            {
              headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              },
            }
          )
          console.log(response.data)
          setQuestions(response.data)
        } else {
          console.log('2nd')
          const response = await axios.get(
            `https://localhost:7281/api/GetQuestionsByTopicAndSkill?topicId=${topic}&skillId=${levelValue}`,
            {
              headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              },
            }
          )
          console.log(response.data)
          setQuestions(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const handleEdit = (itemId) => {
    setEditingItemId(itemId)
    setIsSaveButtonEnabled(true)
  }
  useEffect(() => {
    const initialQuestionValues = Questions.map((question) => ({
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      explanation: question.explanation,
    }))
    setOptionValues(initialQuestionValues)
    setQuestionValues(initialQuestionValues)
    const initialCorrectAnswers = Questions.map((question) => question.answer)
    setCorrectAnswers(initialCorrectAnswers)
  }, [Questions])

  const handleUpdate = (index, itemId, event) => {
    event.stopPropagation()
    const updatedData = {
      ...questionValues[index],
      answer: correctAnswers[index],
      explanation: explanation,
    }
    console.log(updatedData)

    fetch(`https://localhost:7281/api/UpdateQuestions?id=${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setOpen1(true)
        setEditingItemId(null)
        setIsSaveButtonEnabled(false)
      })
      .catch((error) => {
        console.error('Error fetching topics:', error)
      })
  }
  const handleDelete = (itemId, event) => {
    event.stopPropagation()
    axios
      .delete(`https://localhost:7281/api/${itemId}`)
      .then((response) => {
        alert('deleted')
        setQuestions((prevData) =>
          prevData.filter((item) => item.id !== itemId)
        )
      })
      .catch((error) => {
        console.error('Error deleting data:', error)
      })
  }
  const activeToggle = (index) => {
    setActiveAccordionIndex((prevIndex) => (prevIndex === index ? null : index))
    console.log(activeAccordionIndex)
  }
  const [optionValues, setOptionValues] = useState([])
  const [explanation, setExplanation] = useState('')
  const handleExplanationChange = (index, value) => {
    const updatedQuestions = [...Questions]
    updatedQuestions[index].explanation = value
    setQuestions(updatedQuestions)
    setExplanation(value)
  }
  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...Questions]
    updatedQuestions[index].answer = value
    setQuestions(updatedQuestions)
  }
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleAnswerClick = (index, selectedOption) => {
    const updatedSelectedOptions = [...selectedOptions]
    updatedSelectedOptions[index] = selectedOption
    setSelectedOptions(updatedSelectedOptions)

    const updatedQuestions = [...Questions]
    updatedQuestions[index].answer = selectedOption
    setQuestions(updatedQuestions)

    const correctAnswer = optionValues[index][selectedOption]
    const updatedCorrectAnswers = [...correctAnswers]
    updatedCorrectAnswers[index] = correctAnswer
    setCorrectAnswers(updatedCorrectAnswers)
  }

  const handleClose1 = () => {
    window.location.reload()
    setOpen1(false)
  }
  return (
    <div>
         <Navbar
        title="Question Bank"
        desc="Add question under the selected department and topics"
      />
      <div className="main1">
        <div className="flexTitle">
          <div>
            <h3 id="explore1">Available Questions in {topicName}</h3>
          </div>
          <div className="subcon2">
            <AddTopic />
            <ImportCSV />
          </div>
        </div>
        {Questions.map((questions, index) => (
          <div key={questions.id} className="questionSet">
            <Accordion
              expanded={activeAccordionIndex === index}
              onChange={() => activeToggle(index)}
              style={{
                width: '100%',
                backgroundColor: '#DFF3FB',
                border: '1px solid #AFE0F4',
                boxShadow: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}bh-content`}
                id={`panel${index + 1}bh-header`}
                style={{ paddingTop: '7px', padding: '10px' }}
              >
                <Typography sx={{ width: '40px', flexShrink: 0 }}>
                  {index + 1}
                </Typography>
                <div className="qnOrder">
                  <div className="qnorder1">
                    <Typography
                      sx={{ color: 'text.secondary' }}
                      style={{
                        fontSize: '17px',
                        fontWeight: '500',
                        fontFamily: 'Manrope',
                      }}
                    >
                      {questions.question}
                    </Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {questions.questionTypeId === 1 ||
                questions.questionTypeId === 2 ? (
                  <div className="overallQns">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '25px',
                        }}
                      >
                        <img src={Dots} style={{ paddingRight: '5px' }} />
                        <h4> &nbsp;A </h4>
                        <input
                          className="optionDis"
                          type="text"
                          value={optionValues[index]?.option1}
                          disabled
                        />
                        <button
                          className={`correctAns ${
                            optionValues[index]?.option1 === questions.answer
                              ? 'correctAnss'
                              : ''
                          }${
                            editingItemId && questions.answer === 'option1'
                              ? 'correctAnss'
                              : ''
                          }`}
                          disabled={!editingItemId}
                          onClick={() =>
                            handleAnswerClick(
                              index,
                              optionValues[index]?.option1
                            )
                          }
                        >
                          <img src={Correct} alt="Correct" />
                        </button>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '25px',
                        }}
                      >
                        <img src={Dots} style={{ paddingRight: '5px' }}></img>
                        <h4>&nbsp; B</h4>{' '}
                        <input
                          className="optionDis"
                          type="text"
                          value={optionValues[index]?.option2}
                          disabled
                        />
                        <button
                          className={`correctAns ${
                            optionValues[index]?.option2 === questions.answer
                              ? 'correctAnss'
                              : ''
                          }${
                            editingItemId && questions.answer === 'option2'
                              ? 'correctAnss'
                              : ''
                          }`}
                          disabled={!editingItemId}
                          onClick={() =>
                            handleAnswerClick(
                              index,
                              optionValues[index]?.option2
                            )
                          }
                        >
                          <img src={Correct} alt="Correct" />
                        </button>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '25px',
                        }}
                      >
                        <img src={Dots} style={{ paddingRight: '5px' }}></img>
                        <h4> &nbsp;C </h4>{' '}
                        <input
                          type="text"
                          className="optionDis"
                          disabled
                          value={optionValues[index]?.option3}
                        />
                        <button
                          className={`correctAns ${
                            optionValues[index]?.option3 === questions.answer
                              ? 'correctAnss'
                              : ''
                          }${
                            editingItemId && questions.answer === 'option3'
                              ? 'correctAnss'
                              : ''
                          }`}
                          disabled={!editingItemId}
                          onClick={() =>
                            handleAnswerClick(
                              index,
                              optionValues[index]?.option3
                            )
                          }
                        >
                          <img src={Correct} alt="Correct" />
                        </button>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '25px',
                        }}
                      >
                        <img src={Dots} style={{ paddingRight: '5px' }}></img>
                        <h4>&nbsp; D </h4>{' '}
                        <input
                          type="text"
                          className="optionDis"
                          value={optionValues[index]?.option4}
                          disabled
                        />
                        <button
                          className={`correctAns ${
                            optionValues[index]?.option4 === questions.answer
                              ? 'correctAnss'
                              : ''
                          }${
                            editingItemId && questions.answer === 'option4'
                              ? 'correctAnss'
                              : ''
                          }`}
                          disabled={!editingItemId}
                          onClick={() =>
                            handleAnswerClick(
                              index,
                              optionValues[index]?.option4
                            )
                          }
                        >
                          <img src={Correct} alt="Correct" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div>Explanation</div>
                      <div>
                        {' '}
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          variant="outlined"
                          value={questions.explanation}
                          disabled={!editingItemId}
                          className="qnExp"
                          rows={12}
                          onChange={(e) =>
                            handleExplanationChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {questions.questionType === 3 && (
                  <div className="overallQns">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div>Answer</div>
                      <div>
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          variant="outlined"
                          value={questions.answer}
                          disabled={!editingItemId}
                          className="qnAns"
                          rows={12}
                          onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div>Explanation</div>
                      <div>
                        {' '}
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          rows={12}
                          variant="outlined"
                          value={questions.explanation}
                          disabled={!editingItemId}
                          className="qnExp"
                          onChange={(e) =>
                            handleExplanationChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="buttonEditStyle">
                  <div>
                    <Button
                      onClick={(event) =>
                        handleUpdate(index, questions.id, event)
                      }
                      disabled={!isSaveButtonEnabled}
                    >
                      Save
                    </Button>
                    <Button onClick={(event) => handleEdit(questions.id)}>
                      Edit
                    </Button>
                  </div>
                  <div className="qnOrder2">
                    <button
                      onClick={(event) => handleDelete(questions.id, event)}
                    >
                      <img src={Trash} alt="Delete" />
                    </button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
      <div>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <div className="third-page" id="third">
              <div className="successfully">
                <div className="close-btn">
                  <button className="closebtn">
                    <img src={close} alt="" onClick={handleClose1} />
                  </button>
                </div>
                <div className="gif">
                  <img
                    className="success"
                    src={successfully}
                    alt="topic updated successfully"
                  />
                </div>
                <div className="added">Topic Updated Successfully</div>
                <div className="added-sec">
                  Topic has been updated successfully, it will be reflected on
                  page in few minutes
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default AvailableQuestions