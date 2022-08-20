import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import EmployeeItem from '../components/EmployeeItem';
import { Context } from '../index';
import { CardGroup } from 'react-bootstrap'

const EmployeesPage = observer(() => {
    const {employee} = useContext(Context);
    
    return (
        <CardGroup className='m-3'>
            {employee.employees.map(item => 
                <EmployeeItem key={item.id} em={item}/>
            )}
        </CardGroup>
    );
});

export default EmployeesPage;