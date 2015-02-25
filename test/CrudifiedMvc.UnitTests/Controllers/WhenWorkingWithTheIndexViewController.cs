using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Mvc;

using Psns.Common.Test.BehaviorDrivenDevelopment;
using Psns.Common.Mvc.Crudified.Controllers;
using Psns.Common.Mvc.ViewBuilding.ViewBuilders;
using Psns.Common.Mvc.ViewBuilding.ViewModels;

using Moq;

namespace CrudifiedMvc.UnitTests.Controllers.IndexViewCtlr
{
    public class WhenWorkingWithTheIndexViewController : BehaviorDrivenDevelopmentCaseTemplate
    {
        protected IndexViewController Controller;
        protected Mock<ICrudViewBuilder> MockViewBuilder;

        public override void Arrange()
        {
            base.Arrange();

            MockViewBuilder = new Mock<ICrudViewBuilder>();

            Controller = new IndexViewController(MockViewBuilder.Object);
        }
    }

    [TestClass]
    public class AndCheckingMethodAttributes : WhenWorkingWithTheIndexViewController
    {
        object[] _attributes;

        public override void Act()
        {
            base.Act();

            _attributes = typeof(IndexViewController).GetMethod("RefreshTableBody").GetCustomAttributes(false);
        }

        [TestMethod]
        public void ThenHttpMethodAndOutputCacheShouldBeConfiguredProperly()
        {
            Assert.AreEqual(1, _attributes.Where(obj => obj.GetType() == typeof(HttpGetAttribute)).Count());

            var outputAttribute = _attributes.Where(obj => obj.GetType() == typeof(OutputCacheAttribute)).Single() as OutputCacheAttribute;
            Assert.IsTrue(outputAttribute.NoStore);
            Assert.AreEqual(0, outputAttribute.Duration);
        }
    }

    [TestClass]
    public class AndCallingRefreshTableBody : WhenWorkingWithTheIndexViewController
    {
        JsonResult _result;

        public override void Arrange()
        {
            base.Arrange();

            MockViewBuilder.Setup(b => b.BuildIndexView<TestEntity>(null, 
                null,
                "key",
                "asc",
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<string>(),
                null))
                .Returns(new IndexView(typeof(TestEntity).AssemblyQualifiedName));

            ControllerTestHelper.SetContext(Controller, "_TableBody", "_Pager");
        }

        public override void Act()
        {
            base.Act();

            _result = Controller.RefreshTableBody(null, 
                null,
                "key", 
                "asc", 
                new string[0], 
                new string[0], 
                string.Empty,
                typeof(TestEntity).AssemblyQualifiedName) as JsonResult;
        }

        [TestMethod]
        public void ThenTableBodyShouldBeReturnedWithTheCorrectlyBuiltIndexView()
        {
            Assert.AreEqual("{ table = , pager =  }", _result.Data.ToString());

            MockViewBuilder.Verify(b => b.BuildIndexView<TestEntity>(null,
                null,
                "key", 
                "asc", 
                It.IsAny<IEnumerable<string>>(), 
                It.IsAny<IEnumerable<string>>(),
                It.IsAny<string>(),
                null), Times.Once());
        }
    }
}
