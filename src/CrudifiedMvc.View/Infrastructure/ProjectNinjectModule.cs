using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

using System.Data.Entity;

using Ninject.Modules;
using Ninject.Web.Common;

using Psns.Common.Persistence.Definitions;
using Psns.Common.Persistence.EntityFramework;
using Psns.Common.Mvc.ViewBuilding.ViewBuilders;

using CrudifiedMvc.View.Models;

namespace CrudifiedMvc.View.Infrastructure
{
    public class ProjectNinjectModule : NinjectModule
    {
        public override void Load()
        {
			// configure bindings in here
            // i.e. Bind<IInterface>().To<ConcreteImplementingInterface>();

            Bind<DbContext>().To<TestContext>().InRequestScope();
            Bind<IRepositoryFactory>().To<RepositoryFactory>();
            Bind<IRepository<CrudModel>>().To<Repository<CrudModel>>();
            Bind<IRepository<RelatedModel>>().To<Repository<RelatedModel>>();
            Bind<IRepository<RelatedManyModel>>().To<Repository<RelatedManyModel>>();
            Bind<ICrudViewBuilder>().To<CrudViewBuilder>();
        }
    }
}