using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warden.Server.Api.Entities
{
    public class Role : IEntityBase
    {
        public int Id { get; set; }

        public RoleType RoleType { get; set; }
    }
}