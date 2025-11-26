import { Link, Outlet } from "react-router-dom";
import Jumbotron from "../templates/Jumbotron";

export default function AdminHome() {

    //render
    return (<>
        <Jumbotron subject="AdminHome" detail="AdminHomeAdminHomeAdminHome"></Jumbotron>

        <div className="row mt-4">
            <div className="col fs-2 ">
                <Link to="/admin/AdminManager">AdminManager</Link>
                -
                <Link to="/admin/DashBoard">DashBoard</Link>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col fs-2">
                <Outlet />
            </div>
        </div>
    </>)
}