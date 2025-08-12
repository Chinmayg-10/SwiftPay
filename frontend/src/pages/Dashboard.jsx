import "../App.css"
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
export const Dashboard = () => {
    return (
        <div>
            <Appbar />
            <div className="pt-16 m-8 space-y-6">
                <Balance />
                <Users />
            </div>
        </div>
    )
}
