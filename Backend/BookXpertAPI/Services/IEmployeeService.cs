using BookXpertAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookXpertAPI.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee> UpdateAsync(Employee employee);
        Task<bool> DeleteAsync(int id);
        Task<bool> IsDuplicateAsync(string employeeName);
    }
}
