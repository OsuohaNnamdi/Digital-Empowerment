// MenuItems.js
import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

// Define user menu items
const userMenuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Module',
    icon: IconTypography,
    href: '/module',
  },
  {
    id: uniqueId(),
    title: 'Courses',
    icon: IconCopy,
    href: '/course',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

// Define admin menu items
const adminMenuitems = [
  {
    navlabel: true,
    subheader: 'Admin Panel',
  },
  {
    id: uniqueId(),
    title: 'Module Management',
    icon: IconTypography,
    href: '/modules',
  },
  {
    id: uniqueId(),
    title: 'Course Management',
    icon: IconCopy,
    href: '/courses',
  },
  {
    id: uniqueId(),
    title: 'Quiz Management',
    icon: IconLayoutDashboard,
    href: '/quizzes',
  },
];

// Define auth menu items
const authMenuitems = [
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
];


const getMenuItems = () => {
  const isAdmin = localStorage.getItem("TYPE") === "admin";
  const isRegistered = localStorage.getItem("TYPES") === "registered";
  
  if (!isRegistered) {
    return authMenuitems;
  }
  return isAdmin ? adminMenuitems : userMenuitems;
};

export default getMenuItems;
