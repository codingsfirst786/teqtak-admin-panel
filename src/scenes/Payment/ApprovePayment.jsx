import { useTheme, Box, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchPaymentRequest } from "../../Api/Ticket/PaymentRequest";

const ApprovePayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [approve, setApprove] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [reqId , setReqId] = useState('')


  // Get all Request about ticket Payment
  useEffect(() => {
    const ticket = async () => {
      const response = await fetchPaymentRequest()
      const result = response.data;
      const pendingRequests = result.filter(item => item.requestStatus === "pending");
      pendingRequests.forEach(request => {
        setReqId(request._id);
      });
      setApprove(pendingRequests);
    }
    ticket()
  }, [refresh])

  // Hnadle Event Create Request
  const handleDecline = async () => {  // Decline
    try {
      const data = {
        requestStatus: "decline"
      };
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/payreq/${reqId}`, data)
      console.log(response)
      setRefresh(!refresh)

    }
    catch (err) {
      console.log(err)
    }
  }
  const handleProcess = async () => {  // Process
    try {
      const data = {
        requestStatus: "process"
      };
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/payreq/${reqId}`, data)
      console.log(response)
      setRefresh(!refresh)

    }
    catch (err) {
      console.log(err)
    }
  }
  const handleApprove = async () => {  // Approve
    try {
      const data = {
        requestStatus: "approve"
      };
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/payreq/${reqId}`, data)
      console.log(response)
      setRefresh(!refresh)

    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Header title="Events Payment" subtitle="Manage Withdrawal Requests" />

      <Box display="grid" gridTemplateColumns="1fr" gap="20px" mt={4}>
        {approve.map((request, index) => (
          <Box
            key={index}
            backgroundColor={colors.primary[400]}
            p={3}
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography variant="h6" fontWeight="bold" color={colors.greenAccent[400]}>
              Event: {request.event.eventTitle}
            </Typography>
            <Typography>Creator Name: {request.user.name}</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total Payment: {request.amount}</Typography>
              <Typography>Email: {request.user.email}</Typography>
              <Typography>Phone Number: {request.phoneNumber}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Account Number: {request.bankAccount}</Typography>
              <Typography>Stripe Id: {request.stripeId}</Typography>
              <Typography>Paypal Id: {request.paypalId}</Typography>
            </Box>
           <Box>
           <Button
              variant="contained"
              color="info"
              onClick={handleDecline}
              sx={{ width: "13%" }}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleProcess}
              sx={{ width: "13%", marginLeft:"10px" }}
            >
              Process
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleApprove}
              sx={{ width: "13%", marginLeft:"10px" }}
            >
              Approve
            </Button>
           </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ApprovePayment;
