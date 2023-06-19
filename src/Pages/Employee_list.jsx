import EmployeeTable from "../components/EmployeesTable";

function EmployeeList() {
    return (
        <>
            <h1>
                Current Employees
            </h1>
            <EmployeeTable columns={["coucou", "test", "ici", "là"]} />
        </>
    );
}

export default EmployeeList;