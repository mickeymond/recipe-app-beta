import { Box, Container, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = async (event) => {
        // Set loading to true
        setLoading(true);
        // Prevent default form submit behavior
        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);
        // Post form data to the backend
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API_URL}/users/login`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Navigate to /recipes if login was successful
        if (response.status === 200) {
            navigate('/recipes');
        } else {
            // Set loading to false
            setLoading(false);
        }
    }

    return (
        <Container sx={{ my: '2rem' }} maxWidth="sm">
            <h1>User Login</h1>
            <form onSubmit={login}>
                <TextField
                    sx={{ mb: '2rem' }}
                    fullWidth
                    name="email"
                    label="Enter Email" />
                <TextField
                    sx={{ mb: '2rem' }}
                    fullWidth
                    type="password"
                    name="password"
                    label="Enter Password" />
                <Box textAlign="center">
                    <LoadingButton
                        sx={{ width: '50%' }}
                        loading={loading}
                        type="submit"
                        size="large"
                        variant="contained">
                        Login
                    </LoadingButton>
                </Box>
            </form>
        </Container>
    );
}