import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image } from 'react-bootstrap';
import employees from '../img/employees.jpg'

const HomePage = observer(() => {
    return (
        <Image
            src={employees}
            style={{
                width: '100%',
            }}
        />  
    );
});

export default HomePage;