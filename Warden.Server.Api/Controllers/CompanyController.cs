using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Warden.Server.Api.Entities;
using Warden.Server.Api.Infrastructure.Repository;

namespace Warden.Server.Api.Controllers
{
    [Authorize]
   // [Route("api/[controller]")]
    public class CompanyController : ApiController
    {
        private CompanyRepository companyRepo = null;

        public CompanyController()
        {
            this.companyRepo = new CompanyRepository();
        }

        /// <summary>
        ///  GET api/company
        /// </summary>
        /// <returns></returns>
        [HttpGet]
       // [Route("{id:int}")]
        public IEnumerable<Company> Get()
        {
            List<Company> companies = new List<Company>();

            try
            {
                companies = this.companyRepo.GetCompanies();
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.Message);
            }

            return companies;
        }

        /// <summary>
        /// Get based by site entity id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
       // [Route("{id:int}")]
        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            Company company = null;
            try
            {
                company = this.companyRepo.GetCompanyById(id);

            }
            catch (ArgumentNullException)
            {
                return BadRequest("Failed to find company");
            }
            return Ok(company);
        }

        /// <summary>
        /// Get based by site entity id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        [HttpPost]
        public IHttpActionResult InsertCustomer([FromBody]Company company)
        {
            try
            {
                if(!this.companyRepo.InsertCompany(company))
                {
                    return BadRequest("Failed to add company " + company.Name);
                }

            }
            catch (ArgumentNullException)
            {
                return BadRequest("Failed to find company");
            }
            return Ok(company);
        }
    }
}
