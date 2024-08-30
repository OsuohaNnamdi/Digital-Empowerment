import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import axiosInstance from '../../views/authentication/axiosInstance';

const CategoriesMenu = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/courses/category/all'); // Ensure this is the correct endpoint
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
            // Handle error appropriately here (e.g., show a message to the user)
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectCategory = (category) => {
        onCategorySelect(category);
        handleClose();
    };

    return (
        <div>
            <Button aria-controls="categories-menu" aria-haspopup="true" onClick={handleClick}>
                Select Category
            </Button>
            <Menu
                id="categories-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <MenuItem 
                            key={category.id} 
                            onClick={() => handleSelectCategory(category.name)} // Assuming category has `name`
                        >
                            {category.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        <Typography>No categories available</Typography>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default CategoriesMenu;
