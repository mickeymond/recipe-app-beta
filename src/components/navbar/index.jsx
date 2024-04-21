import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        // Set loading to true
        setLoading(true);
        // Post to the backend
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API_URL}/users/logout`, {
            credentials: 'include',
            method: 'POST'
        });
        // Reload the page if logout was successful
        if (response.status === 200) {
            window.location.reload();
        } else {
            // Set loading to false
            setLoading(false);
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography color="inherit" to="/recipes" variant="h6" component={Link} sx={{ flexGrow: 1 }}>
                    Recipe App
                </Typography>

                <Button to="/add-recipe" component={Link} variant="contained" color="primary">Add New Recipe</Button>
                <LoadingButton onClick={logout} loading={loading} sx={{ ml: '1rem' }} variant="contained" color="error">Logout</LoadingButton>
            </Toolbar>
        </AppBar>
    );
}