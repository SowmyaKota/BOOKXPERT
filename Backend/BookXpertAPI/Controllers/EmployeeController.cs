using Microsoft.AspNetCore.Mvc;
using BookXpertAPI.Models;  // Employee model
using BookXpertAPI.Services; // IEmployeeService

namespace BookXpertAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            await _employeeService.AddEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (employee == null || id != employee.Id)
            {
                return BadRequest();
            }

            var updatedEmployee = await _employeeService.UpdateEmployeeAsync(employee);
            if (updatedEmployee == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }
    }
}
