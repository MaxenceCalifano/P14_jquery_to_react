import { Link } from "react-router-dom";
import '../css/home.module.css'
import dayjs from "dayjs";
import { Modal } from "my-modal-maxencec"
import "my-modal-maxencec/dist/style.css"
import { useState } from "react";
//import Datepicker from "../components/Datepicker";
import { Datepicker } from 'react-date-picker-mc'
import "react-date-picker-mc/dist/style.css"
import weekday from 'dayjs/plugin/weekday'
import Select from "../components/Select";
import { states } from "../components/states";
dayjs.extend(weekday)

function Home() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [dateOfBirth, setDateOfBirth] = useState(dayjs())
    const [startDate, setStartDate] = useState(dayjs())
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zipCode, setZipCode] = useState()
    const [department, setDepartment] = useState()
    const [calendarIsOpen, setCalendarIsOpen] = useState(false)
    const [startDateCalendar, setStartDateCalendar] = useState(false)

    const saveEmployee = () => {

        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth.format('DD/MM/YYYY'),
            startDate: startDate.format('DD/MM/YYYY'),
            department: department,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode
        };
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        setModalIsOpen(true)
    }

    return (
        <div>
            <h1>HRnet</h1>
            <main>
                <Link to={'/employee-list'}>View Current Employees</Link>
                <h2>Create Employee</h2>
                <form>

                    <label htmlFor="first-name">First Name</label>
                    <input onChange={e => setFirstName(e.target.value)} type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input onChange={e => setLastName(e.target.value)} type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input readOnly value={dateOfBirth.format('DD/MM/YYYY')} id="date-of-birth" type="text" onClick={(event) => { event.stopPropagation(); setCalendarIsOpen(calendarIsOpen => !calendarIsOpen) }} />
                    <Datepicker isOpen={calendarIsOpen} setIsOpen={setCalendarIsOpen} selectedDate={dateOfBirth} setSelectedDate={setDateOfBirth} />


                    <label htmlFor="start-date">Start Date</label>
                    <input id="start-date" type="text" value={startDate.format('DD/MM/YYYY')} readOnly onClick={(event) => { event.stopPropagation(); setStartDateCalendar(calendarIsOpen => !calendarIsOpen) }} />
                    <Datepicker isOpen={startDateCalendar} setIsOpen={setStartDateCalendar} selectedDate={startDate} setSelectedDate={setStartDate} />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input onChange={e => setStreet(e.target.value)} id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input onChange={e => setCity(e.target.value)} id="city" type="text" />

                        <Select label="State" data={states} setData={setState} />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input onChange={e => setZipCode(e.target.value)} id="zip-code" type="number" />
                    </fieldset>

                    <Select label="Department" setData={setDepartment} data={["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]} />
                </form>
                <button onClick={saveEmployee}>Save</button>
                <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} text="Employee created!" />

            </main>
        </div>
    );
}

export default Home;