using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Mvc;

using Psns.Common.Configuration;

namespace Psns.Common.Mvc.Crudified
{
    /// <summary>
    /// Base class for all Views using Psns Skin
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class BaseViewPage<T> : WebViewPage<T>
    {
        AppEnvironmentReader _environmentReader;

        public BaseViewPage()
        {
            _environmentReader = new AppEnvironmentReader();
        }

        /// <summary>
        /// Defines the location of the scripts folder based on Environment
        /// </summary>
        public string ScriptsRootUrl
        {
            get
            {
                switch(_environmentReader.Current)
                {
                    case AppEnvironment.Local:
                        return "/scripts";
                    default:
                        return "/static/scripts";
                }
            }
        }

        /// <summary>
        /// Defines the base path for the YUI library
        /// </summary>
        public string YuiBaseUrl
        {
            get
            {
                return string.Format("{0}/yui3/build/", ScriptsRootUrl);
            }
        }

        /// <summary>
        /// Defines the base path for the YUI Gallery library
        /// </summary>
        public string YuiGalleryBaseUrl
        {
            get
            {
                return string.Format("{0}/yui3-gallery/build/", ScriptsRootUrl);
            }
        }
    }
}