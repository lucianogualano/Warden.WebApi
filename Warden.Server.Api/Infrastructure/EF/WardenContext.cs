using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Warden.Server.Api.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using Warden.Server.Api.DTO;
using System.Data.Entity.Core;
using System.Data.Entity;

namespace Warden.Server.Api.Infrastructure.EF
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class WardenContext : IdentityDbContext<ApplicationUser>
    {
        public WardenContext()
            : base("WardenDB", throwIfV1Schema: false)
        {
            Database.SetInitializer<WardenContext>( new CreateDatabaseIfNotExists<WardenContext>());
       

            // Set the database intializer which is run once during application start
            // This seeds the database with admin user credentials and admin role
           // Database.SetInitializer(new WardenDbInitializer());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //builder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            //builder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            //builder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
            builder.Entity<ApplicationUser>().ToTable("Users");
            //modelBuilder.Configurations.Add(new CategoryConfiguration());
            //modelBuilder.Configurations.Add(new OrderConfiguration());

            // User
            //builder.Entity<UserEntity>().Property(u => u.Username).IsRequired().HasMaxLength(100);
            //builder.Entity<UserEntity>().Property(u => u.Email).IsRequired().HasMaxLength(200);
            //builder.Entity<UserEntity>().Property(u => u.HashedPassword).IsRequired().HasMaxLength(200);
            //builder.Entity<UserEntity>().Property(u => u.Salt).IsRequired().HasMaxLength(200);

            //// UserRole
            //builder.Entity<UserRoleEntity>().Property(ur => ur.UserId).IsRequired();
            //builder.Entity<UserRoleEntity>().Property(ur => ur.RoleId).IsRequired();

            // Role
            //builder.Entity<RoleEntity>().Property(r => r.Name).IsRequired().HasMaxLength(50);
            
        }

        public static WardenContext Create()
        {
            return new WardenContext();
        }
    }
}
