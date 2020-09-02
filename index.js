function nf(n) {
    return n.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function r(n) {
    return Math.round(n);
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

    console.log(unitsPerTu);
    console.log(turns);
    console.log(unit);
    let pwrPerTu = unitsPerTu * 0.4 * unit.power;

    row.find('.input-power-per-tu').val(nf(pwrPerTu));
    row.find('.input-power-total').val(nf(pwrPerTu * turns));
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
        for (let t = 0; t < req.turns; ++t) {
            let province = new Province(
                r(currentProvince.gold + currentProvince.goldPerTu - req.unit.costGold * req.unitsPerTurn),
                r(currentProvince.goldPerTu - req.unit.upkeepGold * req.unitsPerTurn),
                min(r(currentProvince.mana + currentProvince.manaPerTu - req.unit.costMana * req.unitsPerTurn),
                    currentProvince.manaMax),
                currentProvince.manaMax,
                r(currentProvince.manaPerTu - req.unit.upkeepMana * req.unitsPerTurn),
                currentProvince.pop + currentProvince.popPerTu - req.unit.costPop * req.unitsPerTurn,
            );

            currentProvince = province;
            turns.push(new Turn(turns.length, province));
        }
    });

    return turns;
}

$(function () {
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

    $('.input-unit').change(function () {
        let row = $(this).parents('.input-row');
        /** @type Unit */
        let unit = row.find('.input-unit option:selected').data('unit');
        let building = unit.recruitBuilding;
        console.log('bb', building);

        if (building !== null) {
            row.find('.input-units-per-tu').val(building.maxCount * unit.recruitSingleBuilding).change();
        }
    });

    $('.input-tu').change(changeInput);
    $('.input-units-per-tu').change(changeInput);

    // TODO REMOVE
    // $('.selectpicker').selectpicker('val', '1002');
    $('.input-unit').val('1002').change();
    $('.input-gp').val('302037');
    $('.input-mn').val('95000');
    $('.input-pp').val('197684');
    $('.input-gp-tu').val('-1317');
    $('.input-mn-tu').val('2319');
    $('.input-mn-max').val('95000');
    $('.input-pp-tu').val('474');
    $('.input-pp-max').val('290000');
    $('.input-taxes').val('70');
    $('.input-units-count').val('25971');
    $('.input-power').val('59659');

    let initialProvince = new Province(
        parseInt($('.input-gp').val()),
        parseInt($('.input-gp-tu').val()),
        parseInt($('.input-mn').val()),
        parseInt($('.input-mn-max').val()),
        parseInt($('.input-mn-tu').val()),
        parseInt($('.input-pp').val()),
        parseInt($('.input-pp-max').val()),
        parseInt($('.input-pp-tu').val()),
        parseInt($('.input-taxes').val()),
        parseInt($('.input-units-count').val()),
        parseInt($('.input-power').val()),
    );

    console.log($('.input-units-count').val());
    console.log(initialProvince);


    let sims = simulate([
        new RecruitRequest(professions[0].units[1],
            parseInt($('.input-tu').val()),
            parseFloat($('.input-units-per-tu').val()))
    ], initialProvince);
    console.log("SIMUL", sims);
    sims.forEach(function(turn) {
        console.log("Turn " + turn.number, turn.province);
    })

    /*    console.log(navigator.clipboard.readText()
            .then(text => {
                console.log('Pasted content: ', text);
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            }));*/
});