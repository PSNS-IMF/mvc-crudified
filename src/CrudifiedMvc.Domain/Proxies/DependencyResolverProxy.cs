using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Psns.Common.Mvc.Crudified.Proxies
{
    /// <summary>
    /// Intended to be used only where Ninject constructor injection isn't possible (i.e. Model Binders)
    /// </summary>
    public class DependencyResolverProxy
    {
        static IDependencyResolver _resolver;

        /// <summary>
        /// Unless set, System.Web.Mvc.DependencyResolver.Current is returned
        /// </summary>
        public static IDependencyResolver Resolver
        {
            get
            {
                return _resolver ?? DependencyResolver.Current;
            }

            set { _resolver = value; }
        }
    }
}
