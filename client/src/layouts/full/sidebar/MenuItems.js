import { IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconTypography, IconUserPlus } from '@tabler/icons-react';
import { uniqueId } from 'lodash';

// Define user menu items
const userMenuitems = [
  { navlabel: true, subheader: 'Home' },
  { id: uniqueId(), title: 'Dashboard', icon: IconLayoutDashboard, href: '/home' },
  { navlabel: true, subheader: 'Utilities' },
  { id: uniqueId(), title: 'Courses', icon: IconCopy, href: '/course' },
  { id: uniqueId(), title: 'About', icon: IconTypography, href: '/about' },
];

// Define admin menu items
const adminMenuitems = [
  { navlabel: true, subheader: 'Admin Panel' },
  { id: uniqueId(), title: 'Dashboard', icon: IconLayoutDashboard, href: '/home' },
  { id: uniqueId(), title: 'Create Course', icon: IconTypography, href: '/add' },
  { id: uniqueId(), title: 'Course Management', icon: IconCopy, href: '/category' },
];

// Define auth menu items
const authMenuitems = [
  { navlabel: true, subheader: 'Auth' },
  { id: uniqueId(), title: 'Login', icon: IconLogin, href: '/auth/login' },
  { id: uniqueId(), title: 'Register', icon: IconUserPlus, href: '/auth/register' },
];

const getMenuItems = () => {
  const isAdmin = localStorage.getItem("TYPE");
  const isRegistered = localStorage.getItem("TYPES");


  if (isRegistered !== null) {

    return adminMenuitems;
  }
   else if (isAdmin !== null){

     return userMenuitems;
  }else{

     return authMenuitems;
   }
  
};

export default getMenuItems;
