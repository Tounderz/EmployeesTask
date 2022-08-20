import React, { useContext } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Context } from '../index';
import { sortEmployees } from '../http/employeeApi';
import { useInput } from '../http/validateApi';
import { EMPLOYEES_ROUTE, ERROR_ROUTE, FIELD_NAMES, TYPES_SORT } from '../utils/const';
import { useNavigate } from 'react-router';

const SortForm = ({show, onHide}) => {
    const {employee} = useContext(Context);
    const {error} = useContext(Context);
    const navigate = useNavigate();
    const fieldName = useInput('', {minLength: {value: 2, name: 'Field Name'}});
    const typeSort = useInput('', {minLength: {value: 2, name: 'Type Sort'}});

    const sort = async () => {
        try {
            const data = await sortEmployees(fieldName.value, typeSort.value);
                employee.setEmployees(data.employees);
                onHide();
                navigate(EMPLOYEES_ROUTE);
        } catch (e) {
            error.setMessageError(e.response.data.message);
                navigate(ERROR_ROUTE);
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
                    Sort
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select
                    onChange={e => fieldName.onChange(e)}
                    onBlur={e => fieldName.onBlur(e)}
                    className='m-2'
                >
                    <option
                        key=''
                        value=''
                    >
                        Select a field name
                    </option>
                    {FIELD_NAMES.map(item =>
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )}
                </Form.Select>
                <Form.Select
                    onChange={e => typeSort.onChange(e)}
                    onBlur={e => typeSort.onBlur(e)}
                    className='m-2'
                >
                    <option
                        key=''
                        value=''
                    >
                        Select a type sort
                    </option>
                    {TYPES_SORT.map(item =>
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <button
                    variant='outline-success'
                    className='btn-primary m-2'
                    disabled={!typeSort.inputValid || !fieldName.inputValid}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                    }}
                    onClick={sort}
                >
                    Sort
                </button>
                <button 
                    className="btn-danger"
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

export default SortForm;