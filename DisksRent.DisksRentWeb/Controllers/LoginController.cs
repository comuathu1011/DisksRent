using DisksRent.DisksRentWeb.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
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
            var model = new NhanVienVM
            {
                TenDangNhap = Username,
                MatKhau = Password
            };
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:49497/api/");
                var response = client.PostAsJsonAsync("nhanvien", model);
                response.Wait();

                var result = response.Result;
                if (result.IsSuccessStatusCode)
                {
                    var read = result.Content.ReadAsAsync<NhanVienVM>();
                    read.Wait();
                    NhanVienVM user = read.Result;
                    //Session["LaQuanLy"] = user.LaQuanLy;
                    if (user.LaQuanLy)
                    {
                        Session["UserType"] = "Manager";
                    }
                    else
                    {
                        Session["UserType"] = "Clerk";
                    }
                    if (user != null)
                    {
                        return RedirectToAction("QuanLyKhachHang", "Manager");
                    }
                }
            }
            //if (Username == "vung" && Password == "123")
            //{
            //    return RedirectToAction("QuanLyKhachHang", "Manager");
            //}
            return View();
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }

        public ActionResult Logout()
        {
            return View("Index");
        }
    }
}