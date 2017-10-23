using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class PhiTreAPIController : ApiController
    {
        VideoRentalDb db;
        decimal giaPhiTre = 10000;
        public PhiTreAPIController()
        {
            db = new VideoRentalDb();
        }
        //get danh sach phi tre
        [Route("api/phitre")]
        public IHttpActionResult GetAll()
        {
            var lst = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.DaThanhToanPhiTre == false).ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }
        //get danh sach phi tre theo ma kh
        [Route("api/phitre/{maKh}")]
        public IHttpActionResult GetOne(int maKh)
        {
            if (maKh < 0 ) return NotFound();
            var lst = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.DaThanhToanPhiTre == false 
                                                    && x.MaKhachHang == maKh).ToList();
            if (lst.Count == 0)
            {
                return NotFound();
            }
            return Ok(lst);
        }

        //get danh sach phi tre theo ma kh
        //[Route("api/phitre/{maTieuDe}")]
        //public IHttpActionResult PutHuyPhiTre(int maTieuDe)
        //{
        //    if (maTieuDe < 0) return NotFound();
        //    var lst = db.DsChoThue.Where(x => x.NgayPhaiTra < x.NgayThucTra && x.DaThanhToanPhiTre == false
        //                                            && x.MaKhachHang == maKh).ToList();
        //    if (lst.Count == 0)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(lst);
        //}

        public void ThemPhiTre(DsChoThue model)
        {
            if(model.NgayPhaiTra < model.NgayThucTra)
            {
                model.PhiTre = giaPhiTre;
                model.DaThanhToanPhiTre = false;
            }
        }

    }
}
