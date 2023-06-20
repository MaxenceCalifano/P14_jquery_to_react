import EmployeeTable from "../components/EmployeesTable";

import { useEffect, useState } from "react";

function EmployeeList() {

    const [data, setData] = useState()

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('employees'))
        setData(localStorageData)
    }, [])

    return (
        <>
            <h1>
                Current Employees
            </h1>
            <EmployeeTable data={data} columns={[
                { title: "First Name", data: "firstName" },
                { title: "Last Name", data: "lastName" },
                { title: "Start Date", data: "startDate" },
                { title: "Department", data: "department" },
                { title: "Date of Birth", data: "dateOfBirth" },
                { title: "Street", data: "street" },
                { title: "City", data: "city" },
                { title: "State", data: "state" },
                { title: "Zip Code", data: "zipCode" }
            ]} />
        </>
    );
}

export default EmployeeList;