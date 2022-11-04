import { Icon } from '@chakra-ui/react'
import { MdBarChart, MdHome, MdLock } from 'react-icons/md'

// Admin Imports
import MainDashboard from 'pages/admin/default'
import DataTables from 'pages/admin/data-tables'

// Auth Imports
import SignInCentered from 'pages/auth/sign-in'
import { IRoute } from 'types/navigation'

const routes: IRoute[] = [
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: DataTables,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
]

export default routes
