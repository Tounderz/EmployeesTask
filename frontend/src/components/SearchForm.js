import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import { useInput } from '../http/validateApi';
import { searchEmployee } from '../http/employeeApi';
import { useNavigate } from 'react-router';
import { EMPLOYEES_ROUTE, ERROR_ROUTE, FIELD_NAMES } from '../utils/const';
import { observer } from 'mobx-react-lite';

const SearchForm = observer(() => {
    const {employee} = useContext(Context);
    const {error} = useContext(Context);
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});
    const fieldName = useInput('', {minLength: {value: 2, name: 'FieldName'}});
    const navigate = useNavigate();

    function onKeyPress(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            search();
        }
    }


    const search = async () => {
        try {
            const data = await searchEmployee(fieldName.value, searchParameter.value);
                employee.setEmployees(data.employees);
                navigate(EMPLOYEES_ROUTE);
        } catch (e) {
            error.setMessageError(e.response.data.message);
                navigate(ERROR_ROUTE);
        } finally {
            searchParameter.onChange('');
        }
    }

    return (
        <div className="d-flex">
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
            <Form.Control
                onKeyPress={onKeyPress}
                className='m-2'
                placeholder='Search'
                value={searchParameter.value}
                onChange={e => searchParameter.onChange(e)}
                onBlur={e => searchParameter.onBlur(e)}
            />
            <button
                className="btn btn-outline-success m-2"
                disabled={!searchParameter.inputValid || !fieldName.inputValid}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={search}
            >
                Search
            </button>
        </div>
    );
});

export default SearchForm;