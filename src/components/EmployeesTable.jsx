import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa'
import styles from "../css/EmployeesTable.module.css"
function EmployeeTable({ data, columns }) {
    const [employees, setEmployees] = useState()

    useEffect(() => setEmployees(data), [data])

    const searchEmployee = (e) => {
        const userInput = e.target.value
        if (userInput.length === 0) setEmployees(data)
        if (userInput.length < 3) return

        const filteredEmployees = employees.filter(employee => {
            if (Object.values(employee).some(elem => elem.includes(userInput))) return true
        })
        setEmployees(filteredEmployees)
    }

    return (<>

        {
            employees ?
                <>
                    <div className={styles.search}>
                        <label>
                            Search:
                        </label>
                        <input onChange={searchEmployee} type='search' />
                    </div>
                    <table>
                        <thead>
                            <tr>

                                {columns.map((col, index) => <th key={index}>{col}<FaSort style={{ color: "grey" }} /></th>)}
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
                </>
                : <></>
        }


    </>);
}

EmployeeTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array
}

export default EmployeeTable;