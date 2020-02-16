using System;

namespace FocLab.Model.Entities
{
    public class VirtualServer
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? RemovedOn { get; set; }
    }
}