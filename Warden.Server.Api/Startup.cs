using Microsoft.Owin;
using Owin;
//using Microsoft.Owin.Security.DataHandler.Encoder;
//using Microsoft.Owin.Security.Jwt;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;

[assembly: OwinStartup(typeof(Warden.Server.Api.Startup))]

namespace Warden.Server.Api
{
    
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            ConfigureAuthZero(app);

            WebApiConfig.Register(config);

            // Install nuget package
            // Microsoft.Owin.Security
            // Microsoft.Owin.Cors
            // Microsoft.Owin.Security.OAuth
            //app.Use(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        private void ConfigureAuthZero(IAppBuilder app)
        {
            var issuer = "https://" + ConfigurationManager.AppSettings["auth0:Domain"] + "/";
            var audience = ConfigurationManager.AppSettings["auth0:ClientId"];
          //  var secret = TextEncodings.Base64.Encode(TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["auth0:ClientSecret"]));

            // Api controllers with an [Authorize] attribute will be validated with JWT
            // Install nuget package Microsoft.Owin.Security.Jwt
            //app.UseJwtBearerAuthentication(
            //    new JwtBearerAuthenticationOptions
            //    {
            //        AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
            //        AllowedAudiences = new[] { audience },
            //        IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
            //        {
            //            new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
            //        }
            //    });
        }
    }
}