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

function changeInput() {
    let row = $(this).parents('.input-row');
    /** @type Unit */
    let unit = row.find('.input-unit option:selected').data('unit');
    let unitsPerTu = row.find('.input-units-per-tu').val();
    let turns = row.find('.input-tu').val();

    let pwrPerTu = unitsPerTu * 0.4 * unit.power;

    row.find('.input-power-per-tu').val(nf2(pwrPerTu));
    row.find('.input-power-total').val(nf2(pwrPerTu * turns));

    fullSimulation();
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

    let initialProvince = new Province(
        parseInt($('.input-gp').val()),
        1090 - 3486,
        parseInt($('.input-mn').val()),
        parseInt($('.input-mn-max').val()),
        parseInt($('.input-mn-tu').val()),
        parseInt($('.input-pp').val()),
        parseInt($('.input-pp-max').val()),
        139 - 258/*parseInt($('.input-pp-tu').val())*/,
        parseInt($('.input-power').val()),
        parseInt($('.input-taxes').val()),
        parseInt($('.input-units-count').val()),
    );

    let reqs = [];

    $('#units-input .input-row').each(function () {
        let unit = $(this).find('.input-unit option:selected').data('unit');

        console.log('ii unit', unit);
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
        console.log(li);
        let unitId = parseInt($(li).find('.input-unit option:selected').val());

        if (unitId > 0) return true;

        if (last !== null) {
            last.remove();
        }
        last = $(li);

        return false;
    });
}

/** @type Promise */
let chartPromise = google.charts.load('current', {'packages': ['line', 'corechart']});

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
        let row = $(this).parents('.input-row');
        /** @type Unit */
        let unit = row.find('.input-unit option:selected').data('unit');
        let building = unit.recruitBuilding;

        if (building !== null) {
            row.find('.input-units-per-tu').val(r2(building.maxCount * unit.recruitSingleBuilding)).change();
        }

        addRemoveUnitsRows();
    });

    $('.input-tu').change(changeInput);
    $('.input-units-per-tu').change(changeInput);

    // cy-clone TODO remove + load from localStorage

    let first = $('#template-unit > li').clone(true, true);
    first.appendTo($('#units-input'));

    // provi initial, TODO load from localstorage
    $('.input-gp').val(302037);
    $('.input-mn').val(95000);
    $('.input-pp').val(197684);
    $('.input-gp-tu').val(-1317);
    $('.input-mn-tu').val(2319);
    $('.input-mn-max').val(95000);
    $('.input-pp-tu').val(474);
    $('.input-pp-max').val(290000);
    $('.input-taxes').val(70);
    $('.input-units-count').val(25971);
    $('.input-power').val(59659);

    first.find('.input-unit').val(1002).change();

    $("#units-input")
        .sortable({
            'update': addRemoveUnitsRows
        })
        .disableSelection();

    addRemoveUnitsRows();

    // Load the Visualization API and the corechart package.


    // Set a callback to run when the Google Visualization API is loaded.
    // google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.


    /*    console.log(navigator.clipboard.readText()
            .then(text => {
                console.log('Pasted content: ', text);
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            }));*/
});