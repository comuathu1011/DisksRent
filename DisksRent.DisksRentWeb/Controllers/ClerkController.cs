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
            return View();
        }
    }
}