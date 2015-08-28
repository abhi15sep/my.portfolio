'use strict';

var Helper = {

    init: function () {
        Helper.redirect()
    },

    redirect: function () {
        window.location.replace( window.location.origin + '#ru' );
        Helper.toggleDetails();
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

            content: function(tmpName) {
                var content = Get.twigContent(tmpName, TMPdata[0]);
                console.log(TMPdata);

                $('#content').empty().html(content);
                //
                //if(tmpName != 'main') {
                //    Render.footer();
                //    Helper.initMainMenu();
                //    Helper.setActiveClass('.nav-' + tmpName);
                //    Helper.initMobileBtnMenu()
                //} else {
                //    Render.footer('clear');
                //}
            }

        },

        initRouting = function () {
            routie({

                '': function() {
                    console.log('/');
                    //Render.header();
                    Render.content('project');
                }

                //'about': function() {
                //    Render.content('about');
                //
                //    Helper.initOwlCarousel('#equipment, #room, #people');
                //},
                //
                //'contacts': function() {
                //    Render.content('contacts');
                //},
                //
                //'audioClips': function() {
                //    Render.content('audioClips');
                //
                //    Helper.initUbaPlayer();
                //},
                //
                //'production': function() {
                //    Render.content('production');
                //
                //    Helper.initUbaPlayer();
                //},
                //
                //'instrumental': function() {
                //    Render.content('instrumental');
                //
                //    Helper.initUbaPlayer();
                //},
                //
                //'speaker': function() {
                //    Render.content('speaker');
                //
                //    Helper.initUbaPlayer();
                //},
                //
                //'voiceVideo': function() {
                //    Render.content('voiceVideo');
                //
                //    Helper.initUbaPlayer();
                //},
                //
                //'answerPhone': function() {
                //    Render.content('answerPhone');
                //
                //    Helper.initUbaPlayer();
                //}

            });
        };


    return {
        init: init
    }

}());
