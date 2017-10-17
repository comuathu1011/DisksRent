using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_API.Models
{
    public class TieuDe
    {
        [Key]
        public int MaTieuDe { get; set; }
        public string Ten { get; set; }

        public int MaDanhMuc { get; set; }
        [ForeignKey("MaDanhMuc")]
        public virtual DanhMuc DanhMuc { get; set; }
    }
}