import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function FadeMenu(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >{
            props.isAuth ?
            <List>
                <ListItem button key={1}>
                    <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                    <ListItemText primary={`Welcome ${props.username}`}/>
                </ListItem>
                <ListItem button key={2}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary='Logout' onClick={props.authLogout}/>
                </ListItem>
            </List>
                :
                <List>
                    <Link to='/login'>
                    <ListItem button key={1}>
                        <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                        <ListItemText primary='Login'/>
                    </ListItem>
                    </Link>
                    <Divider />
                    <Link to='/signup'>
                    <ListItem button key={1}>
                        <ListItemIcon><PersonAddIcon/></ListItemIcon>
                        <ListItemText primary='SignUp' />
                    </ListItem>
                    </Link>
                </List>
        }
        </div>
    );
    return (
        <React.Fragment>
            <Button onClick={toggleDrawer('right', true)}><MenuIcon htmlColor="white"/></Button>
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </React.Fragment>
    );
}
