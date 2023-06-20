import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from "../css/EmployeesTable.module.css"
function EmployeeTable({ data, columns }) {
    const [employees, setEmployees] = useState()

    useEffect(() => setEmployees(data), [data])
    return (<>
        {/* 
            Doit recevoir des datas : en l'occurence employees, venant de localStorage
            Doit recevoir aussi, chaque champs
        */}

        {
            employees ? <table>
                <thead>
                    <tr>

                        {columns.map((col, index) => <th key={index}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((row, index) => (
                            <tr key={index}>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.startDate}</td>
                                <td>{row.department}</td>
                                <td>{row.dateOfBirth}</td>
                                <td>{row.street}</td>
                                <td>{row.city}</td>
                                <td>{row.state}</td>
                                <td>{row.zipCode}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                : <></>
        }


    </>);
}

EmployeeTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array
}

export default EmployeeTable;