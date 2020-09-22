// ==UserScript==
// @name         MA T-Rex reloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.meliorannis.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let timeoutId = -1;
    let refreshIn = -1;
    let enabled = window.sessionStorage['reloader-enabled'] === 'true';
    let min = parseInt(window.sessionStorage['reloader-min']) || 5;
    let max = parseInt(window.sessionStorage['reloader-max']) || 60;
    let threshold = parseInt(window.sessionStorage['reloader-threshold']) || 1000;
    let lastPower = parseInt(window.sessionStorage['reloader-last-power']) || -1;
    let title = document.title;

    console.log("T-Rex starting...");

    function planReload() {
        cancelReload();

        refreshIn = min + Math.floor(Math.random() * (max - min));
        console.log("Planning reload in ", refreshIn);

        timeoutId = setTimeout(() => {
            console.log("Executing reload");
            location.reload();
            console.log("Reload executed");
        } , refreshIn * 1000);

        let triggersAt = new Date(Date.now() + refreshIn * 1000);
        document.title = title + ' [' + triggersAt.toLocaleTimeString("cs-CZ") + ']';
    }

    function cancelReload() {
        if (timeoutId >= 0) {
            clearTimeout(timeoutId);
            timeoutId = -1;

            console.log("Timeout cleared");
        }
    }

    function enableReload() {
        buttonEnabled.show();
        buttonDisabled.hide();
        $('.reloader-data').show();
        planReload();
        window.sessionStorage['reloader-enabled'] = 'true';
        enabled = true;
    }

    function disableReload() {
        buttonEnabled.hide();
        buttonDisabled.show();
        $('.reloader-data').hide();
        cancelReload();
        window.sessionStorage['reloader-enabled'] = 'false';
        enabled = false;
    }

    function init() {
        if (enabled) {
            enableReload();
        } else {
            disableReload();
        }
    }

    let mainDiv = $('<div id="reloader">');
    mainDiv.appendTo($('#left_column_wrapper'));

    let rowDiv = $('<div>').appendTo(mainDiv);
    let buttonEnabled = $('<button class="btn btn_confirm" id="reloader-enabled">SRR ENABLED&nbsp;<span class="timer"></span></button>')
        .appendTo(rowDiv)
        .click(disableReload);

    let buttonDisabled = $('<button class="btn btn_cancel" id="reloader-disabled">SRR DISABLED</button>')
        .appendTo(rowDiv)
        .click(enableReload);

    rowDiv = $('<div class="reloader-data">').appendTo(mainDiv);
    $('<label>Min:&nbsp;<input id="reloader-min" style="width: 30px;"></label>')
        .appendTo(rowDiv);

    $('#reloader-min')
        .change(function () {
            min = parseInt($(this).val());
            window.sessionStorage['reloader-min'] = min;
        })
        .val(min);

    $('<label>&nbsp;Max:&nbsp;<input id="reloader-max" style="width: 30px;"></label>')
        .appendTo(rowDiv);

    $('#reloader-max')
        .change(function () {
            max = parseInt($(this).val());
            window.sessionStorage['reloader-max'] = max;
        })
        .val(max);

    rowDiv = $('<div class="reloader-data">').appendTo(mainDiv);
    $('<label>Threshold:&nbsp;<input id="reloader-threshold" style="width: 60px;"></label>')
        .appendTo(rowDiv);

    $('#reloader-threshold')
        .change(function () {
            threshold = $(this).val();
            window.sessionStorage['reloader-threshold'] = threshold;
        })
        .val(threshold);

    let currentPower = parseInt($('.value_power').text());
    let drop = lastPower > 0 ? lastPower - currentPower : 0;

    console.log("Last power: ", lastPower, "current power: ", currentPower, "drop: ", drop);
    window.sessionStorage['reloader-last-power'] = currentPower;

    if (drop > threshold) {
        new Audio("http://soundbible.com/grab.php?id=1165&type=mp3").play();
        setTimeout(function() {
            alert("Pokles! Z: " + lastPower + ", na: " + currentPower + ", pokles: " + drop);
            // with alert, only init after the alert is closed
            init();
        }, 5000);
    } else {
        init();
    }
})();
