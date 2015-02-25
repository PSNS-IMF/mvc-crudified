[assembly: WebActivatorEx.PostApplicationStartMethod(typeof($rootnamespace$.App_Start.CrudifiedActivator), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof($rootnamespace$.App_Start.CrudifiedActivator), "Stop")]

namespace $rootnamespace$.App_Start
{
    using System.Web.Optimization;
	using System.Web.WebPages.Razor;

    using System.Web.Http;
    using System.Web.Routing;

    using Newtonsoft.Json.Serialization;

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
            Crud.WebApiConfig.Register(GlobalConfiguration.Configuration);

            System.Web.Mvc.ControllerBuilder.Current.DefaultNamespaces.Add("Psns.Common.Mvc.Crudified.Controllers");
			WebCodeRazorHost.AddGlobalImport("System.Web.Optimization");
            WebCodeRazorHost.AddGlobalImport("Psns.Common.Mvc.ViewBuilding.Menu");

            GlobalConfiguration.Configuration
                .Formatters
                .JsonFormatter
                .SerializerSettings
                .ContractResolver = new CamelCasePropertyNamesContractResolver();

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
