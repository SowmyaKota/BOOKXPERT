using BookXpertAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookXpertAPI.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> AddEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync(Employee employee);
        Task<bool> DeleteEmployeeAsync(int id);
        Task<bool> IsDuplicateAsync(string employeeName);
    }
}
