import React, { useEffect, useState } from "react";
import Axios from 'axios';
import BasicCard from "../../components/BasicCard";
import Row from "react-bootstrap/esm/Row";


const ArticleCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/Faqs`)
      .then((result) => {
        const responseAPI = result.data;
        setArticles(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(events)
  //d-flex flex-row flex-nowrap overflow-auto

  return (
    <div className="mx-5 px-5">
      <h1 className="mt-5 mb-2 dashboardTextBold">Learn More</h1>
      <Row className="d-flex flex-row flex-nowrap overflow-auto ">
        {articles.map((article) => {
          return (
            <BasicCard
              img={`${process.env.REACT_APP_API_URL}/${article.eventLogo}`}
              title={article.question}
              date={article.createdAt}
              id={article._id}
              alt="alt aja"
            />
          );
        })}
      </Row>
    </div>
  );
};

export default ArticleCard;
