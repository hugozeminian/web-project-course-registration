# course-registration-client-server

# Web Programming SODV2201 Assignment and Project work 2023

# Assignments/Project overview

Bow Course registration fullstack web application
This course work should be done with a group of 3 or 4 to fulfill the assessment of SODV2201 web programming course.
Please join a group on d2l-communication-group tab. If you don’t join the group on d2l before A1 is due you will get zero.
Bow online course registration is an online application that allow students to register for selected program in software development department (SD department)
    • SD department has the following programs.
        1. diploma (2 years),
        2. post diploma (1 year),
        3. certificate (3 months and 6 months),
            o A student for certificate program can take only one course and get certified at a time.
        • For each program, the following details should be visible on the system.
            o Course code, course name, starting date, ending date, fees, and description.
        • A student who joined a diploma or post diploma program can register for 2 -5 courses per term. Before students can select the courses, they must select the term.
        • Also, if the student want to view all courses for each program and term they can view
        • Students can’t register for the same course at the same time. But they can re-register again if they fail before.
        • Students can select or deselect courses to register on the interface.

# Sample data
    - Term1 (September 1 – December 20 )
        o Project management1, Pr111
        o C++ Programming Fundamentals , C++111
        o Computer Maintenance, CompM1111
        o Information Security1, IS1111
    - Term2 (Jan 5 – May 2)
        o Networking, Net222
        o Web technology, Web222
        o Project Management, Pro222
    - Term3 (Sept 1 - December 20)
        o Advanced Project management1, Pr333
        o Advanced C++ Programming Fundamentals ,C++333
        o Advanced Computer Maintenance, CompM333
        o Advanced Information Security1, IS333
    - Term4 (Jan 5 – May 2)
        o Advanced Networking, Net444
        o Advanced Web technology, Web444
        o Advanced Project Management, Pro444


- The Bow system administrator has a separate login page to do the following.
    1. Add new course details including course name, course starting and ending dates, and any other course related information.
    2. Can search specific course using course name or course code
    3. Delete courses from the system.
    4. View list of registered students for different program
    5. View any form submitted from students.

- On Bow course registration system students can do the following
    1. They can search for available courses from the website using course name or course code.
    2. They can send questions using contact forms to the admin
    3. If a student wants to register for a particular program and or a selected course, he/she must sign up.
    4. The signup page collects students detailed information first name, last name, email, phone, dob, department, program, username, and password.
    5. Bow course registration system generates a studentID for a registered user and redirects them to a login page to sign in again or to a welcome home page, you can choose any of the options.

# Direction
The objective of this use case is to give you an idea what aspects to include in your project. As a starting point you can use what is explained above and add different features and modification to it to meet your front-end and backend application development need as you learn progressively.
This project has 3 parts Assignment 1 and Assignment 2 and a final project. Assignment1 outcome will be used as input for your Assignment2. Then the combined final submission of this two-assignment work will be taken as your course project work. There will be a set of special features in each phase of this assessment. There will be optional check in and questions at the end of each phase.
Assignment 1:
Assignment expectation
    ● Implement your understanding of web application architecture in your web project.
    ● Study the different scenario of the project to come up with inclusive wireframe design (structure of the website)
    ● Prepare a prototype design of your web application.
    ● Implementation should be done using react.js and related packages.
    ● Adhere to formal project work file structure and good naming convention.
    ● Store all course and students related data using array or object.

# For assignment 1 your task is to design and create a front-end web application React.js and access data stored as array or object. This assignment is worth a total of 15 percent of your final mark.
Wireframe design Frontend Design Process
As in any large software project, you should take some time to consider your front-end design before starting the implementation. Consider the following questions while coming up with your design:
    1. What are my different pages?
    a. Which parts of these pages should be components?
    b. Which parts of these pages should be elements?
    c. Where and how should I store my state? Which elements can be stateless?
    d. How should the state be transferred between components and elements?
    2. How can my frontend use an API to access data from a database?
    3. Which portions of my design are reusable?
    4. How should I handle state changes?
    5. Is my design modular?
    a. Does this design exhibit low coupling and high cohesion?
    6. Is my design easily updatable or customizable?

# Implementation
Implementing Your project
Remember to keep the following in mind as you write and test your code:
    1. Does this code adhere to the design?
    a. If not, is that an implementation oversight or a design oversight?
    2. Is this code maintainable?
    a. Does it detect and handle strange input parameters?
    b. Does it correctly leverage the framework I am using?
    c. Does it use proper packages and tools?
    3. Is this code efficient?
    a. If not, is it worth the cost in time and readability to fix that?
    4. At this point you can recode the front end as well as the back end to meet any specific need
    5. Much like your frontend, you should think carefully about your design before you start implementing any code. Consult your sketch and consider the back and front end to sync each other.

# What to submit for A1
You are expected to make progress on your site throughout the semester. You must meet the following conditions as part of A1 submission:
    1. Project file zipped and uploaded on D2L A1 dropbox (10-to-15-minute demonstration video recording)
    2. Must be capable of running on a local machine.
    3. It should have full functionality of react based UI and user interaction feature.
    4. Each student must demonstrate the submission if requested.

# Assignment 2:
Assignment expectation
    ● Prepare the backend design of your website. Make sure it aligns to what you built on A1.
    ● Implement backend web server using Node.Js and SQL/MySQL or MongoDB server, .JSON file etc as data storage.
    ● Create different local APIs to process data from your database.
    ● Discuss your ERD diagram or file structure to make sure the schema accommodates the features of your front-end website. You should be able to run, connect to, and query your dataset/database and populate the database with sample record/update the dataset.
    ● Which API should you implement to retrieve information to/from the Bow course registration system?

# Assignment2 Requirements
In this part of the assignment2, you should work on
    1. Working database schema implementation populated with sample data or structured dataset source.
    2. Working web server setup
    3. Backend web application and database/dataset integration
    4. Local APIs to fetch data to/from your database/dataset (you can use postman for testing)
    5. Security and validity feature
    6. Login or session management

# What to submit for A2
Consider the following to submit as A2 file
    1. Node.js project file zipped and uploaded on D2L A2 dropbox (10-to-15-minute demonstration video recording)
    2. Must be capable of running on a local machine.
    3. It should have full functionality of fetching data from your data storage, validation, and certain level of security implementation by the time this assignment is due.
    4. Each student must demonstrate the submission if requested.

# Final Project
Front End and Back End integration
Implementation
In this final project phase, you are expected to integrate your front-end work from A1 with your A2 backend project. Then instead of using postman or backend html page to utilize your backend data storage and API you will use your react UI.
Much like your frontend, you should think carefully about your design before you start implementing any code. Consult your sketch and consider the following questions:
    1. Which API should get information to/from Bow registration system?
    2. Proper use and implementation of APIs to work on Bow registration system UI.
    3. What is the input and output of any functions I need? Are there edge cases?
    1. How should I structure my end points?
    2. How will I manage login and sessions?
    4. Is my design modular?
    1. Does this design exhibit low coupling and high cohesion?

# What to submit for Final project
To pass A2, your back end must meet the following conditions:
    1. Fullstack project that contains both front-end react project and backend node.js project file zipped and uploaded on D2L project dropbox
    2. Upload a 10-to-15-minute demonstration video recording
    3. Must be capable of running on a local machine.
    4. Full functionality to allow students to search and register for a course. Admin to be able to work some admin related task. Be able to add or remove course, be able to get message from students etc.
    5. Each student must demonstrate the submission if requested.
