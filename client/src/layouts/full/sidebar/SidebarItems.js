import React from 'react';
import getMenuItems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const menuItems = getMenuItems(); // Call the function to get menu items

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => (
          item.navlabel ? (
            <NavGroup item={item} key={item.subheader} />
          ) : (
            <NavItem item={item} key={item.id} pathDirect={pathDirect} />
          )
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
