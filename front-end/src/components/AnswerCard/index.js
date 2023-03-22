import React from "react";

const AnswerCard = (props) => {

    const {question, answer} = props;
    return (
        <>  
            <h4 id={question}>{question}</h4>
            <p>{answer}</p>
        </>
        // <p>{answer}</p>
    );
}
  
export default AnswerCard