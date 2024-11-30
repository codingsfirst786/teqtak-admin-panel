import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../components/StatBox";
import StarIcon from '@mui/icons-material/Star';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleGetSubAdmin } from "../../Api/AllUser/SubAdmin";
import { ca } from "date-fns/locale";
import AddSubAdminModal from "./AddSubAdminModal";


const SubAdmin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [count, setCount] = useState(0);

    const [subAdmin, setSubAdmin] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    //   Get All Sub Amdin 
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await handleGetSubAdmin()
                // const result = await response.data;
                console.log(response, "Response for subAdmin");
                setSubAdmin(response)
                setCount(response.length)

            }
            catch (error) {
                console.error('Fetching data error', error);
            }
        }
        getData();
    }, [refresh, openModal])

    // Remove Sub Admin 
    const handleRemoveSubadmin = (id) => {
        try {
            const response = axios.delete(`${process.env.REACT_APP_BACK_URL}/admin/subadmin/${id}`)
            console.log("response for remove Sub Amdin", response)
            setRefresh(!refresh);
        }
        catch (err) {
            console.log("Error Accourd While remove SubAdmin", err)
        }
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const columns = [
        {
            field: "email",
            headerName: "Email",
            valueGetter: (params) => params.row.email,
            cellClassName: (params) => (params.row.active ? "" : "inactive"),
            minWidth: 200,
            flex: 1,
            headerAlign: "left",
            align: "left",
            cellStyle: { padding: "8px", display: "flex", alignItems: "center" },
        },
        {
            field: "id",
            headerName: "PASSWORD",
            valueGetter: (params) => params.row.password,
            minWidth: 270,
            headerAlign: "left",
            align: "left",
            cellStyle: { padding: "8px", display: "flex", alignItems: "center" },
        },
        {
            field: "role",
            headerName: "Role",
            valueGetter: (params) => params.row.role,
            cellClassName: (params) => (params.row.active ? "" : "inactive"),
            minWidth: 120,
            flex: 1,
            headerAlign: "left",
            align: "left",
            cellStyle: { padding: "8px", display: "flex", alignItems: "center" },
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => (
                <Box display="flex" gap="10px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRemoveSubadmin(params.row._id)}
                        style={{ padding: "6px 12px" }}
                    >
                        Remove
                    </Button>
                </Box>
            ),
            minWidth: 230,
            align: "center",
            headerAlign: "center",
            cellStyle: { padding: "8px", display: "flex", justifyContent: "center" },
        },
    ];


    return (
        <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
            <Box component="div" >
                <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
                    <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
                        <Header title="TOTAL SUBADMIN" subtitle="Managing the All SubAdmin" />
                    </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                    <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                        <StatBox
                            title={`${count}`}
                            subtitle="Total SubAdmin"
                            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                        />
                    </Box>
                    <Button variant="contained" sx={{ height: "40px", width: "150px", fontSize: "16px", backgroundColor: colors.primary[400], color: colors.greenAccent[600]}} onClick={handleOpenModal}>
                        Add SubAdmin
                    </Button>
                    <AddSubAdminModal open={openModal} handleClose={handleCloseModal} />
                </Box>

                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": { border: "none" },
                        "& .MuiDataGrid-cell": { borderBottom: "none" },
                        "& .name-column--cell": { color: colors.greenAccent[300] },
                        "& .name-column--cell.inactive": { filter: 'blur(2px)', color: 'red', textDecoration: 'line-through' },
                        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                        "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                    }}
                >
                    <DataGrid
                        rows={subAdmin}
                        columns={columns}
                        getRowId={(row) => row._id}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SubAdmin;
