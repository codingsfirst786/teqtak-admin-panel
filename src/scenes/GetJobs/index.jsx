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


// let SearchData = [
//   {
//     id: 1,
//     categ: "Marketing head",
//     ago: "1 week ago",
//     state: "United states(Hybrid)",
//     price: "$80k/yr-$100k/yr",
//     button: "Applied",
//   },
//   {
//     id: 2,
//     categ: "Marketing head",
//     ago: "1 week ago",
//     state: "United states(Hybrid)",
//     price: "$80k/yr-$100k/yr",
//     button: "Applied",
//   },
//   {
//     id: 3,
//     categ: "Brand Designer",
//     ago: "1 week ago",
//     state: "United states(Hybrid)",
//     price: "$80k/yr-$100k/yr",
//     button: "Apply Now",
//   },
//   {
//     id: 3,
//     categ: "Brand Designer",
//     ago: "1 week ago",
//     state: "United states(Hybrid)",
//     price: "$80k/yr-$100k/yr",
//     button: "Apply Now",
//   },
//   {
//     id: 3,
//     categ: "Brand Designer",
//     ago: "1 week ago",
//     state: "United states(Hybrid)",
//     price: "$80k/yr-$100k/yr",
//     button: "Apply Now",
//   },
//   {
//     id: 3,
//     categ: "Brand Designer",
//     ago: "1 week ago",
//     state: "United states(Hybrid)",
//     price: "$80k/yr-$100k/yr",
//     button: "Apply Now",
//   },

// ];

const GetJobs = () => {

  const [count, setCount] = useState(0)
  // ////////////////////////////////////////////// //
  const [jobs, setJobs] = useState([])
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs`)
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
  // /////////////////////////////////////////////  //
  // const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
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
              <Box textAlign="center">
                {/* {job.button === "Apply Now" ? ( */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "#EEEEEE",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#6166f331",
                      color: "#6165F3",
                    },
                  }}
                // onClick={() => navigate('/jobdetail')}
                >
                  {/* {job.button} */}
                  Applied
                </Button>
                {/* ) : ( */}
                {/* <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, bgcolor: "#EEEEEE", cursor: "not-allowed" }}
                  disabled
                >
                  {job.button}
                </Button> */}
                {/* )} */}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GetJobs;
