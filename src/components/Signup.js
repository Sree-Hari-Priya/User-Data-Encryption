import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

export default class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            firstname: "",
            lastname: "",
            ssn : "",
            email: "",
            phone : "",
            username: "",
            password: "",
            confrim_password : ""
        }
        this.redirectToProfile = React.createRef(null)


        let isAuthenticated = localStorage.getItem("isAuthenticated");

        if(isAuthenticated){
            this.setState({
                isAuthenticated,
                username: localStorage.getItem("username"),
                password: localStorage.getItem("password")
            })
        }
    }

    checkValidation = () => {
        let username = this.state.username
        let password = this.state.password
        let email = this.state.email
        let firstname = this.state.firstname
        let lastname = this.state.lastname
        let ssn = this.state.ssn
        let phone = this.state.phone

        if(!username || (!password || (password  && password.length <8)) || !email || !firstname || !lastname){
            alert("Please Enter Valid Details")
            return false
        }
        return true
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    signupUser = () => {
        if(!this.checkValidation()){
            return
        }
        else{
            let url="http://localhost:5002/signup/"
            let response = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                     'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    username : this.state.username,
                    password: this.state.password,
                    firstname : this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    ssn: this.state.ssn,
                    phone: this.state.phone
                })

            })
            response = response.json()
            this.setState({
                isAuthenticated: true
            })
        }

        localStorage.setItem("isAuthenticated", true)
        localStorage.setItem("username", this.state.username)
        localStorage.setItem("password", this.state.password)
        this.redirectToProfile.current.click()
    }

    render(){
        return (
            <Container style={{width: "35%", paddingTop: "15vh"}}>
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.changeHandler} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>SSN</Form.Label>
                        <Form.Control required type="ssn" placeholder="SSN" name="ssn" value={this.state.ssn} onChange={this.changeHandler} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control required type="phone" placeholder="Phone" name="phone" value={this.state.phone} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="User Name" name="username" value={this.state.username} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Min Length: 8 Characters" name="password" minLength="8" value={this.state.password} onChange={this.changeHandler} />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicSignup">
                        <Button variant="primary" type="button" onClick={this.signupUser}>
                            Sign Up
                        </Button>

                    </Form.Group>
                   
                    <Form.Group className="mb-3" controlId="formBasicLoginText">

                        Already have an account, <Link to="/"> Login</Link> here.

                    </Form.Group>

                </Form>
                <Link
                    to={"/profile/" + this.state.username}
                    ref={this.redirectToProfile}
                    style={{display: "none"}}
                />
            </Container>
        );
    }
}
