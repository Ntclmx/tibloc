import React, { useEffect, useState } from "react";
import Axios from 'axios'
import FaqCard from "../../components/FaqCard";
import AnswerCard from "../../components/AnswerCard";

const Faq = () => {
    const [dataFaq, setDataFaq] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:4000/v1/faqs')
        .then(result => {
            console.log('data API', result.data);
            const responAPI = result.data;

            setDataFaq(responAPI.data);
        })
        .catch(err => {
            console.log('Error: ', err);
        })
    }, [])
    
    return (
        <div class="row"> 
            <nav id="navbar-example3" class="col-sm-3 navbar-light bg-light flex-column align-items-stretch">
                <a class="navbar-brand" href="/#">FAQ</a>
                <nav class="nav nav-pills flex-column">
                    {
                        dataFaq.map(faq => {
                            return <FaqCard 
                            key={faq._id}
                            question={faq.question}>
                            </FaqCard>
                        })
                    }   
                    {/* <nav class="nav nav-pills flex-column">
                        <a class="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                        <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                    </nav> */}
                    {/* <a class="nav-link" href="#item-2">Item 2</a>
                    <a class="nav-link" href="#item-3">Item 3</a> */}
                </nav>
                {/* <a class="navbar-brand" href="/#">Article</a>
                <nav class="nav nav-pills flex-column">
                    <a class="nav-link" href="#item-4">Item 4</a>
                    <a class="nav-link" href="#item-2">Item 2</a>
                    <a class="nav-link" href="#item-3">Item 3</a>
                </nav> */}
            </nav>   

            <div class="col-sm-9" data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabindex="0">
                {
                    dataFaq.map(faq => {
                        return <AnswerCard 
                        key={faq._id}
                        question={faq.question}
                        answer={faq.answer}>
                        </AnswerCard>
                    })
                }
                
                {/* <h4 id="item-1">Item 1</h4>
                <p>...</p> */}
                {/* <h5 id="item-1-1">Item 1-1</h5>
                <p>...</p>
                <h5 id="item-1-2">Item 1-2</h5>
                <p>...</p> */}
                {/* <h4 id="item-2">Item 2</h4>
                <p>...</p>
                <h4 id="item-3">Item 3</h4>
                <p>...</p> */}
            </div>
        </div>
    )
};

export default Faq