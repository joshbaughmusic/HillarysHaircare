﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillarysHaircare.Migrations
{
    [DbContext(typeof(HillarysHaircareDbContext))]
    [Migration("20230913144151_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.Property<int>("AppointmentsId")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesId")
                        .HasColumnType("integer");

                    b.HasKey("AppointmentsId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("AppointmentService");
                });

            modelBuilder.Entity("HillarysHaircare.Models.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsCancelled")
                        .HasColumnType("boolean");

                    b.Property<int>("StylistId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("StylistId");

                    b.ToTable("Appointments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CustomerId = 1,
                            Date = new DateTime(2023, 9, 15, 16, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = false,
                            StylistId = 1
                        },
                        new
                        {
                            Id = 2,
                            CustomerId = 2,
                            Date = new DateTime(2023, 9, 13, 13, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = false,
                            StylistId = 2
                        },
                        new
                        {
                            Id = 3,
                            CustomerId = 3,
                            Date = new DateTime(2023, 9, 18, 10, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = true,
                            StylistId = 3
                        },
                        new
                        {
                            Id = 4,
                            CustomerId = 4,
                            Date = new DateTime(2023, 9, 1, 13, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = false,
                            StylistId = 4
                        },
                        new
                        {
                            Id = 5,
                            CustomerId = 4,
                            Date = new DateTime(2023, 9, 3, 11, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = false,
                            StylistId = 2
                        });
                });

            modelBuilder.Entity("HillarysHaircare.Models.AppointmentService", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AppointmentId")
                        .HasColumnType("integer");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentId");

                    b.HasIndex("ServiceId");

                    b.ToTable("AppointmentServices");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AppointmentId = 1,
                            ServiceId = 1
                        },
                        new
                        {
                            Id = 2,
                            AppointmentId = 1,
                            ServiceId = 2
                        },
                        new
                        {
                            Id = 3,
                            AppointmentId = 2,
                            ServiceId = 1
                        },
                        new
                        {
                            Id = 4,
                            AppointmentId = 3,
                            ServiceId = 3
                        },
                        new
                        {
                            Id = 5,
                            AppointmentId = 3,
                            ServiceId = 1
                        },
                        new
                        {
                            Id = 6,
                            AppointmentId = 3,
                            ServiceId = 5
                        },
                        new
                        {
                            Id = 7,
                            AppointmentId = 4,
                            ServiceId = 1
                        },
                        new
                        {
                            Id = 8,
                            AppointmentId = 4,
                            ServiceId = 4
                        },
                        new
                        {
                            Id = 9,
                            AppointmentId = 5,
                            ServiceId = 3
                        },
                        new
                        {
                            Id = 10,
                            AppointmentId = 5,
                            ServiceId = 2
                        });
                });

            modelBuilder.Entity("HillarysHaircare.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Customers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "bobo@example.com",
                            Name = "BoBo JoeJoe",
                            Phone = "123-456-7890"
                        },
                        new
                        {
                            Id = 2,
                            Email = "alice@example.com",
                            Name = "Alice Arnet",
                            Phone = "987-654-3210"
                        },
                        new
                        {
                            Id = 3,
                            Email = "bbill@example.com",
                            Name = "Big Bill",
                            Phone = "555-555-5555"
                        },
                        new
                        {
                            Id = 4,
                            Email = "loki@example.com",
                            Name = "Loki Moshion",
                            Phone = "666-666-6666"
                        },
                        new
                        {
                            Id = 5,
                            Email = "ash@example.com",
                            Name = "Ash Ashley",
                            Phone = "364-273-9876"
                        });
                });

            modelBuilder.Entity("HillarysHaircare.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.ToTable("Services");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Haircut",
                            Price = 40.00m
                        },
                        new
                        {
                            Id = 2,
                            Name = "Beard Trim",
                            Price = 20.00m
                        },
                        new
                        {
                            Id = 3,
                            Name = "Color",
                            Price = 65.00m
                        },
                        new
                        {
                            Id = 4,
                            Name = "Advanced Color",
                            Price = 85.00m
                        },
                        new
                        {
                            Id = 5,
                            Name = "Blowout",
                            Price = 30.00m
                        });
                });

            modelBuilder.Entity("HillarysHaircare.Models.Stylist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Stylists");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsActive = true,
                            Name = "Josh Barton"
                        },
                        new
                        {
                            Id = 2,
                            IsActive = true,
                            Name = "Greg Korte"
                        },
                        new
                        {
                            Id = 3,
                            IsActive = true,
                            Name = "Caroline Madison"
                        },
                        new
                        {
                            Id = 4,
                            IsActive = false,
                            Name = "Steve Brownlee"
                        });
                });

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.HasOne("HillarysHaircare.Models.Appointment", null)
                        .WithMany()
                        .HasForeignKey("AppointmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HillarysHaircare.Models.Service", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HillarysHaircare.Models.Appointment", b =>
                {
                    b.HasOne("HillarysHaircare.Models.Customer", null)
                        .WithMany("Appointments")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HillarysHaircare.Models.Stylist", null)
                        .WithMany("Appointments")
                        .HasForeignKey("StylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HillarysHaircare.Models.AppointmentService", b =>
                {
                    b.HasOne("HillarysHaircare.Models.Appointment", "Appointment")
                        .WithMany()
                        .HasForeignKey("AppointmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HillarysHaircare.Models.Service", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Appointment");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("HillarysHaircare.Models.Customer", b =>
                {
                    b.Navigation("Appointments");
                });

            modelBuilder.Entity("HillarysHaircare.Models.Stylist", b =>
                {
                    b.Navigation("Appointments");
                });
#pragma warning restore 612, 618
        }
    }
}
