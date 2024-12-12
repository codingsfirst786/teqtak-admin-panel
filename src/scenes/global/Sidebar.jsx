import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PreviewIcon from '@mui/icons-material/Preview';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import BlockIcon from '@mui/icons-material/Block';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isTotalUsersOpen, setIsTotalUsersOpen] = useState(false);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuItem
              active={selected === "Dashboard"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Dashboard")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard</Typography>
              <Link to="/" />
            </MenuItem>

            <MenuItem
              active={selected === "Total Users"}
              style={{ color: colors.grey[100] }}
              onClick={() => {
                setSelected("Total Users");
                setIsTotalUsersOpen(!isTotalUsersOpen);
              }}
              icon={<PeopleOutlinedIcon />}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography>Total Users</Typography>
                <IconButton sx={{ p: 0 }}>
                  {isTotalUsersOpen ? <ExpandMoreIcon fontSize="small" /> : <ArrowForwardIosIcon fontSize="small" />}
                </IconButton>
              </Box>
              <Link to="/team" />
            </MenuItem>
            {isTotalUsersOpen && (
              <Box pl={4}>
                <MenuItem
                  active={selected === "Total Investor"}
                  style={{ color: colors.grey[100] }}
                  onClick={() => setSelected("Total Investor")}
                  icon={<InsertInvitationIcon />}
                >
                  <Typography>INVESTOR</Typography>
                  <Link to="/investors" />
                </MenuItem>
                <MenuItem
                  active={selected === "Total Enterpreneur"}
                  style={{ color: colors.grey[100] }}
                  onClick={() => setSelected("Total Enterpreneur")}
                  icon={<BusinessCenterIcon />}
                >
                  <Typography>ENTERPRENUER</Typography>
                  <Link to="/enterpreneur" />
                </MenuItem>
                <MenuItem
                  active={selected === "Total Viewer"}
                  style={{ color: colors.grey[100] }}
                  onClick={() => setSelected("Total Viewer")}
                  icon={<PreviewIcon />}
                >
                  <Typography>VIEWER</Typography>
                  <Link to="/viewers" />
                </MenuItem>
              </Box>
            )}

            <MenuItem
              active={selected === "Total Videos"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Total Videos")}
              icon={<ContactsOutlinedIcon />}
            >
              <Typography>Total Videos</Typography>
              <Link to="/videos" />
            </MenuItem>

            <MenuItem
              active={selected === "Podcast"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Podcast")}
              icon={<PodcastsIcon />}
            >
              <Typography>Podcast</Typography>
              <Link to="/podcast" />
            </MenuItem>

            <MenuItem
              active={selected === "Jobs"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Jobs")}
              icon={<WorkOutlineOutlinedIcon />}
            >
              <Typography>Jobs</Typography>
              <Link to="/jobs" />
            </MenuItem>

            <MenuItem
              active={selected === "Event"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Event")}
              icon={<CalendarTodayOutlinedIcon />}
            >
              <Typography>Event</Typography>
              <Link to="/events" />
            </MenuItem>

            <MenuItem
              active={selected === "Meeting"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Meeting")}
              icon={<VideoCameraFrontOutlinedIcon />}
            >
              <Typography>Meeting</Typography>
              <Link to="/meetings" />
            </MenuItem>

            <MenuItem
              active={selected === "Ticket"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Ticket")}
              icon={<LocalActivityOutlinedIcon />}
            >
              <Typography>Ticket</Typography>
              <Link to="/tickets" />
            </MenuItem>

            <MenuItem
              active={selected === "Diactivate Account"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Diactivate Account")}
              icon={<BlockIcon />}
            >
              <Typography>Diactivate Accounts</Typography>
              <Link to="/blockaccounts" />
            </MenuItem>

            <MenuItem
              active={selected === "Notification"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Notification")}
              icon={<NotificationsOutlinedIcon />}
            >
              <Typography>Notification</Typography>
              <Link to="/notification" />
            </MenuItem>

            <MenuItem
              active={selected === "Reports"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Reports")}
              icon={<ReportGmailerrorredOutlinedIcon />}
            >
              <Typography>Reports</Typography>
              <Link to="/report" />
            </MenuItem>


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Question
            </Typography>

            <MenuItem
              active={selected === "Add Question"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Add Question")}
              icon={<QuizOutlinedIcon />}
            >
              <Typography>Add Question</Typography>
              <Link to="/addQuestion" />
            </MenuItem>

            <MenuItem
              active={selected === "Get Task"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Get Task")}
              icon={<PaymentOutlinedIcon />}
            >
              <Typography>Get Task</Typography>
              <Link to="/get-task" />
            </MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Payment
            </Typography>

            <MenuItem
              active={selected === "Buy Ticket"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Buy Ticket")}
              icon={<ReceiptOutlinedIcon />}
            >
              <Typography>Buy Ticket</Typography>
              <Link to="/buy-ticket" />
            </MenuItem>

            <MenuItem
              active={selected === "Approve Payment"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Approve Payment")}
              icon={<PaymentOutlinedIcon />}
            >
              <Typography>Approve Payment</Typography>
              <Link to="/approve-payment" />
            </MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Others
            </Typography>

            <MenuItem
              active={selected === "Profile"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Profile")}
              icon={<AdminPanelSettingsOutlinedIcon />}
            >
              <Typography>Profile</Typography>
              <Link to="/admin-profile" />
            </MenuItem>

            <MenuItem
              active={selected === "SUBADMIN"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("SUBADMIN")}
              icon={<PersonAddIcon />}
            >
              <Typography>Sub Admin</Typography>
              <Link to="/subadmin" />
            </MenuItem>

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
