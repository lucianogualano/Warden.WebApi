using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Warden.Server.Api.Entities;
using Warden.Server.Api.Infrastructure.EF;

namespace Warden.Server.Api.Infrastructure.Repository
{
    //TODO: Note repository inherit from generic repository
    public class CompanyRepository
    {
        private WardenContext context;

        public CompanyRepository()
        {
            // TODO: Using Ioc framework to inject dependencies
            this.context = new WardenContext();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Company> GetCompanies()
        {
            return this.context.Companys
                  .Include("Sites")
                  .OrderBy(s => s.Name).ToList();
        }

        /// <summary>
        /// If it cannot find the company by id it will create defa
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Company GetCompanyById(int id)
        {
            return this.context.Companys
                    .Include("Sites")
                    .SingleOrDefault(c => c.Id == id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="company"></param>
        /// <returns></returns>
        public bool InsertCompany(Company company)
        {
            bool success = true;
            try
            {
                this.context.Companys.Add(company);
                this.context.SaveChanges();
            }
            catch (Exception)
            {
                success = false;
            }
            return success;
        }
    }
}