'use strict';

var Helper = {

    init: function () {
        Helper.redirect();
        Helper.fadeInContent();
    },

    redirect: function () {
        window.location.replace( window.location.origin + '#ru' );
    },

    fadeInContent: function () {
        $('#content').hide().fadeIn(800);
    },

    toggleDetails: function () {
        $('.detail').on('click', function (event) {
            event.preventDefault();

            $(this).closest('.cbp_tmlabel').find('.details').toggleClass('hidden');
        })
    }

};

var App = (function () {

    var config = {
            path: {
                templates: './view/',
                templatesData: './data/projects/',
                localeData: './data/locale.json'
            },
            views: {
                project: 'projects.twig'
            },
            container: {
                content: '#content'
            }
        },

        lang = false,
        TMPdata = false,
        localeData = false,
        Template = {},

        init = function () {

            Get.localeData(function() {
                initRouting();
            });
        },

        Create = {

            twigTMP: function (tmpName, data, callback) {
                Template[tmpName] = twig({
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
                var path = config.path.templatesData + lang + '.json';

                $.get(path, function(data){
                    TMPdata = data;

                    callback();
                });
            },

            localeData: function (callback) {
                $.get(config.path.localeData, function(data){

                    localeData = data;
                    callback();
                });
            },

            twigContent: function (tmpName, data) {
                var twigTemplate = twig({ ref: tmpName }),
                    content = '';

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

                $(config.container.content).empty().html(content);

                Helper.toggleDetails();
            },

            project: function() {
                Get.TMPdata(function () {
                    Render.content('project', {projects: TMPdata, locale: localeData[lang]});
                });
            }

        },

        initRouting = function () {
            routie({

                'en': function() {
                    lang = 'en';
                    Render.project();
                },

                'ru': function() {
                    lang = 'ru';
                    Render.project();
                }

            });
        };


    return {
        init: init
    }

}());
