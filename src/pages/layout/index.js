import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
const Layout = () => {
    return (
        <div>
            Layout page
            <Outlet/>
            <Button color="primary">test</Button>
            <div className="purple">
            <Button color="primary">test</Button>
            </div>
        </div>

    )
}

export default Layout