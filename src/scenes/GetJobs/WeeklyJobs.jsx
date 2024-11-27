import { Box, useTheme, Button, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchAllJobsCount } from "../../Api/Jobs/AllJobsCount";

const WeeklyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${process.env.REACT_APP_BACK_URL}/admin/info/jobs`
    //             );
    //             const result = response.data;

    //             const updatedData = result.data.map((user) => ({
    //                 ...user,
    //                 active: true,
    //             }));

    //             setJobs(updatedData);
    //         } catch (error) {
    //             console.error("Fetching data error", error);
    //         }
    //     };
    //     getData();
    // }, []);

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const users = await fetchAllJobsCount();
                setJobs(users.weeklyJobs);

            } catch (error) {
                console.log(error);
            }
        };
        getUserCount();
    }, []);
    
    const toggleActivation = async (jobId, currentStatus) => {
        try {
            const updatedStatus = currentStatus === "true" ? "false" : "true";
            const response = await axios.put(
                `${process.env.REACT_APP_BACK_URL}/jobs/${jobId}`,
                {
                    isActivated: updatedStatus,
                }
            );
            const updatedJob = response.data;

            setJobs(
                jobs.map((job) =>
                    job._id === jobId ? { ...job, isActivated: updatedJob.isActivated } : job
                )
            );
        } catch (error) {
            console.error("Error updating job activation status", error);
        }
    };

    return (
        <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
            <IconButton onClick={() => navigate("/jobs")} sx={{ mb: 2 }}>
                <ArrowBack />
            </IconButton>

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
                    <Header title="WEEKLY JOBS" subtitle="Managing the All Jobs" />
                </Box>
            </Box>

            {jobs.length === 0 ? (
                <Typography variant="h1" textAlign="center" color="textSecondary">
                    No job posts This Week
                </Typography>
            ) : (
                <Box my={3} backgroundColor={colors.primary[400]} p={4}>
                    <Box display="flex" flexWrap="wrap" gap={2} overflow="hidden">
                        {jobs.map((job, index) => (
                            <Box
                                key={job._id}
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
                                        </IconButton>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                style={{ color: "#4CCEAC" }}
                                            >
                                                {job.jobTitle}
                                            </Typography>
                                            <Typography variant="body2">{job.applicationDeadline}</Typography>
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
            )}
        </Box>
    );
};

export default WeeklyJobs;
