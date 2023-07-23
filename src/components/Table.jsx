import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from "../css/EmployeesTable.module.css"
import TableHeader from './TableHeader';
function Table({ initialData, columns }) {
    const [data, setData] = useState()
    const [selectedColumn, setSelectedColumn] = useState()
    const [dataLength, setDataLength] = useState(10)
    const [pagination, setPagination] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(1)
    // une variable intermédiaire pour le tri
    const [sortedData, setSortedData] = useState(initialData)

    useEffect(() => {
        if (initialData) {
            setSortedData(initialData)
        }
    }, [initialData])

    useEffect(() => {
        if (sortedData) {
            setData(sortedData.slice(0, dataLength))

            // Build an array of number of pages length so we can map on it to create the pagination buttons
            setNumberOfPages(Array.from({ length: Math.ceil(sortedData.length / dataLength) }))
        }
    }, [dataLength, sortedData])

    const search = (e) => {
        const userInput = e.target.value
        if (userInput.length === 0) setData(sortedData.slice(0, dataLength))
        if (userInput.length < 3) return

        const filteredData = initialData.filter(employee => {
            if (Object.values(employee).some(elem => elem.includes(userInput))) return true
        })
        setData(filteredData)
    }

    const selectLength = (e) => {
        const selectedValue = e.target.value
        setDataLength(selectedValue)
    }

    const paginate = (key) => {
        setPagination(key)
        setData(sortedData.slice(key * dataLength, parseInt(key * dataLength) + parseInt(dataLength)))
    }

    return (<>

        {
            data ?
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
                                    setData={setSortedData}
                                    sortedData={sortedData}
                                    columns={columns} />)
                                    // au clique déclencher la fonction sort en lui passant l'index de la column cliqué
                                    // ainsi dans la fonction on veut savoir quelle données trier
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //  Create a row for each item in data
                                data.map((row, index) => (
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
                        <p>showing {pagination * dataLength + 1} to {pagination + 1 === numberOfPages.length ? initialData.length : parseInt(pagination * dataLength) + parseInt(dataLength)} of {initialData.length}</p>
                        {
                            numberOfPages.length > 1 ?
                                <>
                                    <button disabled={pagination === 0 ? true : false} className={styles.pagination_button} onClick={() => paginate(pagination - 1)}>Previous</button>
                                    {
                                        numberOfPages.map((page, key) =>
                                            <button
                                                className={`${styles.pagination_button} ${pagination === key ? styles.current_page : ''} ${styles.pagination_number}`}
                                                onClick={() => {
                                                    paginate(key)
                                                }}
                                                key={key}>{key + 1}</button>)
                                    }
                                    <button disabled={pagination + 1 === numberOfPages.length ? true : false} className={styles.pagination_button} onClick={() => paginate(pagination + 1)}>Next</button>
                                </>
                                : <></>
                        }
                    </div>
                </>
                : <></>
        }
    </>);
}

Table.propTypes = {
    initialData: PropTypes.array,
    columns: PropTypes.array,
    title: PropTypes.string,
    index: PropTypes.number,
    selectedColumn: PropTypes.number
}

export default Table;