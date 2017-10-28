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

            return Ok(result);
        }

        //them dia
        [Route("api/dia/{maTieuDe}/{soLuong}")]
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
        [Route("api/dia/{id}")]
        public IHttpActionResult Delete(int id)
        {
            db.Dias.Remove(db.Dias.Find(id));
            db.SaveChanges();
            return Ok();
        }
    }
}
