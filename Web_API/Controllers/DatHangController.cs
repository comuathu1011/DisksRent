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
    public class DatHangController : ApiController
    {
        VideoRentalDb db;
        public DatHangController()
        {
            db = new VideoRentalDb();
        }

        //đặt hàng tiêu đề đang hết đĩa
        [Route("api/dathang/{maKh}/{maTieuDe}")]
        public IHttpActionResult Post(int maKh, int maTieuDe)
        {
            string err = "";
            var tieuDe = db.TieuDes.Find(maTieuDe);
            var kh = db.KhachHangs.Find(maKh);
            if(tieuDe == null || kh == null)
            {
                err = "Không tìm thấy dữ liệu";
                return Json(err);
            }
            if (maTieuDe < 0 || maKh < 0) return NotFound();
            var model = new DsDatHang
            {
                MaKhachHang = maKh,
                MaTieuDe = maTieuDe,
                ThuTu = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe).Max(x => x.ThuTu) + 1,
                TinhTrang = TinhTrangDatHangCollection.DangCho
            };
            try
            {
                db.DsDatHang.Add(model);
                db.SaveChanges();
            }
            catch (Exception)
            {
                model = null;
                return Json(model);
            }
            return Json(model);
        }
        //hủy đặt hàng
        [Route("api/dathang/{maKh}/{maTieuDe}/{thuTu}")]
        public IHttpActionResult Put(int maKh, int maTieuDe, int thuTu)
        {
            string err = null;
            var model = db.DsDatHang.Where(x => x.MaKhachHang == maKh && x.MaTieuDe == maTieuDe && x.ThuTu == thuTu).FirstOrDefault();
            try
            {
                db.DsDatHang.Remove(model);
                db.SaveChanges();
            }
            catch (Exception)
            {
                err = "Lỗi";
                return Json(err);
            }
            return Json(err);
        }
        //Kiểm tra tiêu đề của đĩa được trả lại có đang được đặt hàng không
        private bool KiemTraTieuDeDangDuocDatHang(int maDia)
        {
            if (maDia < 0) return false;
            var maTieuDe = db.Dias.Find(maDia).MaTieuDe;
            var model = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe && x.TinhTrang == TinhTrangDatHangCollection.DangCho);
            if (model.Count() == 0)
            {
                return false;
            }
            return true;
        }

        public void KiemTraTinhTrangDatHang(int maDia)
        {
            var dia = db.Dias.Find(maDia);
            var maTieuDe = dia.MaTieuDe;
            if(KiemTraTieuDeDangDuocDatHang(maDia))
            {
                var model = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe && x.TinhTrang == TinhTrangDatHangCollection.DangCho).
                                    OrderBy(x=>x.ThuTu).FirstOrDefault();
                model.TinhTrang = TinhTrangDatHangCollection.DaXong;
                db.Entry(model).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                dia.TinhTrangThue = TinhTrangThueCollection.DangGiu;
                db.Entry(dia).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            else
            {
                dia.TinhTrangThue = TinhTrangThueCollection.CoSan;
                db.Entry(dia).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        //chuyển tình trạng của đĩa sang "on hold"
        //public void ChuyenTinhTrangDiaDangGiu(int maDia)
        //{
        //    if (maDia < 0) return;
        //    var model = db.Dias.Find(maDia);
        //    var maTieuDe = model.MaTieuDe;
        //    if (KiemTraTieuDeDangDuocDatHang(maTieuDe))
        //    {
        //        model.TinhTrangThue = TinhTrangThueCollection.DangGiu;
        //    }
        //}

        //Chuyển tình trạng đĩa sang "đã xong" khi kh đã nhận đĩa
        [Route("api/dathang/dia/{maTieuDe}/{maKh}")]
        public IHttpActionResult PutChuyenTinhTragDiaDaXong(int maTieuDe, int maKh )
        {
            if (maTieuDe < 0 || maKh < 0) return NotFound();
            var model = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe && x.MaKhachHang == maKh).FirstOrDefault();
            model.TinhTrang = TinhTrangDatHangCollection.DaXong;
            db.Entry(model).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }

        [Route("api/datHang/{limit}/{offset} ")]
        public IHttpActionResult GetLimit(int limit, int offset)
        {
            string err = null;
            if (limit < 0 || offset < 0)
            {
                err = "Lỗi";
                return Json(err);
            }
            var result = db.DsDatHang.Skip(offset).Take(limit).ToList();
            return Json(result);
        }

        [Route("api/datHang/{maKhachHang}/{maTieuDe}/{limit}/{offset}")]
        public IHttpActionResult GetLimitWithOptions(int maKhachHang, int maTieuDe, int limit, int offset)
        {
            string err = null;
            if (limit < 0 || offset < 0)
            {
                err = "Lỗi";
                return Json(err);
            }
            var result = new List<DsDatHang>();
            if(maKhachHang != -1 && maTieuDe != -1)
            {
                result = db.DsDatHang.OrderBy(x=>x.MaKhachHang).OrderBy(x=>x.MaTieuDe).Skip(offset).Take(limit).ToList();
            }
            else if(maKhachHang != -1)
            {
                result = db.DsDatHang.OrderBy(x => x.MaTieuDe).Skip(offset).Take(limit).ToList();
            }
            else
            {
                result = db.DsDatHang.OrderBy(x => x.MaKhachHang).Skip(offset).Take(limit).ToList();
            }
            return Json(result);
        }

        [Route("api/datHang/{maKhachHang}/{maTieuDe}/count")]
        public IHttpActionResult GetCountWithOptions(int maKhachHang, int maTieuDe)
        {
            var result = 0;
            if (maKhachHang != -1 && maTieuDe != -1)
            {
                result = db.DsDatHang.Where(x => x.MaKhachHang == x.MaKhachHang && x.MaTieuDe == maTieuDe).Count();
            }
            else if (maKhachHang != -1)
            {
                result = db.DsDatHang.Where(x =>x.MaTieuDe == maTieuDe).Count();
            }
            else
            {
                result = db.DsDatHang.Where(x => x.MaKhachHang == x.MaKhachHang).Count();
            }
            return Json(result);
        }

        [Route("api/datHang/count ")]
        public IHttpActionResult GetCount()
        {
            var result = db.DsDatHang.Count() ;
            return Json(result);
        }

    }
}
