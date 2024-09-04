import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Meeting() {
  const [count, setCount] = useState(0)
  const [meetings, setMeetings] = useState([])

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/podcasts`)
        const result = await response.data;
        console.log("Fetched data:", result);
        console.log("count is");
        console.log(result.count)
        const updatedData = result.data.map(user => ({
          ...user,
          active: true
        }));

        setCount(result.count)
        console.log(updatedData)
        setMeetings(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])
  return (
    <div>
      <h1>Meeting</h1>
    </div>
  )
}

export default Meeting
