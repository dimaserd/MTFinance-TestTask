using System;

namespace FocLab.Logic.Models
{
    public class VirtualServerModel
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? RemovedOn { get; set; }
    }
}