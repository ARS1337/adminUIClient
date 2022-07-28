// dashbaord
import Default from '../components/dashboard/default/index'
import Ecommerce from '../components/dashboard/ecommerce/index'
import ChangePassword from '../pages/authentication/ChangePassword'


// Support Ticket
import StarterKit from "../components/starter-kits/index"

export const routes = [
        { path: `${process.env.PUBLIC_URL}/dashboard/default/:layout/`, Component: <Default /> },
        { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce/:layout/`, Component: <Ecommerce /> },
        { path: `${process.env.PUBLIC_URL}/dashboard/changePassword/:layout`, Component: <ChangePassword /> },
        //Support Ticket
        { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page/:layout/`, Component: <StarterKit /> }
]