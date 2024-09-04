import { Box, useTheme, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../../../components/StatBox";
import { tokens } from "../../../theme";
import WorkIcon from '@mui/icons-material/Work';
import Header from "../../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




let SearchData = [
  {
    id: 1,
    categ: "Marketing head",
    ago: "1 week ago",
    state: "United states(Hybrid)",
    price: "$80k/yr-$100k/yr",
    button: "Applied",
  },
  {
    id: 2,
    categ: "Marketing head",
    ago: "1 week ago",
    state: "United states(Hybrid)",
    price: "$80k/yr-$100k/yr",
    button: "Applied",
  },
  {
    id: 3,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United states(Hybrid)",
    price: "$80k/yr-$100k/yr",
    button: "Apply Now",
  },
  {
    id: 3,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United states(Hybrid)",
    price: "$80k/yr-$100k/yr",
    button: "Apply Now",
  },
  {
    id: 3,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United states(Hybrid)",
    price: "$80k/yr-$100k/yr",
    button: "Apply Now",
  },
  {
    id: 3,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United states(Hybrid)",
    price: "$80k/yr-$100k/yr",
    button: "Apply Now",
  },

];

const DailyViewerJobs = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleBack = () => {
    navigate('/dailyViewer')
  }
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
          </Box>
        </Box>

        <Button
        variant="contained"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Box my={3} backgroundColor={colors.primary[400]} p={4}>
        <Box
          display="flex"
          flexWrap="wrap" // Ensures items wrap to the next line
          gap={2}
          overflow="hidden" // Removes scrollbar
        >
          {SearchData.map((elm, ind) => (
            <Box
              key={ind}
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
                      {elm.categ}
                    </Typography>
                    <Typography variant="body2" >{elm.ago}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" mt={2} color="textSecondary">
                  {elm.state}
                </Typography>
                <Typography variant="body2" mt={1} color="textSecondary">
                  {elm.price}
                </Typography>
              </Box>
              <Box textAlign="center">
                {/* {elm.button === "Apply Now" ? ( */}
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
                  {elm.button}
                </Button>
                {/* ) : ( */}
                {/* <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, bgcolor: "#EEEEEE", cursor: "not-allowed" }}
                  disabled
                >
                  {elm.button}
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

export default DailyViewerJobs;
