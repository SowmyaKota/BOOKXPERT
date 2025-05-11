using BookXpertAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookXpertAPI.Repository
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee emp);
        Task<Employee> UpdateAsync(Employee emp);
        Task<bool> DeleteAsync(int id);
        Task<bool> IsDuplicateAsync(string name);
    }
}
