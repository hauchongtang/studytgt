import React from "react";
import { Container, Col, Row } from "reactstrap";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";

const About = () => {
  return (
    <div
      style={{
        marginLeft: '0px',
        backgroundColor: 'white',
      }}
    >
      <Container>
        <Row>
          <Col  
            className=""
            xs={7}
          >
            <LeftPage />
          </Col>
          <Col  
            className=""
            xs={5}
          >
            <RightPage />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About;