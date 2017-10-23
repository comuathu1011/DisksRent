using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Web_API.Models.Enums
{
    public enum TinhTrangThueCollection
    {
        [Description("Đang có sẵn")]
        CoSan = 1,

        [Description("Đang được thuê")]
        DangThue = 2,

        [Description("Đang giữ cho khách")]
        DangGiu = 3
    }
}