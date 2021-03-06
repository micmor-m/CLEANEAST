import React, { Component } from "react"
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";


export default class UpdateService extends Component {



    constructor(props) {
        super(props);
        this.targetValue = props.targetValue;
        this.registeredUser = props.registeredUser;
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeTypeOfService = this.onChangeTypeOfService.bind(this);
        this.onChangeDeposit = this.onChangeDeposit.bind(this);
        this.listOfServicesCarWash = ["Exterior wash", "Rinse", "Poly Shine", "Underbody Sparay", "Hand dry", "Window cleaning", "Interior vacuum", "Mats cleaning"]
        this.listOfServicesHomeCleaning = ["Brooming", "Vacuuming", "Mopping", "Dusting", "Floor Waxing", "Window cleaning", "Carpet cleaning"]
        this.listOfServicesLandScaping = ["Lawn Mowing ", "Watering", "Planting", "Weeds Removal"]
        this.listOfJobs = ["CarWash", "Home Cleaning", "Land Scaping"]
        this.indexServiceId = (this.registeredUser[this.targetValue.cleanerId - 1].service.map(function (e) { return e.service_id; }).indexOf(this.targetValue.serviceId))
        console.log(" indexServiceId", this.indexServiceId)
        this.serviceId = this.targetValue.serviceId

        if (this.onChangeName === "CarWash") {
            this.state = {
                name: this.listOfJobs[0],
                price: '',
                typeofservice: this.listOfServicesCarWash[0],
                deposit: '',
                isRegistered: false,
                error: false
            }
        } else if (this.onChangeName === "Home Cleaning") {
            this.state = {
                name: this.listOfJobs[1],
                price: '',
                typeofservice: this.listOfServicesHomeCleaning[0],
                deposit: '',
                isRegistered: false,
                error: false
            }
        } else if (this.onChangeName === "Land Scaping") {
            this.state = {
                name: this.listOfJobs[2],
                price: '',
                typeofservice: this.listOfServicesLandScaping[0],
                deposit: '',
                isRegistered: false,
                error: false
            }
        }

        this.state = {
            name: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].service,
            price: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].price / 100,
            typeofservice: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].typeofservice,
            deposit: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].deposit,
            isRegistered: false,
            error: false
        }

    }



    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeTypeOfService(e) {
        this.setState({
            typeofservice: e.target.value
        })
    }

    onChangeDeposit(e) {
        this.setState({
            deposit: e.target.value
        })
    }
    //original
    onSubmit = (e) => {
        e.preventDefault();

        const service = {
            name: this.state.name,
            price: this.state.price,
            typeofservice: this.state.typeofservice,
            deposit: this.state.deposit,
            service_id: this.serviceId
        }

        console.log("Service", service)
        //axios(config)

        ///////////////////////// BEFORE DEPLOYMENT/////////////////////////
        /* axios.post('http://localhost:5000/cleaners/service/update', service, {
            headers: {
                'Content-Type': 'application/json',
                'cleanerttoken': localStorage.getItem('cleanerToken')
            }
        })
            .then(res => {
                console.log(res.data)

                this.setState({
                    name: this.state.name,
                    price: this.state.price,
                    typeofservice: this.state.typeofservice,
                    deposit: this.state.deposit,
                    isRegistered: true,
                })

                const tempUsers = [...this.props.registeredUser]
                const index = tempUsers.map(user => user.cleanerId).indexOf(this.props.targetValue.cleanerId)
                const serviceIndex = tempUsers[index].service.map(s => s.service_id).indexOf(this.props.targetValue.serviceId)

                console.log("Service Index", serviceIndex)
                tempUsers[index].service[serviceIndex] = {
                    ...tempUsers[index].service[serviceIndex],
                    service: this.state.name,
                    price: this.state.price * 100,
                    typeofservice: this.state.typeofservice,
                    deposit: this.state.deposit,
                    service_id: this.serviceId
                }
                this.props.setRegisteredUser(tempUsers)
            })
            .catch(err => {
                console.log("This is the responese from catch", err);
                this.setState({
                    name: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].service,
                    price: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].price / 100,
                    typeofservice: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].typeofservice,
                    deposit: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].deposit,
                    isRegistered: false,
                    error: true

                })
            }); */
            
            ////////////////////////////////////////////////

            axios.post('https://cleaneast.herokuapp.com/cleaners/service/update', service, {
            headers: {
                'Content-Type': 'application/json',
                'cleanerttoken': localStorage.getItem('cleanerToken')
            }
        })
            .then(res => {
                console.log(res.data)

                this.setState({
                    name: this.state.name,
                    price: this.state.price,
                    typeofservice: this.state.typeofservice,
                    deposit: this.state.deposit,
                    isRegistered: true,
                })

                const tempUsers = [...this.props.registeredUser]
                const index = tempUsers.map(user => user.cleanerId).indexOf(this.props.targetValue.cleanerId)
                const serviceIndex = tempUsers[index].service.map(s => s.service_id).indexOf(this.props.targetValue.serviceId)

                console.log("Service Index", serviceIndex)
                tempUsers[index].service[serviceIndex] = {
                    ...tempUsers[index].service[serviceIndex],
                    service: this.state.name,
                    price: this.state.price * 100,
                    typeofservice: this.state.typeofservice,
                    deposit: this.state.deposit,
                    service_id: this.serviceId
                }
                this.props.setRegisteredUser(tempUsers)
            })
            .catch(err => {
                console.log("This is the responese from catch", err);
                this.setState({
                    name: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].service,
                    price: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].price / 100,
                    typeofservice: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].typeofservice,
                    deposit: this.registeredUser[this.targetValue.cleanerId - 1].service[this.indexServiceId].deposit,
                    isRegistered: false,
                    error: true

                })
            });


    }
    render() {

        const isRegistered = this.state.isRegistered;
        const error = this.state.error
        console.log("this.targetValue", this.targetValue)
        console.log("this.registeredUser", this.registeredUser)
        console.log(" indexServiceId", this.indexServiceId)



        if (isRegistered === true) {
            return <Redirect to="/" />
        }

        return (
            <Form onSubmit={this.onSubmit} >

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Type of Jobs</Form.Label>
                    <Form.Control as="select" value={this.state.name} onChange={this.onChangeName}>
                        {this.listOfJobs.map(item => {
                            return (
                                <option >{item}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                {this.state.name === "CarWash" ?
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type of Service</Form.Label>
                        <Form.Control as="select" value={this.state.typeofservice} onChange={this.onChangeTypeOfService}>
                            {this.listOfServicesCarWash.map(item => {
                                return (
                                    <option >{item}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                    : this.state.name === "Home Cleaning" ?
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Type of Service</Form.Label>
                            <Form.Control as="select" value={this.state.typeofservice} onChange={this.onChangeTypeOfService}>
                                {this.listOfServicesHomeCleaning.map(item => {
                                    return (
                                        <option >{item}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        : this.state.name === "Land Scaping" ?
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Type of Service</Form.Label>
                                <Form.Control as="select" value={this.state.typeofservice} onChange={this.onChangeTypeOfService}>
                                    {this.listOfServicesLandScaping.map(item => {
                                        return (
                                            <option >{item}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            :
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Type of Service</Form.Label>
                                <Form.Control type="number" min="0" max="100" placeholder="Please Pick A Service To Provide" />
                            </Form.Group>
                }

                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Enter price" value={this.state.price} onChange={this.onChangePrice} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicDeposit">
                    <Form.Label>Deposit in percentage</Form.Label>
                    <Form.Control type="number" min="0" max="100" placeholder="Deposit" value={this.state.deposit} onChange={this.onChangeDeposit} />
                </Form.Group>
                {error === true ?
                    <Alert variant="danger" onClose={() => this.setState({ error: false })} dismissible>
                        <p>
                            Service not updated. Please try again!!
                   </p>
                    </Alert>
                    :
                    <p></p>
                }
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        )
    }

}

