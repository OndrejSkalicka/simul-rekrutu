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

function int(s) {
    // shorthand for jquery fields
    if (s instanceof $) {
        return int(s.val());
    }
    return parseInt(s.replace(" ", ""));
}

/**
 *
 * @param {RecruitRequest[]} reqs
 * @param {Province} initialProvince
 * @param {SpellRequest[]} spellRequests
 */
function simulate(reqs, initialProvince, spellRequests = []) {
    console.log("Full recruit simulation commencing...");

    /** @type Turn[] */
    let turns = [];
    let currentProvince = initialProvince;
    let spellRequestsByTurn = {};
    let currentSpellTurn = 0;
    spellRequests.forEach(function (spellRequest) {
        currentSpellTurn += spellRequest.turnOffset;
        spellRequestsByTurn[currentSpellTurn] = spellRequest;
    });

    reqs.forEach(function (req) {
        let recruitedTotal = 0;
        for (let t = 0; t < req.turns; ++t) {
            let turnNumber = turns.length;
            currentProvince = currentProvince.clone();

            /** @type SpellRequest */
            let spellRequest = spellRequestsByTurn[turnNumber + 1];
            let spellText = null;
            let spell = null;
            if (typeof spellRequest !== 'undefined') {
                spell = spellRequest.spell;
                spellText = spellRequest.spell.cast(currentProvince, spellRequest.xp);
            }

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

            currentProvince.gold = r(currentProvince.gold + goldGain - req.unit.costGold * recruited);
            currentProvince.goldPerTuStatic = currentProvince.goldPerTuStatic - req.unit.upkeepGold * recruited;
            currentProvince.mana = min(r(currentProvince.mana + manaGain - req.unit.costMana * recruited),
                currentProvince.manaMax);
            currentProvince.manaPerTu = currentProvince.manaPerTu - req.unit.upkeepMana * recruited;
            currentProvince.pop = currentProvince.pop + popGain - req.unit.costPop * recruited;
            currentProvince.popPerTuStatic = currentProvince.popPerTuStatic - req.unit.upkeepPop * recruited;
            currentProvince.power = currentProvince.power + req.unit.power * recruited * 0.4;
            currentProvince.unitsCount = currentProvince.unitsCount + recruited;

            turns.push(new Turn(
                turnNumber,
                currentProvince,
                goldGain,
                manaGain,
                popGain,
                req.unit,
                recruited,
                f(recruitedTotal),
                spell,
                spellText
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
        int($('.input-gp').val()),
        int($('.input-gp-tu').val()) - (0.000078 * pop * taxes),
        int($('.input-mn').val()),
        int($('.input-mn-max').val()),
        int($('.input-mn-tu').val()),
        pop,
        int($('.input-pp-max').val()),
        parseInt($('.input-pp-tu').val()) - (pop * (0.0065 - 0.00005 * taxes)),
        int($('.input-power').val()),
        taxes,
        int($('.input-units-count').val()),
        int($('.input-spell-power').val()),
        parseFloat($('.input-max-spell-effect').val() / 100.0)
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

    let spellRequests = [];
    $('#spells-input .input-row').each(function () {
        let spell = $(this).find('.input-spell option:selected').data('spell');

        if (typeof spell === 'undefined') {
            return;
        }

        spellRequests.push(
            new SpellRequest(
                spell,
                int($(this).find('.input-tu-offset').val()),
                parseFloat($(this).find('.input-xp').val()) / 100.0
            )
        );
    });


    let simulatedTurns = simulate(reqs, initialProvince, spellRequests);
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

        if (turn.spellText !== null && typeof turn.spell !== 'undefined') {
            turnDiv.find('.spell-name').text(turn.spell.name);
            turnDiv.find('.spell-text').text(turn.spellText);
            turnDiv.find('.spell-block').removeClass('d-none');
        }

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

function addEmptySpellRow() {
    return $('#template-spell > li').clone(true, true).appendTo($('#spells-input'));
}

function addEmptyUnitRow() {
    return $('#template-unit > li').clone(true, true).appendTo($('#units-input'));
}

function addRemoveGenericRows(target, newRowCallback) {
    // basically the goal is to keep 'exactly one' blank row
    let last = null;
    let reversedLis = target.get().reverse();

    if (reversedLis.length === 0) {
        // no rows
        newRowCallback();
        return;
    }

    if (parseInt($(reversedLis[0]).find('.input-selector option:selected').val()) !== 0) {
        // last row ain't an empty
        newRowCallback();
        return;
    }

    reversedLis.some(function (li) {
        let unitId = parseInt($(li).find('.input-selector option:selected').val());

        if (unitId > 0) return true;

        if (last !== null) {
            last.remove();
        }
        last = $(li);

        return false;
    });
}

function addRemoveUnitsRows() {
    addRemoveGenericRows($('#units-input li'), addEmptyUnitRow);
}

function addRemoveSpellRows() {
    addRemoveGenericRows($('#spells-input li'), addEmptySpellRow);
}

function manualClipboard(callback) {
    let modal = $('#clipboard-modal');

    modal.find('#modal-text').val('');
    modal.find('#modal-load').off('click').click(function () {
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
    let mana = int(manaMatch[1]);
    let manaMax = 0;
    let manaPercent = int(manaMatch[2]);
    if (manaPercent > 0) {
        manaMax = r(mana * 100 / manaPercent);
    }
    let pop = int(clip.match(/^ *Populace:([\d]+)/m)[1]);
    let goldFromPop = int(clip.match(/^Poddaní\t([\d]+)/m)[1]);

    let taxes = max(1, min(70, r(goldFromPop / pop / 0.000078)));

    let parsed = {
        gold: int(clip.match(/^ *Zlato:([\d]+)/m)[1]),
        unitsCount: int(armyTurnSummary[1]),
        goldPerTu: int(provinceTurnSummary[0]),
        manaPerTu: int(provinceTurnSummary[1]),
        popPerTu: int(provinceTurnSummary[2]),
        mana: int(manaMatch[1]),
        manaMax: manaMax,
        pop: pop,
        popMax: int(clip.match(/^CELKEM\s*?[ \d]+ ?\t([ \d]+)$/mi)[1]),
        taxes: taxes,
        power: int(clip.match(/^ *Síla provincie:(\d+)/m)[1]),
        spellPower: int(clip.match(/^ *Síla kouzel:(\d+)/m)[1]),
    };

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
    $('.input-spell-power').val(parsed.spellPower);

    anyInputChanged();
}

function parseSpellsClipboard(clip) {
    if (clip.match(/Maximální seslatelný efekt kouzel:/) === null) {
        alert('Ve schránce není ctrl+a, ctrl+c z Magie a kouzla');
        return;
    }

    let parsed = {
        maxSpellEffect: parseFloat(clip.match(/^ *Maximální seslatelný efekt kouzel: *([\d]+(\.\d+)?)\s+%/m)[1]) / 100.0,
        regentId: int(clip.match(/^\(ID (\d+)\)$/mi)[1]),
        spellXp: {},
        spellRequests: [],
    };

    spells.forEach(spell => {
        let rx = new RegExp("^" + spell.name + "\\t([\\d]+(\\.\\d+)?)%[^\\t]*\\tPouze sesilatel", "im");

        let match = clip.match(rx);
        if (match !== null) {
            parsed.spellXp[spell.id] = parseFloat(match[1]) / 100.0;
        }
    });

    let cumulativeOffset = 0;
    Array.from(clip.matchAll(/^\d+\.\t\+(\d+)\t\d+\t([^\t]+)\t\((\d+)\)/mig)).forEach(spellRequestMatch => {
        let regentId = int(spellRequestMatch[3]);
        cumulativeOffset += int(spellRequestMatch[1]);

        if (regentId !== parsed.regentId) {
            return;
        }

        let spell = spellsByName[spellRequestMatch[2]];

        if (typeof spell === 'undefined') {
            return;
        }

        parsed.spellRequests.push({
            spell: spell,
            turnOffset: cumulativeOffset,
        });

        cumulativeOffset = 0;
    });

    // use the data!
    spellsStoredXp = parsed.spellXp;
    $('.input-max-spell-effect').val(parsed.maxSpellEffect * 100.0);

    // clear existing spellz
    $('#spells-input').empty();
    parsed.spellRequests.forEach(spellRequest => {
        let row = addEmptySpellRow();
        row.find('.input-spell').val(spellRequest.spell.id);
        row.find('.input-tu-offset').val(spellRequest.turnOffset);
        row.find('.input-xp').val(spellEffectiveXp(spellRequest.spell) * 100.0);
    });
    addRemoveSpellRows();

    console.log("Loaded from clipboard:", parsed);

    anyInputChanged();
    updateSpellInputDisplayXp();
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

    // calculated values for spell input
    let spellTurn = 0;
    $('#spells-input .input-row').each(function () {
        /** @type Spell */
        let spell = $(this).find('.input-spell option:selected').data('spell');

        if (typeof spell === 'undefined') {
            return;
        }

        spellTurn += int($(this).find('.input-tu-offset'));

        $(this).find('.input-tu-computed').val(spellTurn);
    });


    saveToLocalStorage();
    fullSimulation();
}

function initialSetup() {
    return {
        gp: 100000,
        gpTu: 1000,
        mn: 45000,
        mnTu: 2000,
        mnMax: 50000,
        spellPower: 30,
        pp: 200000,
        ppTu: 600,
        ppMax: 250000,
        unitsCount: 500,
        taxes: 70,
        power: 20000,
        recruitCoefficient: 1.0,
        maxSpellEffect: 90.0,
        requests: [
            {
                unitId: 5008,
                turns: 10,
                unitsPerTurn: 6.45,
            },
        ],
        spellRequests: [
            {
                spellId: 44, // TODO change once I get hold of real spell IDs
                turnOffset: 5,
                xp: 13.37,
            },
        ],
        spellsStoredXp: {},
    };
}

function saveToLocalStorage() {
    let requests = [];
    let spellRequests = [];

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
    $('#spells-input .input-row').each(function () {
        /** @type Spell */
        let spell = $(this).find('.input-spell option:selected').data('spell');

        if (typeof spell === 'undefined') {
            return;
        }

        spellRequests.push({
            spellId: spell.id,
            turnOffset: parseInt($(this).find('.input-tu-offset').val()),
            xp: parseFloat($(this).find('.input-xp').val()),
        })
    });
    let data = {
        gp: int($('.input-gp').val()),
        gpTu: int($('.input-gp-tu').val()),
        mn: int($('.input-mn').val()),
        mnTu: int($('.input-mn-tu').val()),
        mnMax: int($('.input-mn-max').val()),
        spellPower: int($('.input-spell-power').val()),
        pp: int($('.input-pp').val()),
        ppTu: int($('.input-pp-tu').val()),
        ppMax: int($('.input-pp-max').val()),
        unitsCount: int($('.input-units-count').val()),
        taxes: int($('.input-taxes').val()),
        power: int($('.input-power').val()),
        recruitCoefficient: parseFloat($('.input-recruit-coefficient').val()),
        maxSpellEffect: parseFloat($('.input-max-spell-effect').val()),
        requests: requests,
        spellRequests: spellRequests,
        spellsStoredXp: spellsStoredXp,
    };

    window.localStorage.setItem("savedInput", JSON.stringify(data));
}

function loadInputsFromJson(defaults) {
    $('.input-gp').val(defaults.gp);
    $('.input-gp-tu').val(defaults.gpTu);
    $('.input-mn').val(defaults.mn);
    $('.input-mn-tu').val(defaults.mnTu);
    $('.input-mn-max').val(defaults.mnMax);
    $('.input-spell-power').val(defaults.spellPower);
    $('.input-pp').val(defaults.pp);
    $('.input-pp-tu').val(defaults.ppTu);
    $('.input-pp-max').val(defaults.ppMax);
    $('.input-units-count').val(defaults.unitsCount);
    $('.input-taxes').val(defaults.taxes);
    $('.input-power').val(defaults.power);
    $('.input-recruit-coefficient').val(defaults.recruitCoefficient);
    $('.input-max-spell-effect').val(defaults.maxSpellEffect);


    defaults.requests.forEach(function (request) {
        let row = addEmptyUnitRow();
        row.find('.input-unit').val(request.unitId);
        row.find('.input-tu').val(request.turns);
        row.find('.input-units-per-tu').val(request.unitsPerTurn);
    });
    defaults.spellRequests.forEach(function (spellRequest) {
        let row = addEmptySpellRow();
        row.find('.input-spell').val(spellRequest.spellId);
        row.find('.input-tu-offset').val(spellRequest.turnOffset);
        row.find('.input-xp').val(spellRequest.xp);
    });

    spellsStoredXp = defaults.spellsStoredXp;
}

function parseClipboard(callback) {
    if (typeof navigator.clipboard.readText === 'undefined') {
        console.error('Clipboard.readText not available');
        manualClipboard(callback);
        return;
    }
    navigator.clipboard.readText()
        .then(callback)
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);

            if (err.message === 'Read permission denied.') {
                manualClipboard(callback);
            }
        });
}

function updateSpellInputDisplayXp() {
    $('.input-spell option').each((index, opt) => {
        let option = $(opt);
        let spell = option.data('spell');
        if (typeof spell === 'undefined') {
            return;
        }

        let xp = spellsStoredXp[spell.id];

        if (typeof xp === 'undefined') {
            option.text(spell.name);
            return;
        }

        option.text(spell.name + ' [' + (xp * 100.0) + '%]');
    });
}

function spellEffectiveXp(spell) {
    let xp = spellsStoredXp[spell.id];
    if (typeof xp === 'undefined') {
        return 1.0;
    }

    return xp;
}


$(function () {
    // build template
    professions.forEach(function (profession) {
        let optgroup = $('<optgroup>').attr('label', profession.name);

        profession.units.forEach(function (unit) {
            $('<option>')
                .data('unit', unit)
                .val(unit.id)
                .text(unit.name).appendTo(optgroup);
        });

        optgroup.appendTo('.input-unit');
    });

    spells.forEach(function (spell) {
        $('<option>')
            .data('spell', spell)
            .val(spell.id)
            .text(spell.name).appendTo('.input-spell');
    });

    // bind events
    $('.input-unit').change(function () {
        addRemoveUnitsRows();

        let row = $(this).parents('.input-row');
        /** @type Unit */
        let unit = row.find('.input-unit option:selected').data('unit');

        if (typeof unit === 'undefined') {
            row.find('.input-units-per-tu').val('');
            row.find('.input-power-per-tu').val('');
            row.find('.input-power-total').val('');
            return;
        }

        let building = unit.recruitBuilding;

        if (building !== null) {
            row
                .find('.input-units-per-tu')
                .val(r2(building.maxCount * unit.recruitSingleBuilding * $('.input-recruit-coefficient').val())).change();
        }
    });
    $('.input-spell').change(function () {
        addRemoveSpellRows();

        let row = $(this).parents('.input-row');
        /** @type Spell */
        let spell = row.find('.input-spell option:selected').data('spell');

        if (typeof spell === 'undefined') {
            row.find('.input-tu-offset').val('');
            row.find('.input-xp').val('');
            row.find('.input-tu-computed').val('');

            return;
        }

        row.find('.input-tu-offset').val(spell.turn);
        row.find('.input-xp').val(spellEffectiveXp(spell) * 100.0);
    });

    $('#load-from-ma').click(() => parseClipboard(parseEconomyClipboard));
    $('#load-spells-from-ma').click(() => parseClipboard(parseSpellsClipboard));

    $('.input-row input').change(anyInputChanged);
    $('.input-row select').change(anyInputChanged);

    // load from storage
    let savedInput = window.localStorage.getItem("savedInput");
    if (savedInput === null) {
        savedInput = "{}";
    }
    let defaults = $.extend(initialSetup(), JSON.parse(savedInput));
    loadInputsFromJson(defaults);
    updateSpellInputDisplayXp();

    addRemoveUnitsRows();
    addRemoveSpellRows();

    // enable drag-drop
    $("#units-input").sortable({'update': addRemoveUnitsRows}).disableSelection();

    // ping recalc
    anyInputChanged();

    // TODO Upon change of recruit coeff, change all non-overriden units/TU
});