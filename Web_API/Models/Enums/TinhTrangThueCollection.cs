using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Web_API.Models.Enums
{
    public enum TinhTrangThueCollection
    {
        [Description("Dang co san")]
        CoSan = 1,

        [Description("Dang duoc thue")]
        DangThue = 2,

        [Description("Dang giu cho khach")]
        DangGiu = 3
    }
}