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



const GetJobs = () => {

  const [count, setCount] = useState(0)
  
  const [jobs, setJobs] = useState([])
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
 
  const toggleActivation = async (jobId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "true" ? "false" : "true";
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/jobs/${jobId}`, {
        isActivated: updatedStatus,
      });
      const updatedJob = response.data;

      // Update the local state to reflect the new status
      setJobs(jobs.map(job =>
        job._id === jobId ? { ...job, isActivated: updatedJob.isActivated } : job
      ));
    } catch (error) {
      console.error('Error updating job activation status', error);
    }
  };

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
          <Header title="TOTAL Jobs" subtitle="Managing the All JObs" />
          <Button variant="contained" color="primary">
            DELETE JOBS
          </Button>
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
        >
          <StatBox
            subtitle="Daily Jobs"
            title="40"
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
            title="90"
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
        >
          <StatBox
            title="60"
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
          flexWrap="wrap" // Ensures items wrap to the next line
          gap={2}
          overflow="hidden" // Removes scrollbar
        >
          {jobs.map((job, index) => (
            <Box
              height="auto" // Change to auto to fit content
              width={{ xs: "100%", sm: "48%", md: "32%" }} // Adjust width for responsiveness
              flexShrink={0}
              boxShadow={3}
              borderRadius={2}
              border={1}
              borderColor="grey.300"
              position="relative"
              p={2}
              mb={2} // Add margin bottom for spacing
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
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GetJobs;
