import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import styles from "../css/EmployeesTable.module.css"
function EmployeeTable({ data, columns }) {
    const [employees, setEmployees] = useState()
    const [selectedColumn, setSelectedColumn] = useState()

    useEffect(() => setEmployees(data), [data])

    const search = (e) => {
        const userInput = e.target.value
        if (userInput.length === 0) setEmployees(data)
        if (userInput.length < 3) return

        const filteredEmployees = employees.filter(employee => {
            if (Object.values(employee).some(elem => elem.includes(userInput))) return true
        })
        setEmployees(filteredEmployees)
    }

    /**
     * 
     * @param {number} columnIndex 
     */
    function sort(columnIndex, ascending) {
        // save which column is selected, so the others are unselected
        setSelectedColumn(columnIndex)
        // sort les row basé sur la colonne séléctionné
        const data = [...employees]

        console.log(ascending)
        data.sort((a, b) => {
            if (ascending === true) {
                if (a[columns[columnIndex].data].toLowerCase() < b[columns[columnIndex].data].toLowerCase())
                    return -1
                if (a[columns[columnIndex].data].toLowerCase() > b[columns[columnIndex].data].toLowerCase())
                    return 1
            }

            if (ascending === false) {
                if (a[columns[columnIndex].data].toLowerCase() > b[columns[columnIndex].data].toLowerCase())
                    return -1
                if (a[columns[columnIndex].data].toLowerCase() < b[columns[columnIndex].data].toLowerCase())
                    return 1
            }

        })

        setEmployees(data)
        console.log('test', data[0][columns[columnIndex].data])
        console.log('test', data[1][columns[columnIndex].data])
        //console.log('test', data[2][columns[columnIndex].data])
        console.log("🚀 ~ file: EmployeesTable.jsx:36 ~ sort ~ data:", data)
    }

    // Table header cell component
    const TableHeader = ({ title, index, selectedColumn }) => {

        const [isSelected, setIsSelected] = useState(false)
        const [ascending, setAscending] = useState(false)

        useEffect(() => {
            if (index === selectedColumn) {
                setIsSelected(true)
            }
        }, [index, selectedColumn])

        return (
            <th>
                {title}
                {isSelected ?
                    ascending ?
                        // Will display a down arrow
                        <FaSortUp onClick={() => {
                            sort(index, ascending)
                            setAscending(false)
                        }} />
                        //Will display an up arrow
                        : <FaSortDown onClick={() => {
                            sort(index, ascending)
                            setAscending(true)
                        }} />
                    // Will grey up and down arrow
                    : <FaSort onClick={() => {
                        sort(index, ascending)
                        setAscending(false)
                    }} style={{ color: "grey" }} />}
            </th>
        )
    }

    return (<>

        {
            employees ?
                <>
                    <div className={styles.search}>
                        <label>
                            Search:
                        </label>
                        <input onChange={search} type='search' />
                    </div>
                    <table>
                        <thead>
                            <tr>

                                {columns.map((col, index) => <TableHeader key={index} title={col.title} index={index} selectedColumn={selectedColumn} />)
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