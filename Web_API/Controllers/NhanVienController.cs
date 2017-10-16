using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class NhanVienController : ApiController
    {
        VideoRentalDb db;
        public NhanVienController()
        {
            db = new VideoRentalDb();
        }

        [Route("api/nhanvien")]
        public IHttpActionResult GetAll()
        {
            var lst = db.NhanViens.ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }

    }
}
