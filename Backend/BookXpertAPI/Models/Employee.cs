using System;
using System.ComponentModel.DataAnnotations;

namespace BookXpertAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }[Required]
        public string? Name { get; set; }[Required]
        public string? Designation { get; set; }[Range(1, int.MaxValue)]
        public decimal Salary { get; set; }[Required]
        public string? Gender { get; set; }[Required]
        public string? State { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Doj { get; set; }  // Date of Joining
        public int Age { get; set; }
    }

}

