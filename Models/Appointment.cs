using System.ComponentModel.DataAnnotations;

namespace HillarysHaircare.Models;

public class Appointment
{
    public int Id { get; set; }
    [Required]
    public DateTime Date {get; set;}
    public int StylistId { get; set; }
    public int CustomerId { get; set; }
    public bool IsCancelled { get; set; }
    public List<Service> Services { get; set; }
    public Stylist Stylist { get; set; }
    public Customer Customer { get; set; }
    public decimal? TotalCost { 
        get
        {
            if (Services != null)
            {
                return Services.Sum(s => s.Price);
            }
            return null;
        } }
}