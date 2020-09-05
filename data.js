let buildings = {
    101: new Building(101, "Hřbitov", 25),
    102: new Building(102, "Záhrobí", 15),
    103: new Building(103, "Tajemný hrad", 20),
    104: new Building(104, "Zřícenina", 10),
    105: new Building(105, "Pyramida", 15),
    106: new Building(106, "Ashartská nekropole", 5),
    107: new Building(107, "Sféra Aterah", 25),
    108: new Building(108, "Sféra Vezael", 15),
    109: new Building(109, "Sféra Spinagon", 20),
    110: new Building(110, "Sféra Jeverah", 10),
    111: new Building(111, "Sféra Abishai", 15),
    112: new Building(112, "Sféra Osyluth", 5),
    201: new Building(201, "Cvičiště", 25),
    202: new Building(202, "Klášter", 15),
    203: new Building(203, "Kostel", 20),
    204: new Building(204, "Oltář", 10),
    205: new Building(205, "Katedrála", 15),
    206: new Building(206, "Brána nebes", 5),
    207: new Building(207, "Kasárna", 25),
    208: new Building(208, "Vzdušná stáj", 15),
    209: new Building(209, "Jízdárna", 20),
    210: new Building(210, "Katovna", 10),
    211: new Building(211, "Střelecká akademie", 15),
    212: new Building(212, "Aréna", 5),
    301: new Building(301, "Měsíční tůň", 25),
    302: new Building(302, "Jantarové údolí", 15),
    303: new Building(303, "Mýtina", 20),
    304: new Building(304, "Mystický hvozd", 10),
    305: new Building(305, "Posvátný háj", 15),
    306: new Building(306, "Ohnivý sloup", 5),
    307: new Building(307, "Hluboký les", 25),
    308: new Building(308, "Stromové město", 15),
    309: new Building(309, "Lesní tvrz", 20),
    310: new Building(310, "Porcupium", 10),
    311: new Building(311, "Rokle", 15),
    312: new Building(312, "Skalní hrad", 5),
    401: new Building(401, "Heliactinum", 25),
    402: new Building(402, "Magenergetický hromosvod", 15),
    403: new Building(403, "Héfastiaton", 20),
    404: new Building(404, "Věž magických umění", 10),
    405: new Building(405, "Hirundium", 15),
    406: new Building(406, "Olympus", 5),
    407: new Building(407, "Laboratoř", 25),
    408: new Building(408, "Kamenný důl", 15),
    409: new Building(409, "Strojírna", 20),
    410: new Building(410, "Ledová jeskyně", 10),
    411: new Building(411, "Oblačná hora", 15),
    412: new Building(412, "Skalní jeskyně", 5),
    507: new Building(507, "Ljossalheim", 25),
    508: new Building(508, "Midgard", 15),
    509: new Building(509, "Útgard", 20),
    510: new Building(510, "Niflheim", 10),
    511: new Building(511, "Vanaheim", 15),
    512: new Building(512, "Asgard", 5),
    501: new Building(501, "Mokřad", 25),
    502: new Building(502, "Kamenolom", 15),
    503: new Building(503, "Kráter", 20),
    504: new Building(504, "Zpívající písky", 10),
    505: new Building(505, "Lávové jezero", 15),
    506: new Building(506, "Labyrint světla", 5),
    601: new Building(601, "Oáza", 25),
    602: new Building(602, "Hnízdo", 15),
    603: new Building(603, "Útes", 20),
    604: new Building(604, "Ruina", 10),
    605: new Building(605, "Strž", 15),
    606: new Building(606, "Propast", 5),
    607: new Building(607, "Zahrada Hesperidek", 25),
    608: new Building(608, "Hádes", 15),
    609: new Building(609, "Zbrojírna", 20),
    610: new Building(610, "Helléspont", 10),
    611: new Building(611, "Tesařská dílna", 15),
    612: new Building(612, "Delfská věštírna", 5),
}

let professions = [
    new Profession("CM", "Nekromant", [
        new Unit(1001, "Kostlivec", 0, 0, 0, 0, 0.1, 0, 0.42, 158.7, buildings[101]),
        new Unit(1002, "Zombie", 0.09, 0.02, 0, 1, 0, 0.1, 2.43, 20.62, buildings[101]),
        new Unit(1003, "Stín", 0.2, 0.16, 0.13, 1.9, 0.01, 1.2, 6.18, 8.44, buildings[102]),
        new Unit(1004, "Upír", 0.22, 0.84, 0.1, 3.5, 13, 1, 8.22, 6.8, buildings[103]),
        new Unit(1005, "Fext", 0.86, 2.48, 0.3, 7, 36, 3, 22.46, 2.67, buildings[103]),
        new Unit(1006, "Spektra", 1.57, 2.54, 0.5, 12.6, 50, 5, 38.87, 2.6, buildings[104]),
        new Unit(1007, "Banshee", 2.2, 10.2, 0.8, 18.9, 120, 8, 58.62, 0.87, buildings[105]),
        new Unit(1008, "Mumie", 3.6, 6.6, 1.1, 54.5, 92, 11, 77.95, 0.99, buildings[105]),
        new Unit(1009, "Lich", 10, 26, 2, 112, 260, 20, 199.78, 0.4, buildings[106])
    ]),
    new Profession("CB", "Theurg", [
        new Unit(1013, "Fantóm", 0, 0.04, 0, 1.12, 0, 0, 0.88, 85.12, buildings[107]),
        new Unit(1014, "Přízrak", 0.62, 0, 0, 6, 0, 0, 14, 2.9, buildings[107]),
        new Unit(1016, "Rarach", 1.13, 0, 0.1, 10, 0, 1, 24.2, 2.46, buildings[108]),
        new Unit(1018, "Děs", 1.22, 1.7, 0.2, 16, 17, 2, 26.7, 2.2, buildings[109]),
        new Unit(1019, "Ďábel", 1.6, 3.96, 0.4, 40, 20, 3, 39.02, 1.44, buildings[109]),
        new Unit(1020, "Noční můra", 2.05, 3.05, 0.4, 28.8, 37.5, 3.8, 48.74, 3.01, buildings[110]),
        new Unit(1022, "Hrůza", 4.2, 6, 1.1, 120, 60, 11, 107.59, 0.56, buildings[111]),
        new Unit(1023, "Tempest", 10.08, 12, 1.8, 246, 120, 18, 191.72, 0.61, buildings[112]),
        new Unit(1024, "Dračí démon", 12.1, 11.8, 1.87, 187, 93.5, 20.4, 184.91, 0.31, buildings[111])
    ]),
    new Profession("BM", "Klerik", [
        new Unit(2001, "Štítonoš", 0, 0, 0, 0.1, 0, 0, 0.62, 132, buildings[201]),
        new Unit(2002, "Kopiník", 0.08, 0.01, 0, 0.6, 0, 0, 1.7, 39.5, buildings[201]),
        new Unit(2003, "Mnich", 0.54, 0.8, 0, 1.4, 0, 0, 13.28, 5.8, buildings[202]),
        new Unit(2004, "Křižák", 0.36, 1.8, 0, 3.6, 22, 0, 14.9, 3.8, buildings[203]),
        new Unit(2005, "Apoštol", 0.63, 2.8, 0, 7, 40, 0, 21.34, 2.81, buildings[203]),
        new Unit(2006, "Anděl", 1.48, 3.3, 0, 12.6, 50, 0, 32.35, 3.09, buildings[204]),
        new Unit(2007, "Zealot", 2.9, 11.5, 0, 30.5, 145, 0, 70.43, 0.83, buildings[205]),
        new Unit(2008, "Paladin", 6.2, 13.8, 0, 75.2, 138, 0, 139.02, 0.58, buildings[205]),
        new Unit(2009, "Archanděl", 10, 34, 0, 112, 340, 0, 224.14, 0.43, buildings[206])
    ]),
    new Profession("BB", "Válečník", [
        new Unit(2010, "Pikenýr", 0.04, 0.01, 0, 1, 0, 0, 1.64, 36, buildings[207]),
        new Unit(2011, "Práče", 0.18, 0, 0, 4, 0, 0, 4.58, 7.2, buildings[207]),
        new Unit(2012, "Gryf", 0.4, 0.6, 0, 8, 15, 0, 8.9, 8, buildings[208]),
        new Unit(2013, "Dragoun", 1.21, 0.96, 0, 20, 20, 0, 23.4, 1.6, buildings[209]),
        new Unit(2014, "Husar", 1.67, 2.1, 0, 30, 40, 0, 38.7, 1.65, buildings[209]),
        new Unit(2015, "Bezhlavý rytíř", 5.5, 6.8, 0, 105, 120, 0, 95.9, 1.2, buildings[210]),
        new Unit(2016, "Bílý drak", 7.42, 6.5, 0, 120, 140, 0, 103.4, 0.36, buildings[211]),
        new Unit(2017, "Houfnice", 8.5, 7.65, 0, 160, 150, 0, 132.8, 0.31, buildings[211]),
        new Unit(2018, "Obrněná jízda", 12.6, 10.8, 0, 189, 160, 0, 181.44, 1.34, buildings[212])
    ]),
    new Profession("ZM", "Druid", [
        new Unit(3001, "Satyr", 0.07, 0.01, 0, 0.7, 1.44, 0, 1.69, 33.06, buildings[301]),
        new Unit(3002, "Víla", 0.2, 0.08, 0, 1.4, 0, 0, 4.24, 14.1, buildings[301]),
        new Unit(3003, "Dryáda", 0.31, 0.3, 0, 1.4, 0, 0, 7.41, 6.61, buildings[302]),
        new Unit(3004, "Pegas", 0.3, 0.5, 0, 3.5, 10, 0, 8.22, 7.96, buildings[303]),
        new Unit(3005, "Kentaur", 0.53, 0.85, 0, 7, 20, 0, 13.73, 5.4, buildings[303]),
        new Unit(3006, "Ohnivec", 2, 4.95, 0, 18.9, 100, 0, 51.49, 2.87, buildings[304]),
        new Unit(3007, "Ent", 6.2, 13.9, 0, 25.2, 80, 0, 118.48, 0.4, buildings[305]),
        new Unit(3008, "Jednorožec", 5.5, 12.1, 0, 94.5, 230, 0, 120.17, 0.64, buildings[305]),
        new Unit(3009, "Fénix", 7.3, 26, 0, 112, 340, 0, 178.94, 0.46, buildings[306])
    ]),
    new Profession("ZB", "Hraničář", [
        new Unit(3010, "Vlk", 0.05, 0, 0, 0.84, 0, 0, 1.33, 43.52, buildings[307]),
        new Unit(3011, "Duch stromu", 0.34, 0, 0, 3, 0, 0, 8.28, 3.4, buildings[307]),
        new Unit(3012, "Elfí lučištník", 0.9, 0, 0, 5, 0, 0, 15.81, 3.46, buildings[308]),
        new Unit(3013, "Medvěd", 0.72, 1.43, 0, 16, 15, 0, 17.34, 4.32, buildings[309]),
        new Unit(3014, "Peryton", 0.7, 1, 0, 18, 20, 0, 27.87, 2.2, buildings[309]),
        new Unit(3015, "Obří dikobraz", 4.04, 8, 0, 100, 80, 0, 97.94, 1.07, buildings[310]),
        new Unit(3016, "Zelený drak", 4.7, 6.9, 0, 120, 70, 0, 107.54, 0.64, buildings[311]),
        new Unit(3017, "Gargantua", 7.27, 10, 0, 150, 100, 0, 142.31, 0.53, buildings[311]),
        new Unit(3018, "Zlatý drak", 10.9, 14, 0, 220, 140, 0, 208.62, 0.41, buildings[312])
    ]),
    new Profession("MM", "Mág", [
        new Unit(4001, "Kobold", 0.08, 0.08, 0, 0.3, 3, 0, 1.4, 45, buildings[401]),
        new Unit(4002, "Mámení", 0.07, 0.12, 0, 1.4, 0, 0, 2.28, 25.86, buildings[401]),
        new Unit(4003, "Gargoyl", 0.28, 0.38, 0, 4, 12, 0, 5.74, 13.67, buildings[402]),
        new Unit(4004, "Kulový blesk", 0.36, 0.18, 0, 4.2, 0, 0, 8.52, 4.36, buildings[403]),
        new Unit(4005, "Železná panna", 0.57, 1.42, 0, 11.5, 27, 0, 13.14, 4.8, buildings[403]),
        new Unit(4006, "Čaroděj", 2.68, 6, 0, 25.2, 80, 0, 56.68, 1.97, buildings[404]),
        new Unit(4007, "Zlatá panna", 2.8, 5.47, 0, 37.8, 180, 0, 69.74, 1.1, buildings[405]),
        new Unit(4008, "Mystra", 10.76, 29.4, 0, 189, 500, 0, 177.1, 0.19, buildings[405]),
        new Unit(4009, "Titán", 9.1, 22, 0, 112, 350, 0, 188.16, 1.2, buildings[406])
    ]),
    new Profession("MB", "Alchymista", [
        new Unit(4010, "Dřevěný kolos", 0.09, 0, 0, 1, 0, 0, 1.51, 41.4, buildings[407]),
        new Unit(4011, "Meluzína", 0.14, 0, 0, 3, 0, 0, 3.52, 17.03, buildings[407]),
        new Unit(4012, "Kamenný obr", 0.35, 0.05, 0, 5, 0, 0, 11.1, 5.33, buildings[408]),
        new Unit(4013, "Homunkulus", 0.75, 1.2, 0, 16, 12, 0, 16.75, 3.2, buildings[409]),
        new Unit(4014, "Železný golem", 1.8, 1.8, 0, 23, 16, 0, 32.39, 1.97, buildings[409]),
        new Unit(4015, "Bouřkový obr", 2.7, 4, 0, 50, 40, 0, 58.55, 1.47, buildings[410]),
        new Unit(4016, "Gorgona", 4.2, 5.5, 0, 120, 70, 0, 98.8, 0.76, buildings[411]),
        new Unit(4017, "Mračný obr", 7.52, 10, 0, 205, 100, 0, 144.02, 0.2, buildings[411]),
        new Unit(4018, "Kyklop", 14, 13, 0, 220, 130, 0, 202.88, 1.1, buildings[412])
    ]),
    new Profession("SB", "Barbar", [
        new Unit(5001, "Polární liška", 0.01, 0, 0, 0.2, 0, 0, 0.42, 168.8, buildings[507]),
        new Unit(5002, "Yeti", 0.14, 0, 0.01, 2.9, 0, 0, 3.2, 17.8, buildings[507]),
        new Unit(5003, "Valkýra", 0.65, 1.2, 0, 16, 12, 0, 18.5, 5, buildings[508]),
        new Unit(5004, "Sterling", 1.52, 1.68, 0, 10, 0, 0, 33.6, 1.32, buildings[509]),
        new Unit(5005, "Firbolg", 1.94, 3, 0.05, 23, 30, 3, 44.4, 1.37, buildings[509]),
        new Unit(5006, "Ledový dráček", 5.46, 7.28, 0, 39, 130, 0, 89.31, 1.01, buildings[510]),
        new Unit(5007, "Ledový obr", 5.8, 8.1, 0.5, 18.9, 120, 8, 114.7, 0.42, buildings[511]),
        new Unit(5008, "Remorhaz", 8.4, 14.3, 0.1, 205, 100, 0, 174.4, 0.43, buildings[511]),
        new Unit(5009, "Polární bouře", 12.4, 18.2, 1.8, 220, 110, 20, 218.4, 0.89, buildings[512])
    ]),
    new Profession("SM", "Iluzionista", [
        new Unit(5010, "Gremlin", 0.01, 0, 0, 0, 0.1, 0, 0.44, 105, buildings[501]),
        new Unit(5011, "Vzdušný vír", 0.15, 0.12, 0, 0.7, 0, 0, 4.4, 6.8, buildings[501]),
        new Unit(5012, "Cockatrice", 0.25, 0.26, 0, 1.8, 0, 0, 6, 18.47, buildings[502]),
        new Unit(5013, "Wyverna", 0.36, 0.55, 0, 3.5, 10, 0, 7.6, 7.8, buildings[503]),
        new Unit(5014, "Naga", 0.9, 1.3, 0, 7, 18.5, 0, 16.5, 2.8, buildings[503]),
        new Unit(5015, "Behir", 1.8, 3.8, 0, 12.6, 40, 0, 37.7, 3.84, buildings[504]),
        new Unit(5016, "Písečný démon", 5.72, 12.87, 0, 24.6, 117, 0, 99.06, 0.41, buildings[505]),
        new Unit(5017, "Efreet", 5.38, 12, 0, 94.5, 210, 0, 125.4, 0.55, buildings[505]),
        new Unit(5018, "Arkana", 10.84, 35.6, 0, 112, 350, 0, 172.8, 0.8, buildings[506])
    ]),
    new Profession("FM", "Vědma", [
        new Unit(5501, "Škorpion", 0.16, 0, 0.01, 0, 1.6, 0.2, 4.2, 13.4, buildings[601]),
        new Unit(5502, "Kobra", 0.38, 0, 0.02, 4, 0, 0.5, 9, 4.2, buildings[601]),
        new Unit(5503, "Chiméra", 0.42, 0.8, 0.04, 7, 0, 1, 10.7, 8.6, buildings[602]),
        new Unit(5504, "Harpyje", 0.62, 1.25, 0.05, 6, 10, 1.8, 13.2, 4, buildings[603]),
        new Unit(5505, "Siréna", 1.39, 1.9, 0.08, 9.51, 27.17, 3.94, 25, 1.53, buildings[603]),
        new Unit(5506, "Medúza", 2.2, 8, 0.1, 18.9, 100, 4, 55.6, 2.01, buildings[604]),
        new Unit(5507, "Gérion", 4.2, 4, 0, 25.2, 80, 0, 89.2, 0.91, buildings[605]),
        new Unit(5508, "Erínye", 7, 9, 1, 94.5, 230, 3, 122.1, 0.36, buildings[605]),
        new Unit(5509, "Týfón", 8, 22, 0, 112, 182, 0, 194.2, 1.36, buildings[606])
    ]),
    new Profession("FB", "Amazonka", [
        new Unit(5510, "Nymfa", 0.59, 0, 0, 0, 0.1, 0, 8.4, 3.2, buildings[607]),
        new Unit(5511, "Moira", 0.92, 0, 0, 0, 0.1, 0, 14.2, 1.85, buildings[607]),
        new Unit(5512, "Kerberos", 0.7, 1.2, 0.05, 7, 8, 1, 16.6, 5.89, buildings[608]),
        new Unit(5513, "Korybant", 1.6, 0.1, 0, 14, 12, 0, 25.3, 2.52, buildings[609]),
        new Unit(5514, "Falanga", 2.75, 3.4, 0, 45, 0, 0, 47.8, 1.2, buildings[609]),
        new Unit(5515, "Hoplit", 3, 3.1, 0, 38, 0, 0, 62.5, 2.48, buildings[610]),
        new Unit(5516, "Chariot", 6.7, 6.9, 0, 110, 80, 0, 101.1, 0.42, buildings[611]),
        new Unit(5517, "Balista", 9.97, 0, 0, 98, 0, 0, 127.8, 0.34, buildings[611]),
        new Unit(5518, "Sfinga", 14.2, 45, 2, 128, 220, 25, 197.5, 0.31, buildings[612])
    ])
];

let units = {};

professions.forEach(function (profession) {
    profession.units.forEach(function (unit) {
        units[unit.id] = unit;
    });
});

function spellCallbackPopGold(maxPop, goldPerSpellPower) {
    return function (province, xp) {
        let extraPop = r(maxPop * xp);
        let extraGold = r(goldPerSpellPower * province.spellPower * xp);

        province.pop += extraPop;
        province.gold += extraGold;
        return 'Kouzlo magicky přidalo ' + nf0(extraPop) + ' lidí a ' + nf0(extraGold) + ' zlata.';
    }
}

function spellCallbackGold(goldPerSpellPower) {
    return function (province, xp) {
        let extraGold = r(goldPerSpellPower * province.spellPower * xp);

        province.gold += extraGold;
        return 'Kouzlo magicky přidalo ' + nf0(extraGold) + ' zlata.';
    }
}

function spellCallbackPop(maxPop) {
    return function (province, xp) {
        let extraPop = r(maxPop * xp);

        province.pop += extraPop;
        return 'Kouzlo magicky přidalo ' + nf0(extraPop) + ' lidí.';
    }
}

let spells = [
    new Spell(3505, "Klid a mír", 20, spellCallbackPop(600_000)),
    new Spell(1008, "Láska", 15, spellCallbackPopGold(400_000, 4_000)),
    new Spell(5503, "Ódinův zpěv", 25, spellCallbackPopGold(400_000, 9_000)),
    new Spell(2009, "Populační exploze", 15, spellCallbackPopGold(400_000, 4_000)),
    new Spell(4504, "Poklad", 30, spellCallbackGold(15_000)),
    new Spell(5005, "Blahobyt", 15, spellCallbackPopGold(230_000, 3_000)),
    new Spell(3009, "Harmonie", 20, spellCallbackGold(4_000)),
    new Spell(2505, "Elixír", 15, spellCallbackPop(600_000)),
    new Spell(4007, "Koncentrace", 8, (province, xp) => {
        let extraMana = r(320_000 * xp);

        province.mana += Math.min(province.manaMax, province.mana + extraMana);
        return 'Kouzlo magicky přidalo ' + nf0(extraMana) + ' many.';
    }),
    new Spell(5008, "Štěstí", 15, (province, xp) => {
        let extraMana = r(province.mana * 0.3 * xp);

        province.mana += Math.min(province.manaMax, province.mana + extraMana);
        return 'Kouzlo magicky přidalo ' + nf0(extraMana) + ' many.';
    }),
    new Spell(7005, "Transformace many", 16, (province, xp) => {
        let lostMana = r(270_000 * xp);
        let gainedGold = r(122_500 * xp);

        if (province.mana > lostMana) {
            province.mana -= lostMana;
            province.gold += gainedGold;
            return 'Kouzlo magicky přeměnilo ' + nf0(lostMana) + ' many v ' + nf0(gainedGold) + ' zlata.'
        }

        return 'Nedostatek many pro kouzlo!';
    }),
    new Spell(7004, "Transformace zlata", 10, (province, xp) => {
        let lostGold = r(9_980 + 46_200 * xp);
        let gainedMana = r(52_100 + 357_900 * xp);

        if (province.gold > lostGold) {
            province.gold -= lostGold;
            province.mana += gainedMana;
            return 'Kouzlo magicky přeměnilo ' + nf0(lostGold) + ' zlata v ' + nf0(gainedMana) + ' many.'
        }

        return 'Nedostatek zlata pro kouzlo!';
    }),
];

let spellsByName = {

}
spells.forEach(spell => spellsByName[spell.name] = spell);

let spellsStoredXp = {
}
