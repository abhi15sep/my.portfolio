'use strict';

var Helper = {

    init: function () {
        Helper.redirect()
    },

    redirect: function () {
        window.location.replace( window.location.origin + '#ru' );
    },

    toggleDetails: function () {
        $('.details-btn').on('click', function (event) {
            event.preventDefault();

            $(this).siblings('.details').toggleClass('hidden');
        })
    }

};

var App = (function () {

    var config = {
            path: {
                templates: './view/',
                templatesData: './data/projects/ru.json'
            },
            views: {
                project: 'projects.twig'
            }
        },

        TMPdata = false,

        Templates = {
            project: false
        },

        init = function () {

            Get.TMPdata(function() {
                initRouting();
            });

        },

        Create = {

            twigTMP: function (tmpName, data, callback) {

                Templates[tmpName] = twig({
                    id: tmpName,
                    href: config.path.templates + config.views[tmpName],
                    async: false,

                    load: function(template) {
                        var content = template.render(data);

                        callback(content);
                    }
                });
            }
        },

        Get = {

            TMPdata: function (callback) {
                $.get(config.path.templatesData, function(data){
                    TMPdata = data;

                    callback();
                });
            },

            twigContent: function (tmpName, data) {
                var twigTemplate = twig({ ref: tmpName }), content = '';
                data = data || TMPdata[tmpName];

                if( twigTemplate ) {
                    content = twigTemplate.render(data);
                } else {
                    Create.twigTMP(tmpName, data, function(tmpContent){
                        content = tmpContent;
                    });
                }

                return content;
            }

        },

        Render = {

            content: function(tmpName, data) {
                var content = Get.twigContent(tmpName, data);

                $('#content').empty().html(content);
                Helper.toggleDetails();
            }

        },

        initRouting = function () {
            routie({

                'ru': function() {
                    Render.content('project', {projects: TMPdata});
                }
            });
        };


    return {
        init: init
    }

}());
