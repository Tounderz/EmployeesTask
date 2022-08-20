import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Context } from '../index';
import error404 from '../img/error404.jpg'

const ErrorPage = observer(() => {
    const {error} = useContext(Context)
    
    return (
        <Image
            src={error404}
            style={{
                width: '100%',
            }}
            placeholder={error.messageError}
        />  
    );
});

export default ErrorPage;