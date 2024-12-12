import { Box, useTheme, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";
import WorkIcon from '@mui/icons-material/Work';
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllJobsCount } from "../../Api/Jobs/AllJobsCount";



const GetJobs = () => {

  const [count, setCount] = useState(0)
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()
  const [dailyJobsCount, setDailyJobsCount] = useState(0)
  const [monthlyJobsCount, setMonthlyJobsCount] = useState(0)
  const [weeklyJobsCount, setWeeklyJobsCount] = useState(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/jobs`)
        const result = await response.data;
        console.log("Fetched data:", result);
        console.log("count is");
        console.log(result.data.count)
        const updatedData = result.data.map(user => ({
          ...user,
          active: true
        }));

        setCount(result.count)
        console.log(updatedData)
        setJobs(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])

  const handleDailyJobs = () => {
    navigate('/dailyJobs')
  }
  const handleWeeklyJobs = () => {
    navigate('/weeklyJobs')
  }
  const handleMonthlyJobs = () => {
    navigate('/monthlyJobs')
  }

  const handleUser = (id) => {
    navigate('/userProfile', { state: { userPK: id } });
  };
 
  // Get Count By Date 
  useEffect(() => {
    const getUserCount = async () => {
      try {
        const users = await fetchAllJobsCount(); 
        setDailyJobsCount(users.count.daily);
        console.log('fasgdjvljhbsagFDSHGKL;DFSAgsdhl;kdgsadhfjkl', users)
        setWeeklyJobsCount(users.count.weekly)
        setMonthlyJobsCount(users.count.monthly)

      } catch (error) {
        console.log(error);
      }
    };
    getUserCount();
  }, []);

  const toggleActivation = async (jobId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "true" ? "false" : "true";
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/jobs/${jobId}`, {
        isActivated: updatedStatus,
      });
      const updatedJob = response.data;

      setJobs(jobs.map(job =>
        job._id === jobId ? { ...job, isActivated: updatedJob.isActivated } : job
      ));
    } catch (error) {
      console.error('Error updating job activation status', error);
    }
  };

  console.error('Error updating job activation status', jobs);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{height:"87vh",overflowY:"auto", padding:"20px"}}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(6, 3fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gridColumn="span 6"
        >
          <Header title="TOTAL JOBS" subtitle="Managing the All Jobs" />
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px">
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleDailyJobs}
        >
          <StatBox
            subtitle="Daily Jobs"
            title = {dailyJobsCount}
            icon={
              <WorkIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleWeeklyJobs}
        >
          <StatBox
            title={weeklyJobsCount}
            subtitle="Weekly Jobs"
            icon={
              <WorkIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }


          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleMonthlyJobs}
        >
          <StatBox
            title={monthlyJobsCount}
            subtitle="Monthly Jobs"

            icon={
              <WorkIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${count}`}
            subtitle="Total Jobs"
            icon={
              <WorkIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      <Box my={3} backgroundColor={colors.primary[400]} p={4}>
        <Box
          display="flex"
          flexWrap="wrap" 
          gap={2}
          overflow="hidden" 
        >
          {jobs.map((job, index) => (
            <Box
              height="auto" 
              width={{ xs: "100%", sm: "48%", md: "32%" }}
              flexShrink={0}
              boxShadow={3}
              borderRadius={2}
              border={1}
              borderColor="grey.300"
              position="relative"
              p={2}
              mb={2} 
            >
              <Box>
                <Box display="flex" gap={2} alignItems="center">
                  <IconButton
                    style={{
                      backgroundColor: "rgb(61,165,138)",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "2rem",
                      padding: "0.5rem",
                    }}
                  >
                    {/* <TbBrandNeteaseMusic /> */}
                  </IconButton>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" style={{ color: "#4CCEAC" }}>
                      {job.jobTitle}
                    </Typography>
                    <Typography variant="body2" >{job.applicationDeadline}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" mt={2} color="textSecondary">
                  {job.workplaceType}
                </Typography>
                <Typography variant="body2" mt={1} color="textSecondary">
                  {job.salaryRange}
                </Typography>
              </Box>
              <Box textAlign="center" mt={2}>
              <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: job.isActivated === "true" ? "#4CCEAC" : "#EEEEEE",
                    color: job.isActivated === "true" ? "white" : "black",
                    "&:hover": {
                      bgcolor: job.isActivated === "true" ? "#3BA68F" : "#CCCCCC",
                    },
                  }}
                  onClick={() => toggleActivation(job._id, job.isActivated)}
                >
                  {job.isActivated === "true" ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="contained" color="secondary" fullWidth sx={{mt:"10px"}}
                onClick={()=> handleUser(job?.poster?.Users_PK)}
                >
                  Veiw Profile
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GetJobs;
