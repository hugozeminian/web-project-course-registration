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
CREATE TABLE [AccessLevel](
	LevelID				int PRIMARY KEY IDENTITY(10, 10),
	LevelName			varchar(50)
);
GO

-- Department
CREATE TABLE [Department](
	DepartmentID		int PRIMARY KEY IDENTITY(100, 1),
	DepartmentNAme		varchar(255)
);
GO

-- Program Type TODO
CREATE TABLE [ProgramType] (
	TypeID				int PRIMARY KEY IDENTITY(100, 1),
	ProgramType			varchar(13) CHECK (ProgramType IN ('Diploma','Post-Diploma','Certificate'))
);
GO

-- Term
CREATE TABLE [Term](
	TermID				int PRIMARY KEY IDENTITY(100, 1),
	Term				varchar(20) NOT NULL,
	[Year]				int NOT NULL
	);
GO

-- Program
CREATE TABLE [Program](
	ProgramID			int PRIMARY KEY IDENTITY(100, 1),
	DepartmentID		int FOREIGN KEY REFERENCES [Department] (DepartmentID),
	[Type]				int FOREIGN KEY REFERENCES [ProgramType] (TypeID),
	[Description]		text,
	TermID				int FOREIGN KEY REFERENCES [Term] (TermID),
	StartDate			DATE NOT NULL,
	EndDate				DATE NOT NULL,
	DomesticFees		smallmoney NOT NULL,
	InternationalFees	smallmoney,
	CourseMin			int NOT NULL,
	CourseMax			int NOT NULL	
	);
GO

-- Login -- We removed email beacause we can't reference both admin and student
CREATE TABLE [Login](
	UserName			varchar(255) PRIMARY KEY,
	[Password]			varchar(255) NOT NULL,
	LevelID				int FOREIGN KEY REFERENCES [AccessLevel] (LevelID)
);
GO

-- Student
CREATE TABLE [Student](
	StudentID			int PRIMARY KEY IDENTITY(1, 1),
	Username			varchar(255) FOREIGN KEY REFERENCES [Login] (Username),
	FirstName			varchar(255) NOT NULL,
	MiddleName			varchar(255),
	LastName			varchar(255) NOT NULL,
	Phone				varchar(17),
	Email				varchar(255) UNIQUE NOT NULL,
	ProgramID			int FOREIGN KEY REFERENCES [Program] (ProgramID),
	DateOfBirth			DATE NOT NULL
	);
GO

-- Admin
CREATE TABLE [Admin](
	StudentID			int PRIMARY KEY IDENTITY(1, 1),
	Username			varchar(255) FOREIGN KEY REFERENCES [Login] (Username),
	FirstName			varchar(255) NOT NULL,
	MiddleName			varchar(255),
	LastName			varchar(255) NOT NULL,
	Phone				varchar(17),
	Email				varchar(255) UNIQUE NOT NULL,
	DateOfBirth			DATE NOT NULL
	);
GO

-- Contact
CREATE TABLE [Contact](
	ContactID			int PRIMARY KEY IDENTITY(1, 1),
	[Name]				varchar(255) NOT NULL,
	Email				varchar(255) NOT NULL,
	[Date]				DATE NOT NULL
	);
GO

-- Delivery Mode
CREATE TABLE [DeliveryMode](
	DeliveryID			int PRIMARY KEY IDENTITY(1, 1),
	[Name]				varchar(255) NOT NULL,
	);
GO

-- Course
CREATE TABLE [Course](
	CourseCode			varchar(9),
	Section				int,
	ProgramID			int FOREIGN KEY REFERENCES [Program] (ProgramID),
	[Name]				varchar(255) NOT NULL,
	[Description]		text,
	TermID				int FOREIGN KEY REFERENCES [Term] (TermID),
	[Days]				varchar(255),
	[Hours]				varchar(255),
	StartDate			DATE NOT NULL,
	EndDate				DATE NOT NULL,
	Campus				varchar(255),
	Room				varchar(255),
	DomesticFees		smallmoney NOT NULL,
	InternationalFees	smallmoney,
	SeatsAvailable		int NOT NULL CHECK (SeatsAvailable >= 0 AND SeatsAvailable <= 40),
	ClassSize			int NOT NULL,
	DeliveryMode		varchar(255) CHECK (DeliveryMode IN ('ATOL','RTOL','In-Class','Hybrid'))
	PRIMARY KEY (CourseCode, Section)
	);
GO

-- StudentCourses
CREATE TABLE [StudentCourses](
	StudentID			int FOREIGN KEY REFERENCES [Student] (StudentID),
	CourseCode			varchar(9),
	Section				int,
	FOREIGN KEY (CourseCode, Section) REFERENCES [Course] (CourseCode, Section)
	);
GO
