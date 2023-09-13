using Microsoft.EntityFrameworkCore;
using HillarysHaircare.Models;

public class HillarysHaircareDbContext : DbContext
{
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    public HillarysHaircareDbContext(DbContextOptions<HillarysHaircareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist { Id = 1, Name = "Josh Barton", IsActive = true },
            new Stylist { Id = 2, Name = "Greg Korte", IsActive = true },
            new Stylist { Id = 3, Name = "Caroline Madison", IsActive = true },
            new Stylist { Id = 4, Name = "Steve Brownlee", IsActive = false }
        });


        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer { Id = 1, Name = "BoBo JoeJoe", Email = "bobo@example.com", Phone = "123-456-7890" },
            new Customer { Id = 2, Name = "Alice Arnet", Email = "alice@example.com", Phone = "987-654-3210" },
            new Customer { Id = 3, Name = "Big Bill", Email = "bbill@example.com", Phone = "555-555-5555" },
            new Customer { Id = 4, Name = "Loki Moshion", Email = "loki@example.com", Phone = "666-666-6666" },
            new Customer { Id = 5, Name = "Ash Ashley", Email = "ash@example.com", Phone = "364-273-9876" }
        });


        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {  
            new Appointment { Id = 1, Date = new DateTime(2023, 9, 15, 16, 0, 0), StylistId = 1, CustomerId = 1, IsCancelled = false },
            new Appointment { Id = 2, Date = new DateTime(2023, 9, 13, 13, 0, 0), StylistId = 2, CustomerId = 2, IsCancelled = false },
            new Appointment { Id = 3, Date = new DateTime(2023, 9, 18, 10, 0, 0), StylistId = 3, CustomerId = 3, IsCancelled = true },
            new Appointment { Id = 4, Date = new DateTime(2023, 9, 1, 13, 0, 0), StylistId = 4, CustomerId = 4, IsCancelled = false },
            new Appointment { Id = 5, Date = new DateTime(2023, 9, 3, 11, 0, 0), StylistId = 2, CustomerId = 4, IsCancelled = false }
        });


        modelBuilder.Entity<Service>().HasData(new Service[]
        {  
            new Service { Id = 1, Name = "Haircut", Price = 40.00M },
            new Service { Id = 2, Name = "Beard Trim", Price = 20.00M },
            new Service { Id = 3, Name = "Color", Price = 65.00M },
            new Service { Id = 4, Name = "Advanced Color", Price = 85.00M },
            new Service { Id = 5, Name = "Blowout", Price = 30.00M }
        });


        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {  
            new AppointmentService { Id = 1, AppointmentId = 1, ServiceId = 1 },
            new AppointmentService { Id = 2, AppointmentId = 1, ServiceId = 2 },
            new AppointmentService { Id = 3, AppointmentId = 2, ServiceId = 1 },
            new AppointmentService { Id = 4, AppointmentId = 3, ServiceId = 3 },
            new AppointmentService { Id = 5, AppointmentId = 3, ServiceId = 1 },
            new AppointmentService { Id = 6, AppointmentId = 3, ServiceId = 5 },
            new AppointmentService { Id = 7, AppointmentId = 4, ServiceId = 1 },
            new AppointmentService { Id = 8, AppointmentId = 4, ServiceId = 4 },
            new AppointmentService { Id = 9, AppointmentId = 5, ServiceId = 3 },
            new AppointmentService { Id = 10, AppointmentId = 5, ServiceId = 2 }
        });
    }
}