using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;

using Psns.Common.Mvc.ViewBuilding.Attributes;
using Psns.Common.Mvc.ViewBuilding.Entities;
using Psns.Common.Persistence.Definitions;

namespace CrudifiedMvc.View.Models
{
    public class RelatedModel : IIdentifiable, INameable
    {
        public int Id { get; set; }

        [Required]
        [ViewUpdatableProperty(InputPropertyType.String)]
        [ViewDisplayableProperty(new DisplayViewTypes[] { DisplayViewTypes.Index, DisplayViewTypes.Details })]
        public string Name { get; set; }
    }

    public class RelatedManyModel : IIdentifiable, INameable
    {
        public int Id { get; set; }

        [Required]
        [ViewUpdatableProperty(InputPropertyType.String)]
        [ViewDisplayableProperty(new DisplayViewTypes[] { DisplayViewTypes.Index, DisplayViewTypes.Details })]
        public string Name { get; set; }
    }

    public class CrudModel : IIdentifiable, INameable
    {
        public CrudModel()
        {
            RelatedManyModels = new List<RelatedManyModel>();
        }

        [Display(Order = 1)]
        [ViewDisplayableProperty(new DisplayViewTypes[] { DisplayViewTypes.Details})]
        public int Id { get; set; }

        [Required]
        [Display(Order = 2)]
        [ViewDisplayableProperty(new DisplayViewTypes[] { DisplayViewTypes.Index, DisplayViewTypes.Details })]
        [ViewUpdatableProperty(InputPropertyType.String)]
        public string Name { get; set; }

        [Required]
        [Display(Order = 3, Name = "Another Column")]
        [ViewDisplayableProperty(new DisplayViewTypes[] { DisplayViewTypes.Index, DisplayViewTypes.Details })]
        [ViewUpdatableProperty(InputPropertyType.String)]
        public string AnotherColumn { get; set; }

        [Display(Order = 4, Name = "In Use")]
        [ViewUpdatableProperty]
        public bool InUse { get; set; }

        [Display(Order = 5, Name = "Related Many")]
        [ViewComplexProperty("Name", "Id")]
        [ViewDisplayableProperty(new[] { DisplayViewTypes.Index, DisplayViewTypes.Details })]
        [ViewUpdatableProperty]
        public ICollection<RelatedManyModel> RelatedManyModels { get; set; }

        [Required]
        [Display(Order = 8, Name = "Related Model FK")]
        [ViewComplexPropertyForeignKey("RelatedModelFk")]
        [ViewDisplayableProperty(new DisplayViewTypes[] { DisplayViewTypes.Index, DisplayViewTypes.Details })]
        [ViewComplexProperty("Name", "Id")]
        [ViewUpdatableProperty]
        public int? RelatedModelFkId { get; set; }
        public RelatedModel RelatedModelFk { get; set; }
    }
}