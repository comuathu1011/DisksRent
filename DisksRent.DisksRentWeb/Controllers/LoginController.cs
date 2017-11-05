using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DisksRent.DisksRentWeb.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

       
        public ActionResult Authen()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Authen(string Username, string Password)
        {
            if (Username == "vung" && Password == "123")
            {
                return RedirectToAction("QuanLyKhachHang", "Manager");
            }
            return View("Index");
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }
    }
}