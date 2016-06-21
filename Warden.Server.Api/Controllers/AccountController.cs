using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Warden.Server.Api.DTO;
using Warden.Server.Api.Entities;
using Warden.Server.Api.Infrastructure.EF;
using Warden.Services.Services;

namespace Warden.Server.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private ApplicationUserManager userManager = null;
        private ApplicationRoleManager roleManager = null;
        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager,
                                 ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        /// <summary>
        /// 
        /// </summary>
        public ApplicationUserManager UserManager
        {
            get
            {
                return this.userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                this.userManager = value;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public ApplicationRoleManager RoleManager
        {
            get
            {
                return this.roleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
            private set
            {
                this.roleManager = value;
            }
        }

        // POST api/values
        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Post([FromBody]UserRegistrationViewModel registration)
        {
            //this.logger.LogVerbose("Registeration for {0}", registration.Email);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = new ApplicationUser() { UserName = registration.Email, Email = registration.Email,  };

                IdentityResult result = await UserManager.CreateAsync(user, registration.Password);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }
            }
            catch (Exception e) 
            {
                // Log error
                Console.WriteLine("Failed registration due to " + e.Message);
                // No ModelState errors are available to send, so just return an empty BadRequest.
                return BadRequest();
            }
            
            return Ok();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && this.userManager != null)
            {
                this.userManager.Dispose();
                this.userManager = null;
            }

            base.Dispose(disposing);
        }

        #region Helpers
        /// <summary>
        /// 
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
        #endregion
    }
}
