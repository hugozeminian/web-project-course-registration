import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { Container } from "react-bootstrap"

import Navigation from "./route/navigation/Navigation.component"
import Footer from "./components/footer/Footer.component"

import Home from "./route/home/Home.component"
import Login from './route/login/Login.component';
import AdmLogin from './route/adm-login/AdmLogin.component';
import SignUp from './route/sign-up/SignUp.component'
import UserDashboard from './route/user-dashboard/UserDashboard.component'
import Programs from './route/programs/Programs.component'
import Courses from './route/courses/Courses.component'
import About from './route/about/About.component'
import Profile from './route/profile/Profile.component'
import AddCourses from './route/add-courses/AddCourses.component'
import MyCourses from './route/my-courses/MyCourses.component'
import Contact from './route/contact/Contact.component'
import NewPassword from './route/new-password/NewPassword.component'
import AdmProfile from './route/adm-profile/AdmProfile.component'
import AdmAddCourses from './route/adm-add-courses/AdmAddCourses.component'
import AdmNewCourseForm from './route/adm-new-course-form/AdmNewCourseForm.component'
import AdmStudentList from './route/adm-student-list/AdmStudentList.component'
import AdmForms from './route/adm-forms/AdmForms.component'

import coursesDataJson from './util/json-information/courses.json'

const App = () => {

    const [coursesData, setCoursesData] = useState(coursesDataJson)

    return (
        <>
            <Navigation userName="User name!012" />
            <Container className="d-flex flex-column align-items-center" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
                <Routes>
                    <Route>
                        <Route index element={<Home />} />

                        <Route path='login' index element={<Login />} />
                        <Route path='adm-login' element={<AdmLogin />} />
                        <Route path='sign-up' element={<SignUp />} />

                        <Route path='user-dashboard' element={<UserDashboard />} />
                        <Route path='programs' element={<Programs />} />
                        <Route path='courses' element={<Courses coursesData={coursesData} addCourseButtonHidden={true}/>} />
                        <Route path='about' element={<About />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='add-courses' element={<AddCourses coursesData={coursesData} addCourseButtonHidden={false}/>} />
                        <Route path='my-courses' element={<MyCourses />} />
                        <Route path='contact' element={<Contact />} />

                        <Route path='new-password' element={<NewPassword />} />

                        <Route path='adm-profile' element={<AdmProfile />} />
                        <Route path='adm-add-courses' element={<AdmAddCourses />} />
                        <Route path='adm-new-course-form' element={<AdmNewCourseForm />} />
                        <Route path='adm-student-list' element={<AdmStudentList />} />
                        <Route path='adm-forms' element={<AdmForms />} />

                    </Route>
                </Routes>
            </Container>
            <Footer />
        </>
    )
}

export default App