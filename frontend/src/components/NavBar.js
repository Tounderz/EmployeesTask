import React, { useContext, useState } from 'react';
import { EMPLOYEES_ROUTE, HOME_ROUTE } from '../utils/const';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { Context } from '../index';
import { fetchEmployees } from '../http/employeeApi';
import { observer } from 'mobx-react-lite';
import CreateEmployee from './models/CreateEmployee';
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const NavBar = observer(() => {
    const {employee} = useContext(Context);
    const navigate = useNavigate();
    const [createVisible, setCreateVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);

    const employeeList = async () => {
        const data = await fetchEmployees();
            employee.setEmployees(data.employees);
            navigate(EMPLOYEES_ROUTE);
    }

    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <Link 
                className='navbar-brand m-2'
                to={HOME_ROUTE}
            >
                Home
            </Link>
            <Link 
                className='navbar-brand m-2'
                to={EMPLOYEES_ROUTE}
                onClick={employeeList}
            >
                Employees List
            </Link>

            <button 
                className='btn btn-outline-success m-2'
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={() => setCreateVisible(true)}
            >
                New Employee
            </button>
            <button 
                className='btn btn-outline-primary m-2'
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={() => setSortVisible(true)}
            >
                Sort Employees
            </button>
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <SearchForm key='id'/>
            </nav> 
            <CreateEmployee show={createVisible} onHide={() => setCreateVisible(false)}/>
            <SortForm show={sortVisible} onHide={() => setSortVisible(false)}/>
        </nav>
    );
});

export default NavBar;