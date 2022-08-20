import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { createEmployee } from '../../http/employeeApi';
import { useInput } from '../../http/validateApi';
import { Context } from '../../index';

const CreateEmployee = ({show, onHide}) => {
    const {employee} = useContext(Context);
    const name = useInput('', {minLength: {value: 2, name: 'Name'}} );
    const surname = useInput('', {minLength: {value: 3, name: 'Surname'}} );
    const patronymic = useInput('', {minLength: {value: 3, name: 'Patronymic'}} );
    const dateOfBirth = useInput(new Date(), {age: {name: 'DateOfBirth'}} );
    const residentialAddress = useInput('', {minLength: {value: 7, name: 'Residential Address'}} );
    const department = useInput('', {minLength: {value: 2, name: 'Department'}} );
    const aboutMe = useInput('', {minLength: {value: 10, name: 'About Me'}} );
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await createEmployee(name.value, surname.value, patronymic.value, dateOfBirth.value, residentialAddress.value, department.value, aboutMe.value);
            employee.setEmployees(data.employees);
            name.onChange('');
            surname.onChange('');
            patronymic.onChange('');
            dateOfBirth.onAge(new Date());
            residentialAddress.onChange('');
            department.onChange('');
            aboutMe.onChange('');
            onHide();
        } catch (error) {
            setMessageError(error.response.data.message);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Name'}
                    />

                    {(surname.isDirty && surname.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{surname.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={surname.value}
                        onChange={e => surname.onChange(e)}
                        onBlur={e => surname.onBlur(e)}
                        placeholder={'Surname'}
                    />

                    {(patronymic.isDirty && patronymic.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{patronymic.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={patronymic.value}
                        onChange={e => patronymic.onChange(e)}
                        onBlur={e => patronymic.onBlur(e)}
                        placeholder={'Patronymic'}
                    />

                    {(dateOfBirth.isDirty && dateOfBirth.dateError) && <div className='mt-3' style={{color: 'red'}}>{dateOfBirth.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={dateOfBirth.value}
                        type='date'
                        onChange={e => dateOfBirth.onAge(e)}
                        onBlur={e => dateOfBirth.onBlur(e)}
                        placeholder={'Date Of Birth'}
                    />

                    {(residentialAddress.isDirty && residentialAddress.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{residentialAddress.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={residentialAddress.value}
                        onChange={e => residentialAddress.onChange(e)}
                        onBlur={e => residentialAddress.onBlur(e)}
                        placeholder={'Residential Address'}
                    />

                    {(department.isDirty && department.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{department.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={department.value}
                        onChange={e => department.onChange(e)}
                        onBlur={e => department.onBlur(e)}
                        placeholder={'Department'}
                    />

                    {(aboutMe.isDirty && aboutMe.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{aboutMe.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={aboutMe.value}
                        onChange={e => aboutMe.onChange(e)}
                        onBlur={e => aboutMe.onBlur(e)}
                        placeholder={'About Me'}
                    />


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className='btn-primary m-2'
                    // variant='outline-primary'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!name.inputValid || !surname.inputValid || !dateOfBirth.inputValid || !residentialAddress.inputValid || !department.inputValid}
                    onClick={click}
                >
                    Create
                </button>
                <button 
                    className="btn-danger"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateEmployee;