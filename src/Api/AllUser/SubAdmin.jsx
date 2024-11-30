import axios from "axios";

export const handleSubAdmin = async (userId) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACK_URL}/admin/subadmin`,
            { userId }
        );
        console.log("Sub-admin created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating sub-admin:", error.response?.data || error.message);
        throw error;
    }
};

export const handleGetSubAdmin = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/admin/subadmin`);
        console.log("Sub-admin created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating sub-admin:", error.response?.data || error.message);
        throw error;
    }
};
