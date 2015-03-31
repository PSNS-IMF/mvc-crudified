[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(CrudifiedMvc.View.App_Start.CrudifiedActivator), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(CrudifiedMvc.View.App_Start.CrudifiedActivator), "Stop")]

namespace CrudifiedMvc.View.App_Start
{
    using System.Web.Optimization;
	using System.Web.WebPages.Razor;

    using System.Web.Routing;

    using Crud = Psns.Common.Mvc.Crudified.Infrastructure;
    using Psns.Common.Mvc.ViewBuilding.Menu;

    public static class CrudifiedActivator 
    {
        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            Crud.RouteConfig.RegisterRoutes(RouteTable.Routes);
            Crud.BundleConfig.RegisterBundles(BundleTable.Bundles);

            System.Web.Mvc.ControllerBuilder.Current.DefaultNamespaces.Add("Psns.Common.Mvc.Crudified.Controllers");
            WebCodeRazorHost.AddGlobalImport("System.Web.Optimization");
            WebCodeRazorHost.AddGlobalImport("Psns.Common.Mvc.ViewBuilding.Menu");

            GlobalMenu.ContextMenu = new Infrastructure.ContextMenu();
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {

        }    
    }
}
