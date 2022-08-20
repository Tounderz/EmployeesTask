using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeLibrary.Models.Dtos
{
    public class SortParametersDto
    {
        public string? FieldName { get; set; }
        public string? SortType { get; set; }
    }
}
