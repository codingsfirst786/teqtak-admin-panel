import { Box, Typography, Avatar, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const dummyData = [
  {
    eventName: "Tech Conference",
    creator: "John Doe",
    time: "10:00 AM, Dec 12, 2024",
    users: [
      { name: "Alice", ticket: "Standard", payment: "$100", email: "alice@example.com" },
      { name: "Bob", ticket: "VIP", payment: "$200", email: "bob@example.com" },
      { name: "Charlie", ticket: "Standard", payment: "$100", email: "charlie@example.com" },
    ],
  },
  {
    eventName: "Art Workshop",
    creator: "Jane Smith",
    time: "2:00 PM, Dec 15, 2024",
    users: [
      { name: "Diana", ticket: "VIP", payment: "$150", email: "diana@example.com" },
      { name: "Edward", ticket: "Standard", payment: "$80", email: "edward@example.com" },
      { name: "Fiona", ticket: "Standard", payment: "$80", email: "fiona@example.com" },
    ],
  },
  {
    eventName: "Music Festival",
    creator: "Alex Johnson",
    time: "6:00 PM, Dec 20, 2024",
    users: [
      { name: "George", ticket: "Premium", payment: "$300", email: "george@example.com" },
      { name: "Hannah", ticket: "Standard", payment: "$120", email: "hannah@example.com" },
      { name: "Ian", ticket: "VIP", payment: "$250", email: "ian@example.com" },
    ],
  },
];

const UserPayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [saleTicket, setSaleTicket] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/tickets/event`);
        const transformedData = response.data.map((item) => ({
          eventName: item.data.event.eventTitle,
          creator: item.data.poster.name,
          time: new Date(item.data.event.createdAt).toLocaleString(),
          users: item.data.tickcets.map((ticket) => ({
            name: ticket.buyer.name,
            pic: ticket.buyer.picUrl,
            ticket: `Ticket ID: ${ticket.ticketBuyerId}`,
            payment: `Payment: $${ticket.totalAmount}`,
            email: ticket.buyer.email,
          })),
        }));
        console.log(transformedData, 'gvcgsd cgd sckhdsvhas cgh dscgas cjadsv cgsad')
        setSaleTicket(transformedData);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    getData();
  }, []);


  return (
    <Box sx={{ padding: "20px", height:"87vh", overflow:'auto' }}>
      <Header title="User Payment" subtitle="Manage All User Payment" />
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
        {saleTicket.map((event, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
              height:"348px",
              overflow:"auto"
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "10px", color: colors.grey[100] }}>
              {event.eventName}
            </Typography>
            <Typography sx={{ marginBottom: "5px", color: colors.grey[300] }}>
              Created by: {event.creator}
            </Typography>
            <Typography sx={{ marginBottom: "15px", color: colors.grey[300] }}>
              Time: {event.time}
            </Typography>
            <Box>
              {event.users.map((user, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "10px",
                  }}
                >
                  <Box display="flex" alignItems="center" gap="10px">
                    <Avatar><img src={user.pic} alt="" width={'43px'} height={'43px'}/></Avatar>
                    <Box>
                      <Typography sx={{ color: colors.grey[100] }}>{user.name}</Typography>
                      <Typography sx={{ color: colors.greenAccent[500] }}>{user.payment}</Typography>
                    </Box>
                  </Box>
                  {/* <Box>
                    <Typography sx={{ color: colors.grey[300] }}>{user.email}</Typography>
                  </Box> */}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserPayment;
