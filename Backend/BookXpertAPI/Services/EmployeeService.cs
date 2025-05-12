using BookXpertAPI.Models;
using BookXpertAPI.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookXpertAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeeRepository.AddAsync(employee);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            return await _employeeRepository.UpdateAsync(employee);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _employeeRepository.DeleteAsync(id);
        }

        public async Task<bool> IsDuplicateAsync(string employeeName)
        {
            return await _employeeRepository.IsDuplicateAsync(employeeName);
        }
    }
}
