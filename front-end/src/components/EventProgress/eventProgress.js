import React, { useState, useEffect } from 'react'
import 'bs-stepper/dist/css/bs-stepper.min.css';
import { withRouter, Link } from 'react-router-dom';

const EventProgress = (props) => {
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        const eventId = props.match.params.id;
        if (eventId) {
            setIsUpdate(true);
        }
    }, [props]);
    
    
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className='w-50'>
            <div id="stepper1" class="bs-stepper">
            <div class="bs-stepper-header">
                <div class="step" data-target="#test-l-1">
                <Link to={isUpdate ? `/edit-event/events/${props.match.params.id}`  : "/create-event/events"}>
                    <button class="step-trigger">
                        <div class="bs-stepper-circle">1</div>
                        <div class="bs-stepper-label">Event</div>
                    </button>
                </Link>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#test-l-2">
                <Link to={isUpdate ? `/edit-event/tickets/${props.match.params.id}`  : "/create-event/tickets"}>
                    <button class="step-trigger">
                        <div class="bs-stepper-circle">2</div>
                        <div class="bs-stepper-label">Tickets</div>
                    </button>
                </Link>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default withRouter(EventProgress);