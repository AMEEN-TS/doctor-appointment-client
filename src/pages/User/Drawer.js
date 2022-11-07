import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../Redux/userSlice";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComp = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText onClick={() => navigate("/")}>Home</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText onClick={() => navigate("/apply-doctor")}>Apply Doctor</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText onClick={() => navigate("/appointments")}> Appointments</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Contact</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          {user == null ?( 
              <ListItemButton>
            
              <ListItemIcon>
                <ListItemText onClick={() => navigate("/login")}>Login</ListItemText>
              </ListItemIcon>
            </ListItemButton>
              ):(
                <ListItemButton>
            
                <ListItemIcon>
                  <ListItemText onClick={() => {
                          localStorage.clear();
                          navigate("/login");
                        }}>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              )}
          
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
