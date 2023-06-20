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
            <EmployeeTable data={data} columns={["First Name", "Last Name", "Start Date", "Department", "Date of Birth", "Street", "City", "State", "Zip Code"]} />
        </>
    );
}

export default EmployeeList;