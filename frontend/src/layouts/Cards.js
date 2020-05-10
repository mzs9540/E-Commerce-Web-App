import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
});

export default function CardLayout(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={e => console.log(e)}>
                <Link to={props.link}>
                <CardMedia
                    component="img"
                    alt={props.alt}
                    height={props.ht}
                    image={props.img}
                    title={props.title}
                />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.item}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to={props.link}><Button size="small" color="primary">
                    View Product
                </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
