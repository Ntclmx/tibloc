import React from "react";
import Row from "react-bootstrap/esm/Row";

const ArticleCard = () => {
    return(
      <>
        <Row> Articles </Row>
        <Row>
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.2</p>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.3</p>
            </div>
        </div>
        </Row>
        
    </>  
    );
}

export default ArticleCard;