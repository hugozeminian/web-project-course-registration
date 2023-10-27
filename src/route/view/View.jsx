import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "../navigation/Navigation.component";
import Footer from "../../components/footer/Footer.component";

const View = () => {
  const [navPageTitle, setNavPageTitle] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();

  const routeToTitles = {
    "/": {
      navPageTitle: "HOME",
      pageTitle: "BOW ONLINE COURSE REGISTRATION",
    },
    "/login": {
      navPageTitle: "LOGIN",
      pageTitle: "Go inside our portal as Student",
    },
    "/adm-login": {
      navPageTitle: "ADM-LOGIN",
      pageTitle: "Go inside our portal as Admin",
    },
    "/sign-up": {
      navPageTitle: "SIGN-UP",
      pageTitle: "Registration form",
    },
    "/user-dashboard": {
      navPageTitle: "DASHBOARD",
      pageTitle: "Welcome to your dashboard",
    },
    "/programs": {
      navPageTitle: "PROGRAMS",
      pageTitle: "Check our programs",
    },
    "/courses": {
      navPageTitle: "COURSES",
      pageTitle: "Software Development Department",
    },
    "/about": {
      navPageTitle: "ABOUT",
      pageTitle: "About our project group",
    },
    "/dashboard": {
      navPageTitle: "DASHBOARD",
      pageTitle: "Profile Information",
    },
    "/profile": {
      navPageTitle: "PROFILE",
      pageTitle: "Welcome to your Dashboard",
    },
    "/add-courses": {
      navPageTitle: "ADM-COURSES",
      pageTitle: "Software Development Department",
    },
    "/my-courses": {
      navPageTitle: "MY COURSES",
      pageTitle: "Software Development Department",
    },
    "/contact": {
      navPageTitle: "CONTACT",
      pageTitle: "Ask us a question",
    },
    "/new-password": {
      navPageTitle: "NEW PASSWORD",
      pageTitle: "Change Password",
    },
    "/adm-profile": {
      navPageTitle: "ADM-PROFILE",
      pageTitle: "Admin Profile Information",
    },
    "/adm-add-courses": {
      navPageTitle: "ADM-COURSES",
      pageTitle: "Software Development Department",
    },
    "/adm-new-course-form": {
      navPageTitle: "ADM-ADD NEW COURSES",
      pageTitle: "New Course Form",
    },
    "/adm-student-list": {
      navPageTitle: "ADM-STUDENT LIST",
      pageTitle: "Students Information List",
    },
    "/adm-forms": {
      navPageTitle: "ADM-FORMS LIST",
      pageTitle: "Student Questions List",
    },
  };

  useEffect(() => {
    const routePath = location.pathname;
    const titles = routeToTitles[routePath] || {
      navPageTitle: "ERROR 404",
      pageTitle: "ERROR 404 😔",
    };

    setPageTitle(titles.pageTitle || "");
    setNavPageTitle(titles.navPageTitle || "");
  }, [location]);

  return (
    <>
      <Navigation userName="User name!012" navPageTitle={navPageTitle} />
      <Container
        className="d-flex flex-column align-items-center"
        style={{ paddingTop: "40px", paddingBottom: "100px" }}>
        <h2 style={{ color: "var(--color_font2)", marginBottom: "20px" }}>
          <strong>{pageTitle}</strong>
        </h2>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default View;
