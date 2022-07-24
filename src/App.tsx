import React, { useEffect } from 'react';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import {
  Routes
  , Route,
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom'
import PublicRoutes from './routes/public.routes';
import ProtectedRoutes from './routes/protected.routes';
import LoginPage from './pages/LoginPage';
import EmployeesPage from './pages/EmployeesPage';
import EmployeesAdd from './pages/EmployeeAdd'
import { useAppDispatch } from './store/store';
import { useSelector } from 'react-redux'
import { reLogin, authenSelector } from './store/slices/authenSlices'
import HeaderComponent from './components/Header';
import { Layout } from 'antd';
import EmployeesEdit from './pages/EmployeesEdit';


const { Content } = Layout;
function App() {
  const dispatch = useAppDispatch()
  const getLogin = useSelector(authenSelector)
  useEffect(() => {
    const getToken = localStorage.getItem("token")
    if (getToken === null || getToken === "") {

    } else {
      dispatch(reLogin())
    }
  }, []);
  return (
    <>
      {getLogin.isLogin ?
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderComponent />


          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                {/* Public No Login */}
                <Route path='/' element={<PublicRoutes />}>
                  <Route path="/" element={<Navigate to={"/login"} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>
                {/* protected Route */}
                <Route path='/' element={<ProtectedRoutes />}>
                  <Route path="/employees" element={<EmployeesPage />} />
                  <Route path="/addemployees" element={<EmployeesAdd />} />
                  <Route path="/employeesedit/:id" element={<EmployeesEdit />} />
                </Route>
              </Routes>
            </Content>
          </Layout>

        </Layout>
        :
        <Routes>
          {/* Public No Login */}
          <Route path='/' element={<PublicRoutes />}>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
          {/* protected Route */}
          <Route path='/' element={<ProtectedRoutes />}>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/addemployees" element={<EmployeesAdd />} />
            <Route path="/employeesedit/:id" element={<EmployeesEdit />} />
          </Route>
        </Routes>
      }
    </>
  );
}

export default App;

// const NotFound = () => {
//   const navigate = useNavigate()
//   React.useEffect(() => {
//     navigate("/")
//   }, [])
//   return (
//     <>

//     </>

//   );
// }
