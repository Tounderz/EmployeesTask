using EmployeeLibrary.Models;
using Microsoft.EntityFrameworkCore;

#pragma warning disable CS8618

namespace EmployeesTask.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) :
            base(options)
        {
        }

        public DbSet<EmployeeModel> Employees { get; set; }
    }
}
