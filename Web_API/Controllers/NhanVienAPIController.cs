using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class NhanVienAPIController : ApiController
    {
        VideoRentalDb db;
        public NhanVienAPIController()
        {
            db = new VideoRentalDb();
        }

        [Route("api/nhanvien")]
        public IHttpActionResult GetAll()
        {
            var lst = db.NhanViens.OrderBy(x=>x.TenDangNhap).ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Json(lst);
        }

    }
}
