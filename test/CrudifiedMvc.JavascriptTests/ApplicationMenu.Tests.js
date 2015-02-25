/// <reference path="./../../src/CrudifiedMvc.View/Scripts/yui3/build/yui/yui.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/YUIConfigurator.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/ApplicationMenu.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />
/// <reference path="./Scripts/sinon-1.9.1.js" />

describe('ApplicationMenu', function ()
{
    var Y, sandbox;
    beforeEach(function(done)
    {
        YUI().use('node', function (y)
        {
            Y = y;

            sandbox = Y.one('body')
                .appendChild('<div id="menuLink"></div>' +
                '<div id="globalContext" style="display:none;">' +
                '<div id="nav-menu" style="display:none;">' +
                '<div id="nav-menu-root"></div></div></div>' +
                '<div id="contextMenu" style="display:none;">' +
                '<div id="contextMenuData"></div></div>');

            YUIConfigurator.Configure('./../../src/CrudifiedMvc.View/Scripts/yui3/build/',
                './../../src/CrudifiedMvc.View/Scripts/yui3-gallery/build/',
                false);

            done();
        });
    });

    afterEach(function (done)
    {
        sandbox.remove();

        done();
    });

    describe('menuLink click', function ()
    {
        describe('when menu is hidden', function ()
        {
            it('should set the menu display to block', function (done)
            {
                YUI().use('application-menu', function (y)
                {
                    y.ApplicationMenu._handleMenuLinkClick();

                    var menu = y.one("#globalContext");

                    expect(menu.getStyle('display')).toEqual('block');

                    done();
                });
            });
        });

        describe('when menu is visible', function ()
        {
            it('should set the menu display to none', function (done)
            {
                YUI().use('application-menu', function (y)
                {
                    var menu = y.one("#globalContext");
                    menu.setStyle('display', 'block');

                    y.ApplicationMenu._handleMenuLinkClick();

                    expect(menu.getStyle('display')).toEqual('none');

                    done();
                });
            });
        });
    });

    describe('Menu', function ()
    {
        it('should be initialized properly', function (done)
        {
            YUI().use('application-menu', function (y)
            {
                var globalMenu = y.ApplicationMenu._getGlobalMenu(),
                    contextMenu = y.ApplicationMenu._getContextMenu();

                expect(globalMenu.get('container').get('id')).toEqual('nav-menu');
                expect(globalMenu.get('sourceNode')).toEqual('#nav-menu-root');
                expect(globalMenu.get('orientation')).toEqual('horizontal');
                expect(globalMenu.get('hideOnOutsideClick')).toBeFalsy();
                expect(globalMenu.get('hideOnClick')).toBeFalsy();

                expect(contextMenu.get('container').get('id')).toEqual('contextMenu');
                expect(contextMenu.get('sourceNode')).toEqual('#contextMenuData');
                expect(contextMenu.get('orientation')).toEqual('horizontal');
                expect(contextMenu.get('hideOnOutsideClick')).toBeFalsy();
                expect(contextMenu.get('hideOnClick')).toBeFalsy();

                sinon.spy(globalMenu, 'render');
                sinon.spy(globalMenu, 'show');
                sinon.spy(contextMenu, 'render');
                sinon.spy(contextMenu, 'show');

                y.ApplicationMenu.Initialize();
                
                expect(globalMenu.render.called).toBeTruthy();
                expect(globalMenu.show.called).toBeTruthy();
                expect(contextMenu.render.called).toBeTruthy();
                expect(contextMenu.show.called).toBeTruthy();

                globalMenu.show.restore();
                globalMenu.render.restore();
                contextMenu.show.restore();
                contextMenu.render.restore();

                done();
            });
        });
    });
});