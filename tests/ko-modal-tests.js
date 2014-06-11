describe("knockout modal binding tests", function() {

    beforeEach(function() {
    });
    describe("Given i make a element modal", function() {
        describe("and the value is false", function() {
            var modalSpy;
            beforeEach(function() {
                modalSpy = spyOn($.fn, 'modal');
                var element = $('<div></div>');
                var valueAccessor = function() {
                    return false;
                };
                var allBindings = function () {
                    return {
                    };
                };
                var fadeBinding = ko.bindingHandlers.modal;
                fadeBinding.update(element[0], valueAccessor, allBindings);
            });

            it("Then nothing should be called if the value is false", function() {
                expect(modalSpy).not.toHaveBeenCalled();
            });
        });
        
    });
	describe("Given i make a element modal", function() {

            var modalSpy;
            var valueAccessor;
            var currentValue = true;
            beforeEach(function() {
                modalSpy = spyOn($.fn, 'modal');
                var element = $('<div></div>');
                
                valueAccessor = {
                    value: function () {
                        return function (visible) {
                            currentValue = visible;
                            return true;
                        };
                    }
                };
                
                var allBindings = function() {
                    return {
                        modalCloseAllOnClose: true,
                        modalOpacity: '0.7',
                        modalCloseTimeOut: 50
                    };
                };
                var fadeBinding = ko.bindingHandlers.modal;
                fadeBinding.update(element[0], valueAccessor.value, allBindings);
            });


            it("should be called if the value is true", function() {
                expect(modalSpy).toHaveBeenCalled();
            });
            
            it("should set the correct modal defaults", function () {
                expect(modalSpy.mostRecentCall.args[0].opacity).toBe('0.7');
                expect(modalSpy.mostRecentCall.args[0].closeAll).toBe(true);
                expect(modalSpy.mostRecentCall.args[0].closeTimeOut).toBe(50);
            });
            
            it("should update the value when closed", function () {

                modalSpy.mostRecentCall.args[0].onClosed();
                expect(currentValue).toBe(false);
            });
        });
});