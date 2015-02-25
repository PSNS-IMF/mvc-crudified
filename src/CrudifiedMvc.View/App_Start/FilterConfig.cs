using System.Web;
using System.Web.Mvc;

namespace CrudifiedMvc.View
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}