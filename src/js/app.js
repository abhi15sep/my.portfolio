'use strict';

var Helper = {

    init: function () {
        Helper.toggleDetails();
    },

    toggleDetails: function () {
        $('.details-btn').on('click', function (event) {
            event.preventDefault();

            $(this).siblings('.details').toggleClass('hidden');
        })
    }

};
