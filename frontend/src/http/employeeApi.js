import axiosApi from "./axiosApi"

export const fetchEmployees = async () => {
    const {data} = await axiosApi.get('/employees/list');
    return data;
}

export const createEmployee = async (name, surname, patronymic, dateOfBirth, residentialAddress, department, aboutMe) => {
    const {data} = await axiosApi.post('/employees/create', {
            Name: name, Surname: surname, Patronymic: patronymic, 
            DateOfBirth: dateOfBirth, ResidentialAddress: residentialAddress, 
            Department: department, AboutMe: aboutMe
        });
    return data;
}

export const updateEmployee = async (id, name, surname, patronymic, dateOfBirth, residentialAddress, department, aboutMe) => {
    const {data} = await axiosApi.post('/employees/update', {
            Id: id, Name: name, Surname: surname, Patronymic: patronymic, 
            DateOfBirth: dateOfBirth, ResidentialAddress: residentialAddress, 
            Department: department, AboutMe: aboutMe
        });
    return data;
}

export const removeEmployee = async (id) => {
    const {data} = await axiosApi.delete(`/employees/delete?id=${id}`);
    return data;
}

export const searchEmployee = async (fieldName, parameter) => {
    const {data} = await axiosApi.post(`/employees/search`, { FieldName: fieldName, Parameter: parameter } );
    return data;
}

export const sortEmployees = async (fieldName, sortType) => {
    const {data} = await axiosApi.post(`/employees/sort`, { FieldName: fieldName, SortType: sortType });
    return data;
}