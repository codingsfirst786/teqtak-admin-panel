import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Typography, Avatar, IconButton } from '@mui/material';



function BlockAccount() {
  const [blockedUsers, setblockedUsers] = useState([])
  const [render, setRender] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    blockedUser()

  }, [render])
  const blockedUser = async () => {
    const req = await fetch(`${process.env.REACT_APP_BACK_URL}/admin/blocked`, {
      method: 'GET',
      credentials: 'include'
    })
    const d = await req.json()
    setblockedUsers(d.data)
    console.log({ d })
  }
  const activateUser = async (id) => {
    const data = { "isBlocked": "false" }
    console.log('avtivating ', id)
    const req = await fetch(`${process.env.REACT_APP_BACK_URL}/users/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const d = await req.json()
    setRender((prev) => !prev)
    console.log({ d })
  }
  console.log(blockedUsers.length)
  return (
    <Box sx={{ height: "87vh", overflowY: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        {/* <IconButton onClick={() => navigate('/settings')}>
          <ChevronLeftIcon />
        </IconButton> */}
        <Typography variant="h6">Blocked user list</Typography>
      </Box>
      <Box sx={{ width: '90%', padding: "0px 10px", m: 'auto' }}>
        {blockedUsers.length == 0 ? <Typography variant="h2" color="secondary">No User in Blocked list</Typography>
          : blockedUsers.map((user, i) => (
            <Box key={i} sx={{ pb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar src={user.picUrl} alt={user.name} sx={{ width: 50, height: 50 }} />
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  onClick={() => activateUser(user.Users_PK)}
                  variant="contained" color="secondary" sx={{ height: '7vh', width: { xs: '50%', md: '20%' } }}>
                  Unblock
                </Button>
              </Box>
              <Divider sx={{ width: '90%', mx: 'auto' }} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default BlockAccount;
