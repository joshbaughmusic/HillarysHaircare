using HillarysHaircare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHaircareDbContext>(builder.Configuration["HillarysHaircareDbConnectionString"]);

// Set the JSON serializer options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//stylists

app.MapGet("/api/stylists", (HillarysHaircareDbContext db) =>
{
    return Results.Ok(db.Stylists.ToList());
});

app.MapGet("/api/stylists/{id}", (HillarysHaircareDbContext db, int id) => 
{
    Stylist stylist = db.Stylists
    .Include(s => s.Appointments)
    .ThenInclude(a => a.Customer)
    .SingleOrDefault(s => s.Id == id);

    if (stylist == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(stylist);
});

//customers

app.MapGet("/api/customers", (HillarysHaircareDbContext db) =>
{
    return Results.Ok(db.Customers.ToList());
});

//appointments

app.MapGet("/api/appointments", (HillarysHaircareDbContext db) =>
{
    List<Appointment> allAppointments = db.Appointments.ToList();
    foreach (Appointment a in allAppointments)
    {
        a.Customer = db.Customers.SingleOrDefault(c => c.Id == a.CustomerId);
        a.Stylist = db.Stylists.SingleOrDefault(s => s.Id == a.StylistId);
        
        List<AppointmentService> foundAppServs = db.AppointmentServices.Where(apsv => apsv.AppointmentId == a.Id).ToList();

        List<Service> foundServs = new List<Service>();

        foreach (AppointmentService apsv in foundAppServs)
        {
            Service singleServ = db.Services.FirstOrDefault(s => s.Id == apsv.ServiceId);

            foundServs.Add(singleServ);
        };

        a.Services = foundServs;
    };
    return Results.Ok(allAppointments.ToList());
});

app.Run();

