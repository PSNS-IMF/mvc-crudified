﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Helpers;
using System.Web.Mvc;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;
using Psns.Common.Mvc.ViewBuilding.Entities;
using Psns.Common.Persistence.Definitions;

namespace Psns.Common.Mvc.Crudified.Controllers
{
    public abstract class CrudController<T> : Controller,
        IRepositoryController<T>,
        IIndexable,
        IDetailable,
        IUpdatable<T>,
        IDeleteable<T>
        where T : class, IIdentifiable, INameable
    {
        public ICrudViewBuilder Builder { get; private set; }
        public IRepository<T> Repository { get; private set; }

        public CrudController(ICrudViewBuilder viewBuilder, 
            IRepositoryFactory repositoryFactory)
        {
            Builder = viewBuilder;
            Repository = repositoryFactory.Get<T>();
        }

        public virtual ActionResult Index()
        {
            return this.Index<T>();
        }

        public virtual ActionResult Details(int id)
        {
            return this.Details<T>(id);
        }

        public virtual ActionResult Update(int? id)
        {
            return this.Update<T>(id);
        }

        [HttpPost]
        public virtual ActionResult Update(T model)
        {
            return this.Update<T>(model);
        }

        [HttpPost]
        public virtual ActionResult Delete(int id)
        {
            return this.Delete<T>(id);
        }
    }
}
