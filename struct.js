class Building {
    /**
     *
     * @param {int} id
     * @param {string} name
     * @param {int} maxCount
     */
    constructor(id, name, maxCount) {
        this.id = id;
        this.name = name;
        this.maxCount = maxCount;
    }
}

class Unit {
    /**
     *
     * @param {int} id
     * @param {string} name
     * @param {float} upkeepGold
     * @param {float} upkeepMana
     * @param {float} upkeepPop
     * @param {float} costGold
     * @param {float} costMana
     * @param {float} costPop
     * @param {float} power
     * @param {float} recruitSingleBuilding
     * @param {Building} recruitBuilding
     */
    constructor(id, name,
                upkeepGold, upkeepMana, upkeepPop,
                costGold, costMana, costPop,
                power, recruitSingleBuilding, recruitBuilding) {
        this.id = id;
        this.name = name;
        this.upkeepGold = upkeepGold;
        this.upkeepMana = upkeepMana;
        this.upkeepPop = upkeepPop;
        this.costGold = costGold;
        this.costMana = costMana;
        this.costPop = costPop;
        this.power = power;
        this.recruitSingleBuilding = recruitSingleBuilding;
        this.recruitBuilding = recruitBuilding;
    }
}

class Profession {
    /**
     *
     * @param {string} key
     * @param {string} name
     * @param {Unit[]} units
     */
    constructor(key, name, units) {
        this.key = key;
        this.name = name;
        this.units = units;
    }
}

class RecruitRequest {
    /**
     *
     * @param {Unit} unit
     * @param {int} turns
     * @param {float} unitsPerTurn
     */
    constructor(unit, turns, unitsPerTurn) {
        this.unit = unit;
        this.turns = turns;
        this.unitsPerTurn = unitsPerTurn;
    }
}

class Province {
    constructor(gold, goldPerTuStatic,
                mana, manaMax, manaPerTu,
                pop, popMax, popPerTuStatic,
                power, taxes, unitsCount,
                spellPower, maxSpellEffect) {
        this.gold = gold;
        this.goldPerTuStatic = goldPerTuStatic;
        this.mana = mana;
        this.manaMax = manaMax;
        this.manaPerTu = manaPerTu;
        this.pop = pop;
        this.popMax = popMax;
        this.popPerTuStatic = popPerTuStatic;
        this.power = power;
        this.taxes = taxes;
        this.unitsCount = unitsCount;
        this.spellPower = spellPower;
        this.maxSpellEffect = maxSpellEffect;
    }

    goldPerTuPop() {
        return 0.000078 * this.pop * this.taxes;
    }

    totalGoldPerTu() {
        return this.goldPerTuStatic + this.goldPerTuPop();
    }

    popPerTuPop() {
        return this.pop * (0.0065 - 0.00005 * this.taxes);
    }

    totalPopPerTu() {
        return this.popPerTuStatic + this.popPerTuPop();
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}

class Turn {
    /**
     *
     * @param {int} number
     * @param {Province} province
     * @param goldGained
     * @param manaGained
     * @param popGained
     * @param {Unit} recruitedUnit
     * @param recruitedCount
     * @param recruitedTotal
     * @param {Spell|null} spell
     * @param {string|null} spellText
     */
    constructor(number, province,
                goldGained, manaGained, popGained,
                recruitedUnit, recruitedCount, recruitedTotal,
                spell, spellText) {
        this.number = number;
        this.province = province;
        this.goldGained = goldGained;
        this.manaGained = manaGained;
        this.popGained = popGained;
        this.recruitedUnit = recruitedUnit;
        this.recruitedCount = recruitedCount;
        this.recruitedTotal = recruitedTotal;
        this.spell = spell;
        this.spellText = spellText;
    }
}

class Spell {
    /**
     *
     * @param {string} name
     * @param {float} xp
     * @param {int} turn
     */
    constructor(name, xp, turn) {
        this.name = name;
        this.xp = xp;
        this.turn = turn;
    }

    /**
     * @param {Province} province
     * @returns {Province}
     */
    cast(province) {
        switch(this.name) {
            case 'Klid a mír':
                let extraPop = r(600000 * province.spellPower / 32 * min(this.xp, province.maxSpellEffect));
                province.pop += extraPop;
                return 'Kouzlo magicky přidalo ' + nf0(extraPop) + ' lidí.';

            default:
                return null;
        }
    }
}
