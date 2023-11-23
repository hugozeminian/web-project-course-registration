import React, { useState } from "react";
import { CardWrapper, CustomButton, CustomLink } from "./Login.styles";
import { Row, Col, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { loginVerification } from "../../util/api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const userLoginData = {
      userName: form.username.value,
      password: form.current_password.value,
      accessLevel: 1,
    };
    const isLoginValid = await loginVerification(userLoginData);
    if (isLoginValid) {
      navigate("/user-dashboard");
      window.location.reload();
    } else {
      setLoginError("Invalid login credentials");
    }
  };

  return (
    <>
      <CardWrapper>
        <Card.Body>
          <Row>
            <Col xs="12" className="text-center">
              <FontAwesomeIcon
                icon={faUser}
                size="5x"
                style={{ color: "var(--color_font2)" }}
              />
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs="12" md={6} className="mx-auto mt-4">
                <Form.Group>
                  <Form.Label style={{ color: "var(--color_font2)" }}>
                    <strong>Username:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                  />
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
                    name="current_password"
                  />
                </Form.Group>
              </Col>
            </Row>

            {loginError && (
              <Row>
                <Col xs="12" className="text-center mt-4">
                  <p style={{ color: "red" }}>{loginError}</p>
                </Col>
              </Row>
            )}

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
                  <CustomLink
                    to="/adm-login"
                    style={{ color: "var(--color_font2)" }}>
                    Admin access
                  </CustomLink>
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </CardWrapper>
      <Row>
        <Col xs="12">
          <Form.Label style={{ color: "var(--color_font2)" }}>
            Not registered? Sign-Up <CustomLink to="/sign-up">here!</CustomLink>
          </Form.Label>
        </Col>
      </Row>
    </>
  );
};

export default Login;
