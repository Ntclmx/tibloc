import React from "react";

const FaqCard = (props) => {

    const {question} = props;
    return (
        <nav class="nav nav-pills flex-column">
            <a class="nav-link" href={'#' + question}>{question}</a>
        </nav>
    );       
}

export default FaqCard