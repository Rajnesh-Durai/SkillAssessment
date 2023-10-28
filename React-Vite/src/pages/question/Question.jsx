import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import green from '../../assets/green round.png'
import Navbar from "../../layouts/navbar/Navbar";
import ImportCSV from '../../components/import csv/ImportCSV'
import AddTopic from '../../components/add topic/AddTopic'

const Question = () => {
    //Department
  const [dept, setDept] = useState('')
  const [deptData, setDeptData] = useState([])
  //Level
  const [level, setLevel] = React.useState('')
  const [levelData, setLevelData] = useState([])
  //AvailableTopic
  const [topicData, setTopicData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  //fetching data
  const fetchData = async () => {
    try {
      const departmentResponse = await axios.get(
        'https://localhost:7281/api/GetAllDepartment',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      setDeptData(departmentResponse.data)

      const levelResponse = await axios.get(
        'https://localhost:7281/api/GetAllSkillLevel',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      setLevelData(levelResponse.data)

      const topicResponse = await axios.get(
        'https://localhost:7281/api/GetAllTopics',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const topics = topicResponse.data
      setTopicData(topics)
      for (const item of topics) {
        const questionResponse = await axios.get(
          `https://localhost:7281/api/QuestionCountByTopicId?topicId=${item.id}`,
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          }
        )

        item.count = questionResponse.data
      }
      const updatedTopicData = [...topicData, ...topics]
      setTopicData(updatedTopicData)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  //Department
  const handleDeptChange = (event) => {
    const selectedDept = event.target.value
    setDept(selectedDept)
    checkDisplayCondition(selectedDept, level)
  }

  //Level
  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value
    setLevel(selectedLevel)
    checkDisplayCondition(dept, selectedLevel)
  }

  //AvailableTopic
  const handleTopicDetails = (topic, levelValue, count) => {
    if (levelValue === '') {
      levelValue = 'empty'
    }
    if (count != 0) {
       window.location.href = `/QuestionBank/${topic}/${levelValue}`
    } else {
      toast.error('Add Some Questions')
    }
  }
  const checkDisplayCondition = async (deptValue, levelValue) => {
    if (deptValue && !levelValue) {
      try {
        const sortedDeptData = await axios.get(
          `https://localhost:7281/api/GetTopic?departmentId=${deptValue}`,
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          }
        )
        const sortedValue = sortedDeptData.data
        setTopicData(sortedValue)

        for (const item of sortedValue) {
          const CountOfQuestion = await axios.get(
            `https://localhost:7281/api/QuestionCountByTopicId?topicId=${item.id}`,
            {
              headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              },
            }
          )
          item.count = CountOfQuestion.data
        }
        const updatedTopicData = [...sortedValue] // Store only the new sortedValue in an array

        setTopicData(updatedTopicData)
      } catch (error) {
        console.error('Error:', error)
      }
    } else if (!deptValue && levelValue) {
      try {
        const topicResponse = await axios.get(
          'https://localhost:7281/api/GetAllTopics',
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          }
        )

        const topics = topicResponse.data
        setTopicData(topics)
        for (const item of topics) {
          const skillResponse = await axios.get(
            `https://localhost:7281/api/GetQuestionCountBySkillIdAndTopicId?skillId=${levelValue}&topicId=${item.id}`,
            {
              headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              },
            }
          )

          item.count = skillResponse.data
        }
        const updatedTopicData = [...topics] // Store only the new sortedValue in an array
        setTopicData(updatedTopicData)
      } catch (error) {
        console.error('Error:', error)
      }
    } else if (deptValue && levelValue) {
      try {
        const sortedDeptData = await axios.get(
          `https://localhost:7281/api/GetTopic?departmentId=${deptValue}`,
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          }
        )
        const sortedValue = sortedDeptData.data
        setTopicData(sortedValue)

        for (const item of sortedValue) {
          const CountOfQuestion = await axios.get(
            `https://localhost:7281/api/GetQuestionCountBySkillIdAndTopicId?skillId=${levelValue}&topicId=${item.id}`,
            {
              headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              },
            }
          )
          item.count = CountOfQuestion.data

          console.log(item.count)
        }
        const updatedTopicData = [...sortedValue] // Store only the new sortedValue in an array
        console.log(updatedTopicData)
        setTopicData(updatedTopicData)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
  return (
    <div>
      <Navbar
        title="Question Bank"
        desc="Add question under the selected department and topics"
      />
      <div className="main-con">
        <div className="main-cont">
          <div className="main-cont1">
            <div className="con-1">
              <div className="subcon1">
                <Box sx={{ minWidth: 410 }}>
                  <FormControl fullWidth className="input-form">
                    <InputLabel id="demo-simple-select-label">
                      Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dept}
                      label="Department"
                      onChange={handleDeptChange}
                    >
                      {deptData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.departmentName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                &emsp;
                <Box sx={{ minWidth: 400 }}>
                  <FormControl fullWidth className="input-form">
                    <InputLabel id="demo-simple-select-label">Level</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={level}
                      label="Level"
                      onChange={handleLevelChange}
                    >
                      {levelData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.skillLevel}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="subcon2">
                <AddTopic />
                <ImportCSV />
              </div>
            </div>
            <div className="con-2">
              <div className="subhead">
                <h5>Available Topics</h5>
              </div>
              <div className="avl-top">
                {topicData.map((item) => (
                  <div className="eachtopic" key={item.id}>
                    <div className="java-img">
                      <img
                        src={`https://localhost:7281/Images/${item.topicImage}`}
                        width="60px"
                        height="60px"
                        alt="img"
                      />
                    </div>
                    <div className="topic-con">
                      <div className="topic-name">{item.topicName}</div>
                      <div className="ttl-qn" id={`qn-${item.id}`}>
                        <div className="qn-count">{item.count} Questions</div>
                      </div>
                    </div>
                    <div className="ok-btn">
                      <img
                        src={green}
                        alt="Ok"
                        onClick={() =>
                          handleTopicDetails(item.id, level, item.count)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div class="bulb"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
