import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/User/Login";
import Register from "./pages/User/REgister";
// import Navbar from "./pages/User/Navbar";
import Home from "./components/Home";
import Verifyemail from "./pages/User/VerifyEmail";
import ResetPassword from "./pages/User/Resetpassword";
import ApplyDoctor from "./pages/User/ApplyDoctor";
import Notification from "./pages/User/Notifications";
import DoctorsList from "./pages/admin/DoctorList";
import UserList from "./pages/admin/UserList";
import DoctorProfile from "./pages/doctor/Profile";
import BookAppointment from "./pages/User/BookAppointment";
import Doctor from "./pages/doctor/DoctorHome";
import Admin from "./pages/admin/AdminHome";
import CheckOut from "./pages/User/checkOut";
import Appointments from "./pages/User/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import Allappointments from "./pages/admin/Allappointments";
import UserProfile from "./components/UserProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />

        <Route
          path="/verifyemail/:token"
          element={
            <PublicRoutes>
              <Verifyemail />
            </PublicRoutes>
          }
        />

        <Route
          path="/resetpassword/:token"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />

        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <Notification />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/doctorslist"
          element={
            <ProtectedRoutes>
              <DoctorsList />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoutes>
              <UserList />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoutes>
              <DoctorProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoutes>
              <BookAppointment />
            </ProtectedRoutes>
          }
        />

        <Route path="/doctor-info/:doctorId" element={<Doctor />} />

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/checkout/:appointmentId"
          element={
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          }
        />

        <Route path="/appointments" element={<Appointments />} />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoutes>
              <DoctorAppointments />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoutes>
              <Allappointments />
            </ProtectedRoutes>
          }
        />
           <Route
          path="/account"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export function ProtectedRoutes({ children }) {
  const user = localStorage.getItem("user");
  if (user !== "" && user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function PublicRoutes({ children }) {
  const user = localStorage.getItem("user");
  if (user !== "" && user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default App;
