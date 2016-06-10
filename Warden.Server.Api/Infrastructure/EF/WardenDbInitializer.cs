using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Warden.Server.Api.Infrastructure.EF
{

    public class WardenDbInitializer : CreateDatabaseIfNotExists<WardenContext>
    {
        protected override void Seed(WardenContext context)
        {
            InitializeIdentityForEF(context);
            base.Seed(context);
        }

        public static void InitializeIdentityForEF(WardenContext db)
        {

            //if (!db.Users.Any())
            //{
            //    var roleStore = new RoleStore<IdentityRole>(db);
            //    var roleManager = new RoleManager<IdentityRole>(roleStore);
            //    var userStore = new UserStore<ApplicationUser>(db);
            //    var userManager = new UserManager<ApplicationUser>(userStore);

            //    Add missing roles
            //   var role = roleManager.FindByName("Admin");
            //    if (role == null)
            //    {
            //        role = new IdentityRole("Admin");
            //        roleManager.Create(role);
            //    }

            //    Create test users
            //   var user = userManager.FindByName("admin");
            //    if (user == null)
            //    {
            //        var newUser = new ApplicationUser()
            //        {
            //            UserName = "admin",
            //            FirstName = "Admin",
            //            LastName = "User",
            //            Email = "xxx@xxx.net",
            //            PhoneNumber = "5551234567",
            //            MustChangePassword = false
            //        };
            //        userManager.Create(newUser, "Password1");
            //        userManager.SetLockoutEnabled(newUser.Id, false);
            //        userManager.AddToRole(newUser.Id, "Admin");
            //    }
        }
    }
}