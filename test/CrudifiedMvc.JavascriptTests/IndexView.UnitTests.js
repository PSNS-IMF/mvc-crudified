/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./Scripts/sinon-1.9.1.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/yui3/build/yui/yui.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/IndexView/IndexView.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/IndexView/IndexViewTemplates.js" />
/// <reference path="./../../src/CrudifiedMvc.View/Scripts/Shared/YUIConfigurator.js" />

describe('Index View', function()
{
    beforeEach(function(done)
    {
        YUIConfigurator.Configure('./../../src/CrudifiedMvc.View/Scripts/yui3/build/',
            './../../src/CrudifiedMvc.View/Scripts/yui3-gallery/build/',
            false);

        done();
    });

    describe('Menu Item Click', function()
    {
        var sandbox,
            clickedNode,
            mockEvent,
            indexView;
        beforeEach(function(done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<div class="pure-paginator"></div><table class="pure-table"><thead><tr>' +
                    '<th><span class="pure-menu"><ul><li><a href="#">First</a>' +
                        '<ul><li><a href="#">Child One</a></li></ul>' +
                        '</li></ul></span></th>' +
                    '<th><span class="pure-menu"><ul><li><a href="#">Second</a>' +
                        '<ul><li><a href="#">Child Two</a></li></ul>' +
                        '</li></ul></span></th>' +
                    '</tr></thead><tbody></tbody></table>');

                clickedNode = Y.one('.pure-table').all('thead tr th span ul li ul li a').item(0);

                done();
            });
        });

        afterEach(function(done)
        {
            sandbox.remove();

            done();
        });

        function act(Y)
        {
            indexView = new Y.IndexView({ modelName: 'model', refreshTableUrl: 'url' });
            mockEvent = { stopPropagation: sinon.stub(), target: clickedNode };

            sinon.stub(Y, 'io');

            indexView._onMenuItemClick(mockEvent);
        }

        function assertCommon(Y, data)
        {
            expect(mockEvent.stopPropagation.calledOnce).toBeTruthy();

            expect(Y.io.calledWith('url')).toBeTruthy();
            expect(Y.io.args[0][1].data).toEqual(Y.QueryString.stringify(data));
            expect(Y.io.args[0][1].headers['Content-Type']).toEqual('application/json');

            Y.io.args[0][1].on.success(null, { responseText: JSON.stringify({ table: '<tbody><tr id="newRow"></tr></tbody>', pager: '<div></div>'}) }, null);
            expect(Y.one('#newRow')).not.toBeNull();

            var alert = { Show: sinon.stub(), Types: { Error: sinon.stub() } };
            Y.Alert = alert;

            Y.io.args[0][1].on.failure(null,
                {
                    status: 500,
                    statusText: 'Error'
                }, null);

            expect(alert.Show.calledWith(alert.Types.Error(), 'Error getting column filter options (500: Error)')).toBeTruthy();

            Y.io.restore();
        }

        it('should send the correct data and darken the node when not previously selected', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                act(Y);

                assertCommon(Y,
                    {
                        sortKey: null,
                        sortDirection: null,
                        filterKeys: 'First',
                        filterValues: 'Child One',
                        modelName: 'model'
                    });

                expect(clickedNode.getStyle('background-color')).toEqual('rgb(214, 215, 215)');

                done();
            });
        });

        it('should send the correct data and reset the node color when previously selected', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                clickedNode.setStyle('background-color', 'rgb(214, 215, 215)');

                indexView._filterKeyValueMap['First'] = ['Child One'];

                act(Y);

                assertCommon(Y,
                {
                    sortKey: null,
                    sortDirection: null,
                    filterKeys: [],
                    filterValues: [],
                    modelName: 'model'
                });

                expect(clickedNode.getStyle('background-color')).toEqual('inherit');

                done();
            });
        });

        it('should do nothing if the root node is selected', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                clickedNode = Y.one('.pure-table').all('thead tr th span ul li a').item(0);

                act(Y);

                expect(mockEvent.stopPropagation.calledOnce).toBeTruthy();
                expect(Y.io.called).toBeFalsy();
                expect(clickedNode.getStyle('background-color')).toEqual('transparent');

                done();
            });
        });
    });

    describe('Sorter Click', function()
    {
        var sandbox,
            clickedNode,
            otherColumnNode;
        beforeEach(function(done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<table class="pure-table"><thead><tr>' +
                    '<th><span><div class="pure-paginator"></div><ul><li><a href="#">First</a></li></ul></span>' +
                        '<a id="firstSorter"><i class="fa-sort" title="Sort Descending"></i></a></th>' +
                    '<th><span><ul><li><a href="#">Second</a></li></ul></span>' +
                        '<a id="secondSorter"><i class="fa-sort" title="Sort Descending"></i></a></th>' +
                    '</tr></thead><tbody></tbody></table>');

                var sorterNodes = sandbox.all('.fa-sort');
                clickedNode = sorterNodes.item(0);
                otherColumnNode = sorterNodes.item(1);

                done();
            });
        });

        afterEach(function(done)
        {
            sandbox.remove();

            done();
        });

        function act(Y)
        {
            sinon.stub(Y, 'io');

            var indexView = new Y.IndexView({ modelName: 'model', refreshTableUrl: 'url' }),
                event = { target: clickedNode };

            indexView._onSorterClick(event);
        }

        function assertCommon(Y, sortDirection)
        {
            expect(Y.io.calledWith('url')).toBeTruthy();
            expect(Y.io.args[0][1].data).toEqual('sortKey=First&sortDirection=' + (sortDirection || 'asc') + '&&&modelName=model');
            expect(Y.io.args[0][1].headers['Content-Type']).toEqual('application/json');

            Y.io.args[0][1].on.success(null, { responseText: JSON.stringify({ table: '<tbody><tr id="newRow"></tr></tbody>', pager: '<div></div>' }) }, null);
            expect(Y.one('#newRow')).not.toBeNull();

            var alert = { Show: sinon.stub(), Types: { Error: sinon.stub() } };
            Y.Alert = alert;

            Y.io.args[0][1].on.failure(null,
                {
                    status: 500,
                    statusText: 'Error'
                }, null);

            expect(alert.Show.calledWith(alert.Types.Error(), 'Error sorting table (500: Error)')).toBeTruthy();

            Y.io.restore();
        }

        it('should have the correct title when not sorted', function(done)
        {
            expect(clickedNode.getAttribute('title')).toEqual('Sort Descending');
            done();
        });

        it('should sort by ascending with no previous sorting', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                act(Y);

                assertCommon(Y);

                expect(clickedNode.hasClass('fa-sort-asc')).toBeTruthy();
                expect(clickedNode.getAttribute('title')).toEqual('Sort Descending');

                done();
            });
        });

        it('should sort by ascending when previously sorted descending', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                clickedNode.setAttribute('class', 'fa-sort-desc');

                act(Y);

                assertCommon(Y);

                expect(clickedNode.hasClass('fa-sort-asc')).toBeTruthy();
                expect(clickedNode.getAttribute('title')).toEqual('Sort Descending');

                done();
            });
        });

        it('should sort by descending when previously sorted ascending', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                clickedNode.setAttribute('class', 'fa-sort-asc');

                act(Y);

                assertCommon(Y, 'desc');

                expect(clickedNode.hasClass('fa-sort-desc')).toBeTruthy();
                expect(clickedNode.getAttribute('title')).toEqual('Sort Ascending');

                done();
            });
        });

        it('should reset other column sortings when clicked column is different', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                otherColumnNode.setAttribute('class', 'fa-sort-asc');

                act(Y);

                assertCommon(Y);

                expect(clickedNode.hasClass('fa-sort-asc')).toBeTruthy();
                expect(clickedNode.getAttribute('title')).toEqual('Sort Descending');

                expect(otherColumnNode.getAttribute('class')).toEqual('fa fa-sort');
                expect(otherColumnNode.getAttribute('title')).toEqual('Sort Ascending');

                done();
            });
        });
    });

    describe('Row Click', function()
    {
        var sandbox;

        beforeEach(function(done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<table class="pure-table"><thead><tr>' +
                    '<th><span><ul><li><a href="#">First</a></li></ul></span>' +
                        '<a id="firstSorter"><i class="fa-sort" title="Sort Descending"></i></a></th>' +
                    '<th><span><ul><li><a href="#">Second</a></li></ul></span>' +
                        '<a id="secondSorter"><i class="fa-sort" title="Sort Descending"></i></a></th>' +
                    '</tr></thead>' +
                    '<tbody><tr data-link="/url/1"><td></td></tr></tbody>' +
                    '</table>');

                done();
            });
        });

        afterEach(function(done)
        {
            sandbox.remove();

            done();
        });

        it('should open the details url when clicked', function(done)
        {
            YUI().use('index-view', 'node-event-simulate', function(Y)
            {
                sinon.spy(window, 'open');

                var indexView = new Y.IndexView();

                indexView.bindUI();

                var rowNode = Y.one('.pure-table tbody tr td');
                rowNode.simulate('click');
                
                expect(window.open.calledWith('/url/1', '_self')).toBeTruthy();

                window.open.restore();

                done();
            });
        });

        it('should remove highlight when leaving row', function(done)
        {
            YUI().use('index-view', 'node-event-simulate', function(Y)
            {
                var indexView = new Y.IndexView();

                indexView.bindUI();

                var rowNode = Y.one('.pure-table tr');
                rowNode.simulate('mouseout');

                done();
            });
        });
    });

    describe('Pager Click', function()
    {
        var sandbox;
        beforeEach(function(done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<ul class="pure-paginator">' +
                    '<li><button class="" data-link="/url/getpage?page=2"></button></li>' +
                    '<li><button class="pure-button-disabled" data-link="/url/getpage?page=2"></button></li></ul>' +
                    '<table class="pure-table"><tbody></tbody></table>');

                done();
            });
        });

        afterEach(function(done)
        {
            sandbox.remove();

            done();
        });

        function assertCommon(Y)
        {
            expect(Y.io.args[0][0]).toEqual('/url/getpage?page=2');
            expect(Y.io.args[0][1].data['modelName']).toEqual('model');
            expect(Y.io.args[0][1].headers['Content-Type']).toEqual('application/json');

            Y.io.args[0][1].on.success(null, { responseText: JSON.stringify({ table: '<tbody><tr id="newRow"></tr></tbody>', pager: '<div id="newPaginator"></div>' }) }, null);
            expect(Y.one('#newRow')).not.toBeNull();
            expect(Y.one('#newPaginator')).not.toBeNull();

            var alert = { Show: sinon.stub(), Types: { Error: sinon.stub() } };
            Y.Alert = alert;

            Y.io.args[0][1].on.failure(null,
                {
                    status: 500,
                    statusText: 'Error'
                }, null);

            expect(alert.Show.calledWith(alert.Types.Error(), 'Error paging (500: Error)')).toBeTruthy();

            Y.io.restore();
        }

        it('should call to get the previous page', function(done)
        {
            YUI().use('index-view', 'node-event-simulate', function(Y)
            {
                sinon.spy(Y, 'io');

                var indexView = new Y.IndexView({ modelName: 'model' });

                indexView.bindUI();

                var node = Y.one('.pure-paginator li button');
                node.simulate('click');

                assertCommon(Y);

                done();
            });
        });

        it('should call to get the next page', function(done)
        {
            YUI().use('index-view', 'node-event-simulate', function(Y)
            {
                sinon.spy(Y, 'io');

                var indexView = new Y.IndexView({ modelName: 'model' });

                indexView.bindUI();

                var node = Y.one('.pure-button-disabled');
                node.simulate('click');

                expect(Y.io.called).toBeFalsy();

                done();
            });
        });
    });

    describe('Search Button Click', function()
    {
        var sandbox;
        beforeEach(function(done)
        {
            YUI().use('node', function(Y)
            {
                sandbox = Y.one('body').appendChild('<div><input name="searchQuery" type="text" value="my query" />' +
                    '<button id="searchButton" data-link="/url"></button></div>');

                done();
            });
        });

        afterEach(function(done)
        {
            sandbox.remove();

            done();
        });

        it('should send the input text to the correct url', function(done)
        {
            YUI().use('index-view', 'node-event-simulate', function(Y)
            {
                sinon.spy(Y, 'io');

                var indexView = new Y.IndexView({ modelName: 'model' });

                indexView.bindUI();

                var node = Y.one('#searchButton');
                node.simulate('click');

                expect(Y.io.args[0][0]).toEqual('/url');
                expect(Y.io.args[0][1].data).toEqual('sortKey=&sortDirection=&&&modelName=model&searchQuery=my%20query');
                expect(Y.io.args[0][1].headers['Content-Type']).toEqual('application/json');

                Y.io.args[0][1].on.success(null, { responseText: JSON.stringify({ table: '<tbody><tr id="newRow"></tr></tbody>', pager: '<div id="newPaginator"></div>' }) }, null);
                expect(Y.one('#newRow')).not.toBeNull();
                expect(Y.one('#newPaginator')).not.toBeNull();

                var alert = { Show: sinon.stub(), Types: { Error: sinon.stub() } };
                Y.Alert = alert;

                Y.io.args[0][1].on.failure(null,
                    {
                        status: 500,
                        statusText: 'Error'
                    }, null);

                expect(alert.Show.calledWith(alert.Types.Error(), 'Error searching (500: Error)')).toBeTruthy();

                Y.io.restore();

                done();
            });
        });
    });

    describe('_getData', function()
    {
        it('should include the searchQuery when it has been initialized', function(done)
        {
            YUI().use('index-view', function(Y)
            {
                var indexView = new Y.IndexView();
                indexView._searchQuery = 'query';

                expect(indexView._getData().searchQuery).toEqual('query');

                done();
            });
        });
    });
});