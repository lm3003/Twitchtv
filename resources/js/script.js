$(document).ready(function () {
    var channels = ["themeathon", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx",
        "RobotCaleb", "noobs2ninjas", "davidjohngibbons"];


    function allChannels() {
        var i = 0;
        var userInfoPromise;
        channels.forEach(function (curr) {
            var channel = "https://wind-bow.glitch.me/twitch-api/channels/" + curr;
            var url = "https://wind-bow.glitch.me/twitch-api/users/" + curr;
            var stream = "https://wind-bow.glitch.me/twitch-api/streams/" + curr;
            userInfoPromise = userInfo(curr, url, channel, stream, i);
            i = i + 1;
        });
        return userInfoPromise;
    }

    allChannels();

    function userInfo(curr, url, channel, stream, i) {

        return $.getJSON(url, function (json) {
            var injectHTMLLogo = '<div class="row-breaker" id="' + curr + '"><hr style="margin-top: 0;margin-bottom: 0;">' +
                '<div class="row"><div class="col" style="margin-left: 5px;cursor: pointer;padding: 1rem;">' +
                '<a id="channel-url-' + i + '" href="#" style="text-decoration: none" target="_blank"><img src="' + json.logo + '" alt="channel-logo" ' +
                'class="img-responsive" style="margin: 5px 10px 5px 5px;height:36px;width:36px;display: inline;' +
                'float: left;border-radius: 50%">' +
                '<div class="channel-logo-name" id="channel-logo-name-' + i + '" style="display: inline;float: left;' +
                'margin: 10px 5px 0px 5px;width: 75%">' + json.display_name + '</div></a></div></div></div>';
            $("#channel-info").append(injectHTMLLogo);
        })
            .done(function () {
                channelInfo(channel, i);
                streamInfo(stream, i);
            });

    }

    function streamInfo(stream, i) {
        return $.getJSON(stream, function (json) {
            if (!json.stream) {
                var injectStreamStatus = '<div class="stream-status" id="stream-status-negative" style="display:inline;">' +
                    '<i class="fa fa-exclamation-circle" style="float:right;margin-top: 5px; color: red;" aria-hidden="true"></i>' +
                    '</div>';
                $("#channel-logo-name-" + i).append(injectStreamStatus);
            } else {
                var injectStreamStatus = '<div class="stream-status" id="stream-status-positive" style="display:inline;">' +
                    '<i class="fa fa-check" style="float:right;margin-top: 4px;color: darkgreen;" aria-hidden="true"></i>' +
                    '<div class="addtional-info" ' +
                    'style="display: inline-block;font-size: 70%;color: rgba(71,71,71,0.7);padding-top: 5px; ' +
                    'text-overflow:ellipsis;white-space:nowrap;max-width: 100%;overflow: hidden;">'
                    + json.stream.channel.status + '</div></div>';
                $("#channel-logo-name-" + i).append(injectStreamStatus);
            }
        });
    }

    function channelInfo(channel, i) {
        return $.getJSON(channel, function (json) {
            $("#channel-url-" + i).attr("href", json.url);
        });
    }


    $(document).on("click", "#offline-lists", function () {
        $(".fa-check").parents(".row-breaker").hide();
        $(".fa-exclamation-circle").parents(".row-breaker").show();
    });

    $(document).on("click", "#online-lists", function () {
        $(".fa-exclamation-circle").parents(".row-breaker").hide();
        $(".fa-check").parents(".row-breaker").show();
    });

    // // $(document).on("click", "#offline-lists",function () {
    // //     $("#channel-info").empty();
    // //     i = 0;
    // //     channels.forEach(function (curr) {
    // //         var channel = "https://wind-bow.glitch.me/twitch-api/channels/" + curr;
    // //         var url = "https://wind-bow.glitch.me/twitch-api/users/" + curr;
    // //         var stream = "https://wind-bow.glitch.me/twitch-api/streams/" + curr;
    // //         userInfo(curr, url, channel, stream, i);
    // //         i = i + 1;
    // //     });
    // //     userInfo(curr, url, channel, stream, i).then(streamInfo(stream, i)).then(channelInfo(channel, i))
    // //         .done(function () {
    // //             channels.forEach(function (curr) {
    // //                 var stream = "https://wind-bow.glitch.me/twitch-api/streams/" + curr;
    // //                 streamOffline(stream, curr);
    // //             });
    // //         });
    // //
    // // });
    //
    //
    //
    // $(document).on("click", "#online-lists", function () {
    //     $("#channel-info").empty();
    //     i = 0;
    //     channels.forEach(function (curr) {
    //         var channel = "https://wind-bow.glitch.me/twitch-api/channels/" + curr;
    //         var url = "https://wind-bow.glitch.me/twitch-api/users/" + curr;
    //         var stream = "https://wind-bow.glitch.me/twitch-api/streams/" + curr;
    //         userInfo(curr, url, channel, stream, i);
    //         i = i + 1;
    //     });
    //     userInfo(curr, url, channel, stream, i).then(streamInfo(stream, i)).then(channelInfo(channel, i))
    //         .done(function () {
    //             $(".fa-exclamation-circle").parents(".row-breaker").remove();
    //         });
    // });

    $(document).on("click", "#all-lists", function () {
        $("#channel-info").empty();
        allChannels();
    });

});