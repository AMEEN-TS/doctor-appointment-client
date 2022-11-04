import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import DrawerComp from "./Drawer";

function Navbar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [auth, setAuth] = React.useState(true);

  const getData = async () => {
    // toast.loading();
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("/api/user/getuserinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // toast.dismiss();
      if (response.data.success) {
        setUserInfo(response.data.data);
      } else {
        // localStorage.removeItem("user");
        // navigate("/login");
        // toast.error("Something went wrong");
      }
    } catch (error) {
      // localStorage.removeItem("user");
      // navigate("/login");
      // toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (userInfo == null) {
      getData();
    }
  }, [userInfo]);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Doctor
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ paddingLeft: "10%" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Home" />
                <Tab label="Apply Doctor"  onClick={() => navigate("/login")} />
                <Tab label="Make an Appointment" />
                <Tab label="Contact" />
                {/* <Button  style={{
        borderRadius: 35,
        backgroundColor: "#ffff",
        color:"#063970",
        padding: "15px 30px",
        fontSize: "15px",
        height: "45px"
    }}variant="contained" size="small"> Make an Appointment</Button> */}
              </Tabs>
              {auth && (
                <div style={{ marginLeft: "auto" }}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {userInfo == null ? (
                      <MenuItem sx={{ color: "#063970" }} onClick={handleClose}>
                        Profile
                      </MenuItem>
                    ) : (
                      <MenuItem sx={{ color: "#063970" }} onClick={handleClose}>
                        {userInfo.name}
                      </MenuItem>
                    )}

                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    {userInfo == null ? (
                      <MenuItem onClick={() => navigate("/login")}>
                        Login
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={() => {
                          localStorage.clear();
                          navigate("/login");
                        }}
                      >
                        Logout
                      </MenuItem>
                    )}
                  </Menu>
                </div>
              )}
              {/* <Button onClick={()=>navigate('/login')} sx={{ marginLeft: "auto" }} variant="contained">
              Login
            </Button>
            <Button sx={{ marginLeft: "10px" }} variant="contained">
              SignUp
            </Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;
