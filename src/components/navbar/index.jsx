import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { USER_INFO } from "../../guards/constants";

export default function Navbar() {
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useSessionStorage(USER_INFO, null);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        // Set loading to true
        setLoading(true);
        // Post to the backend
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API_URL}/users/logout`, {
            credentials: 'include',
            method: 'POST'
        });
        // Reset user info if logout was successful
        if (response.status === 200) {
            setUserInfo(null);
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
                <Button color="inherit">{userInfo?.fullName}</Button>
                <Button to="/add-recipe" component={Link} variant="contained" color="primary">Add New Recipe</Button>
                <LoadingButton onClick={logout} loading={loading} sx={{ ml: '1rem' }} variant="contained" color="error">Logout</LoadingButton>
            </Toolbar>
        </AppBar>
    );
}