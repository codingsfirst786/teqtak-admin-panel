import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Typography, Avatar, IconButton } from '@mui/material';

const blockedUsers_ = [
  {
    id: 1,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 2,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 3,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 4,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 5,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 6,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 7,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
  {
    id: 8,
    name: 'Saad-Ali',
    username: 'saad ali 1234',
    imgSrc: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?b=1&s=170667a&w=0&k=20&c=SXKe66SKDzYHhQOziZgjxmoyeqHGCYwtxz9BouB1kis=',
  },
];


function BlockAccount() {
  const [blockedUsers, setblockedUsers] = useState([])
  const [render, setRender] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    blockedUser()

  }, [render])
  const blockedUser = async () =>{
    const req = await fetch(`http://localhost:5000/admin/blocked`,{
      method:'GET',
      credentials:'include'
   })
    const d = await req.json()
    setblockedUsers(d.data)
    console.log({d})
  }
const activateUser = async (id) =>{
  const data = {"isBlocked":"false"}
  console.log('avtivating ',id)
  const req = await fetch(`http://localhost:5000/users/${id}`,{
    method:'PUT',
    headers: {
      'Content-Type': 'application/json' // Set the correct content-type header
    },
    body:JSON.stringify(data)
  })
  const d = await req.json()
  setRender((prev)=>!prev)
  console.log({d})
  }
  return (
    <Box sx={{  width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        {/* <IconButton onClick={() => navigate('/settings')}>
          <ChevronLeftIcon />
        </IconButton> */}
        <Typography variant="h6">Blocked user list</Typography>
      </Box>
      <Box sx={{ height: '90%', overflowY: 'auto', width: '90%',padding:"0px 10px", m: 'auto' }}>
        {blockedUsers.map((user,i) => (
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
              onClick={()=>activateUser(user.Users_PK)}
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
