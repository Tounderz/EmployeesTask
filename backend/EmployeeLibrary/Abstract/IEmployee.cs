using EmployeeLibrary.Models;
using EmployeeLibrary.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeLibrary.Abstract
{
    public interface IEmployee
    {
        EmployeeModel Create(EmployeeModel model);
        EmployeeModel Update(EmployeeModel model);
        EmployeeModel Delete(int id);
        List<EmployeeModel> Search(SearchParametersDto dto);
        List<EmployeeModel> Sort(SortParametersDto dto);
        List<EmployeeModel> GetAllEmployees();
    }
}
