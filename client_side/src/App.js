import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import View from "./route/view/View";
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
import AdmAddCourses from './route/adm-courses/AdmAddCourses.component'
import AdmNewCourseForm from './route/adm-new-course-form/AdmNewCourseForm.component'
import AdmStudentList from './route/adm-student-list/AdmStudentList.component'
import AdmForms from './route/adm-forms/AdmForms.component'

import NotFound from "./route/not-found/NotFound.component";
import { getAuthenticatedUser } from "./util/api/api";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const authenticatedUser = getAuthenticatedUser() || {};
        setIsAuthenticated(authenticatedUser.isAuthenticated)
    },[])


    return (
        <>
            <Routes>
                <Route element={<View />} isAuthenticated={isAuthenticated}>
                    <Route index element={<Home />} />

                    <Route path='login' index element={<Login />} />
                    <Route path='adm-login' element={<AdmLogin />} />
                    <Route path='sign-up' element={<SignUp />} />

                    <Route path='programs' element={<Programs />} />
                    <Route path='courses' element={<Courses />} />
                    <Route path='about' element={<About />} />
                    
                    <Route path='user-dashboard' element={<UserDashboard />} isAuthenticated={isAuthenticated}/>
                    <Route path='profile' element={<Profile />} isAuthenticated={isAuthenticated}/>
                    <Route path='add-courses' element={<AddCourses />} isAuthenticated={isAuthenticated}/>
                    <Route path='my-courses' element={<MyCourses />} isAuthenticated={isAuthenticated}/>
                    <Route path='contact' element={<Contact />} isAuthenticated={isAuthenticated}/>

                    <Route path='new-password' element={<NewPassword />} isAuthenticated={isAuthenticated}/>

                    <Route path='adm-profile' element={<AdmProfile />} isAuthenticated={isAuthenticated}/>
                    <Route path='adm-add-courses' element={<AdmAddCourses />} isAuthenticated={isAuthenticated}/>
                    <Route path='adm-new-course-form' element={<AdmNewCourseForm />} isAuthenticated={isAuthenticated}/>
                    <Route path='adm-student-list' element={<AdmStudentList />} isAuthenticated={isAuthenticated}/>
                    <Route path='adm-forms' element={<AdmForms />} isAuthenticated={isAuthenticated}/>

                    <Route path='*' element={<NotFound />} />

                </Route>
            </Routes>
        </>
    )
}

export default App