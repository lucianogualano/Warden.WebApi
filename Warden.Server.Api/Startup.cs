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

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }      
    }
}