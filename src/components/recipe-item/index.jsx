import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function RecipeItem({ id, title, image }) {
    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, height: '100%' }}>
                <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={title}
                    />
                    <CardContent sx={{ height: '100%' }}>
                        <Link to={`/recipes/${id}`}>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                        </Link>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}