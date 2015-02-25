/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./Scripts/sinon-1.9.1.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/yui3/build/yui/yui.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/YUIConfigurator.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/UpdateView.js" />

describe('Update View', function()
{
    beforeEach(function(done)
    {
        YUIConfigurator.Configure('./../../src/CrudifiedMvc.View/Scripts/yui3/build/',
            './../../src/CrudifiedMvc.View/Scripts/yui3-gallery/build/',
            false);

        done();
    });

    describe('Save Click', function()
    {
        var sandbox;

        beforeEach(function(done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<div><button id="saveButton"></button>' +
                    '<form class="pure-form" action="javascript:void(0);" method="post"></form></div>');

                done();
            });
        });

        afterEach(function(done)
        {
            sandbox.remove();

            done();
        });

        it('should submit the form', function(done)
        {
            YUI().use('update-view', 'node-event-simulate', function(Y)
            {
                sinon.spy(Y.one('.pure-form'), 'submit');

                var updateView = new Y.UpdateView(),
                    node = Y.one('#saveButton');
                
                updateView.bindUI();

                node.simulate('click');

                expect(Y.one('.pure-form').submit.called).toBeTruthy();

                Y.one('.pure-form').submit.restore();

                done();
            });
        });
    });
});