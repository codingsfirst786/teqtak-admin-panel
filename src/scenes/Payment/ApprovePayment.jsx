import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar } from "@mui/material";
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";
import img from '../podcast/image1.jpeg'

const ApprovePayment = ({ onBack, userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ticket, setTicket] = useState([]);

  const [count, setCount] = useState(0)
  const [refresh, setRefresh] = useState(false)


  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/admin/allusers
`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  
 

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="Events Payment" subtitle="Managing the All Events Payment" />
          </Box>
        </Box>
        <Box display="flex" justifyContent='center'  gridAutoRows="140px" gap="20px">
          <Box backgroundColor={colors.primary[400]} width='75%' px={2} py={4} display="flex" alignItems="center" justifyContent="center" >
            <StatBox
              subtitle="Daily User"
              title= '30'
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
            <Button >Approved</Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default ApprovePayment;
