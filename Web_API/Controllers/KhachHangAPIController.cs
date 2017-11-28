using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class KhachHangAPIController : ApiController
    {
        VideoRentalDb db;
        public KhachHangAPIController()
        {
            db = new VideoRentalDb();
        }
        //get danh sach khach hang
        [Route("api/khachhang")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var lst = db.KhachHangs.OrderBy(x=>x.Ten).ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Json(lst);
        }

        
        [Route("api/khachhang/{limit}/{offset}")]
        [HttpGet]
        public IHttpActionResult getKkhachHangBySizeAndOffset(int limit, int offset)
        {
            var list = db.KhachHangs.ToList().Skip(offset).Take(limit).OrderBy(x=>x.Ten).ToList();
            if (list.Count == 0)
            {
                return NotFound();
            }
            return Json(list);
        }

        //get so luong khach hang
        [Route("api/khachhang/count")]
        [HttpGet]
        public IHttpActionResult GetCount()
        {
            return Json(db.KhachHangs.ToList().Count);
        }

        //get khach hang theo id
        [Route("api/khachhang/{id}")]
        [HttpGet]
        public IHttpActionResult GetCust(int id)
        {
            var cust = db.KhachHangs.Find(id);
            if (cust == null)
            {
                return NotFound();
            }
            return Json(cust);
        }

        [Route("api/khachhang/diatre/count")]
        public IHttpActionResult GetCountTraTre()
        {
            var count = (from t1 in db.KhachHangs
                        join t2 in db.DsChoThue
                        on t1.MaKhachHang equals t2.MaKhachHang
                        where (t2.NgayThucTra.CompareTo(t2.NgayPhaiTra) > 0)
                        select t1).Count();
                       
                       
            return Json(count);
        }

        [Route("api/khachhang/diatre/{limit}/{offset}")]
        public IHttpActionResult GetKhachHangTraTre(int limit, int offset)
        {
            var list = (from t1 in db.KhachHangs
                         join t2 in db.DsChoThue
                         on t1.MaKhachHang equals t2.MaKhachHang
                         where (t2.NgayThucTra.CompareTo(t2.NgayPhaiTra) > 0)
                         select t1)
                         .OrderByDescending(x => x.Ten)
                         .Skip(offset)
                         .Take(limit).Distinct()
                         .ToList();

            return Json(list);
        }

        [Route("api/khachhang/cono/count")]
        public IHttpActionResult GetCountCoNo()
        {
            var count = (from t1 in db.KhachHangs
                         join t2 in db.DsChoThue
                         on t1.MaKhachHang equals t2.MaKhachHang
                         where (t2.PhiTre > 0)
                         select t1).Count();


            return Json(count);
        }

        [Route("api/khachhang/cono")]
        public IHttpActionResult GetKhachHangCoNo(int limit, int offset)
        {
            var list = (from t1 in db.KhachHangs
                        join t2 in db.DsChoThue
                        on t1.MaKhachHang equals t2.MaKhachHang
                        where (t2.PhiTre > 0)
                        select t1)
                         .OrderByDescending(x => x.Ten)
                         .Skip(offset)
                         .Take(limit)
                         .ToList();


            return Json(list);
        }

        //them khach hang
        [Route("api/khachhang")]
        [HttpPost]
        public IHttpActionResult Post(KhachHang kh)
        {
            var model = new KhachHang
            {
                Ten = kh.Ten,
                DiaChi = kh.DiaChi,
                SoDienThoai = kh.SoDienThoai,
            };
            db.KhachHangs.Add(kh);
            db.SaveChanges();
            return Ok();
        }

        //sua thong tin khach hang
        [Route("api/khachhang")]
        [HttpPut]
        public IHttpActionResult Put(KhachHang kh)
        {
            db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }

        //xoa khach hang
        [Route("api/khachhang/{id}")]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            db.KhachHangs.Remove(db.KhachHangs.Find(id));
            db.SaveChanges();
            return Ok();
        }
    }
}
