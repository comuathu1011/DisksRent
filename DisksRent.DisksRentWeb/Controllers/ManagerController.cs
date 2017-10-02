using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DisksRent.DisksRentWeb.Controllers
{
    public class ManagerController : Controller
    {
        // GET: Manager

        [Route("/")]
        public ActionResult QuanLyKhachHang()
        {
            return View();
        }

        public ActionResult QuanLyThueTraDia()
        {
            return View();
        }

      
        public ActionResult QuanLyTieuDe()
        {
            return View();
        }

        public ActionResult QuanLyDatDia()
        {
            return View();
        }

        public ActionResult QuanLyDia()
        {
            return View();
        }
        public ActionResult QuanLyPhiTre()
        {
            return View();
        }

    }
}