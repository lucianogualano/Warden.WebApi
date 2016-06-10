﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Warden.Server.Api.Entities;

namespace Warden.DataModel.Data
{
    public class SiteViewModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [MaxLength(255)]
        [MinLength(1)]
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// TODO: change to an object
        /// </summary>
        [MaxLength(255)]
        [MinLength(1)]
        [Required]
        public string Address { get; set; }
    }
}
