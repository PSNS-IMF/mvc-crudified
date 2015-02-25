using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Psns.Common.Mvc.ViewBuilding.Menu;

namespace CrudifiedMvc.View.Infrastructure
{
    public class MvcContextManager : IContextMenu
    {
        public string Title
        {
            get { return "Mvc Title"; }
        }
    }
}