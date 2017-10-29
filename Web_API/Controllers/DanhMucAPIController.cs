using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class DanhMucAPIController : ApiController
    {
        VideoRentalDb db;
        public DanhMucAPIController()
        {
            db = new VideoRentalDb();
        }
        //get tat ca danh muc
        [Route("api/danhmuc")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var lst = db.DanhMucs.ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }

        //get danh muc theo id
        [Route("api/danhmuc/{id}")]
        [HttpGet]
        public IHttpActionResult GetDm(int id)
        {
            var dm = db.DanhMucs.Find(id);
            if (dm == null)
            {
                return NotFound();
            }
            return Ok(dm);
        }

        //cap nhat gia
        [Route("api/danhmuc/{id}/{gia}")]
        public IHttpActionResult PostCost(KhachHang kh)
        {
            db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }
        // cap nhat thoi gian
        [Route("api/danhmuc/{id}/{gia}")]
        public IHttpActionResult PostTime(KhachHang kh)
        {
            db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }
    }
}
