import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Input } from "@mui/material";
import { tokens } from "../../theme";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const AllTask = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [question, setQuestion] = useState([])
    const [count, setCount] = useState(0)
    const navigate = useNavigate();


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/qna/ques`);
                const result = response.data;
                setQuestion(result);
                setCount(result.length)

                console.log("result", result)
            } catch (err) {
                console.error(err);
            }
        };

        getData();
    }, []);
    console.log("pendingUserId", question)


    return (
        <Box
            sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
            <Box>
                <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
                    <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
                        <Header title="All Task " subtitle="See the All Task You Added" />
                    </Box>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                    <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                        <StatBox
                            title={`${count}`}
                            subtitle="Total Added Task"
                            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                        />
                    </Box>
                </Box>


                <Box m="40px 0 0 0" height="75vh" sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: colors.greenAccent[300] },
                    "& .name-column--cell.inactive": { filter: 'blur(2px)', color: 'red', textDecoration: 'line-through' },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                }}>
                    <Box sx={{ padding: '20px' }}>
                        <Grid container spacing={2}>
                            {question.map((data, i) => (
                                // <Grid item xs={12} sm={4} key={data._id}>
                                <Box
                                    key={data._id}
                                    backgroundColor={colors.primary[400]}
                                    sx={{
                                        borderRadius: '8px',
                                        overflow: "hidden",
                                        width: "100%",
                                        margin: "5px 0px"
                                    }}
                                >
                                    <Typography variant="h6" sx={{ margin: '12px' }}>
                                        <Typography variant="h5" sx={{ display: 'inline-block', color: colors.greenAccent[400] }}>Question {i + 1}:</Typography> {data.question} <br />
                                        {data.options.map((option, index) => (
                                            <Typography key={index} sx={{ color: colors.greenAccent[200] }}>
                                                Answer {index + 1}:  {option}
                                            </Typography>
                                        ))}

                                        <Typography variant="h5" sx={{ display: 'inline-block', color: colors.greenAccent[400] }}>Question Added For:</Typography> {data.userRole}
                                    </Typography>

                                </Box>
                                // </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AllTask;
