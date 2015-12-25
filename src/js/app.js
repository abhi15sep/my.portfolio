'use strict';

var Helper = {

    init: function () {
        Helper.redirect();
        Helper.fadeInContent();
        Helper.bindLangSwitcher()
    },

    redirect: function () {
        window.location.replace( window.location.origin + '#en' );
    },

    fadeInContent: function () {
        $('#content').hide().fadeIn(800);
    },

    toggleDetails: function () {
        $('.detail').on('click', function (event) {
            event.preventDefault();

            $(this).closest('.cbp_tmlabel').find('.details').toggleClass('hidden');
        })
    },

    initLangSwitcher: function (lang) {
        var dataLang = (lang == 'ru') ? 'en' : 'ru';
        $('#lang').html(dataLang)
            .attr('data-lang', dataLang);
    },

    bindLangSwitcher: function () {
        $('#lang').on('click', function () {
            location.hash = $(this).attr('data-lang');
        });
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
                    callback(data);
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
                Get.TMPdata(function (data) {
                    Render.content('project', {projects: data, locale: localeData[lang]});
                });
            }
        },

        initRouting = function () {
            routie('*', function(route) {
                lang = 'en'
                if(route == 'en' || route == 'ru') lang = route;

                Render.project();
                Helper.initLangSwitcher(route);
            });
        };


    return {
        init: init
    }

}());
