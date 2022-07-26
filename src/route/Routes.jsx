// dashbaord
import Default from '../components/dashboard/default/index'
import Ecommerce from '../components/dashboard/ecommerce/index'


// Support Ticket
import StarterKit from "../components/starter-kits/index"

export const routes = [
        { path: `${process.env.PUBLIC_URL}/dashboard/default/:layout/`, Component: <Default /> },
        { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce/:layout/`, Component: <Ecommerce /> },
        //Support Ticket
        { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page/:layout/`, Component: <StarterKit /> }
]