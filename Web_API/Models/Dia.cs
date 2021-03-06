﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Web_API.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_API.Models
{
    public class Dia
    {
        [Key]
        public int MaDia { get; set; }
        public TinhTrangThueCollection TinhTrangThue { get; set; }

        public int MaTieuDe { get; set; }
        [ForeignKey("MaTieuDe")]
        public virtual TieuDe TieuDe { get; set; }
    }
}