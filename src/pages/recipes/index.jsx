import { Container, Grid, TextField } from "@mui/material";
import RecipeItem from "../../components/recipe-item";
import { useEffect, useState } from "react";
import emptyIcon from "../../assets/images/undraw_page_not_found_re_e9o6.svg";
import loadingIcon from "../../assets/images/infinite-spinner.svg";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const getRecipes = () => {
        setLoading(true);
        // prepare url
        const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
        url.searchParams.append('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
        url.searchParams.append('query', keyword);
        // fetch recipes
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // update the recipes state
                setRecipes(data.results);
                // console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
    }

    useEffect(getRecipes, [keyword]);

    return (
        <Container sx={{ my: '2rem' }}>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Enter a keyword to search recipes and hit Enter"
                variant="outlined"
                onKeyDown={event => event.key === 'Enter' && setKeyword(event.target.value)} />

            <Grid sx={{ mt: '1rem' }} container spacing={3}>
                {loading ? (
                    <Container sx={{ mt: '1rem', height: '60vh', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <img src={loadingIcon} alt="EmptyIcon" width="25%" />
                    </Container>
                ) : recipes && recipes.length > 0 ? recipes.map((recipe) => <RecipeItem key={recipe.id} title={recipe.title} image={recipe.image} />) : (
                    <Container sx={{ mt: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <img src={emptyIcon} alt="EmptyIcon" width="50%" />
                    </Container>
                )}
            </Grid>
        </Container>
    );
}