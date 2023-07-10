import { Link } from "react-router-dom";
import '../css/home.module.css'

import { Modal } from "my-modal-maxencec"
import "my-modal-maxencec/dist/style.css"
import { useState } from "react";
import Datepicker from "../components/Datepicker";

function Home() {

    const [isOpen, setIsOpen] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [startDate, setStartDate] = useState()
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zipCode, setZipCode] = useState()
    const [department, setDepartment] = useState()

    const saveEmployee = () => {

        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            startDate: startDate,
            department: department,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode
        };
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        setIsOpen(true)
    }
    return (
        <div>
            <h1>HRnet</h1>
            <main>
                <Link to={'/employee-list'}>View Current Employees</Link>
                <h2>Create Employee</h2>
                <Datepicker />
                <form>

                    <label htmlFor="first-name">First Name</label>
                    <input onChange={e => setFirstName(e.target.value)} type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input onChange={e => setLastName(e.target.value)} type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input onChange={e => setDateOfBirth(e.target.value)} id="date-of-birth" type="text" />

                    <label htmlFor="start-date">Start Date</label>
                    <input id="start-date" type="text" />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input onChange={e => setStreet(e.target.value)} id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input onChange={e => setCity(e.target.value)} id="city" type="text" />

                        <label htmlFor="state">State</label>
                        <select name="state" id="state"></select>

                        <label htmlFor="zip-code">Zip Code</label>
                        <input onChange={e => setZipCode(e.target.value)} id="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <select onChange={e => setDepartment(e.target.value)} name="department" id="department">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </form>
                <button onClick={saveEmployee}>Save</button>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

            </main>
        </div>
    );
}

export default Home;