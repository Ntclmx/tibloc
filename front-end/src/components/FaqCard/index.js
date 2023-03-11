import React from "react";

const FaqCard = (props) => {

    const {question, answer} = props;
    return (
        <a class="nav-link" href="#question">{question}</a>
    );
}
  
export default FaqCard