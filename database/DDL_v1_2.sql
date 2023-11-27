USE [master]
GO

-- If the database already exists, drop it.
IF DB_ID('BowRegistration') IS NOT NULL
ALTER DATABASE BowRegistration
SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE BowRegistration
GO

CREATE DATABASE BowRegistration
GO

USE BowRegistration
GO

-- Access Level
CREATE TABLE [AccessLevel]
(
	LevelID int PRIMARY KEY,
	LevelName varchar(50)
);
GO

-- Department
CREATE TABLE [Department]
(
	DepartmentID int PRIMARY KEY IDENTITY(100, 1),
	DepartmentName varchar(255)
);
GO

-- Program Type TODO
CREATE TABLE [ProgramType]
(
	TypeID int PRIMARY KEY IDENTITY(100, 1),
	ProgramType varchar(13) CHECK (ProgramType IN ('Diploma','Post-Diploma','Certificate'))
);
GO

-- Term
CREATE TABLE [Term]
(
	TermID int IDENTITY(100, 1),
	Term varchar(20) NOT NULL,
	[Year] int NOT NULL,
	PRIMARY KEY (TermID, [Year])
);
GO

-- Program
CREATE TABLE [Program]
(
	ProgramID int PRIMARY KEY IDENTITY(100, 1),
	DepartmentID int FOREIGN KEY REFERENCES [Department] (DepartmentID),
	TypeID int FOREIGN KEY REFERENCES [ProgramType] (TypeID),
	ProgramName varchar(255),
	[Description] varchar(MAX),
	TermID int,
	[Year] int,
	StartDate DATE NOT NULL,
	EndDate DATE NOT NULL,
	DomesticFees smallmoney NOT NULL,
	InternationalFees smallmoney,
	CourseMin int NOT NULL,
	CourseMax int NOT NULL,
	FOREIGN KEY (TermID, [Year]) REFERENCES [Term] (TermID, [Year])
);
GO

-- Login -- We removed email beacause we can't reference both admin and student
CREATE TABLE [Login]
(
	UserName varchar(255) UNIQUE PRIMARY KEY,
	[Password] varchar(255) NOT NULL,
	LevelID int FOREIGN KEY REFERENCES [AccessLevel] (LevelID)
);
GO

-- Student
CREATE TABLE [Student]
(
	StudentID int PRIMARY KEY IDENTITY(1, 1),
	Username varchar(255) FOREIGN KEY REFERENCES [Login] (Username),
	FirstName varchar(255) NOT NULL,
	MiddleName varchar(255),
	LastName varchar(255) NOT NULL,
	Phone varchar(17),
	Email varchar(255) UNIQUE NOT NULL,
	ProgramID int FOREIGN KEY REFERENCES [Program] (ProgramID),
	DateOfBirth DATE NOT NULL
);
GO

-- Admin
CREATE TABLE [Admin]
(
	AdminID int PRIMARY KEY IDENTITY(1, 1),
	Username varchar(255) FOREIGN KEY REFERENCES [Login] (Username),
	FirstName varchar(255) NOT NULL,
	MiddleName varchar(255),
	LastName varchar(255) NOT NULL,
	Phone varchar(17),
	Email varchar(255) UNIQUE NOT NULL,
	DateOfBirth DATE NOT NULL
);
GO

-- Contact
CREATE TABLE [Contact]
(
	ContactID int PRIMARY KEY IDENTITY(1, 1),
	[Name] varchar(255) NOT NULL,
	Email varchar(255) NOT NULL,
	[Date] DATE NOT NULL,
	[Message] varchar(MAX) NOT NULL
);
GO

-- Delivery Mode
CREATE TABLE [DeliveryMode]
(
	DeliveryID int PRIMARY KEY IDENTITY(1, 1),
	[Name] varchar(255) NOT NULL,
);
GO

-- Campus
CREATE TABLE [Campus]
(
	CampusID int PRIMARY KEY IDENTITY(1, 1),
	[CampusName] varchar(255) NOT NULL,
);
GO

-- Course
CREATE TABLE [Course]
(
	CourseCode varchar(9),
	Section int,
	ProgramID int FOREIGN KEY REFERENCES [Program] (ProgramID),
	[Name] varchar(255) NOT NULL,
	[Description] varchar(MAX),
	TermID int,
	[Year] int,
	[Days] varchar(255),
	[Hours] varchar(255),
	StartDate DATE NOT NULL,
	EndDate DATE NOT NULL,
	CampusID int FOREIGN KEY REFERENCES [Campus] (CampusID),
	Room varchar(255),
	DomesticFees smallmoney NOT NULL,
	InternationalFees smallmoney,
	SeatsAvailable int NOT NULL CHECK (SeatsAvailable >= 0 AND SeatsAvailable <= 40),
	ClassSize int NOT NULL,
	DeliveryMode varchar(255) CHECK (DeliveryMode IN ('ATOL','RTOL','In-Class','Hybrid'))
		PRIMARY KEY (CourseCode, Section, TermID, [Year]),
	FOREIGN KEY (TermID, [Year]) REFERENCES [Term] (TermID, [Year])
);
GO


-- StudentCourses
CREATE TABLE [StudentCourses]
(
	StudentID int FOREIGN KEY REFERENCES [Student] (StudentID),
	CourseCode varchar(9),
	Section int,
	TermID int,
	[Year] int,
	FOREIGN KEY (CourseCode, Section, TermID, [Year]) REFERENCES [Course] (CourseCode, Section, TermID, [Year])
);
GO

/*=================================================*/

IF LOGINPROPERTY('guestUser', 'IsLocked') IS NOT NULL
BEGIN
	DROP LOGIN guestUser
	CREATE LOGIN guestUser
	WITH PASSWORD = 'guest', CHECK_POLICY = OFF
END
ELSE
BEGIN
	CREATE LOGIN guestUser
	WITH PASSWORD = 'guest', CHECK_POLICY = OFF
END
GO

IF DATABASE_PRINCIPAL_ID ('guestUser') IS NOT NULL
	BEGIN
	DROP USER guestUser;
	CREATE USER guestUser
	FOR LOGIN guestUser;
END
ELSE
BEGIN
	CREATE USER guestUser
	FOR LOGIN guestUser;
END
GO

IF DATABASE_PRINCIPAL_ID ('guestUsers') IS NOT NULL
	BEGIN
	DROP ROLE guestUsers;
	CREATE ROLE guestUsers;
END
ELSE
BEGIN
	CREATE ROLE guestUsers;
END
GO

GRANT SELECT ON Course TO guestUsers;
GRANT SELECT ON DeliveryMode TO guestUsers;
GRANT SELECT ON Department TO guestUsers;
GRANT SELECT ON Program TO guestUsers;
GRANT SELECT ON ProgramType TO guestUsers;
GRANT SELECT ON Term TO guestUsers;
GO

ALTER ROLE guestUsers ADD MEMBER guestUser;

IF LOGINPROPERTY('adminUser', 'IsLocked') IS NOT NULL
BEGIN
	DROP LOGIN adminUser
	CREATE LOGIN adminUser
	WITH PASSWORD = 'admin', CHECK_POLICY = OFF
END
ELSE
BEGIN
	CREATE LOGIN adminUser
	WITH PASSWORD = 'admin', CHECK_POLICY = OFF
END
GO

IF DATABASE_PRINCIPAL_ID ('adminUser') IS NOT NULL
	BEGIN
	DROP USER adminUser;
	CREATE USER adminUser
	FOR LOGIN adminUser;
END
ELSE
BEGIN
	CREATE USER adminUser
	FOR LOGIN adminUser;
END
GO

IF DATABASE_PRINCIPAL_ID ('adminUsers') IS NOT NULL
	BEGIN
	DROP ROLE adminUsers;
	CREATE ROLE adminUsers;
END
ELSE
BEGIN
	CREATE ROLE adminUsers;
END
GO

ALTER ROLE db_owner ADD MEMBER adminUser;
