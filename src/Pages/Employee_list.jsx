import EmployeeTable from "../components/EmployeesTable";

import { useEffect, useState } from "react";

function EmployeeList() {

    const [data, setData] = useState()

    useEffect(() => {
        const localStorageData = localStorage.getItem('employees')
        setData(localStorageData)
    }, [])

    return (
        <>
            <h1>
                Current Employees
            </h1>
            <EmployeeTable data={data} columns={["coucou", "test", "ici", "là"]} />
        </>
    );
}

export default EmployeeList;