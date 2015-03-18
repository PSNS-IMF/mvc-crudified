using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Ninject.Modules;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;

namespace Psns.Common.Mvc.Crudified.Infrastructure
{
    /// <summary>
    /// Contains a binding for the CrudViewBuilder
    /// </summary>
    public class CrudifiedNinjectModule : NinjectModule
    {
        /// <summary>
        /// Binds ICrudViewBuilder to CrudViewBuilder
        /// </summary>
        public override void Load()
        {
            Bind<ICrudViewBuilder>().To<CrudViewBuilder>();
        }
    }
}
