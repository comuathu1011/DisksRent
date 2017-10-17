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
            return Ok(lst);
        }

        //them khach hang
        [Route("api/dia/{maTieuDe}/{soLuong}")]
        public IHttpActionResult Post(int maTieuDe, int soLuong)
        {
            //var tieuDe = db.TieuDes.Find(maTieuDe);
            //var model = new Dia
            //{
            //    MaTieuDe = tieuDe.MaTieuDe,
            //    TinhTrangThue = TinhTrangThueCollection.CoSan;
            //}
            //db.SaveChanges();
            return Ok();
        }

        //xoa khach hang
        [Route("api/khachhang/{id}")]
        public IHttpActionResult Delete(int id)
        {
            db.KhachHangs.Remove(db.KhachHangs.Find(id));
            db.SaveChanges();
            return Ok();
        }
    }
}
