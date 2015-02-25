using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web;
using System.Web.Mvc;

namespace Psns.Common.Mvc.Crudified.Helpers
{
    public static class HtmlExtensions
    {
        public static IHtmlString ValidationLabel(this HtmlHelper html, 
            string modelName, 
            string text)
        {
            var labelTag = new TagBuilder("label");

            labelTag.Attributes.Add("for", modelName);
            labelTag.SetInnerText(text);

            var fieldName = html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(modelName);
            ModelState modelState;

            if(html.ViewData.ModelState.TryGetValue(fieldName, out modelState))
            {
                if(modelState.Errors.Count > 0)
                    labelTag.AddCssClass("field-validation-error");
            }

            return new MvcHtmlString(labelTag.ToString());
        }
    }
}
