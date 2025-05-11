using System.Collections.Generic;
using System.Threading.Tasks;
using BookXpertAPI.Models; 

namespace BookXpertAPI.Repository
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee> UpdateAsync(Employee employee);
        Task<bool> DeleteAsync(int id);
        Task<bool> IsDuplicateAsync(string employeeName);
    }
}
