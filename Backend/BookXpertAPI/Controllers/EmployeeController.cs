using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.NETCore;       
using Microsoft.Reporting.WebForms;      
using Microsoft.ReportingServices.ReportRendering;  
using Microsoft.ReportingServices.ReportProcessing; 
using Microsoft.ReportingServices.Interfaces;       
using System.Linq;    



namespace BookXpertAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        public class Employee {
    public int Id {get; set;}
    public string Name {get; set;}
    public string Designation {get; set;}
    public DateTime DOJ {get; set;}  
    public decimal Salary {get; set;}
    public string Gender {get; set;}
    public string State {get; set;}
    public int Age {get; set;}
    public DateTime DOB {get; set;}  
}

        

        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(employee.Name))
                return BadRequest("Employee name is required.");

            var isDuplicate = await _employeeService.IsDuplicateAsync(employee.Name);
            if (isDuplicate)
                return BadRequest("Employee with this name already exists.");

            var created = await _employeeService.AddAsync(employee);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
        {
            if (id != employee.Id)
                return BadRequest("ID mismatch");

            var updated = await _employeeService.UpdateAsync(employee);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _employeeService.DeleteAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }

         [HttpGet("report")]
public IActionResult GetEmployeeReport()
{
    var employees = new List<Employee> {
        new Employee { Id = 1, Name = "Charan", Designation = "Developer", DOJ = new DateTime(2023, 1, 1), Salary = 40000, Gender = "Male", State = "Warangal", DOB = new DateTime(1990, 1, 1), Age = 35 },
        new Employee { Id = 2, Name = "Sai", Designation = "Developer", DOJ = new DateTime(2023, 1, 1), Salary = 40000, Gender = "Male", State = "Warangal", DOB = new DateTime(1992, 1, 1), Age = 33 },
        // Add more employees here
    };

    var report = new LocalReport();
    report.ReportPath = Path.Combine(Directory.GetCurrentDirectory(), "Reports", "EmployeeReport.rdlc");

    report.DataSources.Add(new ReportDataSource("EmployeeDataSet", employees));

    var pdf = report.Render("PDF");

    Response.Headers.Add("Content-Disposition", "inline; filename=EmployeeReport.pdf");
return File(pdfBytes, "application/pdf");
}


        // Dummy PDF generation logic (replace with actual logic later)
        private byte[] GenerateReportPdf(List<Employee> employees)
{
    QuestPDF.Settings.License = QuestPDF.Infrastructure.LicenseType.Community;

    var totalSalary = employees.Sum(e => e.Salary);

    var document = Document.Create(container =>
    {
        container.Page(page =>
        {
            page.Margin(50);

            page.Header()
                .Text("Employee Report")
                .FontSize(20)
                .Bold()
                .AlignCenter();

            page.Content()
                .Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn(1); // ID
                        columns.RelativeColumn(3); // Name
                        columns.RelativeColumn(3); // Designation
                        columns.RelativeColumn(2); // DOJ
                        columns.RelativeColumn(2); // Salary
                        columns.RelativeColumn(2); // Gender
                        columns.RelativeColumn(2); // State
                    });

                    table.Header(header =>
                    {
                        header.Cell().Text("ID").SemiBold();
                        header.Cell().Text("Name").SemiBold();
                        header.Cell().Text("Designation").SemiBold();
                        header.Cell().Text("Date of Joining").SemiBold();
                        header.Cell().Text("Salary").SemiBold();
                        header.Cell().Text("Gender").SemiBold();
                        header.Cell().Text("State").SemiBold();
                    });

                    foreach (var emp in employees)
                    {
                        table.Cell().Text(emp.Id.ToString());
                        table.Cell().Text(emp.Name ?? "");
                        table.Cell().Text(emp.Designation ?? "");
                        
                        // Format DOJ properly:
                        if (DateTime.TryParse(emp.DOJ, out var doj))
                            table.Cell().Text(doj.ToString("dd-MM-yyyy"));
                        else
                            table.Cell().Text(emp.DOJ ?? "");

                        table.Cell().Text(emp.Salary.ToString("C"));
                        table.Cell().Text(emp.Gender ?? "");
                        table.Cell().Text(emp.State ?? "");
                    }

                    // Add a total row
                    table.Footer(footer =>
                    {
                        footer.Cell().Text("Total").SemiBold().ColumnSpan(4);
                        footer.Cell().Text(totalSalary.ToString("C")).SemiBold();
                        footer.Cell().Text(""); // Gender empty cell
                        footer.Cell().Text(""); // State empty cell
                    });
                });

            page.Footer()
                .AlignCenter()
                .Text(x =>
                {
                    x.Span("Page ");
                    x.CurrentPageNumber();
                    x.Span(" of ");
                    x.TotalPages();
                });
        });
    });

    using (var ms = new MemoryStream())
    {
        document.GeneratePdf(ms);
        return ms.ToArray();
    }
}


    }
}
