import React from "react";
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {authLogin} from "../actions";
import {Container, TextField, Fab, Box, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

class Login extends React.Component {

    renderInput = ({input, type, id, label, margin, meta: { touched, error, warning }}) => {
        return (
            <Box>
            <TextField {...input} type={type} id={id} label={label} margin={margin} required/>
                {touched && ((error && <Box>{error}</Box>) || (warning && <Box>{warning}</Box>))}
            </Box>
        )
    };

    onSubmit = (formValues) => {
        this.props.authLogin(formValues.username, formValues.password, this.props.location.state);
    };

    render() {
        return(
                <Container maxWidth='sm' >
                    <br/>
                    <Box boxShadow={3} style={{textAlign: 'center', padding: '20px'}}>
                        <Typography variant="h4">Login</Typography>
                        <hr/>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="username" component={this.renderInput} type="text" id="username"
                           label="Username"
                           margin="normal"/>
                           <br/>
                    <Field name="password" component={this.renderInput} type="password"
                           id="password"
                           label="Password"
                           margin="normal"/>
                           <br/>
                        <Fab variant="extended" color="secondary" aria-label="login" type='submit'>
                            Login
                        </Fab> or <Link to='/signup'> Signup</Link>
                    </form>
                    </Box>
                </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        err: state.auth.error
    }
};

Login = connect(mapStateToProps, {authLogin})(Login);

export default reduxForm({form: 'loginForm'})(Login);