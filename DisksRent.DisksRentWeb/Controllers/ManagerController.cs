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
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
            //return View();
        }

        public ActionResult QuanLyThueTraDia()
        {
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
        }

      
        public ActionResult QuanLyTieuDeVaDia()
        {
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
        }

        public ActionResult QuanLyPhiTre()
        {
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
        }

        public ActionResult QuanLyDatHang()
        {
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
        }

        public ActionResult QuanLyBaoCao()
        {
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
        }

        //Maybe delete
        public ActionResult QuanLyDia()
        {
            string flag = Session["UserType"] as string;
            if (flag == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else if (flag == "Manager")
            {
                return View();
            }
            return RedirectToAction("QuanLyKhachHang", "Clerk");
        }
    }
}