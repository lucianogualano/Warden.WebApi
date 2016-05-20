'use strict';

describe('Site CRUD service', function () {

    var siteService;
    var httpBackend;

    // Given
    var newSite;
    var newSiteWithId;
    var console = {
        panel: $('body').append('<div>').css({ position: 'fixed', top: 0, right: 0, background: 'transpatent' }),
        log: function (m) {
            this.panel.prepend('<div>' + m + '</div>');
        }

    };
    // Load app module
    beforeEach(angular.mock.module('app'));

    // Initialise dependencies, get service and mocked http backend
    beforeEach(inject(function (_$httpBackend_, _SiteService_) {
        siteService = _SiteService_;
        httpBackend = _$httpBackend_;
        newSite = {
            Id: "00000000-0000-0000-0000-000000000000",
            Name: 'george.smith@yahoo.com',
            Address: '101 Collin St Melbourne 3000 VIC, Australia'
        };
        newSiteWithId =  {
            Id: "399d0d7c-20ef-4e7f-84f7-fb83509c283f",
            Name: 'george.smith@yahoo.com',
            Address: '101 Collin St Melbourne 3000 VIC, Australia'
        };
        httpBackend.expectPOST('/api/sites/', newSite);
        httpBackend.whenPOST('/api/sites/').respond(200, newSiteWithId);
    }));

    //describe('please', function () {
    //    //it's 2014, not 1984 ... I think
    //    it('should know 2 + 2 is not 5', function () {
    //        expect(2).toEqual(2);
    //    });
    //});
    // make sure no expectations were missed in the tests.
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    // Define test
    it("should have 1 site in the controller view model repository", function () {
        
        //     When
        expect(siteService).toBeDefined();
        //siteService.test();
        var returnedPromiseNewSite = siteService.insertSite(newSite);
        //siteService.looch();

        //    //Set up a handler for the response, that will put the result
        //    // into a variable in this scope for you to test.
        var result;
        returnedPromiseNewSite.then(function (response) {
            result = response;
        });
        
        // Flush the backend to "execute" the request to do the expected POST assertion.
        httpBackend.flush();

        var templates = [JSON.stringify({ data: "data", name: "name" })];
        //throw new Error(templates);
        //throw new Error('Expected a spy, but got ' + JSON.stringify(result) + '.');
        
        // Then
        expect(newSiteWithId).toEqual(result);
    });

});