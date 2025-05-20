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
        [DataType(DataType.Date)]
    public DateTime DOJ { get; set; } = DateTime.Today;

    [DataType(DataType.Date)]
    public DateTime DOB { get; set; } = DateTime.Today;
        public int Age { get; set; }
    }

}

