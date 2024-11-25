import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    useTheme,
} from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";

const AddQuestion = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userRole, setUserRole] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", "",""]);

    const handleRoleChange = (role) => {
        setUserRole(role);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

   
    const handleSubmit = async () => {
        const data = {
            userRole,
            question,
            options,
        };
        if (userRole === "" || question === "" || options.some(option => option === "")) {
            alert('Please fill all fields');
            return;
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/qna/ques`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                alert(`Data Submitted: ${JSON.stringify(data, null, 2)}`);
                // Reset states correctly
                setUserRole('');
                setQuestion('');
                setOptions(["", "", "", "",""]); // Reset to initial array
            } catch (error) {
                console.error("Error submitting data:", error);
                alert('Failed to submit data');
            }
        }
    };
    
    return (
        <Box sx={{ maxWidth: "500px", margin: "auto", p: 2 }}>
            <Typography variant="h3" gutterBottom color={colors.greenAccent[600]}>
                Create a Questionnaire
            </Typography>

            {/* Role Selection Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                {[ "Entrepreneur", "Investor"].map((role) => (
                    <Button
                        sx={{ backgroundColor: colors.greenAccent[500], mx: 1 }}
                        key={role}
                        variant={userRole === role.toLowerCase() ? "contained" : "outlined"}
                        onClick={() => handleRoleChange(role.toLowerCase())}
                    >
                        {role}
                    </Button>
                ))}
            </Box>

            {/* Question Input */}
            <TextField
                fullWidth
                label="Enter your question"
                variant="outlined"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ mb: 3, border: `1px solid ${colors.greenAccent[600]}` }}
            />

            {/* Options Inputs */}
            <Grid container spacing={2}>
                {options.map((option, index) => (
                    <Grid item xs={6} key={index}>
                        <TextField
                            sx={{ border: `1px solid ${colors.greenAccent[600]}` }}
                            fullWidth
                            label={`Option ${index + 1}`}
                            variant="outlined"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, backgroundColor: colors.greenAccent[600] }}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Box>
    );
};

export default AddQuestion;
