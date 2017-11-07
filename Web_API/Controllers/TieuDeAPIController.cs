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
        
        [Route("api/tieude/{limit}/{offset}")]
        public IHttpActionResult GetTieuDeBySizeOffset(int limit, int offset)
        {
            var ds = db.TieuDes.ToList().Skip(offset).Take(limit).ToList();
            return Json(ds);
        }

  
        [Route("api/tieude")]
        [HttpPost]
        public IHttpActionResult Post(TieuDe t)
        {
            db.TieuDes.Add(t);
            db.SaveChanges();
            return Ok();
        }

        //xoa tieu de
        [Route("api/tieude/{id}")]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            db.TieuDes.Remove(db.TieuDes.Find(id));
            db.SaveChanges();
            return Ok();
        }
    }
}
