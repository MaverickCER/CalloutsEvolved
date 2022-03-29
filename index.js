/*
https://www.freeformatter.com/javascript-beautifier.html
version 0.9.0
*/

var enc = 0,
    displayName = "Anonymous",
    email = "Anonymous@gmail.com",
    queue = [],
    audioPlaying = 0,
    timers = {},
    uRate = 1,
    interim_transcript,
    final_transcript,
    autoClickInProgress = false,
    activeUser,
    currentUser,
    btnData = {},
    userSession = null,
    recognizing = false,
    userLoggedIn = false,
    chatListenerAddedId = null,
    session = "SOLO",
    textSize = "16px",
    col = "dark",
    colBlind = "polychromatic",
    sound = "mute",
    soundLang = "disabled",
    soundLoca = "#output1",
    pitchVal = 1,
    volumeVal = 1,
    enc1 = "intro",
    encounter = "intro",
    lastClick = "";

const uttr = new SpeechSynthesisUtterance();

$(document).ready(function() {
    $.fn.callout = function(tempText, duration) {
        if (!tempText) return this;
        return this.each(function() {
            var $elm = $(this);
            $elm.html(symReplace(tempText));
            clearTimeout($elm.data("timeout"));
            var timer = setTimeout(function() {
                if ($elm.html() == symReplace(tempText)) {
                    $elm.html(" ");
                }
            }, duration || 1000);
            $elm.data("timeout", duration);
        });
    };
    $.fn.tempClass = function(tempClass, duration) {
        if (!tempClass) return this;
        return this.each(function() {
            var $elm = $(this);
            $elm.addClass(tempClass);
            clearTimeout($elm.data("timeout"));
            var timer = setTimeout(function() {
                $elm.removeClass(tempClass).removeData("timeout");
                $elm.addClass("back-col0");
            }, duration || 1000);
            $elm.data("timeout", duration);
        });
    };

    function symReplace(tempText) {
        var str = tempText;
        var array = str.split(" ");
        var newArray = [];
        array.forEach(function(index) {
            var data = index.toLowerCase();
            switch (data) {
                case "-arc-":
                    newArray.push("<i class='icon-arc'></i>");
                    break;
                case "-scorch-":
                    newArray.push("<i class='icon-solar'></i>");
                    break;
                case "-solar-":
                    newArray.push("<i class='icon-solar'></i>");
                    break;
                case "-void-":
                    newArray.push("<i class='icon-void'></i>");
                    break;
                case "-null-":
                    newArray.push("<i class='icon-void'></i>");
                    break;
                case "-forwards-":
                    newArray.push("<i class='icon-up'></i>");
                    break;
                case "-front-":
                    newArray.push("<i class='icon-up'></i>");
                    break;
                case "-up-":
                    newArray.push("<i class='icon-up'></i>");
                    break;
                case "-middle-":
                    newArray.push("<i class='icon-middle'></i>");
                    break;
                case "-center-":
                    newArray.push("<i class='icon-center'></i>");
                    break;
                case "-high-":
                    newArray.push("<i class='icon-up'></i>");
                    break;
                case "-backwards-":
                    newArray.push("<i class='icon-down'></i>");
                    break;
                case "-behind-":
                    newArray.push("<i class='icon-down'></i>");
                    break;
                case "-back-":
                    newArray.push("<i class='icon-down'></i>");
                    break;
                case "-down-":
                    newArray.push("<i class='icon-down'></i>");
                    break;
                case "-low-":
                    newArray.push("<i class='icon-down'></i>");
                    break;
                case "-below-":
                    newArray.push("<i class='icon-down'></i>");
                    break;
                case "-topright-":
                    newArray.push("<i class='icon-topright'></i>");
                    break;
                case "-ne-":
                    newArray.push("<i class='icon-topright'></i>");
                    break;
                case "-northeast-":
                    newArray.push("<i class='icon-topright'></i>");
                    break;
                case "-northwest-":
                    newArray.push("<i class='icon-topleft'></i>");
                    break;
                case "-topleft-":
                    newArray.push("<i class='icon-topleft'></i>");
                    break;
                case "-frontleft-":
                    newArray.push("<i class='icon-topleft'></i>");
                    break;
                case "-frontright-":
                    newArray.push("<i class='icon-topright'></i>");
                    break;
                case "-backleft-":
                    newArray.push("<i class='icon-bottomeleft'></i>");
                    break;
                case "-backright-":
                    newArray.push("<i class='icon-bottomeright'></i>");
                    break;
                case "-nw-":
                    newArray.push("<i class='icon-topleft'></i>");
                    break;
                case "-bottomleft-":
                    newArray.push("<i class='icon-bottomeleft'></i>");
                    break;
                case "-sw-":
                    newArray.push("<i class='icon-bottomeleft'></i>");
                    break;
                case "-bottomright-":
                    newArray.push("<i class='icon-bottomright'></i>");
                    break;
                case "-se-":
                    newArray.push("<i class='icon-bottomright'></i>");
                    break;
                case "-southeast-":
                    newArray.push("<i class='icon-bottomright'></i>");
                    break;
                case "-southwest-":
                    newArray.push("<i class='icon-bottomleft'></i>");
                    break;
                case "-left-":
                    newArray.push("<i class='icon-left'></i>");
                    break;
                case "-right-":
                    newArray.push("<i class='icon-right'></i>");
                    break;
                case "-hide-":
                    newArray.push("<i class='icon-hide'></i>");
                    break;
                case "-damage-":
                    newArray.push("<i class='icon-damage'></i>");
                    break;
                case "-downcrota-":
                    newArray.push(
                        "<i class='icon-right'></i> <i class='icon-knight'></i>"
                    );
                    break;
                case "-knight-":
                    newArray.push("<i class='icon-knight'></i>");
                    break;
                case "-angelics-":
                    newArray.push("<i class='icon-angelics'></i>");
                    break;
                case "-tree-":
                    newArray.push("<i class='icon-tree'></i>");
                    break;
                case "-stairs-":
                    newArray.push("<i class='icon-stairs'></i>");
                    break;
                case "-rock-":
                    newArray.push("<i class='icon-rock'></i>");
                    break;
                case "-run-":
                    newArray.push("<i class='icon-run'></i>");
                    break;
                case "-monitor-":
                    newArray.push("<i class='icon-monitor'></i>");
                    break;
                case "-eyes-":
                    newArray.push("<i class='icon-eyes'></i>");
                    break;
                case "-mote-":
                    newArray.push("<i class='icon-buff'></i>");
                    break;
                case "-motes-":
                    newArray.push("<i class='icon-buff'></i>");
                    break;
                case "-buff-":
                    newArray.push("<i class='icon-buff'></i>");
                    break;
                case "-ready-":
                    newArray.push("<i class='icon-ready'></i>");
                    break;
                case "-close-":
                    newArray.push("<i class='icon-close'></i>");
                    break;
                case "-yes-":
                    newArray.push("<i class='icon-ready'></i>");
                    break;
                case "-buff-":
                    newArray.push("<i class='icon-stop'></i>");
                    break;
                case "-build-":
                    newArray.push("<i class='icon-gosbuff'></i>");
                    break;
                case "-empowered-":
                    newArray.push("<i class='icon-empowered'></i>");
                    break;
                case "-cup-":
                    newArray.push("<i class='icon-cup'></i>");
                    break;
                case "-dog-":
                    newArray.push("<i class='icon-dog'></i>");
                    break;
                case "-axe-":
                    newArray.push("<i class='icon-axe'></i>");
                    break;
                case "-sun-":
                    newArray.push("<i class='icon-sun'></i>");
                    break;
                case "-bomb-":
                    newArray.push("<i class='icon-bomb'></i>");
                    break;
                case "-bombs-":
                    newArray.push("<i class='icon-bomb'></i>");
                    break;
                case "-orb-":
                    newArray.push("<i class='icon-droptheorb'></i>");
                    break;
                case "-gorgon-":
                    newArray.push("<i class='icon-gorgon'></i>");
                    break;
                case "-help-":
                    newArray.push("<i class='icon-help'></i>");
                    break;
                case "-no-":
                    newArray.push("<i class='icon-no'></i>");
                    break;
                case "-shield-":
                    newArray.push("<i class='icon-shield'></i>");
                    break;
                case "-swap-":
                    newArray.push("<i class='icon-swap'></i>");
                    break;
                case "-chalice-":
                    newArray.push("<i class='icon-chalice'></i>");
                    break;
                case "-detonate-":
                    newArray.push("<i class='icon-detonate'></i>");
                    break;
                case "-getin-":
                    newArray.push("<i class='icon-detonate'></i>");
                    break;
                case "-stepin-":
                    newArray.push("<i class='icon-detonate'></i>");
                    break;
                case "-open-":
                    newArray.push("<i class='icon-dotcircle'></i>");
                    break;
                case "-pull-":
                    newArray.push("<i class='icon-dotcircle'></i>");
                    break;
                case "-group-":
                    newArray.push("<i class='icon-group'></i>");
                    break;
                case "-groupup-":
                    newArray.push("<i class='icon-group'></i>");
                    break;
                case "-grouping-":
                    newArray.push("<i class='icon-group'></i>");
                    break;
                default:
                    newArray.push(index);
            }
        });
        return newArray.join(" ");
    }

    function setUpQueue(e) {
        if (e == undefined || e == "") return; // only start if there is something to add
        switch (sound) {
            case "mute":
                break;
            default:
                queue.push(e);
                break;
        }
        if (audioPlaying == 1 || queue.length == 0) return; // only 1 defined instance
        playFromQueue(); // play files in the queue
    }

    function playSound() {
        // infinite loop that plays all audio files in queue.
        audioPlaying = 1; // return additional instances from button click.
        if (queue.length == 0) {
            // if there is nothing to play,
            audioPlaying = 0; // allow another instance of playSound,
            return; // stop the loop
        }
        if (sound != "mute") {
            var playThis = new Audio(); // create a new audio file
            var src = $(queue[0].toString()).attr("src"); // locate the src
            playThis.src = src; // attach the src to the new audio file.
            playThis.load(); // load the sound files at index 0
            playThis.play(); // play the sound file at index 0
            $(playThis).on("ended", function() {
                // once file is done
                queue.splice(0, 1); // remove index 0,
                playFromQueue(); // loop the function.
            });
        }
    }

    function playFromQueue() {
        // infinite loop that plays all audio files in queue.
        audioPlaying = 1; // return additional instances from button click.
        if (queue.length == 0) {
            // if there is nothing to play,
            audioPlaying = 0; // allow another instance of playFromQueue,
            return; // stop the loop
        }
        switch (queue[0]) {
            case "#sadtrombone":
                playSound();
                break;
            default:
                uttr.rate = uRate;
                uttr.text = queue[0];
                uttr.pitch = pitchVal;
                uttr.volume = volumeVal;
                uttr.voice = speechSynthesis
                    .getVoices()
                    .filter((voice) => voice.name == sound)[0];
                speechSynthesis.speak(uttr);
                break;
        }
        uttr.onend = function() {
            queue.splice(0, 1); // remove index 0,
            playFromQueue(); // loop the function.
        };
    }

    function syncClicks(someString) {
        if (someString == lastClick) {} else {
            $(`#${someString}`).trigger("click");
            lastClick = someString;
        }
    }

    /**************************************HTML Navigation**********************************************************/
    $("#menuHeader").on("click", function() {
        if ($("#selectMenu").hasClass("hidden")) {
            $("#selectMenu").removeClass("hidden");
            $("#sidebar").removeClass("icon-right");
            $("#sidebar").addClass("icon-left");
            $(".ermsg").html("&nbsp;<br/>&nbsp;");
        } else {
            $("#selectMenu").addClass("hidden");
            $("#sidebar").removeClass("icon-left");
            $("#sidebar").addClass("icon-right");
            $(".ermsg").html("&nbsp;<br/>&nbsp;");
        }
    });
    $("#menuFooter").on("click", function() {
        $("#selectMenu").addClass("hidden");
        $("#sidebar").removeClass("icon-left");
        $("#sidebar").addClass("icon-right");
        $("#tac").removeClass("hide");
    });
    $("#chatHeadOpen").on("click", function() {
        if (userLoggedIn) {
            // storing the ID of last clicked button and user which clicked it
            const btnId = $(this).attr("id");
            const enc1 = encounter;
            const {
                uid,
                displayName
            } = firebase.auth().currentUser;
            const lastClickedButton = {
                by: {
                    uid,
                    displayName
                },
                btnId,
                enc1
            };
            var btnDataR = firebase.database().ref().child("btnData");
            var specificSessionRef = btnDataR.child(session);
            if (!autoClickInProgress) {
                specificSessionRef.set(lastClickedButton, function(error) {
                    if (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                    }
                });
            } else {
                autoClickInProgress = false;
            }
        }
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#chatHeadClose").removeClass("hide");
        $("#chatHeadOpen").addClass("hide");
        $("#selectChat").removeClass("hide");
        $("#audioHeadClose").addClass("hide");
        $("#audioHeadOpen").removeClass("hide");
        $("#selectAudio").addClass("hide");
        $("#vidioHeadClose").addClass("hide");
        $("#vidioHeadOpen").removeClass("hide");
        $("#selectVideo").addClass("hide");
        $("#userHeadClose").addClass("hide");
        $("#userHeadOpen").removeClass("hide");
        $("#selectUser").addClass("hide");
        $("#login").addClass("hide");
        $("#chatmsg").focus();
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#chatHeadClose").on("click", function() {
        $("#chatHeadOpen").removeClass("hide");
        $("#chatHeadClose").addClass("hide");
        $("#selectChat").addClass("hide");
        $("#chatmsg").focusout();
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#audioHeadOpen").on("click", function() {
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#chatHeadClose").addClass("hide");
        $("#chatHeadOpen").removeClass("hide");
        $("#selectChat").addClass("hide");
        $("#audioHeadClose").removeClass("hide");
        $("#audioHeadOpen").addClass("hide");
        $("#selectAudio").removeClass("hide");
        $("#vidioHeadClose").addClass("hide");
        $("#vidioHeadOpen").removeClass("hide");
        $("#selectVideo").addClass("hide");
        $("#userHeadClose").addClass("hide");
        $("#userHeadOpen").removeClass("hide");
        $("#selectUser").addClass("hide");
        $("#login").addClass("hide");
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#audioHeadClose").on("click", function() {
        $("#audioHeadOpen").removeClass("hide");
        $("#audioHeadClose").addClass("hide");
        $("#selectAudio").addClass("hide");
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#vidioHeadOpen").on("click", function() {
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#chatHeadClose").addClass("hide");
        $("#chatHeadOpen").removeClass("hide");
        $("#selectChat").addClass("hide");
        $("#audioHeadClose").addClass("hide");
        $("#audioHeadOpen").removeClass("hide");
        $("#selectAudio").addClass("hide");
        $("#vidioHeadClose").removeClass("hide");
        $("#vidioHeadOpen").addClass("hide");
        $("#selectVideo").removeClass("hide");
        $("#userHeadClose").addClass("hide");
        $("#userHeadOpen").removeClass("hide");
        $("#selectUser").addClass("hide");
        $("#login").addClass("hide");
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#vidioHeadClose").on("click", function() {
        $("#vidioHeadOpen").removeClass("hide");
        $("#vidioHeadClose").addClass("hide");
        $("#selectVideo").addClass("hide");
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#userHeadOpen").on("click", function() {
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#chatHeadClose").addClass("hide");
        $("#chatHeadOpen").removeClass("hide");
        $("#selectChat").addClass("hide");
        $("#audioHeadClose").addClass("hide");
        $("#audioHeadOpen").removeClass("hide");
        $("#selectAudio").addClass("hide");
        $("#vidioHeadClose").addClass("hide");
        $("#vidioHeadOpen").removeClass("hide");
        $("#selectVideo").addClass("hide");
        $("#userHeadClose").removeClass("hide");
        $("#userHeadOpen").addClass("hide");
        $("#selectUser").removeClass("hide");
        $("#login").addClass("hide");
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $("#userHeadClose").on("click", function() {
        $("#userHeadOpen").removeClass("hide");
        $("#userHeadClose").addClass("hide");
        $("#selectUser").addClass("hide");
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });

    /************************************************Login Nav and Val*******************************************/
    $(".selectSignup").on("click", function() {
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#selectSignup").removeClass("hide");
        $("#selectSignin").addClass("hide");
        $("#selectReset").addClass("hide");
        $("#login").removeClass("hide");
        $("#index").removeClass("hide");
        $("#user").addClass("hide");
        $("#coms").addClass("hide");
        $("#chat").addClass("hide");
        $("#signupEmail").focus();
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $(".selectSignin, #rplabel").on("click", function() {
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#selectSignin").removeClass("hide");
        $("#selectSignup").addClass("hide");
        $("#selectReset").addClass("hide");
        $("#login").removeClass("hide");
        $("#index").removeClass("hide");
        $("#user").addClass("hide");
        $("#coms").addClass("hide");
        $("#chat").addClass("hide");
        $("#signinEmail").focus();
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $(".selectReset, #fplabel").on("click", function() {
        $("#selectMenu").removeClass("hidden");
        $("#sidebar").removeClass("icon-right");
        $("#sidebar").addClass("icon-left");
        $("#selectReset").removeClass("hide");
        $("#selectSignin").addClass("hide");
        $("#selectSignup").addClass("hide");
        $("#login").removeClass("hide");
        $("#index").removeClass("hide");
        $("#user").addClass("hide");
        $("#coms").addClass("hide");
        $("#chat").addClass("hide");
        $("#resetEmail").focus();
        $(".ermsg").html("&nbsp;<br/>&nbsp;");
    });
    $(".passwordReveal").on("click", function() {
        event.preventDefault();
        var target = "#" + $(this).attr("for");
        if ($(target).attr("type") == "password") {
            $(target).attr("type", "text");
            $(".passwordReveal").html('<i class="icon-hide"></i>');
        } else {
            $(target).attr("type", "password");
            $(".passwordReveal").html('<i class="icon-show"></i>');
        }
    });
    $("#signinPassword, #signupPassword, #changePassword").on(
        "keyup",
        function() {
            var pswd = $(this).val();
            if (
                pswd.length > 7 &&
                pswd.match(/[A-z]/) &&
                pswd.match(/[A-Z]/) &&
                pswd.match(/\d/)
            ) {
                $(this).closest("input").css("border-top", "1px solid var(--accent)");
                $(".ermsg").html("&nbsp;<br/>&nbsp;");
                this.setCustomValidity("");
            } else {
                $(this).closest("input").css("border-top", "1px solid var(--col1)");
                $(".ermsg").html(
                    "Requirements: 7 Characters, Upper and lowercase letters, and a number"
                );
                this.setCustomValidity("Incomplete Password!");
            }
        }
    );
    $("#confirmPassword").on("keyup", function() {
        if ($("#signupPassword").val() === $(this).val()) {
            $(this).closest("input").css("border-top", "1px solid var(--accent)");
            $(".ermsg").html("Match!");
            this.setCustomValidity("");
        } else {
            $(this).closest("input").css("border-top", "1px solid var(--col1)");
            $(".ermsg").html("Passwords do not match");
            this.setCustomValidity("Passwords must match");
        }
    });
    $("input[type=email]").on("keyup", function() {
        var email = $(this).val();
        if (
            (email.match(/@/g) && email.match(/.com/g)) ||
            (email.match(/@/g) && email.match(/.net/g)) ||
            (email.match(/@/g) && email.match(/.edu/g))
        ) {
            $(this).closest("input").css("border-top", "1px solid var(--accent)");
            $(".ermsg").html("Valid!");
            this.setCustomValidity("");
        } else {
            $(this).closest("input").css("border-top", "1px solid var(--col1)");
            $(".ermsg").html("Only .com, .net, and .edu emails are accepted.");
            this.setCustomValidity(
                "Only @xyz.com, @xyz.net, and @xyz.edu emails are accepted."
            );
        }
    });
    $(".tacToggle").on("click", function() {
        if ($("#tac").hasClass("hide")) {
            $("#tac").removeClass("hide");
        } else {
            $("#tac").addClass("hide");
        }
    });

    /*******************************COMS INTERFACE************************************************/
    $(".toggleBTN").on("click", function() {
        var target = $(this).data("acquired").split(",");
        target.forEach(function(index) {
            var tar = "#" + index;
            if ($(tar).hasClass('hide')) {
                $(tar).removeClass('hide');
            } else {
                $(tar).addClass('hide');
            }
        });
    });
    $(".showBTN").on("click", function() {
        var target = $(this).data("acquired").split(",");
        target.forEach(function(index) {
            var tar = "#" + index;
            if ($(tar).hasClass('hide')) {
                $(tar).removeClass('hide');
            }
        });
    });
    $(".hideBTN").on("click", function() {
        var target = $(this).data("acquired").split(",");
        target.forEach(function(index) {
            var tar = "#" + index;
            if (!$(tar).hasClass('hide')) {
                $(tar).addClass('hide');
            }
        });
    });
    $(".gridBTN").on("click", function() {
        lastClick = $(this).attr("id");
        if (userLoggedIn) {
            // storing the ID of last clicked button and user which clicked it
            const btnId = $(this).attr("id");
            const enc1 = encounter;
            const {
                uid,
                displayName
            } = firebase.auth().currentUser;
            const lastClickedButton = {
                by: {
                    uid,
                    displayName
                },
                btnId,
                enc1
            };
            var btnDataR = firebase.database().ref().child("btnData");
            var specificSessionRef = btnDataR.child(session);
            if (!autoClickInProgress) {
                specificSessionRef.set(lastClickedButton, function(error) {
                    if (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                    }
                });
            } else {
                autoClickInProgress = false;
            }
        }
        var dur = $("#" + $(this).data("dur")).val() * 1000;
        var tim = $("#" + $(this).data("tim")).val();
        var cal = $("#" + $(this).data("cal")).val();
        var col = $("#" + $(this).data("col")).val();
        var tar = "#" + $(this).data("acquired");
        if (cal == "") return;
        if (
            $(this).hasClass("back-col1") ||
            $(this).hasClass("back-col2") ||
            $(this).hasClass("back-col3") ||
            $(this).hasClass("back-col4") ||
            $(this).hasClass("back-col5") ||
            $(this).hasClass("back-col6")
        ) {
            $(this)
                .removeClass("back-col1")
                .removeClass("back-col2")
                .removeClass("back-col3")
                .removeClass("back-col4")
                .removeClass("back-col5")
                .removeClass("back-col6")
                .addClass("back-col0");
            queue = [];
        } else {
            if (tim <= 0) {
                setUpQueue(cal);
                //$(tar).callout(cal, dur);
                //$(this).tempClass(col, dur);
                $(this)
                    .removeClass("back-col0")
                    .removeClass("back-col1")
                    .removeClass("back-col2")
                    .removeClass("back-col3")
                    .removeClass("back-col4")
                    .removeClass("back-col5")
                    .removeClass("back-col6");
                $(this).tempClass(col, dur);
            } else {
                var i = tim;
                var that = "#" + $(this).attr("id");
                clearTimeout(timers["timer_" + tar]);
                $(tar + " div").empty();
                timer(i, tar, cal, that, tim);

                function timer(i, tar, cal, that, tim) {
                    uRate = 1.8;
                    if (i == tim) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col0");
                        $(that).addClass("back-col6");
                        setUpQueue(cal);
                    } else if (i > 10) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col0");
                        $(that).addClass("back-col6");
                    } else if (i >= 7) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col6");
                        $(that).addClass("back-col5");
                        setUpQueue(i);
                    } else if (i >= 5) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col5");
                        $(that).addClass("back-col4");
                        setUpQueue(i);
                    } else if (i >= 3) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col4");
                        $(that).addClass("back-col3");
                        setUpQueue(i);
                    } else if (i >= 2) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col3");
                        $(that).addClass("back-col2");
                        setUpQueue(i);
                    } else if (i > 0) {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        $(that).removeClass("back-col2");
                        $(that).addClass("back-col1");
                        setUpQueue(i);
                    } else if (i == 0) {
                        $(tar).html(cal);
                        setUpQueue("zero");
                        $(that).removeClass("back-col1");
                        $(that).addClass("back-col0");
                    } else {
                        $(tar).html("<div style='font-size: 15vh; position: absolute; top: 1.2rem; left: 1rem; line-height: 1em;'>" + i + "</div>");
                        setUpQueue(i);
                    }
                    if (i > 0) {
                        i--;
                        timers["timer_" + tar] = setTimeout(function() {
                            timer(i, tar, cal, that, tim);
                        }, 1000);
                    } else {
                        uRate = 1;
                    }
                }
            }
        }
    });
    $(".gridBTNText").on("click", function() {
        var target0 = "#" + $(this).data("tar");
        $(target0).trigger('click');
    });
    $(".gridInput").on("change", function() {
        var target0 = "#" + $(this).data("tar");
        var target1 = $(this).val();
        var targetV = symReplace(target1);
        $(target0).html(targetV);
    });
    $(".gridBTNToggle").on("click", function() {
        if (userLoggedIn) {
            // storing the ID of last clicked button and user which clicked it
            const btnId = $(this).attr("id");
            const enc1 = encounter;
            const {
                uid,
                displayName
            } = firebase.auth().currentUser;
            const lastClickedButton = {
                by: {
                    uid,
                    displayName
                },
                btnId,
                enc1
            };
            var btnDataR = firebase.database().ref().child("btnData");
            var specificSessionRef = btnDataR.child(session);
            if (!autoClickInProgress) {
                specificSessionRef.set(lastClickedButton, function(error) {
                    if (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        console.log(errorCode);
                        console.log(errorMessage);
                    }
                });
            } else {
                autoClickInProgress = false;
            }
        }
        var cal = $(this).data("cal");
        var col = $(this).data("col");
        if ($(this).hasClass(col)) {
            $(this).removeClass(col);
            $(this).addClass(back - col0);
        } else {
            $(this).removeClass(back - col0);
            $(this).addClass(col);
            setUpQueue(cal);
        }
    });
    $(".positionBTN").on("click", function() {
        if ($(this).attr("id") == lastClick && activeUser == currentUser) {
            $("#posReset0").trigger("click");
        } else {
            lastClick = $(this).attr("id");
            if (userLoggedIn) {
                // storing the ID of last clicked button and user which clicked it
                const btnId = $(this).attr("id");
                const enc1 = encounter;
                const {
                    uid,
                    displayName
                } = firebase.auth().currentUser;
                const lastClickedButton = {
                    by: {
                        uid,
                        displayName
                    },
                    btnId,
                    enc1
                };
                var btnDataR = firebase.database().ref().child("btnData");
                var specificSessionRef = btnDataR.child(session);
                if (!autoClickInProgress) {
                    specificSessionRef.set(lastClickedButton, function(error) {
                        if (error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;

                            console.log(errorCode);
                            console.log(errorMessage);
                        }
                    });
                } else {
                    autoClickInProgress = false;
                }
            }
            var array = $(this).data("acquired").split(","),
                target3 = array[0], // css
                target4 = array[1]; // original html
            if ($(this).hasClass(target3)) {
                $(this).removeClass(target3);
                $(this).html(target4);
            } else {
                if (sound != "mute") {
                    // unless sound is set to mute
                    setUpQueue(this); // pass this to function
                }
                $(this).addClass(target3);
                $(this).html(target4 + ": " + activeUser);
            }
        }
    });
    $(".positionBTNReset").on("click", function() {
        lastClick = $(this).attr("id");
        if (userLoggedIn) {
            // storing the ID of last clicked button and user which clicked it
            const btnId = $(this).attr("id");
            const enc1 = encounter;
            const {
                uid,
                displayName
            } = firebase.auth().currentUser;
            const lastClickedButton = {
                by: {
                    uid,
                    displayName
                },
                btnId,
                enc1
            };
            var btnDataR = firebase.database().ref().child("btnData");
            var specificSessionRef = btnDataR.child(session);
            if (!autoClickInProgress) {
                specificSessionRef.set(lastClickedButton, function(error) {
                    if (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        console.log(errorCode);
                        console.log(errorMessage);
                    }
                });
            } else {
                autoClickInProgress = false;
            }
        }
        $(".positionBTN").each(function() {
            var array = $(this).data("acquired").split(","),
                target3 = array[0], // css
                target4 = array[1]; // original html
            if ($(this).hasClass(target3)) {
                $(this).removeClass(target3);
                $(this).html(target4 + ": Reset by " + activeUser);
            }
        });
        lastClick = "posReset0";

    });
    $("#chatmsgSend").on("click", function(event) {
        user = firebase.auth().currentUser.displayName;
        mess = $("#chatmsg").val();
        var rootRef = firebase.database().ref().child("sessions");
        var usersRef = rootRef.child(session);
        chatData = {
            name: user,
            message: mess
        };
        usersRef.set(chatData, function(error) {
            if (error) {
                console.log(error);
            }
        });
        $("#chatmsg").val("");
        $("#chatmsg").focus();
        event.stopPropagation();
    });

    /***********************************Web Speech API*********************************************/

    const onChatUpdate = (snapshot) => {
        const json = snapshot.toJSON();
        console.log("onChatUpdate fired for session", session, "and data", json);
        var user = json.name,
            mess = json.message,
            chat =
            "<p><b style='color: var(--accent);'>" +
            user +
            "</b> <br/>" +
            mess +
            "<br/></p>";
        if (chat != $("#chatmsgs:last-child").val()) {
            $("#chatmsgs").append(chat);
            setUpQueue(mess);
            $("#chatmsgs").animate({
                    scrollTop: $("#chatmsgs").height() + 100000000
                },
                500
            );
        }
    };
    const handleChatError = (error) => {
        if (error) {
            console.log("The read failed: " + error.code);
        }
    };
    const unregisterChatSession = (sess) => {
        user = firebase.auth().currentUser.displayName;
        mess = "[Disconnected from " + sess + "]";
        chatRoom = "sessions/" + sess;
        var chatRef = firebase.database().ref().child(chatRoom);
        chatData = {
            name: user,
            message: mess
        };
        chatRef.set(chatData, function(error) {
            if (error) {
                console.log(error);
            }
        });
        console.log("unregistering", sess);
        firebase
            .database()
            .ref()
            .child("sessions")
            .child(sess)
            .off("value", onChatUpdate);
    };
    const registerChatSession = (sess) => {
        if (!userLoggedIn) return;
        user = firebase.auth().currentUser.displayName;
        mess = "[Connected to " + sess + "]";
        chatRoom = "sessions/" + sess;
        var chatRef = firebase.database().ref().child(chatRoom);
        chatData = {
            name: user,
            message: mess
        };
        chatRef.set(chatData, function(error) {
            if (error) {
                console.log(error);
            }
        });
        console.log("registering", sess);
        firebase
            .database()
            .ref()
            .child("sessions")
            .child(sess)
            .on("value", onChatUpdate, handleChatError);
    };
    const connectToSession = () => {
        if (chatListenerAddedId) unregisterChatSession(chatListenerAddedId);
        registerChatSession(session);
        userSettingsUpdate();
        chatListenerAddedId = session;
        $("#changeSession").attr("placeholder", session);
        $("#chatmsg").attr("placeholder", `Session ID: ${session}`);
        var uid = firebase.auth().currentUser.uid + "1";
        firebase.database().ref().child("inputData").child(session).update(uid);

    };

    registerChatSession(session);
    chatListenerAddedId = session;

    const userSettingsUpdate = () => {
        if (userLoggedIn) {
            var rootRef = firebase.database().ref().child("users");
            var userID = userLoggedIn.uid;
            var usersRef = rootRef.child(userID);
            var userData = {
                session,
                textSize,
                col,
                colBlind,
                sound,
                soundLang,
                pitchVal,
                volumeVal,
                uRate,
            }
            console.log("userSettingsUpdate fired for user", userLoggedIn.displayName, "and data", userData);
            usersRef.set(userData, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    };

    $("#selectTextSize").on("change", function() {
        textSize = $(this).val();
        $(':root').css("--textSize", textSize);
        userSettingsUpdate();
    });
    $("#selectCol").on("change", function() {
        col = $(this).val();
        switch (col) {
            case "dark":
                colDark();
                break;
            case "light":
                colLight();
                break;
            default:
                colDark();
                break;
        }
        userSettingsUpdate();
    });
    $("#selectColBlind").on("change", function() {
        colBlind = $(this).val();
        switch (colBlind) {
            case "polychromatic":
                colBlindA();
                break;
            case "deuteranopia":
                colBlindD();
                break;
            case "protanopia":
                colBlindP();
                break;
            case "tritanopia":
                colBlindT();
                break;
            case "monochromatic":
                colBlindM();
                break;
            default:
                colBlindA();
                break;
        }
        userSettingsUpdate();
    });
    $("#selectSound").on("change", function() {
        sound = $(this).val();
        userSettingsUpdate();
    });
    $("#selectSoundLang").on("change", function() {
        soundLang = $("#selectSoundLang").val();
        if (soundLang == "disabled") {
            $("#sttBoxes").addClass("hide");
            $("#sttLoca").addClass("hide");
            recognition.continuous = false;
            recognition.stop();
            recognizing = false;
            recognition.onend = function() {
                if (recognizing == false) {
                    recognition.stop();
                    $(".listen1").html('<i class="icon-listen"></i>');
                }
            };
        } else {
            $("#sttBoxes").removeClass("hide");
            $("#sttLoca").removeClass("hide");
            recognition.start();
            recognizing = true;
        }
    });
    if (!("webkitSpeechRecognition" in window)) {
        $(soundLoca).val("Browser does not support STT");
    } else {
        var recognition = new webkitSpeechRecognition();
        recognition.lang = soundLang;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onstart = function() {};
        recognition.onend = function() {
            recognition.start(); // remove this line to make button toggle but remove continuous listening for all devices.
            if (recognizing == false) {
                recognition.stop();
            }
        };
        recognition.onerror = function(event) {
            if (event.error == "no-audio") {
                recognition.start();
            }
            if (event.error == "audio-capture") {
                console.log("audio capture");
            }
            if (event.error == "not-allowed") {
                console.log("not allowed");
                $(soundLoca).val(
                    'Please "Allow" microphone access for Speech to Text'
                );
            }
        };
        recognition.onresult = function(event) {
            var interim_transcript = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript + " ";
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            $(soundLoca).val(final_transcript + interim_transcript).change();
        };
    }
    $("#selectSoundLoca").on("change", function() {
        soundLoca = $(this).val();
    });
    $("#pitchVal").on("change", function() {
        pitchVal = $(this).val();
        userSettingsUpdate();
    });
    $("#volumeVal").on("change", function() {
        volumeVal = $(this).val() / 100;
        userSettingsUpdate();
    });
    $("#uRate").on("change", function() {
        uRate = $(this).val();
        userSettingsUpdate();
    });

    /*************************************************************COLOR FUNCTIONS********************************************************************/

    function colDark() {
        col = "dark";
        $(':root').css("--bla", "#121212");
        $(':root').css("--onx", "#181818");
        $(':root').css("--cha", "#242424");
        $(':root').css("--gra", "#303030");
        $(':root').css("--whi", "#e1e1e1");
        userSettingsUpdate();
    }

    function colLight() {
        col = "light";
        $(':root').css("--bla", "#e1e1e1");
        $(':root').css("--onx", "#d1d1d1");
        $(':root').css("--cha", "#c1c1c1");
        $(':root').css("--gra", "#b1b1b1");
        $(':root').css("--whi", "#121212");
        userSettingsUpdate();
    }

    function colBlindA() {
        colBlind = "polychromatic";
        $(':root').css("--col1", "#ff0000");
        $(':root').css("--col2", "#bb5500");
        $(':root').css("--col3", "#999900");
        $(':root').css("--col4", "#007700");
        $(':root').css("--col5", "#000055");
        $(':root').css("--col6", "#330033");
        userSettingsUpdate();
    }

    function colBlindD() {
        colBlind = "deuteranopia";
        $(':root').css("--col1", "#CC2D35");
        $(':root').css("--col2", "#FF934F");
        $(':root').css("--col3", "#E1DAAE");
        $(':root').css("--col4", "#058ED9");
        $(':root').css("--col5", "#848FA2");
        $(':root').css("--col6", "#2D3142");
        userSettingsUpdate();
    }

    function colBlindP() {
        colBlind = "protanopia";
        $(':root').css("--col1", "#E5323B");
        $(':root').css("--col2", "#FFC857");
        $(':root').css("--col3", "#929084");
        $(':root').css("--col4", "#BDD9BF");
        $(':root').css("--col5", "#A997DF");
        $(':root').css("--col6", "#2E4052");
        userSettingsUpdate();
    }

    function colBlindT() {
        colBlind = "tritanopia";
        $(':root').css("--col1", "#FF4242");
        $(':root').css("--col2", "#E8F086");
        $(':root').css("--col3", "#6FDE6E");
        $(':root').css("--col4", "#A691AE");
        $(':root').css("--col5", "#235FA4");
        $(':root').css("--col6", "#0A284B");
        userSettingsUpdate();
    }

    function colBlindM() {
        colBlind = "monochromatic";
        $(':root').css("--col1", "#DDDDDD");
        $(':root').css("--col2", "#BBBBBB");
        $(':root').css("--col3", "#999999");
        $(':root').css("--col4", "#777777");
        $(':root').css("--col5", "#555555");
        $(':root').css("--col6", "#333333");
        userSettingsUpdate();
    }

    /*****************************************************quick callouts********************************************************************/

    $(".changeGame").on("change", function() {
        var selectedVal = $(this).find(":selected").val();
        $(".changeActivity option").each(function() {
            if ($(this).val() == "default" || $(this).val() == "gen") {
                $(this).removeClass("hide");
            } else {
                if ($(this).data("target") != selectedVal) {
                    $(this).addClass("hide");
                } else {
                    $(this).removeClass("hide");
                }
            }
        });
    });
    $(".changeActivity").on("change", function() {
        var selectedVal = $(this).find(":selected").val();
        $(".changeEncounter option").each(function() {
            if ($(this).val() == "default" || $(this).val() == "gen") {
                $(this).removeClass("hide");
            } else {
                if ($(this).data("target") != selectedVal) {
                    $(this).addClass("hide");
                } else {
                    $(this).removeClass("hide");
                }
            }
        });
    });
    $(".changeEncounter").on("change", function() {
        encounter = $(this).val();
        enc1 = encounter;
        lastClick = encounter;
        switch (encounter) {
            case "custom":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "default":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val(
                    "Hello, I am deaf and use Callouts Evolved to communicate"
                );
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col6");
                $("#experimentinputfd").val("6");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val(
                    "I use callouts evolved to -Help- with communication"
                );
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col6");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val(
                    "it provides text to speech callouts and speech to text"
                );
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val(
                    "Please adjust my volume by right clicking my name"
                );
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col6");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Thanks for the run!");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col6");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("My Mistake :(");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col6");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col6");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col6");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col6");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col6");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("#sadtrombone");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col6");
                $("#experimentinputed").val("3");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("I will be right back");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Thanks for waiting");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "gen":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val(
                    "Hello, I am deaf and use Callouts Evolved to communicate."
                );
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col6");
                $("#experimentinputfd").val("6");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val(
                    "I use callouts evolved to -Help- with communication"
                );
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col6");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val(
                    "it provides text to speech callouts and speech to text"
                );
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val(
                    "Please adjust my volume by right clicking my name"
                );
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col6");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Thanks for the run!");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col6");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("My Mistake :(");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col6");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col6");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col6");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col6");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col6");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("#sadtrombone");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col6");
                $("#experimentinputed").val("3");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("I will be right back");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Thanks for waiting");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "intro":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Welcome to Callouts Evolved!");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col1");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("Let's take a second to look around.");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("You'll notice that your screen has 16 sections");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("Each of the sections is a customizable button!");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Click Me!");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col1");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Type the letter or number to the left!");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("It has the same result as clicking the button!");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Now that you know how to send callouts;");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Let's look at how to customize them!");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("Scroll down just a little bit and you'll see 3 dropdowns");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val('For the "-Choose a Game-" pick tutorial');
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val('For the "-Choose an Activity-" pick Tutorials');
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("This third one is very important.");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val('For the "-Choose an Encounter-" pick "Callouts"');
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("You'll see all of these buttons update to new values.");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Go ahead and give it a shot!");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "callouts":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Great Job! You must be a gamer!");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("You just changed all the buttons using the dropdowns");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Those dropdowns are called game templates");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("Game templates quickly change all the buttons");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("After using a game template you can still change individual buttons");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Each button has 4 properties: callout, duration, countdown, and color.");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Callout is the text inside the button but can also be spoken via text to speech.");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Duration is how long the button stays lit up or active before going back to normal.");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Countdown is an actual seconds timer. Not for speedrunning, but very helpful.");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("The Color is the background color of the button while lit up or active.");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("Scroll down a tiny bit and try to change these options for #/ or K7");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("#/ refers to the forwardslash on the numberpad");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("K7 refers to the number 7 on the keyboard");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Typing either key will click the button");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Now, you know how to customize buttons");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Once you are ready, go to Tutorials, Tutorials, Audio Video User");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "avu":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Awesome! I hope you have a good understanding of the buttons");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("Now we are going to get into the side menu!");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Click the > symbol at the top right of your screen");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("This is the access panel for your chat room and settings.");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Click on the CHAT button to see the global chat room");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Now you will want to close the access panel to  read the next section.");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("When you are in a session with other users, opening the chat room will open the chat for everyone");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("To join a session with other players you will have to click on the USER button");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Here you can change 100% of your personal information and join a new Session ID.");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("We suggest picking a unique ID so that you will not have others accidentally join");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("Above the USER button you have AUDIO and VIDEO");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("AUDIO can provide text to speech and speech to text options");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("VIDEO can change the text size, colors, and mode.");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("You now know the basics for using CALLOUTS EVOLVED!");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Continue onto the last Tutorial for additional tips, and resources");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "tips":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Obviously, you have 16 callouts.");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("In a SOLO session that's more than you will likely need.");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("However, callouts quickly become limited when in a group.");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("One thing you can do is combine multiple timers");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("So, instead of doing a 20s timer to sync an approach");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("and then a 6 second timer for an attack");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("just do a 26s timer and indicate that the attack beginds at 6s.");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Sometimes though, nothing can replace the powers of deduction");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("The Eater of Worlds boss fight has 10 possible combinations on 6 possible sides for a total of 60 callouts");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("That's not going to work. Thankfully you can easily see 4/6 sides while preparing and the combination always moves to the left.");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("Try to set things up ahead of time!");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("Many players know the Right Force strat for morgeth, so extablishing that strat in the begining removes all left side callouts");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("As a final note, check our reddit page for more information, troubleshooting, and setup guides");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("I personally use Callouts Evolved in the SOLO sessions and mix everything via Virtual Audio Cables for $8");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("That being said, the cheapest way to use the site is to get one person on the team to sign into your session and relay callouts as needed.");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Best of Luck out there gamers!");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "spireandconfluxes":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Help- -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Help- -Middle-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col3");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("-Help- -Right-");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col1");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "destroytheoracles":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Left- 3");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col6");
                $("#experimentinput7d").val("10");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Right- 3");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col5");
                $("#experimentinput8d").val("10");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Left- 2");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col4");
                $("#experimentinput4d").val("10");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Right- 2");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col3");
                $("#experimentinput5d").val("10");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Left- 1");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col1");
                $("#experimentinput1d").val("10");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Right- 1");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col2");
                $("#experimentinput2d").val("10");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-Middle-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("10");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "killthetemplar":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("I will run relic and cover left teleport");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("I will run relic and solo both teleports");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val(
                    "I will run relic and cover right teleport"
                );
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Oracles -Right-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col5");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Remove Detained, then Damage");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("3");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Oracles -Left-");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "thegorgonslabyrinth":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-GroupUp-");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Damage-");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col2");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Hide-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col3");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Run-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Left-");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Right-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col5");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-Behind-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col5");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "awakentheglassthrone":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("-Left- Relic");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col6");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("-Right- Relic");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Open- -Left-");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Open- -Right-");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col2");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Solo -Left-");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col4");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Cleans -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col1");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Cleans -Right-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col2");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("Solo -Right-");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col4");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-Help- -Left-");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col5");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-Middle- Relic");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("-Help- -Right-");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col5");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "destroyatheon":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Open- -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Open- -Right-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("Cleans -Left-");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("Cleans -Right-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Go to middle, leave at 3 seconds");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("0");
                $("#experimentinputet").val("28");
                $("#experimentinput0v").val("Go to -Middle-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col3");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("1");
                $("#experimentinputdt").val("0");
                break;
            case "thehellmouth":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Lantern Exploding in");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col1");
                $("#experimentinputad").val("0");
                $("#experimentinputat").val("9");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Run");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-GroupUp-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col2");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "oversoulthrone":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("-Help- Exit -Left-");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col5");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("-Help- Exit -Center-");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col3");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("-Help- Exit -Right-");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col1");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Help- Entrance -Left-");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col5");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Help- Entrance -Center-");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col3");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("-Help- Entrance -Right-");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col1");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("4 crossing");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col4");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("5 crossing");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("6 crossing");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col4");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("1 crossing");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col4");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("2 crossing, 3 and 4 to -center-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col2");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("3 crossing");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col4");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Entrance gets off plate, Exit get on");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col2");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Swordbearer is Dead");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Swordbearer is still alive");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col1");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "entercrotasthrone":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Left- Hall");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Right- Hall");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Left- Tower");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Right- Tower");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("2 Minutes");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("120");
                $("#experimentinput0v").val("-Middle-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val(
                    "I will kill Ir Yut with Swordbearer's sword"
                );
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col1");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "defeatcrota":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Pass the -Challice-");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Down Crota In");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("4");
                $("#experimentinput0v").val("Oversoul");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col2");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "entertheascendentplane":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Open- -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Open- -Right-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Help- -Left-");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Help- -Right-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-Help- -Middle-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "annihilatortotems":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Swap -Left- in 10");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Swap -Right- in 10");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("Grab -Orb- -Left-");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("Grab -Orb- -Right-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "defeatthewarpriest":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Right- Plate");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col1");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Middle- Plate");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col3");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-Left- Plate");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col5");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("-Hide- NOW");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Hide In");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("8");
                $("#experimentinputdv").val("-Swap-");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "defeatgolgoroth":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Run");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col1");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("4 has Gaze");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col4");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("18");
                $("#experimentinput5v").val("5 has Gaze");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col5");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("18");
                $("#experimentinput6v").val("6 has Gaze");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("18");
                $("#experimentinput1v").val("1 has Gaze");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col1");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("18");
                $("#experimentinput2v").val("2 has Gaze");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col2");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("18");
                $("#experimentinput3v").val("3 has Gaze");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col3");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("18");
                $("#experimentinputev").val("-Damage-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Drop the -Orb-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col5");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val(
                    "I will solo orb, get 1st gaze, and tether"
                );
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col1");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "daughtersoforyx":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col0");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("1 is on");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col2");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("2 is on");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col3");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("3 is on");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col4");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("I have the relic, go to -Middle-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "oyrxthetakenking":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("-Knight- 4");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col4");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Knight- 1");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col1");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Knight- 2");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col2");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("-Knight- 3");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col3");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("1 is on");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col2");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("2 is on");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col3");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("3 is on");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col4");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("I have the relic, go to -Middle-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Step in bombs at 6, return at 0");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("20");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "outbreakprime":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Columns -Left-");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col5");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("Rows -Right-");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("0001 Row 1");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col1");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("0000 Column 0");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col5");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("0001 Column 1");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col5");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("0000 Row 0");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col1");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("0011 Row 3");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col1");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("0010 Column 2");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("0011 Column 3");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col5");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("0010 Row 2");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col1");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("0100 Column 4");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("0101 Column 5");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col5");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("0100 Row 4");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col1");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("0101 Row 5");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "defeatvosik":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("-Monitor- -Left-");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col5");
                $("#experimentinputfd").val("3");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("-Monitor- -Middle-");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col3");
                $("#experimentinputpd").val("3");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("-Monitor- -Right-");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col1");
                $("#experimentinputmd").val("3");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("Pick Up -Bombs-");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Throw in");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col1");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("4");
                $("#experimentinput9v").val("-Left-");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("-Run-");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-FrontLeft- Room");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-FrontRight- Room");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("-Middle-");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-BackLeft- Room");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-BackRight- Room");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-Right-");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col6");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Defend");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col6");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-Front-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("-Back-");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "aksis":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Cannon -Empowered- -Left-");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col5");
                $("#experimentinputfd").val("10");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("Cannon -Empowered- -Middle-");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col3");
                $("#experimentinputpd").val("10");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Cannon -Empowered- -Right-");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col1");
                $("#experimentinputmd").val("10");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Void- -Left-");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col5");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Void- -Middle-");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col3");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("-Void- -Right-");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col1");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-scorch- -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-scorch- -Middle-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col3");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("-scorch- -Right-");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col1");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-arc- -Left-");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-arc- -Middle-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col3");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-arc- -Right-");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col1");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Bomb -Empowered- -Right-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("10");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Bomb -Empowered- -Left-");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col5");
                $("#experimentinput0d").val("10");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Bomb -Empowered- -Middle-");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col3");
                $("#experimentinputdd").val("10");
                $("#experimentinputdt").val("0");
                break;
            case "castellum":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("cup");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("sun");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col2");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("counselor");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("axe");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col3");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("dog");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "gauntlet":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("cup");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("sun");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col2");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("top");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col5");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("counselor");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("axe");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col3");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("dog");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("middle");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col3");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("bottom");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col1");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "pleasuregardens":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("right 1");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col6");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("left 1");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("damage for 30 seconds");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col1");
                $("#experimentinputad").val("0");
                $("#experimentinputat").val("30");
                $("#experimentinput4v").val("right 2");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col6");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("left 2");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("right 3");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col6");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("left 3");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col6");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("kill beast handlers");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("rocks");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("trees");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "royalpools":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("axe top left");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("cup top right");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col0");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("sun middle");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col6");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("dog bottom left");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("spears bottom right");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("go to middle");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "throne":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("cup");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col1");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("sun");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col2");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("break sheild in 20 seconds");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("0");
                $("#experimentinputat").val("20");
                $("#experimentinput4v").val("axe");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col3");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("dog");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "kaliandshurochi":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Plate");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-No- Infinity Snake");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col6");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-No- 8 Snake");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col6");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Doors by Roster");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col1");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Wait");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col3");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-No- Cloud Snake");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col6");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-No- Split Snake");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col6");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("1");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col1");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("2");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col2");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("3");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col3");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("-Ready-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col2");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Swap");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("4");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col4");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "morgeth":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Thank you");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col1");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Trapped -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col1");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("15");
                $("#experimentinput5v").val("-Damage-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("Trapped -Right-");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col1");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("15");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val(
                    "Sword strat, 1st set -Right- and 2nd cleans"
                );
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val(
                    "Don't kill ogres for challenge, use whisper on bridge"
                );
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col1");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "vault":
                $("#lwicons").removeClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Tree- Pen");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col5");
                $("#experimentinput7d").val("180");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Tree- Ant");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col1");
                $("#experimentinput8d").val("180");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("-Knight- on -Tree-");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col3");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Stairs- Pen");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("180");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Stairs- Ant");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("180");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("-Knight- on -Stairs-");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col3");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Rock- Pen");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("180");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Rock- Ant");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("180");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-Knight- on -Rock-");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col3");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "riven":
                $("#lwicons").removeClass("hide");
                $("#experimentinputfv").val("-Left-");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col6");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("-Right-");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col6");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("-Front-");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Left- 1");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col5");
                $("#experimentinput7d").val("60");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Left- 2");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col5");
                $("#experimentinput8d").val("60");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("-Left- 3");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col5");
                $("#experimentinput9d").val("60");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("-Back-");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Left- 4");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("60");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Left- 5");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col5");
                $("#experimentinput5d").val("60");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Right- 1");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col1");
                $("#experimentinput1d").val("60");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Right- 2");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("60");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-Right- 3");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col1");
                $("#experimentinput3d").val("60");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Go");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("-Right- 4");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("60");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("-Right- 5");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col1");
                $("#experimentinputdd").val("60");
                $("#experimentinputdt").val("0");
                break;
            case "queenswalk":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Right-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col0");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col0");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("18");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col1");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("18");
                $("#experimentinput0v").val("15");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col1");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("15");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "embrace":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col0");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col0");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col0");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("1st pick, skipping to second encounter");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col1");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("4");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col4");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("5");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col5");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("6");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("1");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col1");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("2");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col2");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("3");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col3");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Stay");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col6");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Go");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("pick up for challenge");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "undergrowth":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("-Buff- 1");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col2");
                $("#experimentinputfd").val("5");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("-Angelics- 1");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col1");
                $("#experimentinputpd").val("5");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("-Ready- 1");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("10");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("-Buff- 2");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col2");
                $("#experimentinput7d").val("5");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("-Angelics- 2");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col1");
                $("#experimentinput8d").val("5");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("-Ready- 2");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("10");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Buff- 3");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col2");
                $("#experimentinput4d").val("5");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Angelics- 3");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("5");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("-Ready- 3");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col6");
                $("#experimentinput6d").val("10");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Buff- 4");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col2");
                $("#experimentinput1d").val("5");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Angelics- 4");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("5");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("-Ready- 4");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col6");
                $("#experimentinput3d").val("10");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "consecratedmind":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Bank -northwest- Hedges");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col6");
                $("#experimentinputfd").val("180");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("Bank -northeast- alcove");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col6");
                $("#experimentinputpd").val("180");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Bank -southwest- thicket");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("180");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("Minotaur -northwest- Hedges");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col4");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Boss North");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col3");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Minotaur -northeast- alcove");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col4");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Bank -southeast- underbrush");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col4");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Boss West");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col3");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Damage");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col2");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("Boss East");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col3");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("Minotaur -southwest- thicket");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col4");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("Boss South");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col3");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("Minotaur -southeast- underbrush");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col4");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Minotaur -Middle-");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col6");
                $("#experimentinputed").val("180");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Inner");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col5");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Outer");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col1");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "sanctifiedmind":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("Team 1");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col6");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("Team 2");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col6");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Build");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col6");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col0");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col0");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col0");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col0");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("-Pull- -Left-");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col5");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("-Pull- -Right-");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col1");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col0");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("-Build- -Left-");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col5");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("-Build- -Right-");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col1");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col0");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col0");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col0");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col0");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
            case "d2pvp":
                $("#lwicons").addClass("hide");
                $("#experimentinputfv").val("high");
                $("#experimentBTNfText").html(`${$("#experimentinputfv").val()}`);
                $("#experimentinputfc").val("back-col4");
                $("#experimentinputfd").val("2");
                $("#experimentinputft").val("0");
                $("#experimentinputpv").val("low");
                $("#experimentBTNpText").html(`${$("#experimentinputpv").val()}`);
                $("#experimentinputpc").val("back-col4");
                $("#experimentinputpd").val("2");
                $("#experimentinputpt").val("0");
                $("#experimentinputmv").val("Super");
                $("#experimentBTNmText").html(`${$("#experimentinputmv").val()}`);
                $("#experimentinputmc").val("back-col1");
                $("#experimentinputmd").val("2");
                $("#experimentinputmt").val("0");
                $("#experimentinput7v").val("grouping");
                $("#experimentBTN7Text").html(`${$("#experimentinput7v").val()}`);
                $("#experimentinput7c").val("back-col6");
                $("#experimentinput7d").val("2");
                $("#experimentinput7t").val("0");
                $("#experimentinput8v").val("Camping");
                $("#experimentBTN8Text").html(`${$("#experimentinput8v").val()}`);
                $("#experimentinput8c").val("back-col6");
                $("#experimentinput8d").val("2");
                $("#experimentinput8t").val("0");
                $("#experimentinput9v").val("Pushing");
                $("#experimentBTN9Text").html(`${$("#experimentinput9v").val()}`);
                $("#experimentinput9c").val("back-col6");
                $("#experimentinput9d").val("2");
                $("#experimentinput9t").val("0");
                $("#experimentinputav").val("Bailing");
                $("#experimentBTNaText").html(`${$("#experimentinputav").val()}`);
                $("#experimentinputac").val("back-col6");
                $("#experimentinputad").val("2");
                $("#experimentinputat").val("0");
                $("#experimentinput4v").val("Zone A");
                $("#experimentBTN4Text").html(`${$("#experimentinput4v").val()}`);
                $("#experimentinput4c").val("back-col4");
                $("#experimentinput4d").val("2");
                $("#experimentinput4t").val("0");
                $("#experimentinput5v").val("Zone B");
                $("#experimentBTN5Text").html(`${$("#experimentinput5v").val()}`);
                $("#experimentinput5c").val("back-col4");
                $("#experimentinput5d").val("2");
                $("#experimentinput5t").val("0");
                $("#experimentinput6v").val("Zone C");
                $("#experimentBTN6Text").html(`${$("#experimentinput6v").val()}`);
                $("#experimentinput6c").val("back-col4");
                $("#experimentinput6d").val("2");
                $("#experimentinput6t").val("0");
                $("#experimentinput1v").val("1");
                $("#experimentBTN1Text").html(`${$("#experimentinput1v").val()}`);
                $("#experimentinput1c").val("back-col4");
                $("#experimentinput1d").val("2");
                $("#experimentinput1t").val("0");
                $("#experimentinput2v").val("2");
                $("#experimentBTN2Text").html(`${$("#experimentinput2v").val()}`);
                $("#experimentinput2c").val("back-col4");
                $("#experimentinput2d").val("2");
                $("#experimentinput2t").val("0");
                $("#experimentinput3v").val("3");
                $("#experimentBTN3Text").html(`${$("#experimentinput3v").val()}`);
                $("#experimentinput3c").val("back-col4");
                $("#experimentinput3d").val("2");
                $("#experimentinput3t").val("0");
                $("#experimentinputev").val("Sniping");
                $("#experimentBTNe").html(`${$("#experimentinputev").val()}`);
                $("#experimentinputec").val("back-col6");
                $("#experimentinputed").val("2");
                $("#experimentinputet").val("0");
                $("#experimentinput0v").val("Shotty");
                $("#experimentBTN0Text").html(`${$("#experimentinput0v").val()}`);
                $("#experimentinput0c").val("back-col6");
                $("#experimentinput0d").val("2");
                $("#experimentinput0t").val("0");
                $("#experimentinputdv").val("Heavy");
                $("#experimentBTNdText").html(`${$("#experimentinputdv").val()}`);
                $("#experimentinputdc").val("back-col6");
                $("#experimentinputdd").val("2");
                $("#experimentinputdt").val("0");
                break;
        }
    });

    /*****************************************************Account********************************************************************/
    $("#updateSettings").on("click", function() {
        var name = $("#changeName").val();
        var vali = name.indexOf("©");
        var email = $("#changeEmail").val();
        var pass = $("#changePassword").val();
        var changeSession = $("#changeSession").val();
        var errors = "";
        if (vali < 0) {
            if (name != undefined && name != "") {
                var n = $("#changeName").val();
                firebase
                    .auth()
                    .currentUser.updateProfile({
                        displayName: n
                    })
                    .then(function() {
                        $("#changeName").val("");
                        $("#changeName").attr("placeholder", n);
                        $(".ermsg").text("Success!");
                    })
                    .catch(function(error) {
                        console.log(error);
                        if (error.code == "auth/weak-password") {
                            $(".ermsg").text("This password is too weak.");
                        }
                        if (error.code == "auth/requires-recent-login") {
                            $(".ermsg").text("Security requires that you log in again.");
                        }
                    });
            }
        } else {
            $(".ermsg").text("Sorry, that symbol is for verified personel");
        }
        if (email != undefined && email != "") {
            var o = $("#changeEmail").val();
            firebase
                .auth()
                .currentUser.updateEmail(o)
                .then(function() {
                    $("#changeEmail").val("");
                    $("#changeEmail").attr("placeholder", o);
                    $(".ermsg").text("Success!");
                })
                .catch(function(error) {
                    $(".ermsg").text("An unknown error occured.");
                });
        }
        if (pass != undefined && pass != "") {
            var p = $("#changePassword").val();
            firebase
                .auth()
                .currentUser.updatePassword(p)
                .then(function() {
                    $("#changePassword").val("");
                    $("#changePassword").attr("placeholder", "Password Changed!");
                    $(".ermsg").text("Success!");
                })
                .catch(function(error) {
                    console.log(error);
                    if (error.code == "auth/weak-password") {
                        $(".ermsg").text("This password is too weak.");
                    }
                    if (error.code == "auth/requires-recent-login") {
                        $(".ermsg").text("Security requires you to log in again.");
                    }
                });
        }
        if (changeSession != "" && changeSession != undefined) {
            switch (session) {
                case "SOLO":
                    session = $("#changeSession").val();
                    $(".ermsg").text("Success!");
                    autoClickInProgress = false;
                    connectToSession();
                    break;
                default:
                    /*
                    var msg = "[DISCONNECTED]";
                    $("#chatmsg").val(msg);
                    $("#chatmsgSend").trigger('click');*/
                    autoClickInProgress = true;
                    session = $("#changeSession").val();
                    $(".ermsg").text("Success!");
                    connectToSession();
            }
        }
    });
    $("#deleteUser").on("click", function() {
        var user = firebase.auth().currentUser;
        user
            .delete()
            .then(function() {
                handleLogout();
                // User deleted.
            })
            .catch(function(error) {
                console.log(error);
                $(".ermsg").text(error);
            });
    });
    $("#resetButton").click(function() {
        var email = $("#resetEmail").val();
        var auth = firebase.auth();
        auth
            .sendPasswordResetEmail(email)
            .then(function() {
                $(".ermsg").html("Email sent for password reset.<br/><br/>");
            })
            .catch(function(error) {
                console.log(error);
                if (error.code == "auth/user-not-found") {
                    $(".ermsg").html(
                        "Your account does not exist. Please Sign Up<br/><br/>"
                    );
                }
            });
    });
    $("#signoutBTN").click(function(event) {
        switch (session) {
            case "SOLO":
                firebase
                    .auth()
                    .signOut()
                    .then(
                        function() {
                            handleLogout();
                        },
                        function(error) {
                            console.error("Sign Out Error", error);
                        }
                    );
                event.preventDefault();
                break;
            default:
                var msg = "[SIGNED OUT]";
                $("#chatmsg").val(msg);
                $("#chatmsgSend").trigger("click");
                var i = setTimeout(function() {
                    firebase
                        .auth()
                        .signOut()
                        .then(
                            function() {
                                handleLogout();
                            },
                            function(error) {
                                console.error("Sign Out Error", error);
                            }
                        );
                }, 1000);
                break;
        }
    });
    $("#signinBTN").click(function() {
        var email = $("#signinEmail").val();
        var pass = $("#signinPassword").val();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
                if (error.code == "auth/wrong-password") {
                    return $(".ermsg").html("Wrong Password");
                }
                if (error.code == "auth/user-not-found") {
                    return $(".ermsg").html("Wrong Email, Please sign up instead!");
                }
                if (error.code == "auth/invalid-email") {
                    $(".ermsg").html("Invalid Email");
                }
            });
    });

    let signupBTN = document.querySelector("#signupBTN");
    let timerID;
    let counter = 0;
    let signupBTNDuration = 50;

    signupBTN.addEventListener("mousedown", signupBTNDown, false);
    signupBTN.addEventListener("mouseup", signupBTNUp, false);
    signupBTN.addEventListener("mouseleave", signupBTNUp, false);
    signupBTN.addEventListener("touchstart", signupBTNDown, false);
    signupBTN.addEventListener("touchend", signupBTNUp, false);

    function signupBTNDown(e) {
        requestAnimationFrame(timer);
    }

    function signupBTNUp(e) {
        cancelAnimationFrame(timerID);
        counter = 0;
        $("#signupBTN").text("HOLD TO SIGN UP");
    }

    function timer() {
        if (counter < signupBTNDuration) {
            timerID = requestAnimationFrame(timer);
            counter++;
            $("#signupBTN").text(
                "HOLDING: " + counter * 2 + "/" + signupBTNDuration * 2
            );
        } else {
            // sign up
            email = $("#signupEmail").val();
            pass = $("#signupPassword").val();
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then((res) => {
                    var user = firebase.auth().currentUser;
                    var name = "Anonymous";
                    var email = $("#signupEmail").val();
                    var pass = $("#signupPassword").val();
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(email, pass)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.code == "auth/wrong-password") {
                                return $(".ermsg").html("Wrong Password");
                            }
                            if (error.code == "auth/user-not-found") {
                                return $(".ermsg").html("Wrong Email, Please sign up instead!");
                            }
                            if (error.code == "auth/invalid-email") {
                                $(".ermsg").html("Invalid Email");
                            }
                        });
                    user.updateProfile({
                        displayName: name
                    });
                })
                .catch((error) => {
                    console.log(error);
                    if (error.code == "auth/email-already-in-use") {
                        $(".ermsg").html("This account has been created. Please Login.");
                    }
                    if (error.code == "auth/invalid-email") {
                        $(".ermsg").html(
                            "Invalid Email: Only .com, .net, and .edu emails are accepted."
                        );
                    }
                });
        }
    }

    const handleUserSettings = () => {
        $("#pitchVal").val(pitchVal).change();
        $("#volumeVal").val(volumeVal * 100).change();
        $("#uRate").val(uRate).change();
        $("#chooseEncounter").val(encounter).change();
        $("#selectColBlind").val(colBlind).change();
        $("#selectCol").val(col).change();
        // $("#selectSoundLang").val(soundLang).change();
        $("#selectSound").val(sound).change();
        $(':root').css("--textSize", textSize);
        $("#changeName").attr("placeholder", firebase.auth().currentUser.displayName);
        $("#changeName").val(firebase.auth().currentUser.displayName);
        $("#changeEmail").attr("placeholder", firebase.auth().currentUser.email);
        $("#changeEmail").val(firebase.auth().currentUser.email);
        $("#changeSession").attr("placeholder", session);
        $("#changeSession").val(session);
        console.log(firebase.auth().currentUser.displayName + " " + firebase.auth().currentUser.email + " " + session)
        $("#updateSettings").trigger("click");
    };
    const handleLogout = () => {
        userLoggedIn = null;
        $("#selectMenu").addClass("hidden");
        $("#index").removeClass("hide");
        $("#login").removeClass("hide");
        $("#coms").addClass("hide");
        $("#user").addClass("hide");
        $("#chat").addClass("hide");
        $(".ermsg").html("");
    };
    const handleLoggedIn = (user) => {
        var userID = user.uid;
        $("#changeName").attr("placeholder", firebase.auth().currentUser.displayName);
        $("#changeEmail").attr("placeholder", firebase.auth().currentUser.email);
        $("#selectMenu").addClass("hidden");
        $("#index").addClass("hide");
        $("#login").addClass("hide");
        $("#coms").removeClass("hide");
        $("#user").removeClass("hide");
        $("#chat").removeClass("hide");
        $(".ermsg").html("");
        activeUser = user.providerData[0].displayName;
        currentUser = user.providerData[0].displayName;
        firebase
            .database()
            .ref("users/" + userID)
            .once("value")
            .then(function(snapshot) {
                console.log("loggedIn", snapshot, snapshot.toJSON());
                const data = snapshot.toJSON();
                session = data.session || "SOLO";
                textSize = data.textSize || "16px";
                col = data.col || "dark";
                colBlind = data.colBlind || "polychromatic";
                sound = data.sound || "mute";
                soundLang = "disabled"; // data.soundLang || "disabled";
                pitchVal = data.pitchVal || 1;
                volumeVal = data.volumeVal || 1;
                uRate = data.uRate || 1;
                userSession = data.session || null;
                handleUserSettings();
            });
    };
    const handleAuthStateChanged = (user) => {
        if (user) {
            userLoggedIn = user;
            // User is signed in.
            handleLoggedIn(user);
        } else {
            // No user is signed in.
            handleLogout();
        }
    };

    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(handleAuthStateChanged);

    /******************************************FIREBASE DATABASE*****************************************************/

    const btnDataRef = firebase.database().ref().child("btnData");
    btnDataRef.on("value", (snapshot) => {
        btnDataJ = snapshot.toJSON();
        console.log(btnDataJ);
        const btnData = btnDataJ[session];
        const btnId = btnData ? btnData.btnId : null;
        const enc1 = btnData ? btnData.enc1 : null;
        const userObject = btnId ? btnData.by : null;
        const cid = userObject ? userObject.uid : null;
        const uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
        activeUser = userObject ? userObject.displayName : null;
        if (session.toLowerCase == "solo") {
            console.log("Session ID: SOLO, ignoring change");
        } else {
            if (cid != uid) {
                if (encounter != enc1 && encounter != lastClick) {
                    console.log("Encounter: " + enc1);
                    $("#changeEncounter").val(enc1).change();
                } else if (btnId != lastClick) {
                    console.log("BTN: " + btnId);
                    // some other user clicked a button, I should also do it
                    syncClicks(btnId);
                }
            } else {
                console.log("Same User, ignoring change");
            }
        }
    });

    const outputDataRef = firebase.database().ref().child("outputData");
    outputDataRef.on("value", (snapshot) => {
        outputDataJ = snapshot.toJSON();
        console.log(outputDataJ);
        const outputData = outputDataJ[session];
        const outputDataObj1 = outputData ? outputData.output1 : null;
        const outputData1 = outputDataObj1 ? outputDataObj1.value : null;
        const uid1 = outputDataObj1 ? outputDataObj1.uid : null;
        const outputDataObj2 = outputData ? outputData.output2 : null;
        const outputData2 = outputDataObj2 ? outputDataObj2.value : null;
        const uid2 = outputDataObj2 ? outputDataObj2.uid : null;
        const outputDataObj3 = outputData ? outputData.output3 : null;
        const outputData3 = outputDataObj3 ? outputDataObj3.value : null;
        const uid3 = outputDataObj3 ? outputDataObj3.uid : null;
        const outputDataObj4 = outputData ? outputData.output4 : null;
        const outputData4 = outputDataObj4 ? outputDataObj4.value : null;
        const uid4 = outputDataObj4 ? outputDataObj4.uid : null;
        const outputDataObj5 = outputData ? outputData.output5 : null;
        const outputData5 = outputDataObj5 ? outputDataObj5.value : null;
        const uid5 = outputDataObj5 ? outputDataObj5.uid : null;
        const outputDataObj6 = outputData ? outputData.output6 : null;
        const outputData6 = outputDataObj6 ? outputDataObj6.value : null;
        const uid6 = outputDataObj6 ? outputDataObj6.uid : null;
        const cid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
        if (session.toLowerCase == "solo") {
            console.log("Session ID: SOLO, ignoring change");
        } else {
            if (cid != uid1) {
                $("#output1").val(outputData1).change();
                console.log(outputData1);
            } else {
                console.log("Same User, ignoring change");
            }
            if (cid != uid2) {
                $("#output2").val(outputData2).change();
                console.log(outputData2);
            } else {
                console.log("Same User, ignoring change");
            }
            if (cid != uid3) {
                $("#output3").val(outputData3).change();
                console.log(outputData3);
            } else {
                console.log("Same User, ignoring change");
            }
            if (cid != uid4) {
                $("#output4").val(outputData4).change();
                console.log(outputData4);
            } else {
                console.log("Same User, ignoring change");
            }
            if (cid != uid5) {
                $("#output5").val(outputData5).change();
                console.log(outputData5);
            } else {
                console.log("Same User, ignoring change");
            }
            if (cid != uid6) {
                $("#output6").val(outputData6).change();
                console.log(outputData6);
            } else {
                console.log("Same User, ignoring change");
            }
        }
    });

    const inputDataRef = firebase.database().ref().child("inputData");
    inputDataRef.on("value", (snapshot) => {
        inputDataJ = snapshot.toJSON();
        console.log(inputDataJ);
        const inputData = inputDataJ[session];
        const ifv = inputData ? inputData.ifv : null;
        const ifd = inputData ? inputData.ifd : null;
        const ift = inputData ? inputData.ift : null;
        const ifc = inputData ? inputData.ifc : null;
        const ipv = inputData ? inputData.ipv : null;
        const ipd = inputData ? inputData.ipd : null;
        const ipt = inputData ? inputData.ipt : null;
        const ipc = inputData ? inputData.ipc : null;
        const imv = inputData ? inputData.imv : null;
        const imd = inputData ? inputData.imd : null;
        const imt = inputData ? inputData.imt : null;
        const imc = inputData ? inputData.imc : null;
        const i7v = inputData ? inputData.i7v : null;
        const i7d = inputData ? inputData.i7d : null;
        const i7t = inputData ? inputData.i7t : null;
        const i7c = inputData ? inputData.i7c : null;
        const i8v = inputData ? inputData.i8v : null;
        const i8d = inputData ? inputData.i8d : null;
        const i8t = inputData ? inputData.i8t : null;
        const i8c = inputData ? inputData.i8c : null;
        const i9v = inputData ? inputData.i9v : null;
        const i9d = inputData ? inputData.i9d : null;
        const i9t = inputData ? inputData.i9t : null;
        const i9c = inputData ? inputData.i9c : null;
        const iav = inputData ? inputData.iav : null;
        const iad = inputData ? inputData.iad : null;
        const iat = inputData ? inputData.iat : null;
        const iac = inputData ? inputData.iac : null;
        const i4v = inputData ? inputData.i4v : null;
        const i4d = inputData ? inputData.i4d : null;
        const i4t = inputData ? inputData.i4t : null;
        const i4c = inputData ? inputData.i4c : null;
        const i5v = inputData ? inputData.i5v : null;
        const i5d = inputData ? inputData.i5d : null;
        const i5t = inputData ? inputData.i5t : null;
        const i5c = inputData ? inputData.i5c : null;
        const i6v = inputData ? inputData.i6v : null;
        const i6d = inputData ? inputData.i6d : null;
        const i6t = inputData ? inputData.i6t : null;
        const i6c = inputData ? inputData.i6c : null;
        const i1v = inputData ? inputData.i1v : null;
        const i1d = inputData ? inputData.i1d : null;
        const i1t = inputData ? inputData.i1t : null;
        const i1c = inputData ? inputData.i1c : null;
        const i2v = inputData ? inputData.i2v : null;
        const i2d = inputData ? inputData.i2d : null;
        const i2t = inputData ? inputData.i2t : null;
        const i2c = inputData ? inputData.i2c : null;
        const i3v = inputData ? inputData.i3v : null;
        const i3d = inputData ? inputData.i3d : null;
        const i3t = inputData ? inputData.i3t : null;
        const i3c = inputData ? inputData.i3c : null;
        const iev = inputData ? inputData.iev : null;
        const ied = inputData ? inputData.ied : null;
        const iet = inputData ? inputData.iet : null;
        const iec = inputData ? inputData.iec : null;
        const i0v = inputData ? inputData.i0v : null;
        const i0d = inputData ? inputData.i0d : null;
        const i0t = inputData ? inputData.i0t : null;
        const i0c = inputData ? inputData.i0c : null;
        const idv = inputData ? inputData.idv : null;
        const idd = inputData ? inputData.idd : null;
        const idt = inputData ? inputData.idt : null;
        const idc = inputData ? inputData.idc : null;
        const uid = inputData ? inputData.uid : null;
        const cid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
        if (session.toLowerCase == "solo") {
            console.log("Session ID: SOLO, ignoring change");
        } else {
            if (cid != uid) {
                $("#experimentinputfv").val(ifv).change();
                $("#experimentinputfd").val(ifd).change();
                $("#experimentinputft").val(ift).change();
                $("#experimentinputfc").val(ifc).change();
                $("#experimentinputpv").val(ipv).change();
                $("#experimentinputpd").val(ipd).change();
                $("#experimentinputpt").val(ipt).change();
                $("#experimentinputpc").val(ipc).change();
                $("#experimentinputmv").val(imv).change();
                $("#experimentinputmd").val(imd).change();
                $("#experimentinputmt").val(imt).change();
                $("#experimentinputmc").val(imc).change();
                $("#experimentinput7v").val(i7v).change();
                $("#experimentinput7d").val(i7d).change();
                $("#experimentinput7t").val(i7t).change();
                $("#experimentinput7c").val(i7c).change();
                $("#experimentinput8v").val(i8v).change();
                $("#experimentinput8d").val(i8d).change();
                $("#experimentinput8t").val(i8t).change();
                $("#experimentinput8c").val(i8c).change();
                $("#experimentinput9v").val(i9v).change();
                $("#experimentinput9d").val(i9d).change();
                $("#experimentinput9t").val(i9t).change();
                $("#experimentinput9c").val(i9c).change();
                $("#experimentinputav").val(iav).change();
                $("#experimentinputad").val(iad).change();
                $("#experimentinputat").val(iat).change();
                $("#experimentinputac").val(iac).change();
                $("#experimentinput4v").val(i4v).change();
                $("#experimentinput4d").val(i4d).change();
                $("#experimentinput4t").val(i4t).change();
                $("#experimentinput4c").val(i4c).change();
                $("#experimentinput5v").val(i5v).change();
                $("#experimentinput5d").val(i5d).change();
                $("#experimentinput5t").val(i5t).change();
                $("#experimentinput5c").val(i5c).change();
                $("#experimentinput6v").val(i6v).change();
                $("#experimentinput6d").val(i6d).change();
                $("#experimentinput6t").val(i6t).change();
                $("#experimentinput6c").val(i6c).change();
                $("#experimentinput1v").val(i1v).change();
                $("#experimentinput1d").val(i1d).change();
                $("#experimentinput1t").val(i1t).change();
                $("#experimentinput1c").val(i1c).change();
                $("#experimentinput2v").val(i2v).change();
                $("#experimentinput2d").val(i2d).change();
                $("#experimentinput2t").val(i2t).change();
                $("#experimentinput2c").val(i2c).change();
                $("#experimentinput3v").val(i3v).change();
                $("#experimentinput3d").val(i3d).change();
                $("#experimentinput3t").val(i3t).change();
                $("#experimentinput3c").val(i3c).change();
                $("#experimentinputev").val(iev).change();
                $("#experimentinputed").val(ied).change();
                $("#experimentinputet").val(iet).change();
                $("#experimentinputec").val(iec).change();
                $("#experimentinput0v").val(i0v).change();
                $("#experimentinput0d").val(i0d).change();
                $("#experimentinput0t").val(i0t).change();
                $("#experimentinput0c").val(i0c).change();
                $("#experimentinputdv").val(idv).change();
                $("#experimentinputdd").val(idd).change();
                $("#experimentinputdt").val(idt).change();
                $("#experimentinputdc").val(idc).change();
            } else {
                console.log("Same User, ignoring change");
            }
        }
    });

    $(".syncBTN").on("click", function() {
        if (autoClickInProgress) return;
        if (!userLoggedIn) return;
        const ifv = $("#experimentinputfv").val();
        const ifd = $("#experimentinputfd").val();
        const ift = $("#experimentinputft").val();
        const ifc = $("#experimentinputfc").val();
        const ipv = $("#experimentinputpv").val();
        const ipd = $("#experimentinputpd").val();
        const ipt = $("#experimentinputpt").val();
        const ipc = $("#experimentinputpc").val();
        const imv = $("#experimentinputmv").val();
        const imd = $("#experimentinputmd").val();
        const imt = $("#experimentinputmt").val();
        const imc = $("#experimentinputmc").val();
        const i7v = $("#experimentinput7v").val();
        const i7d = $("#experimentinput7d").val();
        const i7t = $("#experimentinput7t").val();
        const i7c = $("#experimentinput7c").val();
        const i8v = $("#experimentinput8v").val();
        const i8d = $("#experimentinput8d").val();
        const i8t = $("#experimentinput8t").val();
        const i8c = $("#experimentinput8c").val();
        const i9v = $("#experimentinput9v").val();
        const i9d = $("#experimentinput9d").val();
        const i9t = $("#experimentinput9t").val();
        const i9c = $("#experimentinput9c").val();
        const iav = $("#experimentinputav").val();
        const iad = $("#experimentinputad").val();
        const iat = $("#experimentinputat").val();
        const iac = $("#experimentinputac").val();
        const i4v = $("#experimentinput4v").val();
        const i4d = $("#experimentinput4d").val();
        const i4t = $("#experimentinput4t").val();
        const i4c = $("#experimentinput4c").val();
        const i5v = $("#experimentinput5v").val();
        const i5d = $("#experimentinput5d").val();
        const i5t = $("#experimentinput5t").val();
        const i5c = $("#experimentinput5c").val();
        const i6v = $("#experimentinput6v").val();
        const i6d = $("#experimentinput6d").val();
        const i6t = $("#experimentinput6t").val();
        const i6c = $("#experimentinput6c").val();
        const i1v = $("#experimentinput1v").val();
        const i1d = $("#experimentinput1d").val();
        const i1t = $("#experimentinput1t").val();
        const i1c = $("#experimentinput1c").val();
        const i2v = $("#experimentinput2v").val();
        const i2d = $("#experimentinput2d").val();
        const i2t = $("#experimentinput2t").val();
        const i2c = $("#experimentinput2c").val();
        const i3v = $("#experimentinput3v").val();
        const i3d = $("#experimentinput3d").val();
        const i3t = $("#experimentinput3t").val();
        const i3c = $("#experimentinput3c").val();
        const iev = $("#experimentinputev").val();
        const ied = $("#experimentinputed").val();
        const iet = $("#experimentinputet").val();
        const iec = $("#experimentinputec").val();
        const i0v = $("#experimentinput0v").val();
        const i0d = $("#experimentinput0d").val();
        const i0t = $("#experimentinput0t").val();
        const i0c = $("#experimentinput0c").val();
        const idv = $("#experimentinputdv").val();
        const idd = $("#experimentinputdd").val();
        const idt = $("#experimentinputdt").val();
        const idc = $("#experimentinputdc").val();
        const uid = firebase.auth().currentUser.uid;
        const inputData = {
            ifv,
            ifd,
            ift,
            ifc,
            ipv,
            ipd,
            ipt,
            ipc,
            imv,
            imd,
            imt,
            imc,
            i7v,
            i7d,
            i7t,
            i7c,
            i8v,
            i8d,
            i8t,
            i8c,
            i9v,
            i9d,
            i9t,
            i9c,
            iav,
            iad,
            iat,
            iac,
            i4v,
            i4d,
            i4t,
            i4c,
            i5v,
            i5d,
            i5t,
            i5c,
            i6v,
            i6d,
            i6t,
            i6c,
            i1v,
            i1d,
            i1t,
            i1c,
            i2v,
            i2d,
            i2t,
            i2c,
            i3v,
            i3d,
            i3t,
            i3c,
            iev,
            ied,
            iet,
            iec,
            i0v,
            i0d,
            i0t,
            i0c,
            idv,
            idd,
            idt,
            idc,
            uid
        }
        const sessionInputData = "inputData/" + session;
        var inputDataRef = firebase.database().ref(sessionInputData);
        inputDataRef.set(inputData, function(error) {
            if (error) {
                console.log(error);
            }
        });
    });

    $(".output").on("change", function() {
        $(this).get(0).scrollLeft = $(this).get(0).scrollWidth;
        if (autoClickInProgress) return;
        if (!userLoggedIn) return;
        if ($(this).attr("id") != soundLoca.substr(1)) return;
        // storing the ID of last clicked button and user which clicked it
        const uid = firebase.auth().currentUser.uid;
        const inputValue = $(this).val();
        const value = inputValue.substring(inputValue.length - 100, inputValue.length);
        const outputValue = {
            uid,
            value
        };
        const location = $(this).attr('id');
        const sessionOutputData = "outputData/" + session + "/" + location;
        var outputDataRef = firebase.database().ref(sessionOutputData);
        outputDataRef.set(outputValue, function(error) {
            if (error) {
                console.log(error);
            }
        });
    });

    /***************************Required for Keyboard Shortcuts on keydown events*****************************************/
    $("#signinEmail").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#signinPassword").focus();
                break;
        }
    });
    $("#signinPassword").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Tab":
                event.preventDefault();
                $("#signinBTN").trigger("click");
                break;
            case "Enter": // ENTER
                event.preventDefault();
                $("#signinBTN").trigger("click");
                break;
        }
    });
    $("#resetEmail").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#resetButton").trigger("click");
                break;
        }
    });
    $("#signupEmail").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#signupPassword").focus();
                break;
        }
    });
    $("#signupPassword").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Tab": // Tab
                event.preventDefault();
                $("#confirmPassword").focus();
                break;
            case "Enter": // ENTER
                event.preventDefault();
                $("#confirmPassword").focus();
                break;
        }
    });
    $("#confirmPassword").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Tab": // Tab
                event.preventDefault();
                $("#agreecheckbox").focus();
                $("#agreecheckbox").trigger("click");
                break;
            case "Enter": // ENTER
                event.preventDefault();
                $("#agreecheckbox").focus();
                $("#agreecheckbox").trigger("click");
                break;
        }
    });
    $("#changeName").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#updateSettings").trigger("click");
                break;
        }
    });
    $("#changeEmail").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#updateSettings").trigger("click");
                break;
        }
    });
    $("#changePassword").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#updateSettings").trigger("click");
                break;
        }
    });
    $("#changeSession").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Enter": // ENTER
                event.preventDefault();
                $("#updateSettings").trigger("click");
                break;
        }
    });
    $("#chatmsg").keydown(function(event) {
        var k = event.code;
        switch (k) {
            case "Space": // spacebar
                $("#chatmsg").value += " ";
                break;
            case "Enter": // ENTER
                event.preventDefault();
                $("#chatmsgSend").trigger("click");
                break;
        }
    });
    $("input").on("focus", function() {
        enc = 1;
    });
    $("input").on("focusout", function() {
        enc = 0;
    });
});
$(document).keydown(function(event) {
    var k = event.code,
        e = enc;
    switch (e) {
        case 1:
            event.stopPropagation();
            break;
        case 0:
            switch (k) {
                case "NumpadDivide": // /
                    $("#experimentBTNf").trigger("click");
                    console.log("click");
                    break;
                case "Digit7": // 7
                    $("#experimentBTN/").trigger("click");
                    break;
                case "NumpadMultiply": // *
                    $("#experimentBTNp").trigger("click");
                    break;
                case "Digit8": // 8
                    $("#experimentBTNp").trigger("click");
                    break;
                case "NumpadSubtract": // -
                    $("#experimentBTNm").trigger("click");
                    break;
                case "Digit9": // 9
                    $("#experimentBTNm").trigger("click");
                    break;
                case "Numpad7": // 7
                    $("#experimentBTN7").trigger("click");
                    break;
                case "KeyY": // Y
                    $("#experimentBTN7").trigger("click");
                    break;
                case "Numpad8": // 8
                    $("#experimentBTN8").trigger("click");
                    break;
                case "KeyU": // U
                    $("#experimentBTN8").trigger("click");
                    break;
                case "Numpad9": // 9
                    $("#experimentBTN9").trigger("click");
                    break;
                case "KeyI": // I
                    $("#experimentBTN9").trigger("click");
                    break;
                case "KeyO": // O
                    $("#experimentBTN9").trigger("click");
                    break;
                case "NumpadAdd": // +
                    $("#experimentBTNa").trigger("click");
                    break;
                case "KeyL": // L
                    $("#experimentBTNa").trigger("click");
                    break;
                case "Numpad4": // 4
                    $("#experimentBTN4").trigger("click");
                    break;
                case "KeyH": // H
                    $("#experimentBTN4").trigger("click");
                    break;
                case "Numpad5": // 5
                    $("#experimentBTN5").trigger("click");
                    break;
                case "KeyJ": // J
                    $("#experimentBTN5").trigger("click");
                    break;
                case "Numpad6": // 6
                    $("#experimentBTN6").trigger("click");
                    break;
                case "KeyK": // K
                    $("#experimentBTN6").trigger("click");
                    break;
                case "Numpad1": // 1
                    $("#experimentBTN1").trigger("click");
                    break;
                case "KeyN": // N
                    $("#experimentBTN1").trigger("click");
                    break;
                case "Numpad2": // 2
                    $("#experimentBTN2").trigger("click");
                    break;
                case "KeyM": // M
                    $("#experimentBTN2").trigger("click");
                    break;
                case "Numpad3": // 3
                    $("#experimentBTN3").trigger("click");
                    break;
                case "Comma": // ,<
                    $("#experimentBTN3").trigger("click");
                    break;
                case "Period": // .>
                    $("#experimentBTNe").trigger("click");
                    break;
                case "Numpad0": // 0
                    $("#experimentBTN0").trigger("click");
                    break;
                case "Space": // spacebar
                    event.preventDefault();
                    $("#experimentBTN0").trigger("click");
                    break;
                case "NumpadDecimal": // .
                    $("#experimentBTNd").trigger("click");
                    break;
                case "AltRight": // right alt
                    $("#experimentBTNd").trigger("click");
                    break;
                case "NumpadEnter": // ENTER
                    $("#experimentBTNe").trigger("click");
                    break;
            }
    }
});