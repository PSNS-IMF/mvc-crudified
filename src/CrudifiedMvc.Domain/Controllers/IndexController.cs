using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Psns.Common.Mvc.ViewBuilding.ViewBuilders;
using Psns.Common.Mvc.ViewBuilding.ViewModels;
using Psns.Common.Persistence.Definitions;

namespace Psns.Common.Mvc.Crudified.Controllers
{
    public class IndexController : ApiController
    {
        ICrudViewBuilder _viewBuilder;

        public IndexController(ICrudViewBuilder viewBuilder)
        {
            _viewBuilder = viewBuilder;
        }

        public IEnumerable<FilterOption> GetFilterOptions(string modelName)
        {
            var modelType = Type.GetType(modelName, false, true);

            var buildIndexMethod = _viewBuilder.GetType().GetMethod("GetIndexFilterOptions");
            var genericMethod = buildIndexMethod.MakeGenericMethod(modelType);

            var filterOptions = genericMethod.Invoke(_viewBuilder, null) as IEnumerable<FilterOption>;

            return filterOptions;
        }
    }
}
