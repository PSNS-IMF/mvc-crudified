/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./Scripts/sinon-1.9.1.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/yui3/build/yui/yui.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/YUIConfigurator.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/DetailsView.js" />

describe('Details View', function()
{
    beforeEach(function(done)
    {
        YUIConfigurator.Configure('./../../src/CrudifiedMvc.View/Scripts/yui3/build/',
            './../../src/CrudifiedMvc.View/Scripts/yui3-gallery/build/',
            false);

        done();
    });

    describe('Delete', function()
    {
        var sandbox;
        beforeEach(function (done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<form class="delete"><button id="deleteMe" type="submit"></button></form>');

                done();
            });
        });

        afterEach(function (done)
        {
            sandbox.remove();

            done();
        });

        describe('Click', function()
        {
            var confirmStub;
            beforeEach(function(done)
            {
                confirmStub = sinon.stub(window, 'confirm');
                done();
            });

            afterEach(function(done)
            {
                window.confirm.restore();

                done();
            });

            function assertCommon()
            {
                expect(window.confirm.calledWith('Are you sure you want to delete this item?')).toBeTruthy();
            }

            it('should submit the form when delete is clicked and confirm is yes', function(done)
            {
                YUI().use('details-view', 'node-event-simulate', function(y)
                {
                    confirmStub.returns(true);
                    new y.DetailsView().render();

                    y.one('#deleteMe').simulate('click');

                    assertCommon();
                    expect(y.one('form.delete').get('id')).toContain('yui');

                    done();
                });
            });

            it('should not submit the form when delete is clicked and confirm is no', function(done)
            {
                YUI().use('details-view', 'node-event-simulate', function(y)
                {
                    confirmStub.returns(false);
                    new y.DetailsView().render();

                    y.one('#deleteMe').simulate('click');

                    assertCommon();
                    expect(y.one('form.delete').get('id')).not.toContain('yui');

                    done();
                });
            });
        });
    });
});