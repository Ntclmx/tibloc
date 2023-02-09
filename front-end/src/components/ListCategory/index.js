import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const ListCategory = () => {
    return(
        <div class="p-3 border">
            <Row>
                <Col><div class="p-3 border bg-light">Category1</div></Col>
                <Col><div class="p-3 border bg-light">Category2</div></Col>
                <Col><div class="p-3 border bg-light">Category3</div></Col>
                <Col><div class="p-3 border bg-light">Category4</div></Col>
                <Col><div class="p-3 border bg-light">Category5</div></Col>
            </Row>
            <Row>
                <Col><div class="p-3 border bg-light">List1</div></Col>
                <Col><div class="p-3 border bg-light">List2</div></Col>
                <Col><div class="p-3 border bg-light">List3</div></Col>
                <Col><div class="p-3 border bg-light">List4</div></Col>
            </Row>
        </div>
    );
}

export default ListCategory;