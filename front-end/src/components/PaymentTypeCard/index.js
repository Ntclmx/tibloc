import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './paymentTypeCardImage.css'

const PaymentTypeCard = (props) => {

    const [isActive, setIsActive] = useState(false);

    if (isActive) {
        if (props.choosePaymentId !== props._id) {
            setIsActive(false);
        }
    }

    const choosePaymentFunc = () => {
        if (isActive === false) {

            setIsActive(true);
            props.finalPaymentFunc(props.paymentTypeName, props._id)
            
        } else {
            
            props.finalPaymentFunc('-', '-')
            setIsActive(false);
        }
    };

    return (
        <Card className={isActive ? 'col-4 text-center paymentTypeCardActive' : 'col-4 text-center paymentTypeCard'} onClick={choosePaymentFunc}>
            <Card.Img variant="top" src={props.paymentTypeLogo} className='paymentTypeCardImage' />
            <Card.Body>
                <Card.Text className='text-uppercase'>
                    {props.paymentTypeName}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PaymentTypeCard