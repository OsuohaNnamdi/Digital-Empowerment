import React, { useState } from 'react';
import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/register', { name, email, password });
        Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now log in with your credentials.',
      }).then(() => {
        // Optionally, redirect the user to the login page or reset the form
        setName("");
        setEmail("");        
        setPassword("");
      });
            navigate('/auth/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error', error);
            // Handle registration error (e.g., show a notification)
        } finally {
      setLoading(false); // Hide spinner
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

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                    <CustomTextField
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField
                        id="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleRegister}
                >
               {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;