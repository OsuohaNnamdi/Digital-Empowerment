import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    CircularProgress
} from '@mui/material';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import axios from 'axios';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
    
        try {
          const response = await axios.post('http://localhost:8080/api/v1/login', {
            email,
            password
          });
          console.log(response.data)
  
          const { profileDTO, token } = response.data;
          const { accountType} = profileDTO;
    
          switch (accountType) {
            case 'USER':
              localStorage.setItem('TYPE', accountType);
              break;
            case "ADMIN":
              localStorage.setItem('TYPES', accountType);
              break;
            default:
              console.error('Unknown user type:', accountType);
          }
    
          localStorage.setItem('profile', JSON.stringify(profileDTO));
          localStorage.setItem('jwtToken', token);
    
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting to home page...',
          }).then(() => {
            navigate("/");
            window.location.reload();
          });
        } catch (error) {
          console.error('Login error', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password.',
          });
        } finally {
          setLoading(false); 
        }
      };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Stack>
                <Box>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px">Password</Typography>
                    <CustomTextField
                        id="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remember this Device"
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleLogin}
                >
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
                    Sign In
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthLogin;
