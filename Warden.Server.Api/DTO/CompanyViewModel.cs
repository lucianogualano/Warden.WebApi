using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Warden.Server.Api.Entities;

namespace Warden.DataModel.Data
{
    public class CompanyViewModel
    {
        public string Name { get; set; }

        public IEnumerable<SiteViewModel> Sites { get; set; }
    }
}
