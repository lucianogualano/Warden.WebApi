using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warden.Server.Api.Entities
{
    public class Company : IEntityBase
    {
        public Company()
        {
            Sites = new HashSet<Site>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Site> Sites { get; set; }
        //public virtual
    }
}