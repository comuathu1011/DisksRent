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
    public class DiaAPIController : ApiController
    {
        VideoRentalDb db;
        public DiaAPIController()
        {
            db = new VideoRentalDb();
        }

        //get danh sach dia
        [Route("api/dia")]
        public IHttpActionResult GetAll()
        {
            var lst = db.Dias.ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }

            List<Dia> result = new List<Dia>();

            lst.ForEach(item =>
            {
                Dia dia = new Dia();
                dia.MaDia = item.MaDia;
                dia.MaTieuDe = item.MaTieuDe;
                dia.TinhTrangThue = item.TinhTrangThue;
                result.Add(dia);
            });

            return Json(result);
        }

        //them dia
        [Route("api/dia/{maTieuDe}/{soLuong}")]
        [HttpPost]
        public IHttpActionResult Post(int maTieuDe, int soLuong)
        {
            if (maTieuDe < 0 || soLuong < 0) return NotFound();
            var tieuDe = db.TieuDes.Find(maTieuDe);
            var list = new List<Dia>();
            for (int i = 0; i < soLuong; i++)
            {
                var model = new Dia
                {
                    MaTieuDe = tieuDe.MaTieuDe,
                    TinhTrangThue = TinhTrangThueCollection.CoSan
                };
                list.Add(model);
            }

            db.Dias.AddRange(list);
            db.SaveChanges();
            return Ok();
        }

        //xoa dia
        [Route("api/dia/{maDia}")]
        [HttpDelete]
        public IHttpActionResult Delete(int maDia)
        {
            string err = null;
            try
            {
                db.Dias.Remove(db.Dias.Find(maDia));
                db.SaveChanges();
            }
            catch (Exception)
            {
                err = "Lỗi";
                return Json(err);
            }
            return Json(err);
        }

        //get so luong dia cua mot tieu de
        [Route("api/dia/{maTieuDe}/count")]
        public IHttpActionResult GetCount(int maTieuDe)
        {
            if(maTieuDe < 0)
            {
                string err = "Không tìm thấy tiêu đề cần tìm";
                return Json(err);
            }
            var result = db.Dias.Where(x => x.MaTieuDe == maTieuDe).Count();
            return Json(result);
        }

        //get 
        [Route("api/dia/{maTieuDe}/{limit}/{offset}")]
        public IHttpActionResult GetDias(int maTieuDe, int limit, int offset)
        {
            string err = null;
            var tieuDe = db.TieuDes.Find(maTieuDe);
            if (tieuDe == null)
            {
                err = "Không tìm thấy tiêu đề cần tìm";
                return Json(err);
            }
            if (limit < 0 || offset < 0)
            {
                err = "Lỗi";
                return Json(err);
            }
            var result = db.Dias.Where(x => x.MaTieuDe == maTieuDe).Skip(offset).Take(limit).ToList();
            if (result.Count == 0)
            {
                err = "Không tìm thấy đĩa theo yêu cầu";
                return Json(err);
            }
            return Json(result);
        }
    }
}
