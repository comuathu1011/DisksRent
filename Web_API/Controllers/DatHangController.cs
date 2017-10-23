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
            if (maTieuDe < 0 || maKh < 0) return NotFound();
            var model = new DsDatHang
            {
                MaKhachHang = maKh,
                MaTieuDe = maTieuDe,
                ThuTu = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe).Max(x => x.ThuTu) + 1,
                TinhTrang = TinhTrangDatHangCollection.DangCho
            };
            db.DsDatHang.Add(model);
            db.SaveChanges();
            return Ok();
        }
        //hủy đặt hàng
        [Route("api/dathang/{maKh}/{maTieuDe}")]
        public IHttpActionResult Put(int maKh, int maTieuDe)
        {
            if (maTieuDe < 0 || maKh < 0) return NotFound();
            var model = db.DsDatHang.Where(x => x.MaKhachHang == maKh && x.MaTieuDe == maTieuDe).FirstOrDefault();
            model.TinhTrang = TinhTrangDatHangCollection.DaHuy;
            db.Entry(model).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }
        //Kiểm tra tiêu đề của đĩa được trả lại có đang được đặt hàng không
        private bool KiemTraTieuDeDangDuocDatHang(int maTieuDe)
        {
            if (maTieuDe < 0) return false;
            var model = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe && x.TinhTrang == TinhTrangDatHangCollection.DangCho);
            if (model.Count() == 0)
            {
                return false;
            }
            return true;
        }

        //chuyển tình trạng của đĩa sang "on hold"
        public void ChuyenTinhTrangDiaDangGiu(int maDia)
        {
            if (maDia < 0) return;
            var model = db.Dias.Find(maDia);
            var maTieuDe = model.MaTieuDe;
            if (KiemTraTieuDeDangDuocDatHang(maTieuDe))
            {
                model.TinhTrangThue = TinhTrangThueCollection.DangGiu;
            }
        }

        //Chuyển tình trạng đĩa sang "đã xong" khi kh đã nhận đĩa
        [Route("api/dia/{maTieuDe}/{maKh}")]
        public IHttpActionResult PutChuyenTinhTragDiaDaXong(int maTieuDe, int maKh )
        {
            if (maTieuDe < 0 || maKh < 0) return NotFound();
            var model = db.DsDatHang.Where(x => x.MaTieuDe == maTieuDe && x.MaKhachHang == maKh).FirstOrDefault();
            model.TinhTrang = TinhTrangDatHangCollection.DaXong;
            db.Entry(model).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }
    }
}
