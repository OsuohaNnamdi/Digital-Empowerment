import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from "./theme/DefaultColors";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      {routing}

    </ThemeProvider>
  );
}

export default App;
//npm install @emotion/styled @mui/icons-material @mui/lab @mui/material @mui/x-date-pickers @reduxjs/toolkit @tabler/icons @testing-library/jest-dom @testing-library/react @testing-library/user-event apexcharts chance lodash prop-types react react-apexcharts react-dom react-helmet react-router react-router-dom react-scripts react-spring stylis-plugin-rtl web-vitals yup
