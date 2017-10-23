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
        public IHttpActionResult GetAll()
        {
            var lst = db.TieuDes.ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }
        //thong tin chi tiet tieu de
        [Route("api/tieude/{id}")]
        public IHttpActionResult GetOne(int id)
        {
            var model = db.TieuDes.Find(id);
            if (model!=null)
            {
                return NotFound();
            }
            return Ok(model);
        }

        //them tieu de
        [Route("api/tieude")]
        public IHttpActionResult Post(TieuDe t)
        {
            db.TieuDes.Add(t);
            db.SaveChanges();
            return Ok();
        }

        //xoa tieu de
        [Route("api/khachhang/{id}")]
        public IHttpActionResult Delete(int id)
        {
            db.TieuDes.Remove(db.TieuDes.Find(id));
            db.SaveChanges();
            return Ok();
        }
    }
}
