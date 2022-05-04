import React from 'react';
import {Form, Button, Container, Col, Row} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            username: "",
            password: ""
        }
        this.redirectToProfile = React.createRef(null)

        this.checkUserAuthentication();
    }

    checkUserAuthentication = (e) => {
        let isAuthenticated = localStorage.getItem("isAuthenticated");

        if(isAuthenticated){
            this.setState({
                isAuthenticated,
                username: localStorage.getItem("username"),
                password: localStorage.getItem("password")
            }, ()=>{
                console.log(this.state.username)
            })
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    checkValidation = () => {
        let username = this.state.username
        let password = this.state.password
        if(!username || (!password || (password  && password.length <8)) ){
            alert("Please Enter Valid Credentials")
            return false
        }
        return true
    }


    loginUser = () => {
        if(!this.checkValidation()){
            return
        }
        else{
            let url="http://localhost:5002/login/"
            let response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                 'Accept': 'application/json, text/plain, */*',
            },
            body: JSON.stringify({
                username : this.state.username,
                password: this.state.password,
            })

        })
        response = response.json()
        this.setState({
            isAuthenticated: true
        })
    }

        //fetch call and check if user is authenticated
        
        this.setState({
            isAuthenticated: true
        })
        // localStorage.setItem("isAuthenticated", true)
        // localStorage.setItem("username", this.state.username)
        // localStorage.setItem("password", this.state.password)
        this.redirectToProfile.current.click()

    }

    render(){
        return (
            <Container style={{width: "35%", paddingTop: "15vh"}}>
                <Form>

                    {/* <Form.Group className="mb-3" controlId="formBasicFirstName">
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
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="User Name" name="username" value={this.state.username} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" minLength="8" placeholder="Min Length 8 characters" name="password" value={this.state.password} onChange={this.changeHandler} />
                    </Form.Group>
    
                    {/* <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Male" name="gender" onChange={this.handleChange} value={this.state.gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="text" placeholder="MM/DD/YYYY" name="dob" value={this.state.dob} onChange={this.handleChange} />
                    </Form.Group> */}

    
                    
{/*     
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" name="agreeConditions" value={this.state.agreeConditions} onChange={this.checkboxChange}  label="Agree and re-direct to an external page" />
                    </Form.Group> */}
                    
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Row>
                            <Col className="mb-3">
                               
                            </Col>
                            <Col className="mb-1">
                                <Button variant="success" type="button" onClick={this.loginUser}>
                                    Login
                                </Button>
                            </Col>
                            <Col className="mb-5">
                                <Link to="/signup"> Or Sign Up here</Link>
                                {/* <Button variant="primary" type="button" onClick={this.loginUser}>
                                    Or Sign Up here
                                </Button> */}
                            </Col>

                        </Row>
                       
  
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