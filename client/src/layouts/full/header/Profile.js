import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Typography,
  ListItemIcon,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const fullName = userProfile.name || '';
  const email = userProfile.email || '';

  const initials = fullName.split(' ').map(name => name.charAt(0).toUpperCase()).join('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: 'background.paper' }}>
      <Toolbar>
        <Box flexGrow={1} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto'
          }}
        >
          <Button
            aria-label="menu"
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                backgroundColor: 'primary.main',
                color: 'white'
              }}
            >
              {initials}
            </Avatar>
          </Button>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            sx={{
              '& .MuiMenu-paper': {
                width: '250px',
                right: 0,
                top: '70px !important',
              },
            }}
          >
            <MenuItem>
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  backgroundColor: 'primary.main',
                  color: 'white'
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="body2">{email}</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Profile;
