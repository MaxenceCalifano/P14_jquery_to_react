import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import styles from "../css/EmployeesTable.module.css"
function EmployeeTable({ data, columns }) {
    const [employees, setEmployees] = useState()
    const [selectedColumn, setSelectedColumn] = useState(0)

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
    function sort(columnIndex) {
        // save which column is selected, so the others are unselected
        setSelectedColumn(columnIndex)
        // sort les row basé sur la colonne séléctionné
        const data = employees

        data.sort((a, b) => {
            if (a[columns[columnIndex].data] < b[columns[columnIndex].data])
                return -1
            if (a[columns[columnIndex].data] > b[columns[columnIndex].data])
                return 1
        })
        setEmployees(data)
        console.log("🚀 ~ file: EmployeesTable.jsx:36 ~ sort ~ data:", data)
    }

    // Table header cell component
    const TableHeader = ({ title, index, selectedColumn }) => {

        const [isSelected, setIsSelected] = useState()
        const [ascending, setAscending] = useState(false)

        useEffect(() => {
            //    index === selectedColumn ?  setIsSelected(true) : setIsSelected(false)
            if (index === selectedColumn) {
                setIsSelected(true)

                /*   // change the sort order
                  if (descending === true) {
                      setDescending(false)
                      setAscending(true)
                  } else {
                      setDescending(true)
                      setAscending(false)
                  } */
            }
        }, [setIsSelected, index, selectedColumn])

        return (
            <th>
                {title}
                {isSelected ?
                    ascending ? <FaSortUp onClick={() => {
                        setAscending(false)
                        sort(index)
                    }} />
                        : <FaSortDown onClick={() => {
                            setAscending(true)
                            sort(index)
                        }} />
                    : <FaSort onClick={() => {
                        setIsSelected(true)
                        setAscending(false)
                        sort(index)
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