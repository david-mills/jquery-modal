
describe("Model Tests", function () {
    var popupHtml = '<div id="popup1" style="width:100px;height:100px;">\
    <a href="#" class="close" id="close1">close</a>\
        <p>TESTING</p>\
    </div>\
    <div id="popup2" style="width:50px;height:50px;">\
    <a href="#" class="close" id="close2">close</a>\
        <p>TESTING</p>\
        </div>';
    var popup1, popup2, close1, close2, close1Method, close2Method;
   
    beforeEach(function () {
        setFixtures(popupHtml);
        popup1 = $('#popup1');
        popup1.hide();
        popup2 = $('#popup2');
        popup2.hide();
        close1 = $('#close1');
        close1.hide();
        close2 = $('#close2');
        close2.hide();
        close1Method = jasmine.createSpy();
        close2Method = jasmine.createSpy();
        spyOn($.fn, 'width').andReturn(400);
        spyOn($.fn, 'height').andReturn(600);
    });

    describe("When the model is opened", function() {

        beforeEach(function () {
            popup1.modal({
                opacity: '0.6',
                closeAll: false,
                closeTimeOut: 0,
                onClosed: close1Method
            });
        });

        afterEach(function () {
            popup1.data('dm.modal').close();
        });
        it("Then the popup should be visible ", function() {
            expect(popup1).toBeVisible();
        });

        it("Then the popup should be positioned correctly ", function () {
            expect(popup1.css('top')).toBe('250px');
            expect(popup1.css('left')).toBe('150px');
        });

        it("Then the popup should have the correct z-index", function () {

            expect(popup1.css('z-index')).toBe('1011');

        });
        
        it("Then the overlay should be visible correctly ", function () {

            expect($('.modal-overlay')).toBeVisible();

        });
        
        it("Then the overlay should have the correct z-index", function () {
            
            expect($('.modal-overlay').css('z-index')).toBe('1000');

        });

        describe("When the model is closed", function () {
            beforeEach(function () {
                close1.click();
            });
            
            it("Then it should hide the element", function () {
                expect(popup1).not.toBeVisible();
                

            });
            
            it("Then it should hide the overlay", function () {

                expect($('.modal-overlay')).not.toBeVisible();

            });

            it("Then it should call the close function", function () {

                expect(close1Method).toHaveBeenCalled();

            });
        });

        describe("When another model is opened", function () {
            
            beforeEach(function () {
                popup2.modal({
                    opacity: '0.6',
                    closeAll: true,
                    closeTimeOut: 0,
                    onClosed: close2Method
                });
            });

            afterEach(function () {
                popup2.data('dm.modal').close();
            });
            
            it("Then the popup should be visible ", function () {
                expect(popup2).toBeVisible();
                expect(popup1).toBeVisible();
            });

            it("Then the popup should be positioned correctly ", function () {

                expect(popup2.css('top')).toBe('275px');
                expect(popup2.css('left')).toBe('175px');

            });
            
            it("Then the popup should have the correct z-index", function () {

                expect(popup2.css('z-index')).toBe('1021');

            });

            it("there should only be one overlay", function () {
                expect($('.modal-overlay').length).toBe(1);
            });

            it("the overlay should be visible", function () {
                expect($('.modal-overlay')).toBeVisible();
            });
            
            describe("when the second modal is closed", function () {

                beforeEach(function () {
                    close2.click();
                });
                
                it("Then the first popup should be closed", function () {
                    expect(popup1).not.toBeVisible();
                });

                it("Then the second popup should be closed", function () {
                    expect(popup2).not.toBeVisible();
                });
                
                it("should call the close method", function () {
                    expect(close2Method).toHaveBeenCalled();
                });
            });
            describe("when the overlay is clicked", function () {

                beforeEach(function () {
                    $('.modal-overlay').click();
                });
                it("It should close all popups", function () {
                    expect(popup2).not.toBeVisible();
                    expect(popup1).not.toBeVisible();
                });

                it("it should call all the close methods", function () {
                    expect(close1Method).toHaveBeenCalled();
                    expect(close2Method).toHaveBeenCalled();
                });
                
                it("the overlay should not be visible", function () {
                    expect($('.modal-overlay')).not.toBeVisible();
                });
            });
        });
    });
    
    describe("When the model is opened with a timeout", function () {

        beforeEach(function () {
            jasmine.Clock.useMock();
            popup1.modal({
                opacity: '0.6',
                closeAll: false,
                closeTimeOut: 5000,
                onClosed: close1Method
            });
        });

        afterEach(function () {
            popup1.data('dm.modal').close();
        });
        
        it("Then the popup should be visible ", function () {
            expect(popup1).toBeVisible();
        });
        describe("after the time has elapsed", function () {

            beforeEach(function () {
                jasmine.Clock.tick(6000);
            });
            
            it("Then it should hide the element", function () {
                expect(popup1).not.toBeVisible();
            });

            it("Then it should hide the overlay", function () {
                expect($('.modal-overlay')).not.toBeVisible();
            });

            it("Then it should call the close function", function () {
                expect(close1Method).toHaveBeenCalled();
            });
        });
    });

});