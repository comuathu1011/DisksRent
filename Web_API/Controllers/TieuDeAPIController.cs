using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class TieuDeAPIController : ApiController
    {
        VideoRentalDb db;
        public TieuDeAPIController()
        {
            db = new VideoRentalDb();
        }
        //get danh sach tieu de
        [Route("api/tieude")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var lst = db.TieuDes.ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }
        //get so luong tieu de
        [Route("api/tieude/count")]
        [HttpGet]
        public IHttpActionResult GetCount()
        {
           return Json(db.TieuDes.ToList().Count);
        }
        //get tieu de theo id
        [Route("api/tieude/{id}")]
        [HttpGet]
        public IHttpActionResult GetTitle(int id)
        {
            var title = db.TieuDes.Find(id);
            if(title == null)
            {
                return NotFound();
            }
            return Ok(title);
        }
        ////
        //[Route("api/tieude/{limit}/{offset}")]
        //public IHttpActionResult GetTitle()
        //{

        //}
        //sua thong tin khach hang
        //[Route("api/tieu")]
        //public IHttpActionResult Put(KhachHang kh)
        //{
        //    db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
        //    db.SaveChanges();
        //    return Ok();
        //}
        //them tieu de
        [Route("api/tieude")]
        public IHttpActionResult Post(TieuDe t)
        {
            db.TieuDes.Add(t);
            db.SaveChanges();
            return Ok();
        }

        //xoa tieu de
        [Route("api/tieude/{id}")]
        public IHttpActionResult Delete(int id)
        {
            db.TieuDes.Remove(db.TieuDes.Find(id));
            db.SaveChanges();
            return Ok();
        }
    }
}
