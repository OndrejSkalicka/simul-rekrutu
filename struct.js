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
    constructor(gold, goldPerTu, mana, manaMax, manaPerTu, pop, popMax, popPerTu, power, taxes, unitsCount) {
        this.gold = gold;
        this.goldPerTu = goldPerTu;
        this.mana = mana;
        this.manaMax = manaMax;
        this.manaPerTu = manaPerTu;
        this.pop = pop;
        this.popMax = popMax;
        this.popPerTu = popPerTu;
        this.power = power;
        this.taxes = taxes;
        this.unitsCount = unitsCount;
    }
}

class Turn {
    /**
     *
     * @param {int} number
     * @param {Province} province
     * @param recruitedUnit
     * @param recruitedCount
     * @param recruitedTotal
     */
    constructor(number, province, recruitedUnit, recruitedCount, recruitedTotal) {
        this.number = number;
        this.province = province;
        this.recruitedUnit = recruitedUnit;
        this.recruitedCount = recruitedCount;
        this.recruitedTotal = recruitedTotal;
    }

}