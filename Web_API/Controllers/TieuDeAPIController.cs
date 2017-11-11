using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;
using Web_API.Models.Enums;

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
            var lst = db.TieuDes.OrderBy(x=>x.Ten).ToList();
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

        [Route("api/tieude/dia/dathue/count/{maTieuDe}")]
        [HttpGet]
        public IHttpActionResult GetCountDiaOfTieuDeDaChoThue(int maTieuDe)
        {
            var count = (
                        from tieude in db.TieuDes
                        join dia in db.Dias
                        on tieude.MaTieuDe equals dia.MaTieuDe
                        where (dia.TinhTrangThue == TinhTrangThueCollection.DangThue && dia.MaTieuDe.Equals(maTieuDe))
                        select dia).Count();    
            return Json(count);
        }

        [Route("api/tieude/dia/hold/count/{maTieuDe}")]
        [HttpGet]
        public IHttpActionResult GetCountDiaOfTieuDeGiuChoKhach(int maTieuDe)
        {
            var count = (
                        from tieude in db.TieuDes
                        join dia in db.Dias
                        on tieude.MaTieuDe equals dia.MaTieuDe
                        where (dia.TinhTrangThue == TinhTrangThueCollection.DangGiu && dia.MaTieuDe.Equals(maTieuDe))
                        select dia).Count();
            return Json(count);
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
