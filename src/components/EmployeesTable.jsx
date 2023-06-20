import PropTypes from 'prop-types';
function EmployeeTable({ columns }) {
    return (<>
        {/* 
            Doit recevoir des datas : en l'occurence employees, venant de localStorage
            Doit recevoir aussi, chaque champs
        */}

        <table>
            <thead>
                <tr>

                    {columns.map((col, index) => <th key={index}>{col}</th>)}
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </>);
}

EmployeeTable.propTypes = {
    columns: PropTypes.array
}

export default EmployeeTable;