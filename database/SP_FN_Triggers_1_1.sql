USE BowRegistration;
go

CREATE FUNCTION ufCheckUser(@userName AS VARCHAR(255), @accessLevel AS INT)
RETURNS VARCHAR(255)
AS
BEGIN
	RETURN (SELECT [Password] 
			FROM [Login] 
			WHERE UserName = @userName
			AND LevelID = @accessLevel)
END