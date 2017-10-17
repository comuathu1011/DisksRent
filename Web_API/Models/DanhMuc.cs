using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web_API.Models
{
    public class DanhMuc
    {
        [Key]
        public int MaDanhMuc { get; set; }
        public string TenDanhMuc { get; set; }
        public decimal GiaThue { get; set; }
    }
}