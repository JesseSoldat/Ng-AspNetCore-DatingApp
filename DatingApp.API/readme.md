---- Generate Project ----
dotnet new webapi -o DatingApp.API -n DatingApp.API
dotnet watch run
---- install db browser Sqlite ------
ctrl + shift + p
Microsoft.EntityFrameworkCore.Sqlite
----- Migrations -----
#1
dotnet ef migrations add InitialCreate
dotnet ef migrations add AddedUserEntity
#2
dotnet ef database update
