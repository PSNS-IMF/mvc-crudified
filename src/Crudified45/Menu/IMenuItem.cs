using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Psns.Common.Mvc.Crudified.Menu
{
    /// <summary>
    /// Defines a drop-down menu
    /// </summary>
    public interface IMenuItem
    {
        /// <summary>
        /// The root of a drop-down menu
        /// </summary>
        MenuNode RootNode { get; }
    }
}
