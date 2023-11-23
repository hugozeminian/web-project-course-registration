USE BowRegistration;

CREATE FUNCTION ufCheckUser(@userName AS VARCHAR(255))
RETURNS VARCHAR(255)
AS
BEGIN
	RETURN (SELECT [Password] 
			FROM [Login] 
			WHERE UserName = @userName)
END