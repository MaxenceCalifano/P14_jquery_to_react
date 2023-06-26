import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from "../css/EmployeesTable.module.css"
import TableHeader from './TableHeader';
function EmployeeTable({ data, columns }) {
    const [employees, setEmployees] = useState()
    const [selectedColumn, setSelectedColumn] = useState()
    const [dataLength, setDataLength] = useState(10)

    useEffect(() => {
        if (data) setEmployees(data.slice(0, dataLength))
    }, [data, dataLength])

    const search = (e) => {
        const userInput = e.target.value
        if (userInput.length === 0) setEmployees(data)
        if (userInput.length < 3) return

        const filteredEmployees = employees.filter(employee => {
            if (Object.values(employee).some(elem => elem.includes(userInput))) return true
        })
        setEmployees(filteredEmployees)
    }

    const selectLength = (e) => {
        const selectedValue = e.target.value
        setDataLength(selectedValue)

    }

    return (<>

        {
            employees ?
                <>
                    <div className={styles.searchAndDataLength}>
                        {/* Select number of entries*/}
                        <div className={styles.flexDiv}>
                            <label>Show</label>
                            <select onChange={selectLength} name='data-length'>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span>entries</span>
                        </div>


                        {/* Search input */}
                        <div className={styles.flexDiv}>
                            <label>
                                Search:
                            </label>
                            <input onChange={search} type='search' />
                        </div>

                    </div>
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col, index) => <TableHeader key={index}
                                    title={col.title}
                                    index={index}
                                    selectedColumn={selectedColumn}
                                    setSelectedColumn={setSelectedColumn}
                                    setEmployees={setEmployees}
                                    employees={employees}
                                    columns={columns} />)
                                    // au clique déclencher la fonction sort en lui passant l'index de la column cliqué
                                    // ainsi dans la fonction on veut savoir quelle données trier
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //  Create a row for each item in data
                                employees.map((row, index) => (
                                    <tr key={index}>
                                        {
                                            // Create a column for each value in item
                                            columns.map((column, index) => <td key={index}>{row[column.data]}</td>)
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div>
                        <p>showing { } to </p>
                    </div>
                </>
                : <></>
        }
    </>);
}

EmployeeTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    title: PropTypes.string,
    index: PropTypes.number,
    selectedColumn: PropTypes.number
}

export default EmployeeTable;