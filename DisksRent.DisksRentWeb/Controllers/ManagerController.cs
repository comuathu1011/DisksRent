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

      
        public ActionResult QuanLyTieuDeVaDia()
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

        public ActionResult QuanLyBaoCao()
        {
            return View();
        }

        //Maybe delete
        public ActionResult QuanLyDia()
        {
            return View();
        }
    }
}