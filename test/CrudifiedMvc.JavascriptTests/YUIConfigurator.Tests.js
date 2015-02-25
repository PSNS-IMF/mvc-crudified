/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/YUIConfigurator.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />

describe('YUIConfigurator', function ()
{
    afterEach(function ()
    {
        YUI.GlobalConfig.filter = undefined;
    });

    function AssertCommon()
    {
        expect(YUI.GlobalConfig.classNamePrefix).toEqual('pure');
        expect(YUI.GlobalConfig.base).toEqual('yuiPath');
        expect(YUI.GlobalConfig.groups).toEqual({
            gallery:
                {
                    base: 'galleryPath',
                    patterns:
                        {
                            'gallery-': {},
                            'gallerycss-': { type: 'css' }
                        }
                },
            gallerycss:
                {
                    base: 'galleryPath',
                    modules:
                        {
                            'gallery-sm-menu-core-css':
                                {
                                    path: 'gallery-sm-menu/assets/gallery-sm-menu-core.css',
                                    type: 'css'
                                }
                        }
                }
        });
    }

    it('should properly set YUI config when useDebugVersion is true', function ()
    {
        YUIConfigurator.Configure('yuiPath', 'galleryPath', true);

        AssertCommon();

        expect(YUI.GlobalConfig.filter).toEqual('DEBUG');
    });

    it('should properly set YUI config when useDebugVersion is false', function ()
    {
        YUIConfigurator.Configure('yuiPath', 'galleryPath', false);

        AssertCommon();

        expect(YUI.GlobalConfig.filter).toBeUndefined();
    });
});