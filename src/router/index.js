import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout'
import New from '../pages/New'
import { Children } from 'react'
import Month from '../pages/Month-bill'
import Year from '../pages/Year-bill'
import { Navigate } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/month',
                element: <Month/>
            },
            {
                path: '/year',
                element: <Year/>
            },
        ]
    },
    {
        path: '/new',
        element: <New/>
    }
])

export default router