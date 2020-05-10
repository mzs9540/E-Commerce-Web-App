import React, {Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <a color="inherit" href="https://www.linkedin.com/in/mzs9540">
                MZS
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <Fragment>
            <br/>
            <br/>
        <div className={classes.root} style={{backgroundColor: '#f8bbd0'}}>
            <CssBaseline />
            <Container component="main" className={classes.main} >
                <Grid container>
                    <Grid item sm={6}>
                        <Link color="inherit" to="/">
                <Typography variant="h2" component="h1" gutterBottom>
                    MZS
                </Typography>
                        </Link>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Buy crockery at suitable price.'}
                </Typography>
                <Typography variant="body1">One Stop Destination for Crockery</Typography>
                    </Grid>
                    <Grid item sm={6}>
                        <Link to='/about'><Typography variant="h5" component="h1" gutterBottom>
                            Contact:
                        </Typography>
                        </Link>
                        <Typography variant="subtitle1" component="h2" gutterBottom>
                            {"Address: "}{'New Delhi, 110025'}
                        </Typography>
                        <Typography variant="subtitle1">{"Email: zaidsiddiqui50@gmail.com"}</Typography>
                        <Typography variant="subtitle1">{"Phone: +91-9540306628"}</Typography>
                        <Link to='/about'><Typography variant="h6">{"About"}</Typography></Link>
                    </Grid>
                </Grid>
            </Container>
            <footer className={classes.footer} style={{backgroundColor: '#ec407a'}}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Largest Crockery makers.</Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
        </Fragment>
    );
}