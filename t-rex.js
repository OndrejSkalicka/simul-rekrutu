// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.meliorannis.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let timeoutId = -1;
    let intervalId = -1;
    let tMinus = -1;
    let enabled = window.sessionStorage['reloader-enabled'] === 'true';
    let min = parseInt(window.sessionStorage['reloader-min']) || 5;
    let max = parseInt(window.sessionStorage['reloader-max']) || 60;
    let threshold = parseInt(window.sessionStorage['reloader-threshold']) || 1000;
    let lastPower = parseInt(window.sessionStorage['reloader-last-power']) || -1;

    function planReload() {
        cancelReload();

        tMinus = min + Math.floor(Math.random() * (max - min));
        console.log("Planning reload in ", tMinus);

        timeoutId = setTimeout(() => 1/*location.reload()*/, tMinus * 1000);
        intervalId = setInterval(handleInterval, 1000);
        handleInterval();
    }

    function handleInterval() {
        buttonEnabled.find('.timer').text(tMinus + "s");

        tMinus--;
        if (tMinus < 0) {
            clearInterval(intervalId);
            intervalId = -1;
        }
    }

    function cancelReload() {
        if (timeoutId >= 0) {
            clearTimeout(timeoutId);
            timeoutId = -1;

            console.log("Timeout cleared");
        }

        if (intervalId >= 0) {
            clearInterval(intervalId);
            intervalId = -1;

            console.log("Interval cleared");
        }
    }

    function enableReload() {
        buttonEnabled.show();
        buttonDisabled.hide();
        planReload();
        window.sessionStorage['reloader-enabled'] = 'true';
        enabled = true;
    }

    function disableReload() {
        buttonEnabled.hide();
        buttonDisabled.show();
        cancelReload();
        window.sessionStorage['reloader-enabled'] = 'false';
        enabled = false;
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

    rowDiv = $('<div>').appendTo(mainDiv);
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

    rowDiv = $('<div>').appendTo(mainDiv);
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

    if (drop > threshold) {
        new Audio("http://soundbible.com/grab.php?id=1165&type=mp3").play();
        alert("Pokles! Z: " + lastPower + ", na: " + currentPower + ", pokles: " + drop);
    }

    console.log("Last power: ", lastPower, "current power: ", currentPower, "drop: ", drop);
    window.sessionStorage['reloader-last-power'] = currentPower;

    if (enabled) {
        enableReload();
    } else {
        disableReload();
    }

})();
