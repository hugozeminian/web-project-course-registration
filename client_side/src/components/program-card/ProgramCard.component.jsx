import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col, Table } from "react-bootstrap";
import { CardWrapper, CustomTd } from "./ProgramCard.styles";
import { getFormattedDateFromDB, getFormattedMoney } from "../../util/general-functions/generalFunctions";

const ProgramCard = ({ programData }) => {
  const {
    ProgramID,
    ProgramName,
    Description,
    Term,
    Year,
    StartDate,
    EndDate,
    DomesticFees,
    InternationalFees,
    CourseMin,
    CourseMax,
    ProgramType,
    DepartmentName,
  } = programData || {};

  const startDateformatted = getFormattedDateFromDB(StartDate);
  const endDateformatted = getFormattedDateFromDB(EndDate);
  const domesticFeesFormatted = getFormattedMoney(DomesticFees);
  const internationalFeesFormatted = getFormattedMoney(InternationalFees);

  return (
    <>
      <CardWrapper>
        <Row>
          <Col>
            <div className="text-center">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>{ProgramName}</strong>
              </Card.Title>
            </div>
          </Col>
        </Row>

        <Card.Body>
          <Row>
            <Col xs="auto">
              <Card.Title style={{ color: "var(--color_font2)" }}>
                <strong>
                  Code: {Term}/{Year}
                </strong>
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={6}>
              <Card.Title className="mt-3" style={{ color: "var(--color_font2)" }}>
                <strong>Description: </strong>
              </Card.Title>
              <Card.Text style={{ color: "var(--color_font3)" }}>{Description}</Card.Text>
            </Col>
            <Col md={12} xl={6}>
              <div className="text-center">
                <Card.Title className="mt-3" style={{ color: "var(--color_font1)" }}>
                  <strong>
                    <em>{Term}</em>
                  </strong>
                </Card.Title>

                <Row>
                  <Col md={12} xl={6}>
                    <Card.Title style={{ color: "var(--color_font1)", fontSize: "var(--font-size-m1)" }}>
                      <strong>
                      Domestic: <em>{domesticFeesFormatted}</em>
                      </strong>
                    </Card.Title>
                  </Col>

                  <Col lg={12} xl={6}>
                  <Card.Title style={{ color: "var(--color_font1)", fontSize: "var(--font-size-m1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <strong>
                        International: <em>{internationalFeesFormatted}</em>
                      </strong>
                    </Card.Title>
                  </Col>
                </Row>
              </div>

              <Table hover>
                <tbody>
                  <tr>
                    <CustomTd>
                      <strong>Start date:</strong>
                    </CustomTd>
                    <CustomTd>{startDateformatted}</CustomTd>
                  </tr>
                  <tr>
                    <CustomTd>
                      <strong>End date:</strong>
                    </CustomTd>
                    <CustomTd>{endDateformatted}</CustomTd>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </CardWrapper>
    </>
  );
};

export default ProgramCard;
