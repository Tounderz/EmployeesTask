import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { EMPLOYEES_ROUTE, ERROR_ROUTE, HOME_ROUTE } from './utils/const';
import HomePage from './pages/HomePage';
import EmployeesPage from './pages/EmployeesPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route exact path={HOME_ROUTE} element={<HomePage/>} />
        <Route path={EMPLOYEES_ROUTE} element={<EmployeesPage/>} />
        <Route path={ERROR_ROUTE} element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
