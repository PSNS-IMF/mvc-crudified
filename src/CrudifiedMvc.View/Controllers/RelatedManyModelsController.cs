﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;
using Psns.Common.Mvc.ViewBuilding.Controllers;

using Psns.Common.Persistence.Definitions;
using CrudifiedMvc.View.Models;

namespace CrudifiedMvc.View.Controllers
{
    public class RelatedManyModelsController : CrudController<RelatedManyModel>
    {
        public RelatedManyModelsController(ICrudViewBuilder viewBuilder, IRepositoryFactory repositoryFactory) 
            : base(viewBuilder, repositoryFactory) { }
    }
}
