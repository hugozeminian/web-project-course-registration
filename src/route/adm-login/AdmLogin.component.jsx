import React from "react";
import { CardWrapper, CustomButton, CustomLink } from "./AdmLogin.styles";
import { Row, Col, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";

const AdmLogin = () => {
  return (
    <>
      <CardWrapper>
        <Card.Body>
          <Row>
            <Col xs="12" className="text-center">
              <FontAwesomeIcon
                icon={faIdBadge}
                size="5x"
                style={{ color: "var(--color_font2)" }}
              />
            </Col>
          </Row>
          <Form>
            <Row>
              <Col xs="12" md={6} className="mx-auto mt-4">
                <Form.Group>
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>Username:</strong>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter your username" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md={6} className="mx-auto mt-4">
                <Form.Group>
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>Password:</strong>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="text-center mt-4">
                <CustomButton variant="primary" type="submit">
                  Login
                </CustomButton>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="text-end mt-5">
                <Form.Label style={{ color: "var(--color_font2)" }}>
                  <CustomLink to="/login" style={{ color: "var(--color_font2)" }}>
                    Student access
                  </CustomLink>
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </CardWrapper>
    </>
  );
  };
  
  export default AdmLogin;
  