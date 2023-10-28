import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CardMedia, Grid } from '@mui/material';
import axios from 'axios';
import { RiSearchLine } from 'react-icons/ri';
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Link } from 'react-router-dom';
import Navbar from "../../layouts/navbar/Navbar";

const Management = () => {
    const [allemployee, setallemployee] = useState([]);
    const [performers, setallperfomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Display 6 cards per page in 2 rows

    const Fetchallemployee = async () => {
        try {
            const response = await axios.get(`https://localhost:7281/api/ManageEmployee`,{
                headers: {
                    "Authorization": "Bearer " +  sessionStorage.getItem('token')
                  },
            });
            setallemployee(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const allperformers = async () => {
        try {
            const response = await axios.get(`https://localhost:7281/api/ManageEmployee/BestPerformer`,{
                headers: {
                    "Authorization": "Bearer " +  sessionStorage.getItem('token')
                  },
            });
            setallperfomer(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        Fetchallemployee();
        allperformers();
    }, []);

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 6,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#AAD064' : '#AAD064',
        },
    }));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const employeesToShow = allemployee.slice(startIndex, endIndex);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmployees = employeesToShow.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const [getAllDept, setNewDept] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');


    useEffect(() => {
        fetchDepartment();
    }, []);

    const handleDeptChange = (event) => {
        const selectedDept = event.target.value
        setSelectedDept(selectedDept)
        fetchManagerData(selectedDept)
    }
    const fetchDepartment = () => {
        fetch(`https://localhost:7281/HistoryTable/GetAllDepartment`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " +  sessionStorage.getItem('token')
              },
        })
            .then(async (data) => {
                const myData = await data.json();
                console.log(myData);
                setNewDept(myData)
                console.log(getAllDept);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }


    //view manager head
    const [manager, setManager] = useState("");
    const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);


    const fetchManagerData = async (selectedDept) => {
        try {
            console.log(selectedDept)
            const response = await axios.get(
                `https://localhost:7281/api/ManageEmployee/GetReportingManager?DepartmentName=${selectedDept}`,{
                    headers: {
                        "Authorization": "Bearer " +  sessionStorage.getItem('token')
                      },
                }
            );
            setIsDepartmentSelected(true)

            setManager(response.data);
        } catch (error) {
            setIsDepartmentSelected(false)
            console.error("Error fetching data:", error);
        }
    };
  return (
    <>
      <Navbar
        title="Employee Management"
        desc="View completed details of all the Employee and their Achievements"
      ></Navbar>
      <div className="commondivs">
        <div className="srchandselect ">
          <div>
            <div className="search-bar px-2">
              <div className="search-icon bg-light">
                <RiSearchLine />
              </div>
              <input
                type="search"
                placeholder="Search Employee"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          &emsp;
          <div>
            <Box>
              <FormControl className="topic-tag">
                <InputLabel id="demo-simple-select-label">
                  Select Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Department"
                  style={{
                    width: "400px",
                    height: "56px",
                    borderRadius: "6px",
                    border: "1px solid #D6DADE",
                  }}
                  value={selectedDept}
                  onChange={handleDeptChange}
                >
                  {getAllDept.map((item) => (
                    <MenuItem
                      key={item.departmentName}
                      value={item.departmentName}
                    >
                      {item.departmentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="empContents">
          <div className="leftcard">
            <h4>List of Employees</h4>
            <br />
            <Grid container spacing={5}>
              {filteredEmployees.map((allusr) => (
                <Grid item xs={12} sm={6} md={4} key={allusr.empId}>
                  <Card
                    sx={{ borderRadius: 3, width: "100%" }}
                    className="card1 py-4"
                  >
                    <CardMedia
                      component="img"
                      src={`https://localhost:7281/Images/${allusr.employeeImage}`}
                      className=" rounded-circle"
                      alt="Profile"
                      style={{ width: "70px", height: "70px" }}
                      sx={{
                        width: 80,
                        height: 80,
                        marginTop: 10,
                        margin: "0 auto",
                      }}
                    />
                    <div
                      className="management-card-div"
                      style={{ width: "200px", marginLeft: "-60px" }}
                    >
                      <CardContent
                        className="boxsize"
                        sx={{
                          margin: "0 auto",
                        }}
                      >
                        <Typography variant="h5" gutterBottom>
                          {allusr.empId}-{allusr.name}
                        </Typography>
                        <Typography gutterBottom>
                          {allusr.designation} - {allusr.department}
                        </Typography>
                        <Typography gutterBottom>{allusr.email}</Typography>
                        <Typography
                          sx={{
                            textAlign: "center",
                            paddingBottom: "8px",
                            fontSize: "14px",
                          }}
                          color="text.secondary"
                        >
                          Skill Level: <span>Begineer</span>
                        </Typography>
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <BorderLinearProgress
                            variant="determinate"
                            value={20}
                            style={{ width: "50%" }}
                          />
                        </Box>

                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                          <Link
                            to={`/ManageEmployee/${allusr.empId}`}
                            className="manage-emp"
                          >
                            {" "}
                            <Button
                              variant=""
                              sx={{ backgroundColor: "#7bcced" }}
                            >
                              View Profile
                            </Button>{" "}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="rightcard">
            <div className="managers">
              {isDepartmentSelected && (
                <div>
                  <Card
                    className=" px-4 py-4"
                    sx={{ height: "180px", border: "2px solid #EAE9EA" }}
                  >
                    <p style={{ fontWeight: "500", fontSize: "18px" }}>
                      Reporting Manager
                    </p>
                    <div className="combines py-4">
                      <div>
                        <CardMedia
                          component="img"
                          src={`https://localhost:7281/Images/${manager.employeeImage}`}
                          className="profileImageBig rounded-circle"
                          alt="Profile"
                          style={{ width: "70px", height: "70px" }}
                        />
                      </div>
                      <div className="details py-4">
                        <span>
                          {manager.empId} -{" "}
                          <span className="subpara">{manager.name}</span>
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              <br />
              <br />

              {performers.map((allperfom) => (
                <Card className="card2" key={allperfom.empId}>
                  <div className="combine">
                    <div>
                      <CardMedia
                        component="img"
                        src={`https://localhost:7281/Images/${allperfom.employeeImage}`}
                        className="profileImageBig rounded-circle"
                        alt="Profile"
                        style={{ width: "70px", height: "70px" }}
                      />
                    </div>
                    <div className="details">
                      <span>
                        {allperfom.empId} -{" "}
                        <span className="subpara">{allperfom.name}</span>
                      </span>
                      <p>
                        <span>
                          {allperfom.designation} - {allperfom.department}
                        </span>
                      </p>
                      <p className="subparas">Points :{allperfom.points}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="pagination empPage">
          {Array.from({
            length: Math.ceil(allemployee.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Management;
