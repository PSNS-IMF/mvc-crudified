using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Optimization;

namespace Psns.Common.Mvc.Crudified.Infrastructure
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            bundles.Add(new ScriptBundle("~/scripts/yui",
                "/static/scripts/yui3/build/yui/yui-min.js")
                .Include("~/Scripts/yui3/build/yui/yui.js"));

            bundles.Add(new ScriptBundle("~/scripts/global")
                .Include("~/Scripts/Shared/YUIConfigurator.js")
                .Include("~/Scripts/Shared/ApplicationMenu.js")
                .Include("~/Scripts/Shared/Alert.js"));

            bundles.Add(new ScriptBundle("~/scripts/respond")
                .Include("~/Scripts/respond.*"));

            bundles.Add(new StyleBundle("~/css/crudglobal")
                .Include("~/Content/pure/pure-min.css")
                .Include("~/Content/pure/pure-skin-psns.css")
                .Include("~/Content/font-awesome-4.1.0/css/font-awesome.css"));

            bundles.Add(new StyleBundle("~/css/indexview")
                .Include("~/Content/IndexView.css"));

            bundles.Add(new ScriptBundle("~/scripts/indexview")
                .Include("~/Scripts/Shared/IndexView/IndexViewTemplates.js")
                .Include("~/Scripts/Shared/IndexView/IndexView.js"));

            bundles.Add(new ScriptBundle("~/scripts/updateview")
                .Include("~/Scripts/Shared/UpdateView.js"));

            bundles.Add(new ScriptBundle("~/scripts/details")
                .Include("~/Scripts/Shared/DetailsView.js"));
        }
    }
}