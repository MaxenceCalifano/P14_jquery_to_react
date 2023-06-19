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

export default EmployeeTable;