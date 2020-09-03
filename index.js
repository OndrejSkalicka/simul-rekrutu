function r2(n) {
    return n.toFixed(2)
}

function nf2(n) {
    return r2(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function nf0(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function r(n) {
    return Math.round(n);
}

function c(n) {
    return Math.ceil(n);
}

function f(n) {
    return Math.floor(n);
}

function min(a, b) {
    return Math.min(a, b);
}

function max(a, b) {
    return Math.max(a, b);
}

function i(s) {
    return parseInt(s.replace(" ", ""));
}

/**
 *
 * @param {RecruitRequest[]} reqs
 * @param {Province} initialProvince
 */
function simulate(reqs, initialProvince) {
    /** @type Turn[] */
    let turns = [];
    let currentProvince = initialProvince;

    reqs.forEach(function (req) {
        let recruitedTotal = 0;
        for (let t = 0; t < req.turns; ++t) {
            // only count fully recruited units
            let newRecruitedTotal = recruitedTotal + req.unitsPerTurn;
            let recruited = f(newRecruitedTotal) - f(recruitedTotal);
            recruitedTotal = newRecruitedTotal;

            let goldGain = r(currentProvince.totalGoldPerTu());
            let manaGain = r(currentProvince.manaPerTu);

            let realMaxPop = currentProvince.popMax - currentProvince.unitsCount * 3;
            let popGain = 0;

            if (currentProvince.pop > realMaxPop) {
                // overpopulation
                popGain = c((realMaxPop - currentProvince.pop) / 4);
            } else if (currentProvince.pop + currentProvince.totalPopPerTu() > realMaxPop) {
                // natural growth does not go over max
                popGain = realMaxPop - currentProvince.pop;
            } else {
                popGain = r(currentProvince.totalPopPerTu());
            }

            let province = new Province(
                r(currentProvince.gold + goldGain - req.unit.costGold * recruited),

                currentProvince.goldPerTuStatic - req.unit.upkeepGold * recruited,

                min(r(currentProvince.mana + manaGain - req.unit.costMana * recruited),
                    currentProvince.manaMax),

                currentProvince.manaMax,

                currentProvince.manaPerTu - req.unit.upkeepMana * recruited,

                currentProvince.pop + popGain - req.unit.costPop * recruited,

                currentProvince.popMax,

                currentProvince.popPerTuStatic - req.unit.upkeepPop * recruited,
                currentProvince.power + req.unit.power * recruited * 0.4,
                currentProvince.taxes,

                currentProvince.unitsCount + recruited
            );

            currentProvince = province;
            turns.push(new Turn(
                turns.length,
                province,
                goldGain,
                manaGain,
                popGain,
                req.unit,
                recruited,
                f(recruitedTotal)
            ));
        }
    });

    return turns;
}

function prettyNumberOutput(jq, n, usePlusSign = true) {
    if (n < 0) {
        jq.addClass('text-danger').text(nf0(n));
    } else if (usePlusSign) {
        jq.addClass('text-success').text('+' + nf0(n));
    } else {
        jq.addClass('text-success').text(nf0(n));
    }
}

function fullSimulation() {
    let turnsDiv = $('#turns');
    turnsDiv.empty();

    let pop = parseInt($('.input-pp').val());
    let taxes = parseInt($('.input-taxes').val());

    let initialProvince = new Province(
        parseInt($('.input-gp').val()),
        parseInt($('.input-gp-tu').val()) - (0.000078 * pop * taxes),
        parseInt($('.input-mn').val()),
        parseInt($('.input-mn-max').val()),
        parseInt($('.input-mn-tu').val()),
        pop,
        parseInt($('.input-pp-max').val()),
        parseInt($('.input-pp-tu').val()) - (pop * (0.0065 - 0.00005 * taxes)),
        parseInt($('.input-power').val()),
        taxes,
        parseInt($('.input-units-count').val()),
    );

    let reqs = [];

    $('#units-input .input-row').each(function () {
        let unit = $(this).find('.input-unit option:selected').data('unit');

        if (typeof unit === 'undefined') {
            return;
        }

        reqs.push(new RecruitRequest(unit,
            parseInt($(this).find('.input-tu').val()),
            parseFloat($(this).find('.input-units-per-tu').val())
        ));
    });


    let simulatedTurns = simulate(reqs, initialProvince);
    let goldRows = [];
    let manaRows = [];
    let powerRows = [];
    let popRows = [];

    simulatedTurns.forEach(function (turn) {
        let turnDiv = $('#template-turn > div').clone();

        turnDiv.find('.turn-number').text(nf0(turn.number + 1));

        prettyNumberOutput(turnDiv.find('.gp-gained'), turn.goldGained);
        prettyNumberOutput(turnDiv.find('.mn-gained'), turn.manaGained);
        prettyNumberOutput(turnDiv.find('.pp-gained'), turn.popGained);

        turnDiv.find('.recruited-count').text(nf0(turn.recruitedCount));
        turnDiv.find('.recruited-unit-name').text(turn.recruitedUnit.name);
        turnDiv.find('.recruited-total').text(nf0(turn.recruitedTotal));

        turnDiv.find('.recruited-cost-gp').text(nf0(turn.recruitedCount * turn.recruitedUnit.costGold));
        turnDiv.find('.recruited-cost-mn').text(nf0(turn.recruitedCount * turn.recruitedUnit.costMana));
        turnDiv.find('.recruited-cost-pp').text(nf0(turn.recruitedCount * turn.recruitedUnit.costPop));

        prettyNumberOutput(turnDiv.find('.province-gp'), turn.province.gold, false);
        prettyNumberOutput(turnDiv.find('.province-mn'), turn.province.mana, false);
        prettyNumberOutput(turnDiv.find('.province-pp'), turn.province.pop, false);
        prettyNumberOutput(turnDiv.find('.province-power'), turn.province.power, false);

        turnDiv.prependTo(turnsDiv);

        goldRows.push([
            'TU ' + (turn.number + 1),
            turn.province.gold,
            r(turn.province.totalGoldPerTu()),
        ]);

        manaRows.push([
            'TU ' + (turn.number + 1),
            turn.province.mana,
            r(turn.province.manaPerTu),
        ]);

        powerRows.push([
            'TU ' + (turn.number + 1),
            r(turn.province.power),
        ]);

        popRows.push([
            'TU ' + (turn.number + 1),
            turn.province.pop,
            r(turn.province.totalPopPerTu()),
        ]);
    });


    chartPromise.then(function () {
        let goldData = new google.visualization.DataTable();
        goldData.addColumn('string', 'Tah');
        goldData.addColumn('number', 'Zlato');
        goldData.addColumn('number', 'Zlato/TU');
        goldData.addRows(goldRows);
        let manaData = new google.visualization.DataTable();
        manaData.addColumn('string', 'Tah');
        manaData.addColumn('number', 'Mana');
        manaData.addColumn('number', 'Mana/TU');
        manaData.addRows(manaRows);
        let powerData = new google.visualization.DataTable();
        powerData.addColumn('string', 'Tah');
        powerData.addColumn('number', 'Síla');
        powerData.addRows(powerRows);
        let popData = new google.visualization.DataTable();
        popData.addColumn('string', 'Tah');
        popData.addColumn('number', 'Populace');
        popData.addColumn('number', 'Populace/TU');
        popData.addRows(popRows);

        var goldOptions = {
            title: 'Vývoj zlata podle tahů',
            height: 500,
            series: {
                0: {
                    targetAxisIndex: 0,
                    color: '#ffcc00',
                    lineWidth: 4,
                },
                1: {
                    targetAxisIndex: 1,
                    color: '#9b9a08',
                }
            },
            vAxes: {
                0: {
                    minValue: 0,
                    title: 'Zlato',
                    baselineColor: 'red',
                },
                1: {
                    minValue: 0,
                    title: 'Zlato/TU',
                    baselineColor: 'red',
                }
            }
        };

        var manaOptions = {
            title: 'Vývoj many podle tahů',
            height: 500,
            series: {
                0: {
                    targetAxisIndex: 0,
                    color: '#0054ff',
                    lineWidth: 4,
                },
                1: {
                    targetAxisIndex: 1,
                    color: '#00359d',
                }
            },
            vAxes: {
                0: {
                    minValue: 0,
                    title: 'Mana',
                    baselineColor: 'red',
                },
                1: {
                    minValue: 0,
                    title: 'Mana/TU',
                    baselineColor: 'red',
                }
            }
        };

        var powerOptions = {
            title: 'Vývoj síly podle tahů',
            height: 500,
            series: {
                0: {
                    targetAxisIndex: 0,
                    color: '#11a415',
                    lineWidth: 4,
                }
            },
            vAxes: {
                0: {
                    minValue: 0,
                    title: 'Síla',
                    baselineColor: 'red',
                }
            }
        };

        var popOptions = {
            title: 'Vývoj populace podle tahů',
            height: 500,
            series: {
                0: {
                    targetAxisIndex: 0,
                    color: '#ff006f',
                    lineWidth: 4,
                },
                1: {
                    targetAxisIndex: 1,
                    color: '#810036',
                }
            },
            vAxes: {
                0: {
                    minValue: 0,
                    title: 'Populace',
                    baselineColor: 'red',
                },
                1: {
                    minValue: 0,
                    title: 'Populace/TU',
                    baselineColor: 'red',
                }
            }
        };

        new google.visualization.LineChart(document.getElementById('chart-gold')).draw(goldData, goldOptions);
        new google.visualization.LineChart(document.getElementById('chart-mana')).draw(manaData, manaOptions);
        new google.visualization.LineChart(document.getElementById('chart-power')).draw(powerData, powerOptions);
        new google.visualization.LineChart(document.getElementById('chart-pop')).draw(popData, popOptions);
    });
}

function addEmptyUnitRow() {
    return $('#template-unit > li').clone(true, true).appendTo($('#units-input'));
}

function addRemoveUnitsRows() {
    // basically the goal is to keep 'exactly one' blank row
    let last = null;
    let reversedLis = $('#units-input li').get().reverse();

    if (reversedLis.length === 0) {
        // no rows
        addEmptyUnitRow();
        return;
    }

    if (parseInt($(reversedLis[0]).find('.input-unit option:selected').val()) !== 0) {
        // last row ain't an empty
        addEmptyUnitRow();
        return;
    }

    reversedLis.some(function (li) {
        let unitId = parseInt($(li).find('.input-unit option:selected').val());

        if (unitId > 0) return true;

        if (last !== null) {
            last.remove();
        }
        last = $(li);

        return false;
    });
}

function saveToLocalStorage() {
    let requests = [];

    $('#units-input .input-row').each(function () {
        /** @type Unit */
        let unit = $(this).find('.input-unit option:selected').data('unit');

        if (typeof unit === 'undefined') {
            return;
        }

        requests.push({
            unitId: unit.id,
            turns: parseInt($(this).find('.input-tu').val()),
            unitsPerTurn: parseFloat($(this).find('.input-units-per-tu').val()),
        })
    });
    let data = {
        gp: parseInt($('.input-gp').val()),
        gpTu: parseInt($('.input-gp-tu').val()),
        mn: parseInt($('.input-mn').val()),
        mnTu: parseInt($('.input-mn-tu').val()),
        mnMax: parseInt($('.input-mn-max').val()),
        pp: parseInt($('.input-pp').val()),
        ppTu: parseInt($('.input-pp-tu').val()),
        ppMax: parseInt($('.input-pp-max').val()),
        unitsCount: parseInt($('.input-units-count').val()),
        taxes: parseInt($('.input-taxes').val()),
        power: parseInt($('.input-power').val()),
        recruitCoefficient: parseFloat($('.input-recruit-coefficient').val()),
        requests: requests
    };

    window.localStorage.setItem("defaults", JSON.stringify(data));
}

function manualClipboard(callback) {
    let modal = $('#clipboard-modal');

    modal.find('#modal-text').val('');
    modal.find('#modal-load').off('click').click(function(){
        callback(modal.find('#modal-text').val());
        modal.modal('hide');
    });

    modal.modal();
}

function parseEconomyClipboard(clip) {
    if (clip.match(/Detailní rozpis staveb najdete v menu/) === null) {
        alert('Ve schránce není ctrl+a, ctrl+c z Hospodaření');
        return;
    }

    let armyTurnSummary = clip.match(/^CELKEM ZA TAH ?\t([-\d]* ?\t[-\d]* ?\t[-\d]* ?\t[-\d]* ?\t[-\d]*)/im)[1].split('\t');
    let provinceTurnSummary = clip.match(/^CELKEM ZA TAH\t([-\d]* ?\t[-\d]* ?\t[-\d]*)$/im)[1].split("\t");
    let manaMatch = clip.match(/^ *Mana: ([- \d]+) \(([-\d]+)%\)/m);
    let mana = i(manaMatch[1]);
    let manaMax = 0;
    let manaPercent = i(manaMatch[2]);
    if (manaPercent > 0) {
        manaMax = r(mana * 100 / manaPercent);
    }
    let pop = i(clip.match(/^ *Populace:([\d]+)/m)[1]);
    let goldFromPop = i(clip.match(/^Poddaní\t([\d]+)/m)[1]);

    let taxes = max(1, min(70, r(goldFromPop / pop / 0.000078)));

    let parsed = {
        gold: i(clip.match(/^ *Zlato:([\d]+)/m)[1]),
        unitsCount: i(armyTurnSummary[1]),
        goldPerTu: i(provinceTurnSummary[0]),
        manaPerTu: i(provinceTurnSummary[1]),
        popPerTu: i(provinceTurnSummary[2]),
        mana: i(manaMatch[1]),
        manaMax: manaMax,
        pop: pop,
        popMax: i(clip.match(/^CELKEM\s*?[ \d]+ ?\t([ \d]+)$/mi)[1]),
        taxes: taxes,
        power: i(clip.match(/^ *Síla provincie:(\d+)/m)[1]),
    }

    console.log("Loaded from clipboard:", parsed);
    $('#ok-alert').show().delay(2000).fadeOut({duration: 500});

    $('.input-gp').val(parsed.gold);
    $('.input-gp-tu').val(parsed.goldPerTu);
    $('.input-mn').val(parsed.mana);
    $('.input-mn-tu').val(parsed.manaPerTu);
    $('.input-mn-max').val(parsed.manaMax);
    $('.input-pp').val(parsed.pop);
    $('.input-pp-tu').val(parsed.popPerTu);
    $('.input-pp-max').val(parsed.popMax);
    $('.input-units-count').val(parsed.unitsCount);
    $('.input-taxes').val(parsed.taxes);
    $('.input-power').val(parsed.power);

    anyInputChanged();
}

/** @type Promise */
let chartPromise = google.charts.load('current', {'packages': ['line', 'corechart']});

function anyInputChanged() {
    // calculated values for unit input
    $('#units-input .input-row').each(function () {
        /** @type Unit */
        let unit = $(this).find('.input-unit option:selected').data('unit');

        if (typeof unit === 'undefined') {
            return;
        }

        let unitsPerTu = $(this).find('.input-units-per-tu').val();
        let turns = $(this).find('.input-tu').val();

        let pwrPerTu = unitsPerTu * 0.4 * unit.power;

        $(this).find('.input-power-per-tu').val(nf2(pwrPerTu));
        $(this).find('.input-power-total').val(nf2(pwrPerTu * turns));
    });


    saveToLocalStorage();
    fullSimulation();
}

function clipboardFallback() {
    
}

$(function () {
    // build template
    professions.forEach(function (profession) {
        var optgroup = $('<optgroup>').attr('label', profession.name);

        profession.units.forEach(function (unit) {
            $('<option>')
                .data('unit', unit)
                .val(unit.id)
                .text(unit.name).appendTo(optgroup);
        });

        optgroup.appendTo('.input-unit');
    });

    // bind events
    $('.input-unit').change(function () {
        addRemoveUnitsRows();

        let row = $(this).parents('.input-row');
        /** @type Unit */
        let unit = row.find('.input-unit option:selected').data('unit');

        if (typeof unit === 'undefined') {
            return;
        }

        let building = unit.recruitBuilding;

        if (building !== null) {
            row
                .find('.input-units-per-tu')
                .val(r2(building.maxCount * unit.recruitSingleBuilding * $('.input-recruit-coefficient').val())).change();
        }
    });

    $('#load-from-ma').click(function() {
        if (typeof navigator.clipboard.readText === 'undefined') {
            console.error('Clipboard.readText not available');
            manualClipboard(parseEconomyClipboard);
            return;
        }
        navigator.clipboard.readText()
            .then(parseEconomyClipboard)
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
                manualClipboard(parseEconomyClipboard);
            });
    });

    let defaultsJson = window.localStorage.getItem("defaults", null);

    if (defaultsJson !== null) {
        let defaults = JSON.parse(defaultsJson);

        $('.input-gp').val(defaults.gp);
        $('.input-gp-tu').val(defaults.gpTu);
        $('.input-mn').val(defaults.mn);
        $('.input-mn-tu').val(defaults.mnTu);
        $('.input-mn-max').val(defaults.mnMax);
        $('.input-pp').val(defaults.pp);
        $('.input-pp-tu').val(defaults.ppTu);
        $('.input-pp-max').val(defaults.ppMax);
        $('.input-units-count').val(defaults.unitsCount);
        $('.input-taxes').val(defaults.taxes);
        $('.input-power').val(defaults.power);
        $('.input-recruit-coefficient').val(defaults.recruitCoefficient);


        defaults.requests.forEach(function(request) {
            let row = addEmptyUnitRow();
            row.find('.input-unit').val(request.unitId);
            row.find('.input-tu').val(request.turns);
            row.find('.input-units-per-tu').val(request.unitsPerTurn);
        })
    }

    $("#units-input")
        .sortable({
            'update': addRemoveUnitsRows
        })
        .disableSelection();

    $('.input-tu').change(anyInputChanged);
    $('.input-units-per-tu').change(anyInputChanged);
    $('.input-row input').change(anyInputChanged);

    addRemoveUnitsRows();
    anyInputChanged();
});