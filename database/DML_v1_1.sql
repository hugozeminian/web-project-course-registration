
USE BowRegistration;


INSERT INTO AccessLevel (LevelID, LevelName)
VALUES
    (0, 'guest'),
    (1, 'student'),
    (99, 'administrator');


INSERT INTO Department 
	(DepartmentName) VALUES
    ('Software Development');


INSERT INTO ProgramType 
	(ProgramType) VALUES
	('Diploma'),
	('Post-Diploma'),
	('Certificate');


INSERT INTO Term 
	(Term,			[Year]) VALUES
    ('Spring',		2024),
	('Summer',		2024),
	('Fall',		2024),
	('Winter',		2024),
	('Spring',		2025),
	('Summer',		2025),
	('Fall',		2025),
	('Winter',		2025),
	('Spring',		2026),
	('Summer',		2026),
	('Fall',		2026),
	('Winter',		2026);


INSERT INTO Program 
	([Description], 
	ProgramName,					DepartmentID,	[TypeID],		TermID,		[Year],	
	StartDate,		EndDate,		DomesticFees,	InternationalFees,		CourseMin,		CourseMax) VALUES
    ('A comprehensive two-year software development diploma program designed to equip students with advanced coding skills and industry-ready expertise. Join us this winter and embark on a journey to a rewarding tech career.', 
	'Software Development',			100,			100,		103,	    2024,		
	'2024-01-10',	'2025-12-23',	10000.00,		30000.00,				2,				5),

	('Jumpstart your tech career with our one-year post-diploma program in software development. Gain specialized knowledge in a fall session that starts in September and concludes in June, making you job-ready.', 
	'Software Development',			100,			101,		103,		2024,	
	'2024-01-10',	'2025-01-24',	10000.00,		30000.00,				2,				5),

	('In just three months, our spring program offers a focused certificate in software development. Perfect for those seeking a quick entry into the tech world, with affordable fees for both domestic and international students', 
	'Software Development',			100,			102,		100,		2024,			
	'2024-03-01',	'2025-05-31',	10000.00,		30000.00,				2,				5),

	('Our summer certificate program spans six months, offering an in-depth exploration of software development. Enjoy a longer learning journey with a comprehensive curriculum, ideal for students aiming for excellence.', 
	'Software Development',			100,			102,		101,		2024,			
	'2024-06-15',	'2025-12-15',	10000.00,		30000.00,				2,				5),

	('Explore our one-year post-diploma program in software development, beginning in the fall. This program provides a deeper dive into software development, preparing you for a rewarding career in tech.', 
	'Software Development',			100,			101,		106,		2025,			
	'2025-09-03',	'2026-08-31',	10000.00,		30000.00,				2,				5),

	('Embark on a comprehensive two-year software development diploma program designed to equip students with advanced coding skills and industry-ready expertise. Join us this winter and start your journey to a rewarding tech career.', 
	'Software Development',			100,			100,		103,		2024,	
	'2024-01-10',	'2025-12-23',	10000.00,		30000.00,				2,				5),

	('Jumpstart your tech career with our one-year post-diploma program in software development. Gain specialized knowledge in a fall session that starts in September and concludes in June, making you job-ready.', 
	'Software Development',			100,			101,		103,		2024,	
	'2024-01-10',	'2025-01-24',	10000.00,		30000.00,				1,				1),

	('In just three months, our spring program offers a focused certificate in software development. Perfect for those seeking a quick entry into the tech world, with affordable fees for both domestic and international students.', 
	'Software Development',			100,			102,		101,		2024,	
	'2024-03-01',	'2025-05-31',	10000.00,		30000.00,				1,				1),

	('Our summer certificate program spans six months, offering an in-depth exploration of software development. Enjoy a longer learning journey with a comprehensive curriculum, ideal for students aiming for excellence.', 
	'Software Development',			100,			102,		101,		2024,	
	'2024-06-15',	'2025-12-15',	10000.00,		30000.00,				2,				5),

	('Explore our one-year post-diploma program in software development, beginning in the fall. This program provides a deeper dive into software development, preparing you for a rewarding career in tech.', 
	'Software Development',			100,			101,		106,		2025,	
	'2025-09-03',	'2026-08-31',	10000.00,		30000.00,				2,				5);



INSERT INTO Login 
	(UserName,			Password,	LevelID) VALUES
	('guestUser',		'$2b$10$SS5ZdUBsA9SNs1htwkdDVuzV3wCSQDHF7mNANWbKAEoVa.wzLxmOi',		0), -- guest

	('student',			'$2b$10$O0XYLVSz4vY.kLLEsl5GXe8Vcg2JJ7F6BtnqzwUcRyH7Q5/kEn3fS',		1), -- student
	('johndoe123',		'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		1), 
	('janesmith456',	'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		1),
	('michaelj',		'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		1),
	('hugo',			'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		1),

	('adminUser',		'$2b$10$Mp2lNGYNLJ5n3HSVfEib/ejYcujupDUgdGjGt.YoGktqP/A67n/G.',		99), -- admin
    ('regina',			'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		99),
	('fabio',			'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		99),
	('will',			'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		99),
	('hugo-adm',		'$2b$10$MVkZc7VZB/ytWsX0U0Q9eexFtALHnpXX9Wifbcw.cNf5MO/5FG7QW',		99);


INSERT INTO Student 
	(Username,			FirstName,		MiddleName,		LastName,		Phone,						Email,								DateOfBirth,		ProgramID) VALUES
    ('johndoe123',		'John',			'M',			'Doe',			'+1 (123) 456-7890',		'john.doe@example.com',				'1998-05-15',		101),
	('janesmith456',	'Jane',			NULL,			'Smith',		'+1 (234) 567-8901',		'jane.smith@example.com',			'1997-08-20',		102),
	('michaelj',		'Michael',		NULL,			'Johnson',		'+1 (345) 678-9012',		'michael.johnson@example.com',		'1998-05-15',		103),
	('hugo',			'Hugo',			NULL,			'Camargo',		'+1 (123) 456-7890',		'hugo.camargo@example.com',		'1998-05-15',		100);


INSERT INTO Admin 
	(Username,		FirstName,		MiddleName,		LastName,		Phone,							Email,								DateOfBirth)VALUES
    ('adminUser',	'Admin',		NULL,			'User',			'+1 (123) 456-7890',			'admin@example.com',				'1990-01-01'),
	('regina',		'Regina',		NULL,			'Sirotkina',	'+1 (123) 456-7890',			'regina.sirotkina@example.com',		'1998-05-15'),
	('fabio',		'Fabio',		NULL,			'Weck',			'+1 (123) 456-7890',			'fabio.weck@example.com',			'1998-05-15'),
	('will',		'Will',			NULL,			'Munhoz',		'+1 (123) 456-7890',			'will.munhoz@example.com',			'1998-05-15'),
	('hugo-adm',	'Hugo',			NULL,			'Camargo',		'+1 (123) 456-7890',			'Hugo.Camargo@example.com',			'2000-10-13');


INSERT INTO Contact 
	(Name,					Email,							Date,				Message) VALUES
    ('Alice Johnson',		'alice.j@example.com',			'2023-10-29',		'What programming languages are covered in the software development course?'),
	('Bob Smith',			'bob.s@example.com',			'2023-10-30',		'Are there any hands-on coding projects or assignments in the course?'),
	('Eva Davis',			'eva.d@example.com',			'2023-10-31',		'Do you offer any certifications or assessments at the end of the course?'),
	('David Wilson',		'david.w@example.com',			'2023-11-01',		'Can you tell me more about the instructors and their industry experience?'),
	('Sophia Brown',		'sophia.b@example.com',			'2023-11-02',		'How do I enroll in the software development course, and what are the fees and payment options?'),
	('John Doe',			'john.doe@example.com',			'2023-11-03',		'What programming languages are covered in the software development course?'),
	('Mary Johnson',		'mary.j@example.com',			'2023-11-04',		'Are there any hands-on coding projects or assignments in the course?'),
	('Michael Smith',		'michael.s@example.com',		'2023-11-05',		'Do you offer any certifications or assessments at the end of the course?'),
	('Emma Davis',			'emma.d@example.com',			'2023-11-06',		'Can you tell me more about the instructors and their industry experience?'),
	('William Wilson',		'william.w@example.com',		'2023-11-07',		'How do I enroll in the software development course, and what are the fees and payment options?');


INSERT INTO DeliveryMode 
	(Name) VALUES
    ('ATOL'),
    ('RTOL'),
	('In-Class'),
	('Hybrid');


INSERT INTO Campus 
	(CampusName) VALUES
    ('Calgary'),
    ('Airdrie'),
	('Banff'),
	('Okotoks'),
	('Cochrane');


INSERT INTO Course 
	(CourseCode,	Section,	ProgramID,	    [Name],									[Description], 
	TermID,			[Year],		[Days],			[Hours],					StartDate,			EndDate,        	CampusID,			Room,		DomesticFees,	InternationalFees,		SeatsAvailable,		ClassSize,		DeliveryMode) VALUES
	('CM0101',		'1',		100,		    'Creative Coding Workshop',				'Take a deep dive into the world of web development with our Full-Stack Web Development Bootcamp. In this intensive program, you will master web development from front-end to back-end, equipping you with the latest technologies and frameworks to build modern web applications. Whether you are a beginner or an experienced developer looking to expand your skill set, this bootcamp will help you achieve your goals. This any-time online program offers a collaborative learning environment and has a limited number of seats available, so reserve your spot now to secure your future in web development.', 
	103,			2024,		'Saturdays',	'10:00 AM - 12:00 PM',		'2024-01-10',		'2025-12-23',		1,					'N101',		500.00,			1500.00,				25,					40,			    'ATOL'),
 
	('CS0202',      '1',        100,            'Full-Stack Web Development',			'Take a deep dive into the world of web development with our Full-Stack Web Development Bootcamp. In this intensive program, you will master web development from front-end to back-end, equipping you with the latest technologies and frameworks to build modern web applications. Whether you are a beginner or an experienced developer looking to expand your skill set, this bootcamp will help you achieve your goals. This hybrid program offers a collaborative learning environment and has a limited number of seats available, so reserve your spot now to secure your future in web development.', 
	103,            2024,       'Mondays',      '6:30 PM - 8:30 PM',        '2024-01-10',       '2025-12-23',		2,					'N111',     500.00,         1500.00,                15,                 40,             'Hybrid'),
	
	('DB0303',      '1',        100,			'Database Design and Management',		'Dive into the world of database design and management in our comprehensive course. Get hands-on experience designing and managing databases, learn SQL, data modeling, and discover how to ensure data security and integrity. Our expert instructors will guide you through the intricacies of database management, providing you with valuable skills and knowledge.  This hybrid course offers a unique opportunity to become proficient in database design and management. With 25 seats available, secure your spot and embark on a journey to become a database expert.', 
	103,            2024,       'Tuesdays',     '7:00 PM - 9:00 PM',		'2024-01-10',       '2025-12-23',		3,					'N121',     500.00,         1500.00,                1,                  40,             'Hybrid'),
	
	('AI0404',      '1',        100,            'Artificial Intelligence Masterclass',	'Embark on an exciting journey into the world of artificial intelligence with our masterclass. Dive deep into machine learning, explore neural networks, and understand the intricacies of natural language processing. This comprehensive program will help you unlock the potential of AI and its applications in various domains. This in-class, so reserve your spot to become an AI expert.', 
	103,            2024,       'Thursdays',    '5:30 PM - 7:30 PM',		'2024-01-10',       '2025-12-23',		4,					'N131',     500.00,         1500.00,                20,                 40,             'In-Class'),
	
	('UX0505',      '1',        100,            'User Experience Design Workshop',		'Join our User Experience Design Workshop and learn to create intuitive and user-friendly interfaces. Explore UX research, wireframing, and prototyping to design products that users will love. This immersive program will equip you with the skills and knowledge to excel in the field of user experience design. This hybrid course provides a unique opportunity to become a UX design expert.', 
	103,            2024,       'Saturdays',    '1:00 PM - 3:00 PM',		'2024-01-10',	    '2025-12-23',		5,					'N141',     500.00,         1500.00,                30,                 40,             'Hybrid'),
		   
	('ML1010',      '1',	    101,			'Machine Learning Fundamentals',		'Delve into the fascinating world of machine learning with our Machine Learning Fundamentals course. Learn about various machine learning algorithms, deep learning techniques, and the applications of AI in different domains. This in-depth program will help you master the art of machine learning. This any-time online program provides a collaborative learning environment and has a limited number of seats, so secure your spot now to become a machine learning expert.', 
	103,            2024,       'Mondays',      '6:00 PM - 8:00 PM',		'2024-01-10',       '2025-01-24',		1,					'N151',     500.00,         1500.00,                25,                 40,             'ATOL'),
		   
	('DS0606',      '1',	    101,			'Data Structures and Algorithms',		'Master the fundamentals of data structures and algorithms in this intensive summer course. Learn about various data structures, algorithm design, and their applications in solving real-world problems. This class-based program offers a collaborative learning environment and has a limited number of seats, so reserve your spot now to become a data structures and algorithms expert.', 
	100,            2024,       'Wednesdays',   '5:00 PM - 7:00 PM',        '2024-01-10',      '2025-01-24',		2,					'N161',     500.00,         1500.00,                30,                 40,             'In-Class'),
		   
	('SD0707',      '1',	    102,			'Software Development Best Practices',	'Enhance your software development skills by learning best practices in this spring course. Explore software design patterns, code quality, and development methodologies. This real-time online course provides a unique opportunity to become a software development expert.', 
	100,            2024,	    'Tuesdays',    '6:30 PM - 8:30 PM',        '2024-03-01',       '2025-05-31',		3,					'N171',     500.00,         1500.00,                26,                 40,             'RTOL'),
		   
	('SE0909',      '1',	    103,			'Software Engineering Principles',		'Learn the principles of software engineering in this comprehensive fall course. Explore software development methodologies, project management, and quality assurance. This class-based program provides a collaborative learning environment and has a limited number of seats, so secure your spot now to become a software engineering expert.', 
	101,            2024,       'Thursdays',    '6:00 PM - 8:00 PM',        '2024-06-15',       '2025-12-15',       4,					'N181',     500.00,         1500.00,                34,                 40,             'In-Class'),		 
		   
	('JS1010',      '1',	    104,			'JavaScript Fundamentals',				'Get a strong foundation in JavaScript with our summer course. Learn the core concepts of JavaScript, including variables, functions, and DOM manipulation. This real-time online course offers a unique opportunity to become proficient in JavaScript.', 
	101,            2024,	    'Mondays',      '4:00 PM - 6:00 PM',        '2025-09-03',       '2026-08-31',       5,					'N191',     500.00,         1500.00,                23,                 40,             'RTOL'),
		   
	('QA1111',      '1',	    104,			'Quality Assurance Testing',			'Become a skilled quality assurance tester with our fall course. Learn the principles of software testing, test planning, and test automation. This class-based program offers a collaborative learning environment and has a limited number of seats, so reserve your spot now to become a quality assurance expert.', 
	106,            2025,       'Mondays',      '7:00 PM - 9:00 PM',        '2025-09-03',       '2026-08-31',       1,					'N201',     500.00,         1500.00,                12,                 40,             'In-Class'),
		   
	('WD1212',      '1',	    105,			'Front-End Web Development',			'Learn the essentials of front-end web development in this spring course. Dive into HTML, CSS, and JavaScript to create interactive and responsive websites. This real-time online course provides a unique opportunity to become a front-end web development expert.', 
	106,            2025,	    'Thursdays',	'6:30 PM - 8:30 PM',        '2024-01-10',       '2025-12-23',       1,					'N211',     500.00,         1500.00,                11,                 40,             'RTOL'),
		   
	('DV1313',      '1',	    105,			'DevOps Essentials',					'Explore the world of DevOps in this intensive summer course. Learn about continuous integration, continuous deployment, and infrastructure as code. This class-based program offers a collaborative learning environment and has a limited number of seats, so secure your spot now to become a DevOps expert.', 
	106,            2025,       'Wednesday',    '5:00 PM - 7:00 PM',        '2024-01-10',       '2025-12-23',       3,					'N221',     500.00,         1500.00,                5,                  40,             'In-Class'),
		   
	('CI1414',      '1',	    106,			'Continuous Integration and Deployment', 'Master the art of continuous integration and deployment in this comprehensive fall course. Learn about automated testing, containerization, and CI/CD pipelines. This real-time online course provides a unique opportunity to become a CI/CD expert.', 
	103,            2024,       'Mondays',      '4:00 PM - 6:00 PM',	    '2024-01-10',       '2024-08-26',       4,					'N231',     500.00,         1500.00,                22,                 40,             'RTOL'),
		   
	('IOS1515',		'1',		106,			'iOS App Development',					'Become a proficient iOS app developer with our summer course. Learn to create mobile apps for Apple devices using Swift and Xcode. This class-based program offers a collaborative learning environment and has a limited number of seats, so reserve your spot now to become an iOS app development expert.', 
	103,            2024,       'Mondays',      '4:00 PM - 6:00 PM',        '2024-01-10',       '2025-01-24',	    1,					'N241',     500.00,         1500.00,                19,	                40,             'In-Class');


	INSERT INTO StudentCourses 
	(StudentID, 	CourseCode, 	Section, 	TermID, 	[Year]) VALUES
    (4,				'IOS1515',		1,			103,		2024),
	(4,				'CI1414',		1,			103,		2024),
	(3,				'CI1414',		1,			103,		2024)