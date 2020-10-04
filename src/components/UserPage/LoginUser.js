import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
//import {ILogin, ITarget, login } from './helperUser/interfaces'
import {Link} from 'react-router-dom'
import axios from 'axios'


/// This is a test

const LoginUser = (props) => { 


const [email, setEmail] = useState();
const [password, setPassword] = useState();


async function handleSubmit(event){
    event.preventDefault()

    try{
        const response = await axios.post("http://localhost:5000/users/login", {
            email,
            password
        });
        if(response.data) {
            console.log("this is response", response)
            localStorage.setItem("userToken", response.data.token) // Then object is from response we made through url attach to MongoDB
            localStorage.setItem("userEmail", response.data.user.email)
            localStorage.setItem("userUser", response.data.user.username)
            props.setLoggedIn(true)

        } else {
            console.log("incorrect something")
        }
    }
    catch(err){
        console.log("ERROR", err)
    }

}


  return (

    <>
    <h1 className="text--regular" style={{textAlign: "center"}}>Welcome User</h1>

    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" style={{backgroundColor: "#44B244", borderColor: "black"}}>
            Login User
        </Button>
    </Form>

    <div style={{marginTop: "5%"}}>
      <h2>If you are not yet a user please click <strong> <Link to={'/users/register'} style={{color: "#44B244"}}> here </Link> </strong></h2>
    </div>

    </>
  )

}

export default LoginUser