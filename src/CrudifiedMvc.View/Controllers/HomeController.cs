using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;
using CrudifiedMvc.View.Models;

namespace CrudifiedMvc.View.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
