using BookXpertAPI.Data;
using BookXpertAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookXpertAPI.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllAsync() => await _context.Employees.ToListAsync();

        public async Task<Employee> GetByIdAsync(int id) => await _context.Employees.FindAsync(id);

        public async Task<Employee> AddAsync(Employee emp)
        {
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return emp;
        }

        public async Task<Employee> UpdateAsync(Employee emp)
        {
            _context.Employees.Update(emp);
            await _context.SaveChangesAsync();
            return emp;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return false;
            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsDuplicateAsync(string name)
        {
            return await _context.Employees.AnyAsync(e => e.Name == name);
        }
    }
}
