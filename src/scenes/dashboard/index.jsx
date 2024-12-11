import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchEnterpreneurCount, fetchInvestorCount, fetchTotalCOunt, fetchViewerCount } from "../../Api/AllUser/TotalUser";
import { fetchPaymentRequest } from "../../Api/Ticket/PaymentRequest";


const Dashboard = () => {

  const [totalCount, setTotalCount] = useState(0)
  const [investorCount, setInvestorCount] = useState(0)
  const [enterpreneurCount, setEnterpreneurCount] = useState(0)
  const [viewerCount, setViewerCount] = useState(0)
  const [payment, setPayment] = useState([])
  const [pendingPayment, setPendingPayment] = useState([])


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  const handleInvestor = () => {
    navigate("/investors")
  }
  const handleenterpreneur = () => {
    navigate("/enterpreneur")
  }
  const handleviewer = () => {
    navigate("/viewers")
  }
  const handeltraffic = () => {
    navigate("/team")
  }
  const handleNavigate = () => {
    navigate('/approve-payment')
  }

  useEffect(() => {
    const data = async () => {
      const response = await fetchTotalCOunt()
      console.log('Dashoboard Response is ', response.count)
      setTotalCount(response.count)
    }
    data()
  }, [])
  useEffect(() => {
    const data = async () => {
      const response = await fetchInvestorCount()
      console.log('Dashoboard Response is ', response.data.count)
      setInvestorCount(response.data.count)
    }
    data()
  }, [])
  useEffect(() => {
    const data = async () => {
      const response = await fetchEnterpreneurCount()
      console.log('Dashoboard Response is ', response.data.count)
      setEnterpreneurCount(response.data.count)
    }
    data()
  }, [])
  useEffect(() => {
    const data = async () => {
      const response = await fetchViewerCount()
      console.log('Dashoboard Response is ', response.data.count)
      setViewerCount(response.data.count)
    }
    data()
  }, [])

  useEffect(() => {
    const payment = async () => {
      const response = await fetchPaymentRequest()
      const result = response.data;
      const pendingRequests = result.filter(item => item.requestStatus === "approve");

      console.log(pendingRequests, "Filtered Pending Requests");
      setPayment(pendingRequests);
    }
    payment()
  }, [])
  useEffect(() => {
    const payment = async () => {
      const response = await fetchPaymentRequest()
      const result = response.data;
      const pendingRequests = result.filter(item => item.requestStatus === "pending");

      console.log(pendingRequests, "Filtered Pending Requests");
      setPendingPayment(pendingRequests);
    }
    payment()
  }, [])

  console.log("Pending Hellooooooo", pendingPayment)

  const data = [
    { date: '2024-08-01', totalUsers: 100 },
    { date: '2024-08-09', totalUsers: 120 },
    { date: '2024-08-03', totalUsers: 150 },
    { date: '2024-08-04', totalUsers: 170 },
    { date: '2024-08-05', totalUsers: 200 },
  ];
  // const chartData = userData || data;

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />


      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleInvestor}
        >
          <StatBox
            subtitle="Total Invester"
            title={investorCount}
            icon={
              <InsertInvitationIcon
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
          onClick={handleenterpreneur}
        >
          <StatBox
            title={enterpreneurCount}
            subtitle="Total Interpenurer"
            icon={
              <BusinessCenterIcon
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
          onClick={handleviewer}
        >
          <StatBox
            title={viewerCount}
            subtitle="Total Viewer"

            icon={
              <PreviewIcon
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
          onClick={handeltraffic}
        >
          <StatBox
            title={totalCount}
            subtitle="Total Traffic"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Pending Transactions
              </Typography>
            </Box>
            {pendingPayment.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.user.name}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.user.email}</Box>
                <Box variant="h5" color={colors.greenAccent[500]}>{transaction.amount}</Box>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleNavigate}
                  sx={{ width: "13%", marginLeft: "10px" }}
                >
                  Action
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {payment.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.user.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.phoneNumber}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.createdAt}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.amount}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Total Revnue
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
