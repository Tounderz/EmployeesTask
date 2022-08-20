import { useEffect, useState } from "react";

export const useInput = (intialValue, validations) => {
    const [value, setValue] = useState(intialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target?.value || '')
    }

    const onAge = (e) => {
        setValue(e.target?.value || new Date())
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onAge,
        onBlur,
        isDirty,
        ...valid
    }
}

const useValidation = (value, validations) => {
    const [minLengthError, setMinLengthError] = useState(false);
    const [isNumberError, setIsNumberError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch(validation) {
                case 'minLength':
                    value.length < validations[validation].value ? setMinLengthError(true) : setMinLengthError(false); 
                    setMessageError(`The '${validations[validation].name}' field can't to empty and less than ${validations[validation].value} characters.`);
                    break;
                case 'isNumberId':
                    Number(value) < 1 ? setIsNumberError(true) : setIsNumberError(false);
                    setMessageError(`The '${validations[validation].name}' field can't to empty.`);
                    break;
                case 'age':
                    const now = new Date();
                    const date = new Date(value);
                    const age = now.getFullYear() - date.getFullYear();
                    (age > 60 || age < 16) ? setDateError(true) : setDateError(false);
                    setMessageError(`You are either too young or you are already retired!`)
                    break;
                default:
                    break;
            }
        }
    }, [validations, value])

    useEffect(() => {
        if (minLengthError || isNumberError || dateError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [minLengthError, isNumberError, dateError])

    return {
        minLengthError,
        isNumberError,
        dateError,
        messageError,
        inputValid
    }
}