using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class DangNhapAPIController : ApiController
    {
        VideoRentalDb db;
        public DangNhapAPIController()
        {
            db = new VideoRentalDb();
        }

        [Route("api/login/{username}/{password}")]
        [HttpPost]
        public IHttpActionResult PostLogin(string username, string password)
        {
            string err = null;
            var model = db.NhanViens.Where(x => x.TenDangNhap == username && x.MatKhau == password).FirstOrDefault();
            if (model != null)
            {
                err = "Thông tin đăng nhập sai";
                return Json(err);
            }
            return Json(err);
        }
    }
}
