import Menu from './pages/Menu'
import Home from './pages/Home'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'
import PrivateRoute from './auth/PrivateRoute'

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    usesAuthentication: true,
  },
  {
    path: '/users',
    exact: true,
    component: Users,
    usesAuthentication: true,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/user/edit/:userId',
    component: EditProfile,
    usesAuthentication: true,
  },
  {
    path: '/user/:userId',
    component: Profile,
    usesAuthentication: true,
  },
];

export default Routes;
