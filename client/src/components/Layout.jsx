import "./Layout.scss"
import { Outlet, NavLink, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate()
    return (
        <>
            <nav>
                <span 
                className="pointer-hover"
                onClick={() => {
                    navigate("/")
                }}>TaraCare Healthcare Co</span>
                <NavLink to={"/"}>Dashboards</NavLink>
                <NavLink to={"/patients"}>Patients</NavLink>
                <span>Welcome Admin</span>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;