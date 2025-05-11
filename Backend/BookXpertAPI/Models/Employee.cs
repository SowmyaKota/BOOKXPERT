using System;
using System.ComponentModel.DataAnnotations;

namespace BookXpertAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public string? Designation { get; set; }

        public DateTime DateOfJoin { get; set; }

        public DateTime DateOfBirth { get; set; }

        public decimal Salary { get; set; }

        public string? Gender { get; set; }

        public string? State { get; set; }

        public int Age => DateTime.Now.Year - DateOfBirth.Year;
    }
}
