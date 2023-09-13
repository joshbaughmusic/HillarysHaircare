using System.ComponentModel.DataAnnotations;

namespace HillarysHaircare.Models;

public class Customer
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set;}
    public string Email { get; set; }
    public string Phone { get; set; }
    public List<Appointment> Appointments { get; set; }
}