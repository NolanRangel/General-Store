import React from 'react';
import { Alert } from 'react-bootstrap'



const Message = ({ variant, children }) => {


    return <Alert variant={variant}>
        {children}
    </Alert>;


};

// originally MessageChannel
Message.defaultProps = {
    variant: 'info',
}


export default Message;
