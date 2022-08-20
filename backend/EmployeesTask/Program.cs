using EmployeeLibrary.Abstract;
using EmployeesTask.Data;
using EmployeesTask.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("Default")
    ));

builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddScoped<IEmployee, EmployeeRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(options => options
   .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
   .AllowAnyHeader()
   .AllowAnyMethod()
);

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();