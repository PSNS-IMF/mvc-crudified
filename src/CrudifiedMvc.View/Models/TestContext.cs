using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data.Entity;

using Psns.Common.Persistence.EntityFramework;
using CrudifiedMvc.View.Models;

namespace CrudifiedMvc.View.Models
{
    public class TestContext : Context
    {
        public TestContext()
        {
            Database.SetInitializer<TestContext>(new CreateDatabaseIfNotExists<TestContext>());
        }

        public IDbSet<CrudModel> CrudModels { get; set; }
        public IDbSet<RelatedModel> RelatedModels { get; set; }
        public IDbSet<RelatedManyModel> RelatedManyModels { get; set; }
    }
}