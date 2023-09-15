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

app.MapGet("/api/stylists/active", (HillarysHaircareDbContext db) =>
{
    return Results.Ok(db.Stylists.Where(s => s.IsActive == true).ToList());
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

app.MapPost("/api/stylists", (HillarysHaircareDbContext db, Stylist newStylist) => 
{
    db.Stylists.Add(newStylist);
    db.SaveChanges();

    return Results.Created($"/api/stylists/{newStylist.Id}", newStylist);
});

app.MapPost("/api/stylists/{id}/deactivate", (HillarysHaircareDbContext db, int id) =>
{
    Stylist foundStylist = db.Stylists.SingleOrDefault(a => a.Id == id);

    foundStylist.IsActive = false;

    db.SaveChanges();

    return Results.NoContent();
});

//customers

app.MapGet("/api/customers", (HillarysHaircareDbContext db) =>
{
    return Results.Ok(db.Customers.ToList());
});

app.MapGet("/api/customers/{id}", (HillarysHaircareDbContext db, int id) => 
{
    Customer customer = db.Customers
    .Include(c => c.Appointments)
    .ThenInclude(a => a.Stylist)
    .SingleOrDefault(s => s.Id == id);

    if (customer == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(customer);
});

app.MapPost("/api/customers", (HillarysHaircareDbContext db, Customer newCustomer) =>
{
    db.Customers.Add(newCustomer);
    db.SaveChanges();

    return Results.Created($"/api/customers/{newCustomer.Id}", newCustomer);
});

app.MapPut("/api/customers/{id}", (HillarysHaircareDbContext db, int id, Customer updatedCustomer) =>
{
    Customer foundCustomer = db.Customers.SingleOrDefault(c => c.Id == id);

    foundCustomer.Name = updatedCustomer.Name;
    foundCustomer.Email = updatedCustomer.Email;
    foundCustomer.Phone = updatedCustomer.Phone;

    db.SaveChanges();

    return Results.NoContent();

});

//appointments

app.MapGet("/api/appointments", (HillarysHaircareDbContext db) =>
{
    List<Appointment> allAppointments = db.Appointments.ToList();
    foreach (Appointment a in allAppointments)
    {
        a.Customer = db.Customers.SingleOrDefault(c => c.Id == a.CustomerId);
        a.Stylist = db.Stylists.SingleOrDefault(s => s.Id == a.StylistId);
        
    };
    return Results.Ok(allAppointments.ToList());
});

app.MapGet("/api/appointments/{id}", (HillarysHaircareDbContext db, int id) =>
{
    Appointment appointment = db.Appointments
        .Include(a => a.Customer)
        .Include(a => a.Stylist)
        .SingleOrDefault(a => a.Id == id);
        
        List<AppointmentService> foundAppServs = db.AppointmentServices.Where(apsv => apsv.AppointmentId == id).ToList();

        List<Service> foundServs = new List<Service>();

        foreach (AppointmentService apsv in foundAppServs)
        {
            Service singleServ = db.Services.FirstOrDefault(s => s.Id == apsv.ServiceId);

            foundServs.Add(singleServ);
        }

        appointment.Services = foundServs;

    return Results.Ok(appointment);
});

app.MapPost("/api/appointments", (HillarysHaircareDbContext db, Appointment appointment) =>
{
    List<Service> matchedServices = db.Services.Where(s => appointment.Services.Select(serv => serv.Id).Contains(s.Id)).ToList();
        appointment.Services = matchedServices;

    db.Appointments.Add(appointment);
    db.SaveChanges();
    return Results.Created($"/api/appointments/{appointment.Id}", appointment);
});

app.MapPost("/api/appointments/{id}/cancel", (HillarysHaircareDbContext db, int id) =>
{
    Appointment foundAppointment = db.Appointments.SingleOrDefault(a => a.Id == id);

    foundAppointment.IsCancelled = true;

    db.SaveChanges();

    return Results.NoContent();
});

app.MapPut("/api/appointments/{id}", (HillarysHaircareDbContext db, Appointment updatedAppointment, int id) =>
{
    Appointment foundAppointment = db.Appointments.SingleOrDefault(a => a.Id == id);

    List<AppointmentService> oldAppointmentServices = db.AppointmentServices.Where(asp => asp.AppointmentId == id).ToList();
    
    foreach (AppointmentService aps in oldAppointmentServices)
    { 
            db.AppointmentServices.Remove(aps);
    }

    List<AppointmentService> matchedServices = db.Services.Where(s => updatedAppointment.Services.Select(serv => serv.Id).Contains(s.Id)).Select(s => new AppointmentService(){
        ServiceId = s.Id,
        AppointmentId = id
    }).ToList();

    db.AppointmentServices.AddRange(matchedServices);

    db.SaveChanges();

    return Results.NoContent();
});


//services

app.MapGet("/api/services", (HillarysHaircareDbContext db) =>
{
    return Results.Ok(db.Services);
});
app.MapGet("/api/appointmentservices", (HillarysHaircareDbContext db) =>
{
    return Results.Ok(db.AppointmentServices);
});

app.Run();

