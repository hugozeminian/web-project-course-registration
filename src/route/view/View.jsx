import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "../navigation/Navigation.component";
import Footer from "../../components/footer/Footer.component";
import { getAuthenticatedUser } from "../../util/api/api";

const View = () => {
  const [navPageTitle, setNavPageTitle] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const location = useLocation();
  const navigate = useNavigate()

  const routeToTitles = {
    "/": {
      navPageTitle: "HOME",
      pageTitle: "BOW ONLINE COURSE REGISTRATION",
    },
    "/login": {
      navPageTitle: "LOGIN",
      pageTitle: "Student Login",
    },
    "/adm-login": {
      navPageTitle: "ADM-LOGIN",
      pageTitle: "Admin Login",
    },
    "/sign-up": {
      navPageTitle: "SIGN-UP",
      pageTitle: "Registration Form",
    },
    "/user-dashboard": {
      navPageTitle: "DASHBOARD",
      pageTitle: "Welcome To Your Dashboard",
      pageProtected: true
    },
    "/programs": {
      navPageTitle: "PROGRAMS",
      pageTitle: "Check Our Programs",
    },
    "/courses": {
      navPageTitle: "COURSES",
      pageTitle: "Software Development Department",
    },
    "/about": {
      navPageTitle: "ABOUT",
      pageTitle: "About Our Project Group",
    },
    "/profile": {
      navPageTitle: "PROFILE",
      pageTitle: "Profile Information",
      pageProtected: true
    },
    "/add-courses": {
      navPageTitle: "ADM-COURSES",
      pageTitle: "Software Development Department",
      pageProtected: true,
    },
    "/my-courses": {
      navPageTitle: "MY COURSES",
      pageTitle: "Software Development Department",
      pageProtected: true
    },
    "/contact": {
      navPageTitle: "CONTACT",
      pageTitle: "Ask Us A Question",
      pageProtected: true
    },
    "/new-password": {
      navPageTitle: "NEW PASSWORD",
      pageTitle: "Change Password",
      pageProtected: true
    },
    "/adm-profile": {
      navPageTitle: "ADM-PROFILE",
      pageTitle: "Admin Profile Information",
      pageProtected: true,
      admAccessLevel: true
    },
    "/adm-add-courses": {
      navPageTitle: "ADM-COURSES",
      pageTitle: "Software Development Department",
      pageProtected: true,
      admAccessLevel: true
    },
    "/adm-new-course-form": {
      navPageTitle: "ADM-ADD NEW COURSES",
      pageTitle: "New Course Form",
      pageProtected: true,
      admAccessLevel: true
    },
    "/adm-student-list": {
      navPageTitle: "ADM-STUDENT LIST",
      pageTitle: "Students Information List",
      pageProtected: true,
      admAccessLevel: true
    },
    "/adm-forms": {
      navPageTitle: "ADM-FORMS LIST",
      pageTitle: "Student Questions List",
      pageProtected: true,
      admAccessLevel: true
    },
  };
  

  useEffect(() => {
    const routePath = location.pathname;
    const pageData = routeToTitles[routePath] || {
      navPageTitle: "ERROR 404",
      pageTitle: "ERROR 404 😔",
    };

    setNavPageTitle(pageData.navPageTitle || "");
    setPageTitle(pageData.pageTitle || "");

    const authenticatedUser = getAuthenticatedUser() || {};
    const {isAuthenticated, isAdmin} = authenticatedUser || false

  if (pageData.pageProtected) {
    if (!isAuthenticated) {
      console.log('User is not authenticated for this protected route');
      navigate("/login");
    }
  }

  if (pageData.admAccessLevel) {
    if (!isAdmin) {
      console.log('The user is not an Admin');
      navigate("/adm-login");
    }
  }
  }, [location]);

  

  return (
    <>
      <Navigation navPageTitle={navPageTitle} />
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
