using EmployeeLibrary.Abstract;
using EmployeeLibrary.Models;
using EmployeeLibrary.Models.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeesTask.Controllers
{
    [Route("employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployee _employee;

        public EmployeesController(IEmployee employee)
        {
            _employee = employee;
        }

        [HttpGet("list")]
        public IActionResult GetAllEmployees()
        {
            var employees = _employee.GetAllEmployees();
            if (employees == null)
            {
                return BadRequest();
            }

            return Ok(new { employees = employees } );
        }

        [HttpPost("create")]
        public IActionResult Create(EmployeeModel model)
        {
            var employee = _employee.Create(model);
            if (employee == null)
            {
                return BadRequest();
            }

            var employees = _employee.GetAllEmployees();
            return Ok(new { employees = employees });
        }

        [HttpPost("update")]
        public IActionResult Update(EmployeeModel model)
        {
            var employee = _employee.Update(model);
            if (employee == null)
            {
                return BadRequest();
            }

            var employees = _employee.GetAllEmployees();
            return Ok(new { employees = employees });
        }

        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            var employee = _employee.Delete(id);
            if (employee == null)
            {
                return BadRequest();
            }

            var employees = _employee.GetAllEmployees();
            return Ok(new { employees = employees });
        }

        [HttpPost("sort")]
        public IActionResult SortBooks(SortParametersDto dto)
        {
            var employees = _employee.Sort(dto);
            if (employees == null || employees.Count == 0)
            {
                return BadRequest();
            }

            return Ok(new { employees = employees });
        }

        [HttpPost("search")]
        public IActionResult SearchBooks(SearchParametersDto dto)
        {
            var employees = _employee.Search(dto);
            if (employees == null || employees.Count == 0)
            {
                return BadRequest(new { message = "Nothing was found according to the specified criteria!" });
            }

            return Ok(new { employees = employees });
        }
    }
}
