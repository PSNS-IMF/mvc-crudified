/// <reference path="./../../src/CrudifiedMvc.View/Scripts/yui3/build/yui/yui.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/Alert.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />
/// <reference path="./Scripts/sinon-1.9.1.js" />

describe('Alert', function ()
{
    var sandbox;
    beforeEach(function(done)
    {
        YUI().use('node', function (Y)
        {
            sandbox = Y.one('body')
                .appendChild('<div id="container"></div>');

            done();
        });
    });

    afterEach(function (done)
    {
        sandbox.remove();

        done();
    });

    describe('Types', function()
    {
        it('should return the correct error class', function()
        {
            YUI().use('alert', function(Y)
            {
                expect(Y.Alert.Types.Error()).toEqual('alert-danger');
            });
        });

        it('should return the correct success class', function()
        {
            YUI().use('alert', function(Y)
            {
                expect(Y.Alert.Types.Success()).toEqual('alert-success');
            });
        });
    });

    describe('Show', function()
    {
        it('should add an alert with the given type and message', function(done)
        {
            YUI().use('alert', function(Y)
            {
                Y.Alert.Show(Y.Alert.Types.Success(), 'Alert message');

                expect(Y.one('#container').getHTML())
                    .toEqual('<div class="alert alert-success" style="text-align:center;" role="alert">Alert message</div>');

                done();
            });
        });

        it('should default to error when no type is given', function(done)
        {
            YUI().use('alert', function(Y)
            {
                Y.Alert.Show(null, 'Alert message');

                expect(Y.one('#container').getHTML())
                    .toEqual('<div class="alert alert-danger" style="text-align:center;" role="alert">Alert message</div>');

                done();
            });
        });

        it('should throw error when no message is given', function(done)
        {
            YUI().use('alert', function(Y)
            {
                expect(function() { Y.Alert.Show(null, null); }).toThrow('Message must be provided');

                done();
            });
        });
    });
});