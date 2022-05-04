import {Form, Button, Container} from 'react-bootstrap';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: localStorage.getItem("isAuthenticated"),
            username: localStorage.getItem("username") || ""
        }
        this.redirectToLogin = React.createRef(null)
    }

    logoutUser = () => {
        localStorage.setItem("isAuthenticated", false)
        this.redirectToLogin.current.click()
    }

    render(){
        return(
            <div>
                <div style={{width: "100%", textAlign: "right", padding: "1vw"}}>
                    <Button type="button" color="green" onClick={this.logoutUser}>
                            Logout
                    </Button>
                </div>
                
                <Container style={{paddingTop: "25vh"}}>
                    <h6>Username: {this.state.username}</h6>
                </Container>
                <Link
                    to="/"
                    ref={this.redirectToLogin}
                    style={{display: "none"}}
                />
            </div>
        )

    }
}

export default Profile;