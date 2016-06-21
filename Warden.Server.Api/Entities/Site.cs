using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warden.Server.Api.Entities
{
    public class Site : IEntityBase
    {
        public Site()
        {
            Employee = new HashSet<Employee>();
        }

        public int Id { get; set; }

        /// <summary>
        /// Foreign key to Company table
        /// </summary>
        public int CompanyId { get; set; }
        
        /// <summary>
        /// Navigation property for Company table
        /// </summary>
        public virtual Company Company { get; set; }

        /// <summary>
        /// Navigation property of employees, one-to-many relationship
        /// </summary>
        public virtual ICollection<Employee> Employee { get; set; }
        //public virtual ICollection<Person> Visitors { get; set; }
    }
}