import { Route } from 'react-router-dom'
import React, { Component } from "react"
import EmployeeList from "./employees/EmployeeList"
import StoreList from "./stores/StoreList"
import CandyList from "./candy/CandyList"


class ApplicationViews extends Component {

    state = {
        stores: [],
        employees: [],
        types: [],
        candies: []
    }

    componentDidMount() {
        const newState = {}

        fetch("http://localhost:5002/stores")
            .then(r => r.json())
            .then(stores => newState.stores = stores)
            .then(() => fetch("http://localhost:5002/employees")
            .then(r => r.json()))
            .then(employees => newState.employees = employees)
            .then(() => fetch("http://localhost:5002/types")
            .then(r => r.json()))
            .then(types => newState.types = types)
            .then(() => fetch("http://localhost:5002/candies")
            .then(r => r.json()))
            .then(candies => newState.candies = candies)
            .then(() => this.setState(newState))
    }


    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <StoreList stores={this.state.stores} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/candies" render={(props) => {
                    return <CandyList candies={this.state.candies} CandyTypes types={this.state.types} />
                }} />
            </React.Fragment>
        )
    }
}


export default ApplicationViews