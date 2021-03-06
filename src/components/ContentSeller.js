

//// THIS IS A COPY AND REFACTORED VERSION OF CONTENT CLEANER COMPONENT 


import React, {useState, useEffect} from 'react';
import "../styles/Content.scss";
import {Route, useHistory, Switch} from 'react-router-dom'
import CleanerProfileForm from './CleanerPage/CleanerProfileForm'
import RegisterService from './CleanerPage/RegisterService'
import UpdateService from './CleanerPage/UpdateService'
import axios from 'axios'
import Chat from '../ChatComponents/messagecomponents/Chat'
import DashboardCalendar from './CleanerPage/DashboardCalendar'
import DigitalClock from './CleanerPage/DigitalClock'


export default function ContentSeller(props){

    const [chosenProfile, setChosenProfile] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [registeredUser, setRegisteredUser] = useState([])

     /////// This is where get user is coming from and pass down to maps

     ///////// original before deployment
     /* useEffect(()=>{
        axios({
            method: 'GET',
            url:'http://localhost:5000/cleaners/services'})
         .then(res => {
             setRegisteredUser(res.data)
             setLoading(false)
             console.log("this is response", res)
         })
         .catch(err => console.log(err))
     }, []) */


     useEffect(()=>{
        axios({
            method: 'GET',
            url:'https://cleaneast.herokuapp.com/cleaners/services'})
         .then(res => {
             setRegisteredUser(res.data)
             setLoading(false)
             console.log("this is response", res)
         })
         .catch(err => console.log(err))
     }, []) 

    let history = useHistory()

    if (isLoading) {
        history.push('/');
        return <div>Loading...</div>;
    }

    const deleteService = (cleanerId, serviceId) => {
        console.log("cleanerId", cleanerId)
        console.log("serviceId", serviceId)

        const service = {
            cleanerId: cleanerId,
            serviceId: serviceId
        }

        //////// BEFORE DEPLOYMENT //////
        /* axios.post('http://localhost:5000/cleaners/service/delete', service, {
            headers: {
                'Content-Type': 'application/json',
                'cleanerttoken': localStorage.getItem('cleanerToken')
            }
        })
            .then(res => { 
                const tempUsers = [...registeredUser]
                const index = tempUsers.map(user => user.cleanerId).indexOf(cleanerId)
                tempUsers[index].service = tempUsers[index].service.filter(s => s.service_id === serviceId ? false : true)
                setRegisteredUser(tempUsers)
            })
            .catch(err => { console.log(err) }) */


            axios.post('https://cleaneast.herokuapp.com/cleaners/service/delete', service, {
                headers: {
                    'Content-Type': 'application/json',
                    'cleanerttoken': localStorage.getItem('cleanerToken')
                }
            })
                .then(res => { 
                    const tempUsers = [...registeredUser]
                    const index = tempUsers.map(user => user.cleanerId).indexOf(cleanerId)
                    tempUsers[index].service = tempUsers[index].service.filter(s => s.service_id === serviceId ? false : true)
                    setRegisteredUser(tempUsers)
                })
                .catch(err => { console.log(err) }) 
    }

    let targetValue = {};
    const updateService = (cleanerId, serviceId) => {
        console.log("From update service cleanerId", cleanerId)
        console.log("From update service serviceId", serviceId)
        targetValue.cleanerId = cleanerId
        targetValue.serviceId = serviceId
        return
    }
    console.log("targetValue", targetValue)

    let targetCleaner = {};
    const createService = (cleanerId) => {
        console.log("From create service cleanerId", cleanerId)
        targetCleaner.cleanerId = cleanerId
        return
    }

    return(
        <main className="appointment__card appointment__card--show">
            <Route path="/" exact>
                <section className="appointment__card-left">
                    <section className="content-container">
                        <h1 className="text--regular" style={{ textAlign: "center" }}> <strong> Welcome {localStorage.getItem("cleanerUser")} !!!</strong></h1>
                        <div style={{ marginTop: "5%" }}></div>
                        <CleanerProfileForm selectedUser={chosenProfile} setCurrentUser={setChosenProfile} registeredUser={registeredUser} deleteService={deleteService} updateService={updateService} createService={createService}/>
                    </section>
                </section>

                <section className="homebox__card-right">
                    <DashboardCalendar />
                    <div>
                        <DigitalClock />
                    </div>
                </section>
            </Route>
            <Switch>
                <Route path={'/cleaners/chatroom'} exact>
                    <section className="appointment__card-left">
                        <section className="content-container">
                            <h1 className="text--regular" style={{ textAlign: "center" }}> Welcome To The Job Board <strong>{localStorage.getItem("cleanerUser")}</strong>. Please Wait For Your Potential Customer to Message You</h1>
                            <div style={{ marginTop: "5%" }}></div>
                            <div className="row">
                                <Chat />
                            </div>
                        </section>
                    </section>

                    <section className="homebox__card-right">
                        <DashboardCalendar />
                        <div>
                            <DigitalClock />
                        </div>
                    </section>
                </Route>
                <Route path={'/cleaners/services'} exact>
                    <section className="appointment__card-left">
                        <section className="content-container">
                            <h1 className="text--regular" style={{ textAlign: "center" }}> <strong> Add here your service {localStorage.getItem("appUser")} !!!</strong></h1>
                            <div style={{ marginTop: "5%" }}></div>
                            <div className="row">
                            <RegisterService selectedUser={chosenProfile} setCurrentUser={setChosenProfile} registeredUser={registeredUser} targetCleaner={targetCleaner} setRegisteredUser={setRegisteredUser}/>
                            </div>
                        </section>
                    </section>
                </Route>
                <Route path={'/cleaners/services/update'} exact>
                    <section className="appointment__card-left">
                        <section className="content-container">
                            <h1 className="text--regular" style={{ textAlign: "center" }}> <strong> Update here your service {localStorage.getItem("appUser")} !!!</strong></h1>
                            <div style={{ marginTop: "5%" }}></div>
                            <div className="row">
                            <UpdateService selectedUser={chosenProfile} setCurrentUser={setChosenProfile} registeredUser={registeredUser} targetValue={targetValue} setRegisteredUser={setRegisteredUser}/>
                            </div>
                        </section>
                    </section>
                </Route>
            </Switch>
        </main>
    )
} 