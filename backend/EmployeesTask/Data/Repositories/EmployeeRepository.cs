using EmployeeLibrary.Abstract;
using EmployeeLibrary.Models;
using EmployeeLibrary.Models.Dtos;

#pragma warning disable CS8602
#pragma warning disable CS8603
#pragma warning disable CS8604

namespace EmployeesTask.Data.Repositories
{
    public class EmployeeRepository : IEmployee
    {
        private readonly AppDBContext _context;
        

        public EmployeeRepository(AppDBContext context)
        {
            _context = context;
        }

        private IEnumerable<EmployeeModel> Employees => _context.Employees;

        public EmployeeModel Create(EmployeeModel model)
        {

            var dateOfBirth = DateOfBirth(model.DateOfBirth, new DateTime());
            var employee = new EmployeeModel
            {
                Name = model.Name,
                Surname = model.Surname,
                Patronymic = model.Patronymic,
                DateOfBirth = dateOfBirth,
                ResidentialAddress = model.ResidentialAddress,
                Department = model.Department,
                AboutMe = model.AboutMe,
            };

            _context.Add(employee);
            _context.SaveChanges();
            return employee;
        }
        public EmployeeModel Update(EmployeeModel model)
        {
            var employee = _context.Employees.FirstOrDefault(i => i.Id == model.Id);
            if (employee == null)
            {
                return null;
            }

            employee.Name = model.Name != string.Empty ? 
                            model.Name : employee.Name;
            employee.Surname = model.Surname != string.Empty ? 
                               model.Surname : employee.Surname;
            employee.Patronymic = model.Patronymic != string.Empty ? 
                                  model.Patronymic : employee.Patronymic;
            employee.DateOfBirth = DateOfBirth(model.DateOfBirth, employee.DateOfBirth);
            employee.ResidentialAddress = model.ResidentialAddress != string.Empty ? 
                                          model.ResidentialAddress : employee.ResidentialAddress;
            employee.Department = model.Department != string.Empty ?
                                  model.Department : employee.Department;
            employee.AboutMe = model.AboutMe != string.Empty ? 
                               model.AboutMe : employee.AboutMe;

            _context.Update(employee);
            _context.SaveChanges();
            return employee;
        }

        public EmployeeModel Delete(int id)
        {
            var employee = _context.Employees.FirstOrDefault(i => i.Id == id);
            if (employee == null)
            {
                return null;
            }

            _context.Remove(employee);
            _context.SaveChanges();
            return employee;
        }

        public List<EmployeeModel> GetAllEmployees()
        {
            var employees = _context.Employees.ToList();
            return employees;
        }

        public List<EmployeeModel> Search(SearchParametersDto dto)
        {
            var employees = new List<EmployeeModel>();
            switch (dto.FieldName)
            {
                case "Id":
                    var employee = _context.Employees.FirstOrDefault(i => i.Id == int.Parse(dto.Parameter));
                    if (employee == null)
                    {
                        return null;
                    }

                    employees.Add(employee);
                    break;
                case "Name":
                    employees = Employees.Where(i => i.Name.Contains(dto.Parameter, StringComparison.OrdinalIgnoreCase)).ToList();
                    break;
                case "Surname":
                    employees = Employees.Where(i => i.Surname.Contains(dto.Parameter, StringComparison.OrdinalIgnoreCase)).ToList();
                    break;
                case "Patronymic":
                    employees = Employees.Where(i => i.Patronymic.Contains(dto.Parameter, StringComparison.OrdinalIgnoreCase)).ToList();
                    break;
                case "DateOfBirth":
                    var value = dto.Parameter.Length > 4 ? DateTime.Parse(dto.Parameter.Replace("/", ".")) : new DateTime(int.Parse(dto.Parameter), 1, 1);
                    employees = Employees.Where(i => i.DateOfBirth.Year == value.Year).ToList();
                    break;
                case "Department":
                    employees = Employees.Where(i => i.Department.Contains(dto.Parameter, StringComparison.OrdinalIgnoreCase)).ToList();
                    break;
                default:
                    break;
            }

            return employees;
        }

        public List<EmployeeModel> Sort(SortParametersDto dto)
        {
            var employees = new List<EmployeeModel>();
            switch (dto.FieldName)
            {
                case "Id":
                    employees = SortById(dto.SortType);
                    break;
                case "Name":
                    employees = SortByName(dto.SortType);
                    break;
                case "Surname":
                    employees = SortBySurname(dto.SortType);
                    break;
                case "Patronymic":
                    employees = SortByPatronymic(dto.SortType);
                    break;
                case "DateOfBirth":
                    employees = SortByDateOfBirth(dto.SortType);
                    break;
                case "Department":
                    employees = SortByDepartment(dto.SortType);
                    break;
                default:
                    break;
            }

            return employees;
        }

        private List<EmployeeModel> SortById(string sortType)
        {
            var employees = new List<EmployeeModel>();
            if (sortType.ToLower() == "down")
            {
                employees = _context.Employees.OrderByDescending(i => i.Id).ToList();
                return employees;
            }

            employees = _context.Employees.OrderBy(i => i.Id).ToList();
            return employees;
        }

        private List<EmployeeModel> SortByName(string sortType)
        {
            var employees = new List<EmployeeModel>();
            if (sortType.ToLower() == "down")
            {
                employees = _context.Employees.OrderByDescending(i => i.Name).ToList();
                return employees;
            }

            employees = _context.Employees.OrderBy(i => i.Name).ToList();
            return employees;
        }

        private List<EmployeeModel> SortBySurname(string sortType)
        {
            var employees = new List<EmployeeModel>();
            if (sortType.ToLower() == "down")
            {
                employees = _context.Employees.OrderByDescending(i => i.Surname).ToList();
                return employees;
            }

            employees = _context.Employees.OrderBy(i => i.Surname).ToList();
            return employees;
        }

        private List<EmployeeModel> SortByPatronymic(string sortType)
        {
            var employees = new List<EmployeeModel>();
            if (sortType.ToLower() == "down")
            {
                employees = _context.Employees.OrderByDescending(i => i.Patronymic).ToList();
                return employees;
            }

            employees = _context.Employees.OrderBy(i => i.Patronymic).ToList();
            return employees;
        }

        private List<EmployeeModel> SortByDateOfBirth(string sortType)
        {
            var employees = new List<EmployeeModel>();
            if (sortType.ToLower() == "down")
            {
                employees = _context.Employees.OrderByDescending(i => i.DateOfBirth).ToList();
                return employees;
            }

            employees = _context.Employees.OrderBy(i => i.DateOfBirth).ToList();
            return employees;
        }

        private List<EmployeeModel> SortByDepartment(string sortType)
        {
            var employees = new List<EmployeeModel>();
            if (sortType.ToLower() == "down")
            {
                employees = _context.Employees.OrderByDescending(i => i.Department).ToList();
                return employees;
            }

            employees = _context.Employees.OrderBy(i => i.Department).ToList();
            return employees;
        }

        private DateTime DateOfBirth(DateTime date, DateTime dateOfBirth)
        {
            var now = DateTime.Now;
            var age = now.Year - date.Year;
            if (age > 60 || age < 16)
            {
                return dateOfBirth;
            }

            var year = date.Year;
            var month = date.Month;
            var day = date.Day;
            dateOfBirth = new DateTime(year, month, day);
            return dateOfBirth;
        }
    }
}
