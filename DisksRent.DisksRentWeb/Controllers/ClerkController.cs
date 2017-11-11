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
            string flag = Session["UserType"] as string;
            if (flag == "Clerk" || flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("Index", "Login");
        }

        public ActionResult QuanLyThueTraDia()
        {
            string flag = Session["UserType"] as string;
            if (flag == "Clerk" || flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("Index", "Login");
        }


        public ActionResult QuanLyTieuDe()
        {
            string flag = Session["UserType"] as string;
            if (flag == "Clerk" || flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("Index", "Login");
        }

        public ActionResult QuanLyPhiTre()
        {
            string flag = Session["UserType"] as string;
            if (flag == "Clerk" || flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("Index", "Login");
        }

        public ActionResult QuanLyDatHang()
        {
            string flag = Session["UserType"] as string;
            if (flag == "Clerk" || flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("Index", "Login");
        }

    }
}