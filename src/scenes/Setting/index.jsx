import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";

const Setting = () => {

  const [data, setData] = useState([])


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=fba9a6a4f4fa4afb9568acd6c9cfe6d8')
      console.log("resonse test is", response.data.articles)
      setData(response.data.articles)
    }

    getData()
  }, [])

  console.log('My array Data is ', data)
  return (
    <Box m="20px" sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Header title="Setting" />

      {data.map((item, i) => (
        <div key={i}>
          <h1>{item.author}</h1>
        </div>
      ))}

    </Box>
  );
};

export default Setting;
