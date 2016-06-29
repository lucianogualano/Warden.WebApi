using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Warden.Server.Api.Entities;
using Warden.Server.Api.Infrastructure.Repository;
using Warden.Services.Services;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Warden.Server.Api.Controllers
{
    //[Authorize]
  //  [Route("api/[controller]")]
    public class SitesController : ApiController
    {
        private CompanyRepository companyRepo = null;

        public SitesController()
        {
            this.companyRepo = new CompanyRepository();
        }


        /// <summary>
        ///  GET api/sites
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Site> Get()
        {
            List<Site> sites = new List<Site>();

            try
            {
               // sites = await this.companyRepo.GetCompanies();
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.Message);
            }

            return sites;
        }

        /// <summary>
        /// GET api/site/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
       // [Route("{id:int}")]
        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            Site site = null;
            try
            {
                //site = await this.siteService.GetById(id);
            }
            catch (ArgumentNullException)
            {
                return BadRequest("Not found site");
            }
            return Ok(site);
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="site"></param>
        ///// <returns></returns>
        //[HttpPost]
        //public async Task<IHttpActionResult> Post([FromBody]Site site)
        //{
        //    // Check to see if the id is unique?
        //    await this.siteService.Add(site);
        //    return Ok(site);
        //}

        //[HttpPut]
        //[Route("update")]
        //public async Task<IHttpActionResult> Update([FromBody]Site site)
        //{
        //    // Check id is unique
        //    await this.siteService.Update(site);
        //    return Ok(site);
        //}

        //[HttpPut]
        //[Route("update/{Guid}")]
        //public IHttpActionResult Update(Guid? id, [FromBody]Site site)
        //{
        //    // Check id is unique            
        //    this.siteService.Update(site);
        //    return Ok(site);
        //}

        //// DELETE api/values/5
        //[HttpDelete]
        //public async Task<IHttpActionResult> Delete(Guid id)
        //{
        //    // Check id is unique
        //    await this.siteService.Delete(id);
        //    // Return true or false????
        //    return Ok(id);
        //}
    }
}
