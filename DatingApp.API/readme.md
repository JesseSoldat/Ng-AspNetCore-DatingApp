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
dotnet ef migrations add ExtendedUserClass
#2 Apply migration
dotnet ef database update

# utils

dotnet ef migrations list

# undo if migration is not applied

d
dotnet ef migrations remove

# delete databae

dotnet ef database drop
