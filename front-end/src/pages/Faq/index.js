import React, { useEffect, useState } from "react";
import Axios from 'axios'
import FaqCard from "../../components/FaqCard";
import AnswerCard from "../../components/AnswerCard";
import './faq.css'

const Faq = () => {
    const [dataFaq, setDataFaq] = useState([]);
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/v1/faqs`)
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
            <nav id="navbar-example3" class="col-sm-3 flex-column align-items-stretch p-3 cardFindFAQ">
                <div className="">

                    <a class="navbar-brand " href="/Faq">FAQ & Article</a>
                    {
                        dataFaq.map(faq => {
                            return <FaqCard
                                key={faq._id}
                                question={faq.question}>
                            </FaqCard>
                        })
                    }
                </div>
            </nav>
            <div class="col-sm-8 ms-5 position-relative" data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabindex="0">
                {
                    dataFaq.map(faq => {
                        return <AnswerCard
                            key={faq._id}
                            question={faq.question}
                            answer={faq.answer}>
                        </AnswerCard>
                    })
                }
            </div>
        </div>
    )
};

export default Faq