using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Web_API.Models.Enums
{
    public enum TinhTrangDatHangCollection
    {
        [Description("Đã nhận đĩa")]
        DaXong = 1,

        [Description("Đang chờ đĩa")]
        DangCho = 2,

        [Description("Đã hủy")]
        DaHuy = 3
    }
}