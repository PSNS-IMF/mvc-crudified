using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Ninject;
using Ninject.Modules;
using Ninject.Web.Common;

namespace $rootnamespace$.Infrastructure
{
    public class ProjectNinjectModule : NinjectModule
    {
        public override void Load()
        {
			// configure bindings in here
            // i.e. Bind<IInterface>().To<ConcreteImplementingInterface>();
			// or Kernel.Load(new SomeNinjectModule(), new SomeOtherNinjectModule());
        }
    }
}