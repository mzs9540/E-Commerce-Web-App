import React from "react";
import {Container} from "@material-ui/core";

export default class About extends React.Component {

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
    }

    render() {

        return (
            <Container style={{textAlign: 'center'}}>
                <br/>
                <div className="LI-profile-badge" data-version="v1" data-size="medium" data-locale="en_US"
                     data-type="vertical"
                     data-theme="dark" data-vanity="mzs9540">
                    <a className="LI-simple-link" href='https://in.linkedin.com/in/mzs9540?trk=profile-badge'>
                        MOHAMMAD ZAID
                    </a>
                </div>
            </Container>
        )
    }
}