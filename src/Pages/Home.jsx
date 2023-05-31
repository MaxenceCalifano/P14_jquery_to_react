import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>HRnet</h1>
            <main>
                <Link to={'/employee-list'}>View Current Employees</Link>
                <h2>Create Employee</h2>
            </main>
        </div>
    );
}

export default Home;