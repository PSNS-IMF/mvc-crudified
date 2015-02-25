using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

using System.Web.Mvc;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;
using Psns.Common.Mvc.ViewBuilding.ViewModels;

namespace Psns.Common.Mvc.Crudified.Controllers
{
    public class IndexViewController : Controller
    {
        ICrudViewBuilder _viewBuilder;

        public IndexViewController(ICrudViewBuilder viewBuilder)
        {
            _viewBuilder = viewBuilder;
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0)]
        public ActionResult RefreshTableBody(int? page,
            int? pageSize,
            string sortKey, 
            string sortDirection, 
            IEnumerable<string> filterKeys, 
            IEnumerable<string> filterValues,
            string searchQuery,
            string modelName)
        {
            var modelType = Type.GetType(modelName, false, true);

            var buildIndexMethod = _viewBuilder.GetType().GetMethod("BuildIndexView");
            var genericMethod = buildIndexMethod.MakeGenericMethod(modelType);

            var view = genericMethod.Invoke(_viewBuilder, new object[] 
            { 
                page,
                pageSize,
                sortKey, 
                sortDirection, 
                filterKeys, 
                filterValues,
                searchQuery,
                null 
            }) as IndexView;

            var tableHtml = RenderPartial(view.Table, "_TableBody");
            var pagerHtml = RenderPartial(view.Pager, "_Pager");

            return Json(new
                {
                    table = tableHtml,
                    pager = pagerHtml
                },
                JsonRequestBehavior.AllowGet);
        }

        private string RenderPartial(object model, string partialViewName)
        {
            var html = string.Empty;
            this.ViewData.Model = model;

            using(var writer = new StringWriter())
            {
                var result = ViewEngines.Engines.FindPartialView(this.ControllerContext, partialViewName);
                var context = new ViewContext(this.ControllerContext, result.View, this.ViewData, this.TempData, writer);

                result.View.Render(context, writer);
                html = writer.ToString();
            }

            return html;
        }
    }
}
