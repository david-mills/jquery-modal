"use strict";
(function (ko, $) {   
    ko.bindingHandlers.modal = {       

        update: function(element, valueAccessor, allBindingsAccessor) {

            var allBindings = allBindingsAccessor();
            var value = valueAccessor();
            var jElement = $(element);
            var closeAll = allBindings.modalCloseAllOnClose || false;
            var closeTimeOut = allBindings.modalCloseTimeOut || 0;
            var opacity = allBindings.modalOpacity || "0.5";
            var onClose = allBindings.modalOnClose;

            if (ko.utils.unwrapObservable(value)) {
                
                jElement.modal({
                    opacity: opacity,
                    closeAll:closeAll,
                    closeTimeOut: closeTimeOut,
                    onClosed: function() {
                        value(false);
                        if (onClose) {
                            onClose();
                        }
                    }
                });
            }

        }
    };
}(ko, jQuery));