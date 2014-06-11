"use strict";
(function($, window) {
    var defaults = {
            onClosed: null,
            closeAll: false,
            closeTimeOut: 0
        };

    var $window = $(window);
    var $events = $({});
    var eventCodes = { closeall: "dm.modal.closeall" };
    var currentModals = 0;
    var startIndex = 1000;

    var Modal = function(element, options) {
        this.settings = options;
        this.$element = $(element);
        this.closing = false;
        this.open = false;
        this.$backdrop = null;
        this.timeout = null;
    };

    Modal.prototype.addBindings = function() {
        $('.close', this.$element).unbind('click').click(this.onCloseButtonClick.bind(this));
        this.$backdrop.click(this.close.bind(this));
    };
    
    Modal.prototype.addOverLay = function() {
        this.$backdrop = $('.modal-overlay');
        if (this.$backdrop.length == 0) {
            this.$backdrop = $('<div class="modal-overlay"></div>').hide();
            $('body').append(this.$backdrop);
        }
        this.$backdrop.css({
            cursor: "auto",
            visibility: 'visible',
            z_index: startIndex
        }).css("z-index", startIndex).show();
    };

    Modal.prototype.position = function() {
        
        this.$element.css({ top: -9e4, left: -9e4 });
        var loadedHeight = this.$element.outerHeight(true);
        var loadedWidth = this.$element.outerWidth(true);
        
        this.$element.css({ position: 'fixed' });

        var left = Math.round(Math.max($window.width() - loadedWidth, 0) / 2);

        var top = Math.round(Math.max($window.height() - loadedHeight, 0) / 2);

        this.$element.css({ top: top, left: left, visibility: 'visible' });

    };

    Modal.prototype.show = function() {

        if (!this.closing) {

            if (!this.open) {

                this.open = true; 
                this.$element.hide();
                this.position();
                this.$element.focus();
                this.addOverLay();
                this.addBindings();
                currentModals++;
                this.$element.css("z-index", (startIndex + (currentModals * 10) + 1)).show();
                this.position();
                $events.on(eventCodes.closeall, this.close.bind(this));
                if (this.settings.closeTimeOut > 0) {
                    this.timeout = setTimeout(this.close.bind(this, false), this.settings.closeTimeOut);
                }
            }
        }
        ;
    };

    Modal.prototype.onCloseButtonClick = function () {

        if (!this.closing && this.open) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.close();
            if (this.settings.closeAll) {
                $events.trigger(eventCodes.closeall);
            }
        };
    };
    
    Modal.prototype.close = function() {

        if (!this.closing && this.open) {

            this.closing = true;
            this.$element.hide();
            if (this.settings.onClosed) {
                this.settings.onClosed();
            }
            if (currentModals > 0) {
                currentModals--;
            }
            if (currentModals == 0) {
                this.$backdrop.hide();
            }
            this.closing = false;
            this.open = false;
        };
    };
    
    if ($.modal) {
        return;
    }


    var old = $.fn.modal;

    $.fn.modal = function (option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('dm.modal');
            var options = $.extend({}, defaults, $this.data(), typeof option == 'object' && option);

            if (!data) {
                $this.data('dm.modal', (data = new Modal(this, options)));
            }
            data.show();
        });
    };

    $.fn.modal.Constructor = Modal;

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    };

})(jQuery, window);
