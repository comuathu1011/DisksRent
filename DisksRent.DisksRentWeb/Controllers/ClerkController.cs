using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DisksRent.DisksRentWeb.Controllers
{
    public class ClerkController : Controller
    {
        // GET: Clerks

        public ActionResult Index()
        {
            return View("QuanLyKhachHang");
        }

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

        public ActionResult QuanLyPhiTre()
        {
            return View();
        }

        public ActionResult QuanLyDatHang()
        {
            return View();
        }

    }
}