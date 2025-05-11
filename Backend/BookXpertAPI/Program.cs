using Microsoft.EntityFrameworkCore;
using BookXpertAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// MySQL connection string
var connectionString = "server=localhost;port=3306;user=root;password=your_password;database=BookXpertDB";

// Register AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers(); // For future API use

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.MapControllers(); // In case you're adding REST endpoints
app.MapGet("/", () => "BookXpert API running!");

app.Run();
