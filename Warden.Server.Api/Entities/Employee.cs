using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Warden.Server.Api.Entities
{
    public class Employee : Person
    {
        public Employee()
        {
            RoleType = null;
        }

        /// <summary>
        /// Foreign key to Site table
        /// </summary>
        public int SiteID { get; set; }

        /// <summary>
        /// Navigation property for Site
        /// </summary>
        public virtual Site Site { get; set; }

        ///// <summary>
        ///// Foreign key to Role table, employee can be set to null since 
        ///// it might not be assigned a warden role.
        ///// </summary>
        //public int? RoleID { get; set; }

        ///// <summary>
        ///// Indicates if the employee has been assigned to be a warden
        ///// Navigation property for Role
        ///// </summary>
        //public virtual Role Role { get; set; }

        /// <summary>
        /// Use enum top set the role type rather than a separate table
        /// </summary>
        [DisplayFormat(NullDisplayText = "No role")]
        public RoleType? RoleType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool IsAdministrator { get; set; }

        /// <summary>
        /// Foreign key to EmployeeDetails table
        /// </summary>
        public int EmployeeDetailsID { get; set; }

        /// <summary>
        /// Navigation property for EmployeeDetails
        /// </summary>
        public EmployeeDetails EmployeeDetails { get; set; }

    }
}