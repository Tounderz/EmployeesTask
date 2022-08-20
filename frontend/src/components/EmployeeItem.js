import React, { useContext, useState } from 'react';
import { Card, Col, ListGroup } from 'react-bootstrap';
import { Context } from '../index';
import { removeEmployee } from '../http/employeeApi';
import UpdateEmployee from './models/UpdateEmployee';
import { useNavigate } from 'react-router';
import { EMPLOYEES_ROUTE } from '../utils/const';
import { observer } from 'mobx-react-lite';

const EmployeeItem = observer(({em}) => {
    const {employee} = useContext(Context);
    const [updateVisible, setUpdateVisible] = useState(false);
    const navigate = useNavigate();
    
    const remove = async (id) => {
        const data = await removeEmployee(id);
            employee.setEmployees(data.employees);
            navigate(EMPLOYEES_ROUTE);
    }

    const update = async () => {
        employee.setSelectedEmployee(em);
        setUpdateVisible(true);
    }
    

    return (
            <Card
                style={{
                    borderRadius: '10px',
                    maxWidth: '300px'
                }}
            >
                <Card.Body>
                    <Card.Header>
                        Id № {em.id}
                    </Card.Header>
                    <ListGroup>
                        <ListGroup.Item>
                            Name: {em.name}
                        </ListGroup.Item>                        
                        <ListGroup.Item>
                            Surname: {em.surname}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Patronymic: {em.patronymic}
                        </ListGroup.Item>                        
                        <ListGroup.Item>
                            Date of birth: {em.dateOfBirth.slice(0, 10)}
                        </ListGroup.Item>                       
                        <ListGroup.Item>
                            Residential Address: {em.residentialAddress}
                        </ListGroup.Item>                        
                        <ListGroup.Item>
                            Department: {em.department}
                        </ListGroup.Item>                    
                        <ListGroup.Item>
                            About me: {em.aboutMe}
                        </ListGroup.Item>
                    </ListGroup>
                    <Col>
                        <button 
                            className="btn-primary m-2"
                            variant={'outline-success'}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={update}
                        >
                            Update
                        </button>
                        <button
                            className="btn-danger "
                            variant={"outline-success"}
                            style={{
                                cursor: "pointer",
                                borderRadius: "5px",
                            }}
                            onClick={() => remove(em.id)}
                        >
                            Remove
                        </button>
                    </Col>
                </Card.Body>
                <UpdateEmployee show={updateVisible} onHide={() => setUpdateVisible(false)}/>
            </Card>

    );
});

export default EmployeeItem;