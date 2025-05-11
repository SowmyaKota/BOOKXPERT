using System;
using System.ComponentModel.DataAnnotations;

namespace BookXpertAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }=string.Empty;
        public string? Designation { get; set; }=string.Empty;
        public decimal Salary { get; set; }
        public string? Gender { get; set; }=string.Empty;
        public string? State { get; set; }=string.Empty;
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
    }
}

