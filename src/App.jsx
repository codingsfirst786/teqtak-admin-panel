import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import BlockAccount from "./components/BlockAccount";
import Ticket from '../src/scenes/ticket/Ticket'
import Meeting from './components/Meeting'
import Podcast from "./scenes/podcast";
import Videos from './scenes/Videos/index'
// import Bar from "./scenes/AdminProfile";
import AdminProfile from "./scenes/Admin/AdminProfile";
import GetJobs from "./scenes/GetJobs";
import Line from "./scenes/line";
import Pie from "./scenes/Setting";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "./theme";
import Events from "./scenes/Events/Events";
import InvestorTable from "./components/InvestorTable";
import UserProfile from "./components/userProfile";
import Notifications from "./scenes/notification/Notifications";
import NotificationUser from "./components/NotificationUser";

// Users
import Team from "./scenes/team";
import DailyUser from './scenes/team/DailyUser'
import WeeklyUser from './scenes/team/WeeklyUser'
import MonthlyUser from './scenes/team/MonthlyUser'
// Investor 
import Investor from './scenes/Investor/Investor'
import DialyInvestor from "./scenes/Investor/DialyInvestor";
import WeeklyInvestor from "./scenes/Investor/WeeklyInvestor";
import MonthlyInvestor from "./scenes/Investor/MonthlyInvestor";
import TotalInvestor from './scenes/Investor/TotalInvestor'
// Investor Podcast 
import DailyInvestorPodcast from './scenes/AllPodcast/InvestorPodcast/DailyInvestorPodcast'
import MonthlyInvestorPodcast from './scenes/AllPodcast/InvestorPodcast/MonthlyInvestorPodcast'
import WeeklyInvestorPodcast from './scenes/AllPodcast/InvestorPodcast/WeeklyInvestorPodcast'
import TotalInvestorPodcast from './scenes/AllPodcast/InvestorPodcast/TotalInvestorPodcast'
// Investor Video 
import DailyInvestorVideo from './scenes/AllVideos/InvestorVideo/DailyInvestorVideo'
import MonthlyInvestorVideo from "./scenes/AllVideos/InvestorVideo/MonthlyInvestorVideo";
import TotalInvestorVideo from './scenes/AllVideos/InvestorVideo/TotalInvestorVideo'
import WeeklyInvestorVideo from './scenes/AllVideos/InvestorVideo/WeeklyInvestorVideo'
// Investor Jobs 
import DailyInvestorJobs from './scenes/AllJobs/InvestorJobs/DailyInvestorJobs'
import MonthlyInvestorJobs from './scenes/AllJobs/InvestorJobs/MonthlyInvestorJobs'
import TotalInvestorJobs from './scenes/AllJobs/InvestorJobs/TotalInvestorJobs'
import WeeklyInvestorJobs from './scenes/AllJobs/InvestorJobs/WeeklyInvestorJobs'
// Investor Events 
import DailyInvestorEvents from './scenes/AllEvents/InvestorEvents/DailyInvestorEvents'
import MonthlyInvestorEvents from './scenes/AllEvents/InvestorEvents/MonthlyInvestorEvents'
import TotalInvestorEvents from './scenes/AllEvents/InvestorEvents/TotalInvestorEvents'
import WeeklyInvestorEvents from './scenes/AllEvents/InvestorEvents/WeeklyInvestorEvents'


// Enterpreneur 
import Enterpreneur from './scenes/Enterpreneur/Enterpreneur'
import DailyEnterpreneur from './scenes/Enterpreneur/DialyEnterpreneur'
import WeeklyEnterpreneur from './scenes/Enterpreneur/WeeklyEnterpreneur'
import MonthlyEnterpreneur from './scenes/Enterpreneur/MonthlyEnterpreneur'
import TotalEnterpreneur from './scenes/Enterpreneur/TotalEnterpreneur'
// Enterpreneur Podcast 
import DailyEnterpreneurPodcast from "./scenes/AllPodcast/EnterpreneurPodcast/DailyEnterpreneurPodcast";
import WeeklyEnterpreneurPodcast from "./scenes/AllPodcast/EnterpreneurPodcast/WeeklyEnterpreneurPodcast";
import MonthlyEnterpreneurPodcast from "./scenes/AllPodcast/EnterpreneurPodcast/MonthlyEnterpreneurPodcast";
import TotalEnterpreneurPodcast from "./scenes/AllPodcast/EnterpreneurPodcast/TotalEnterpreneurPodcast";
// Enterpreneur Video 
import DailyEnterpreneurVideo from './scenes/AllVideos/EnterpreneurVideo/DailyEnterpreneurVideo'
import MonthlyEnterpreneurVideo from './scenes/AllVideos/EnterpreneurVideo/MonthlyEnterpreneurVideo'
import TotalEnterpreneurVideo from './scenes/AllVideos/EnterpreneurVideo/TotalEnterpreneurVideo'
import WeeklyEnterpreneurVideo from './scenes/AllVideos/EnterpreneurVideo/WeeklyEnterpreneurVideo'
// Enterpreneur Jobs 
import DailyEnterpreneurJobs from './scenes/AllJobs/EnterpreneurJobs/DailyEnterpreneurJobs'
import MonthlyEnterpreneurJobs from './scenes/AllJobs/EnterpreneurJobs/MonthlyEnterpreneurJobs'
import TotalEnterpreneurJobs from './scenes/AllJobs/EnterpreneurJobs/TotalEnterpreneurJobs'
import WeeklyEnterpreneurJobs from './scenes/AllJobs/EnterpreneurJobs/WeeklyEnterpreneurJobs'
// Enterpreneur Events 
import DailyEnterpreneurEvents from './scenes/AllEvents/EnterpreneurEvents/DailyEnterpreneurEvents'
import MonthlyEnterpreneurEvents from './scenes/AllEvents/EnterpreneurEvents/MonthlyEnterpreneurEvents'
import TotalEnterpreneurEvents from './scenes/AllEvents/EnterpreneurEvents/TotalEnterpreneurEvents'
import WeeklyEnterpreneurEvents from './scenes/AllEvents/EnterpreneurEvents/WeeklyEnterpreneurEvents'


// Viewer
import Viewer from './scenes/Viewer/Viewer'
import DialyViewer from './scenes/Viewer/DialyViewer'
import WeeklyViewer from './scenes/Viewer/WeeklyViewer'
import MonthlyViewer from './scenes/Viewer/MonthlyViewer'
import TotalViewer from './scenes/Viewer/TotalViewer'
// Viewer Podcast 
import DailyViewerPodcast from "./scenes/AllPodcast/ViewerPodcast/DailyViewerPodcast";
import MonthlyViewerPodcast from "./scenes/AllPodcast/ViewerPodcast/MonthlyViewerPodcast";
import TotalViewerPodcast from "./scenes/AllPodcast/ViewerPodcast/TotalViewerPodcast";
import WeeklyViewerPodcast from "./scenes/AllPodcast/ViewerPodcast/WeeklyViewerPodcast";
// Viewer Video 
import DailyInViewerVideo from "./scenes/AllVideos/ViewerVideo/DailyInViewerVideo";
import MonthlyViewerVideo from "./scenes/AllVideos/ViewerVideo/MonthlyViewerVideo";
import TotalViewerVideo from "./scenes/AllVideos/ViewerVideo/TotalViewerVideo";
import WeeklyViewerVideo from "./scenes/AllVideos/ViewerVideo/WeeklyViewerVideo";
// Viewer Jobs 
import DailyViewerJobs from "./scenes/AllJobs/ViewerJobs/DailyViewerJobs";
import MonthlyViewerJobs from "./scenes/AllJobs/ViewerJobs/MonthlyViewerJobs";
import TotalViewerJobs from "./scenes/AllJobs/ViewerJobs/TotalViewerJobs";
import WeeklyViewerJobs from "./scenes/AllJobs/ViewerJobs/WeeklyViewerJobs";
// Viewer Events 
import DailyViewerEvents from "./scenes/AllEvents/ViewerEvents/DailyViewerEvents";
import MonthlyViewerEvents from "./scenes/AllEvents/ViewerEvents/MonthlyViewerEvents";
import TotalViewerEvents from "./scenes/AllEvents/ViewerEvents/TotalViewerEvents";
import WeeklyViewerEvents from "./scenes/AllEvents/ViewerEvents/WeeklyViewerEvents";
import AddQuestion from "./scenes/question/AddQuestion";
import DailyJobs from "./scenes/GetJobs/DailyJobs";
import WeeklyJobs from "./scenes/GetJobs/WeeklyJobs";
import MonthlyJobs from "./scenes/GetJobs/MonthlyJobs";
import DailyEvents from "./scenes/Events/DailyEvents";
import WeeklyEvents from "./scenes/Events/WeeklyEvents";
import MonthlyEvents from "./scenes/Events/MonthyEvents";
import Login from "./scenes/Singup/Login";
import DailyVideos from "./scenes/Videos/DailyVideos";
import WeeklyVideos from "./scenes/Videos/WeeklyVideos";
import MonthlyVideos from "./scenes/Videos/MonthlyVideos";
import DailyPodcast from "./scenes/podcast/DailyPodcast";
import WeeklyPodcast from "./scenes/podcast/WeeklyPodcast";
import MonthlyPodcast from "./scenes/podcast/MonthlyPodcast";
import Reports from "./scenes/reports/Reports";
import Setting from "./scenes/Setting";
import SubAdmin from "./scenes/Admin/SubAdmin";
import UserPayment from "./scenes/Payment/UserPayment";
import ApprovePayment from "./scenes/Payment/ApprovePayment";
import AllTask from "./scenes/question/AllTask";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation()


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {location.pathname !== '/login' && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {location.pathname !== '/login' && <Topbar isSidebar={isSidebar} />}
            <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/userProfile" element={<UserProfile />} />

              {/* Other Routes */}
              <Route path="/setting" element={<Setting />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blockaccounts" element={<BlockAccount />} />
              <Route path="/meetings" element={<Meeting />} />
              <Route path="/tickets" element={<Ticket />} />
              <Route path="/traffic" element={<InvestorTable />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/user" element={<InvestorTable />} />
              <Route path="/notification" element={<Notifications />} />
              <Route path="/notification" element={<Notifications />} />
              <Route path="/report" element={<Reports />} />
              {/* Admin Route */}
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/subadmin" element={<SubAdmin />} />

              {/* Podcats  */}
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/dailyPodcast" element={<DailyPodcast />} />
              <Route path="/weeklyPodcats" element={<WeeklyPodcast />} />
              <Route path="/monthlyPodcast" element={<MonthlyPodcast />} />
              {/* Videos  */}
              <Route path="/videos" element={<Videos />} />
              <Route path="/dailyVideos" element={<DailyVideos />} />
              <Route path="/weeklyVideos" element={<WeeklyVideos />} />
              <Route path="/monthlyVideos" element={<MonthlyVideos />} />
              {/* Events  */}
              <Route path="/events" element={<Events />} />
              <Route path="/dailyEvents" element={<DailyEvents />} />
              <Route path="/weeklyEvents" element={<WeeklyEvents />} />
              <Route path="/monthlyEvents" element={<MonthlyEvents />} />
              {/* Jobs  */}
              <Route path="/jobs" element={<GetJobs />} />
              <Route path="/dailyJobs" element={<DailyJobs />} />
              <Route path="/weeklyJobs" element={<WeeklyJobs />} />
              <Route path="/monthlyJobs" element={<MonthlyJobs />} />

              {/* User Routing */}
              <Route path="/team" element={<Team />} />
              <Route path="/dailyuser" element={<DailyUser />} />
              <Route path="/weeklyuser" element={<WeeklyUser />} />
              <Route path="/monthlyuser" element={<MonthlyUser />} />

              {/* Investor Routing */}
              <Route path="/investors" element={<Investor />} />
              <Route path="/dailyinvestor" element={<DialyInvestor />} />
              <Route path="/weeklyinvestor" element={<WeeklyInvestor />} />
              <Route path="/monthlyinvestor" element={<MonthlyInvestor />} />
              <Route path="/totalyinvestor" element={<TotalInvestor />} />
              {/* Investor Podcast */}
              <Route path="/dailyinvestorpodcast" element={<DailyInvestorPodcast />} />
              <Route path="/monthlyinvestorpodcast" element={<MonthlyInvestorPodcast />} />
              <Route path="/totalinvestorpodcast" element={<TotalInvestorPodcast />} />
              <Route path="/weeklyinvestorpodcast" element={<WeeklyInvestorPodcast />} />
              {/* Investor Video */}
              <Route path="/dailyinvestorvideo" element={<DailyInvestorVideo />} />
              <Route path="/monthlyinvestorvideo" element={<MonthlyInvestorVideo />} />
              <Route path="/totalinvestorvideo" element={<TotalInvestorVideo />} />
              <Route path="/weeklyinvestorvideo" element={<WeeklyInvestorVideo />} />
              {/* Investor Jobs */}
              <Route path="/dailyinvestorjobs" element={<DailyInvestorJobs />} />
              <Route path="/monthlyinvestorjobs" element={<MonthlyInvestorJobs />} />
              <Route path="/totalinvestorjobs" element={<TotalInvestorJobs />} />
              <Route path="/weeklyinvestorjobs" element={<WeeklyInvestorJobs />} />
              {/* Investor Events */}
              <Route path="/dailyinvestorevents" element={<DailyInvestorEvents />} />
              <Route path="/monthlyinvestorevents" element={<MonthlyInvestorEvents />} />
              <Route path="/totalinvestorevents" element={<TotalInvestorEvents />} />
              <Route path="/weeklyinvestorevents" element={<WeeklyInvestorEvents />} />

              {/* Enterpreneur Routing */}
              <Route path="/enterpreneur" element={<Enterpreneur />} />
              <Route path="/dailyEnterpreneur" element={<DailyEnterpreneur />} />
              <Route path="/weeklyEnterpreneur" element={<WeeklyEnterpreneur />} />
              <Route path="/monthlyEnterpreneur" element={<MonthlyEnterpreneur />} />
              <Route path="/totalyEnterpreneur" element={<TotalEnterpreneur />} />
              {/* Enterpreneur Podcast */}
              <Route path="/dailyenterpreneurpodcast" element={<DailyEnterpreneurPodcast />} />
              <Route path="/monthlyenterpreneurpodcast" element={<MonthlyEnterpreneurPodcast />} />
              <Route path="/totalenterpreneurpodcast" element={<TotalEnterpreneurPodcast />} />
              <Route path="/weeklyenterpreneurpodcast" element={<WeeklyEnterpreneurPodcast />} />
              {/* Enterpreneur Video */}
              <Route path="/dailyenterpreneurvideo" element={<DailyEnterpreneurVideo />} />
              <Route path="/monthlyenterpreneurvideo" element={<MonthlyEnterpreneurVideo />} />
              <Route path="/totalenterpreneurvideo" element={<TotalEnterpreneurVideo />} />
              <Route path="/weeklyenterpreneurvideo" element={<WeeklyEnterpreneurVideo />} />
              {/* Enterpreneur Jobs */}
              <Route path="/dailyenterpreneurjobs" element={<DailyEnterpreneurJobs />} />
              <Route path="/monthlyenterpreneurjobs" element={<MonthlyEnterpreneurJobs />} />
              <Route path="/totalenterpreneurjobs" element={<TotalEnterpreneurJobs />} />
              <Route path="/weeklyenterpreneurjobs" element={<WeeklyEnterpreneurJobs />} />
              {/* Enterpreneur Events */}
              <Route path="/dailyenterpreneurevents" element={<DailyEnterpreneurEvents />} />
              <Route path="/monthlyenterpreneurevents" element={<MonthlyEnterpreneurEvents />} />
              <Route path="/totalenterpreneurevents" element={<TotalEnterpreneurEvents />} />
              <Route path="/weeklyenterpreneurevents" element={<WeeklyEnterpreneurEvents />} />

              {/* Viewer Routing */}
              <Route path="/viewers" element={<Viewer />} />
              <Route path="/dailyViewer" element={<DialyViewer />} />
              <Route path="/weeklyViewer" element={<WeeklyViewer />} />
              <Route path="/monthlyViewer" element={<MonthlyViewer />} />
              <Route path="/totalyViewer" element={<TotalViewer />} />
              {/* Viewer Podcast */}
              <Route path="/dailyviewerpodcast" element={<DailyViewerPodcast />} />
              <Route path="/monthlyviewerpodcast" element={<MonthlyViewerPodcast />} />
              <Route path="/totalviewerpodcast" element={<TotalViewerPodcast />} />
              <Route path="/weeklyviewerpodcast" element={<WeeklyViewerPodcast />} />
              {/* Viewer Video */}
              <Route path="/dailyviewervideo" element={<DailyInViewerVideo />} />
              <Route path="/monthlyviewervideo" element={<MonthlyViewerVideo />} />
              <Route path="/totalviewervideo" element={<TotalViewerVideo />} />
              <Route path="/weeklyviewervideo" element={<WeeklyViewerVideo />} />
              {/* Viewer Jobs */}
              <Route path="/dailyviewerjobs" element={<DailyViewerJobs />} />
              <Route path="/monthlyviewerjobs" element={<MonthlyViewerJobs />} />
              <Route path="/totalviewerjobs" element={<TotalViewerJobs />} />
              <Route path="/weeklyviewerjobs" element={<WeeklyViewerJobs />} />
              {/* Viewer Events */}
              <Route path="/dailyviewerevents" element={<DailyViewerEvents />} />
              <Route path="/monthlyviewerevents" element={<MonthlyViewerEvents />} />
              <Route path="/totalviewerevents" element={<TotalViewerEvents />} />
              <Route path="/weeklyviewerevents" element={<WeeklyViewerEvents />} />
              {/* Question */}
              <Route path="/addQuestion" element={<AddQuestion />} />
              <Route path="/get-task" element={<AllTask />} />

              {/* Payment  */}
              <Route path="/buy-ticket" element={<UserPayment />} />
              <Route path="/approve-payment" element={<ApprovePayment />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
