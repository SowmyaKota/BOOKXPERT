using BookXpertAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace BookXpertAPI.Repository
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
    }
}