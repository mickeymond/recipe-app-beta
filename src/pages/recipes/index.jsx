import { Container, Grid, TextField } from "@mui/material";
import RecipeItem from "../../components/recipe-item";
import { useEffect, useState } from "react";
import emptyIcon from "../../assets/images/undraw_page_not_found_re_e9o6.svg";
import loadingIcon from "../../assets/images/infinite-spinner.svg";
import Navbar from "../../components/navbar";
import { useSessionStorage } from "usehooks-ts";
import { USER_INFO } from "../../guards/constants";

export default function Recipes() {
    const [userInfo] = useSessionStorage(USER_INFO, null);
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    const getRecipes = async () => {
        setLoading(true);
        // prepare url
        // const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
        const url = new URL(`${process.env.REACT_APP_RECIPE_API_URL}/recipes`);
        url.searchParams.append('userId', userInfo?._id);
        // url.searchParams.append('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
        // url.searchParams.append('query', keyword);
        // fetch recipes
        const response = await fetch(url, { credentials: 'include' });
        if (response.status === 200) {
            const data = await response.json();
            // update the recipes state
            setRecipes(data);
            // console.log(data);
            setLoading(false)
        }
    }

    useEffect(() => {
        getRecipes()
        // eslint-disable-next-line
    }, [keyword]);

    return (
        <>
            <Navbar />
            <Container sx={{ my: '2rem' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Enter a keyword to search recipes and hit Enter"
                    variant="outlined"
                    onKeyDown={event => event.key === 'Enter' && setKeyword(event.target.value)} />

                <Grid sx={{ mt: '1rem' }} container spacing={3}>
                    {loading ? <img src={loadingIcon} alt="loadingIcon" width="50%" /> : recipes.length > 0 ? recipes.map((recipe) => <RecipeItem key={recipe._id} id={recipe._id} title={recipe.title} image={recipe.image} />) : <img src={emptyIcon} alt="EmptyIcon" width="50%" />}
                </Grid>
            </Container>
        </>
    );
}