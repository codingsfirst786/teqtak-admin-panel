import axios from 'axios';


export const fetchAllInvestorsCount = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/admin/info/investors`);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Error fetching daily users:', error);
    throw error;
  }
};
