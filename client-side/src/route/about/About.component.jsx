import { CardWrapper } from "./About.styles";
import Card from "react-bootstrap/Card";

const About = () => {
  return (
    <>
      <CardWrapper>
        <Card.Body>
          <Card.Title style={{ color: "var(--color_font2)" }}>
          Web Programming SODV2201 Assignment and Project work 2023
          </Card.Title>
          <Card.Text>
          Project requirements:
          </Card.Text>
          <Card.Text>
          The Bow system administrator has a separate login page to do the following.
            <ul>
              <li> Add new course details including course name, course starting and ending dates, and any other course related information.</li>
              <li> Can search specific course using course name or course code</li>
              <li> Delete courses from the system.</li>
              <li> View list of registered students for different program</li>
              <li> View any form submitted from students.</li>
            </ul>
          </Card.Text>
          <Card.Text>
          On Bow course registration system students can do the following
            <ul>
              <li> They can search for available courses from the website using course name or course code.</li>
              <li> They can send questions using contact forms to the admin</li>
              <li> If a student wants to register for a particular program and or a selected course, he/she must sign up.</li>
              <li> The signup page collects students detailed information first name, last name, email, phone, dob, department, program, username, and password.</li>
              <li> Bow course registration system generates a studentID for a registered user and redirects them to a login page to sign in again or to a welcome home page, you can choose any of the options.</li>
            </ul>
          </Card.Text>
          <Card.Text>
            Group Members: Fabio, Hugo, Regina, Willian.
          </Card.Text>
        </Card.Body>
      </CardWrapper>
    </>
  );
};

export default About;
