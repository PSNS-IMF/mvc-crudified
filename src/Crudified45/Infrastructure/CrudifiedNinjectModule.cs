using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Ninject.Modules;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;

namespace Psns.Common.Mvc.Crudified.Infrastructure
{
    public class CrudifiedNinjectModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ICrudViewBuilder>().To<CrudViewBuilder>();
        }
    }
}
