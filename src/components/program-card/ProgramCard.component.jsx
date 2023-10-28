import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col, Table } from "react-bootstrap";
import { CardWrapper, CustomTd } from "./ProgramCard.styles";

function ProgramCard({ programData }) {
  const {
    title,
    program_code,
    description,
    season,
    start_date,
    end_date,
    fees,
  } = programData || {};

  return (
    <>
      <CardWrapper>
        <Row>
          <Col>
            <div className="text-center">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>{title}</strong>
              </Card.Title>
            </div>
          </Col>
        </Row>

        <Card.Body>
          <Row>
            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>Code: {program_code}</strong>
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={6}>
              <Card.Title
                className="mt-3"
                style={{ color: "var(--color_font2)" }}>
                <strong>Description: </strong>
              </Card.Title>
              <Card.Text style={{ color: "var(--color_font3)" }}>
                {description}
              </Card.Text>
            </Col>
            <Col md={12} xl={6}>
              <div className="text-center">
                <Card.Title
                  className="mt-3"
                  style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{season}</em>
                  </strong>
                </Card.Title>
                <Card.Title style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{fees}</em>
                  </strong>
                </Card.Title>
              </div>

              <Table hover>
                <tbody>
                  <tr>
                    <CustomTd>
                      <strong>Start date:</strong>
                    </CustomTd>
                    <CustomTd>{start_date}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>End date:</strong>
                    </CustomTd>
                    <CustomTd>{end_date}</CustomTd>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </CardWrapper>
    </>
  );
}

export default ProgramCard;
