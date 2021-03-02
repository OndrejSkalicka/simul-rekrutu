let buildings = {
    101: new Building(101, 'Hřbitov', 25),
    102: new Building(102, 'Záhrobí', 15),
    103: new Building(103, 'Tajemný hrad', 20),
    104: new Building(104, 'Zřícenina', 10),
    105: new Building(105, 'Pyramida', 15),
    106: new Building(106, 'Ashartská nekropole', 5),
    107: new Building(107, 'Sféra Aterah', 25),
    108: new Building(108, 'Sféra Vezael', 15),
    109: new Building(109, 'Sféra Spinagon', 20),
    110: new Building(110, 'Sféra Jeverah', 10),
    111: new Building(111, 'Sféra Abishai', 15),
    112: new Building(112, 'Sféra Osyluth', 5),
    201: new Building(201, 'Cvičiště', 25),
    202: new Building(202, 'Klášter', 15),
    203: new Building(203, 'Kostel', 20),
    204: new Building(204, 'Oltář', 10),
    205: new Building(205, 'Katedrála', 15),
    206: new Building(206, 'Brána nebes', 5),
    207: new Building(207, 'Kasárna', 25),
    208: new Building(208, 'Vzdušná stáj', 15),
    209: new Building(209, 'Jízdárna', 20),
    210: new Building(210, 'Katovna', 10),
    211: new Building(211, 'Střelecká akademie', 15),
    212: new Building(212, 'Aréna', 5),
    301: new Building(301, 'Měsíční tůň', 25),
    302: new Building(302, 'Jantarové údolí', 15),
    303: new Building(303, 'Mýtina', 20),
    304: new Building(304, 'Mystický hvozd', 10),
    305: new Building(305, 'Posvátný háj', 15),
    306: new Building(306, 'Ohnivý sloup', 5),
    307: new Building(307, 'Hluboký les', 25),
    308: new Building(308, 'Stromové město', 15),
    309: new Building(309, 'Lesní tvrz', 20),
    310: new Building(310, 'Porcupium', 10),
    311: new Building(311, 'Rokle', 15),
    312: new Building(312, 'Skalní hrad', 5),
    401: new Building(401, 'Heliactinum', 25),
    402: new Building(402, 'Magenergetický hromosvod', 15),
    403: new Building(403, 'Héfastiaton', 20),
    404: new Building(404, 'Věž magických umění', 10),
    405: new Building(405, 'Hirundium', 15),
    406: new Building(406, 'Olympus', 5),
    407: new Building(407, 'Laboratoř', 25),
    408: new Building(408, 'Kamenný důl', 15),
    409: new Building(409, 'Strojírna', 20),
    410: new Building(410, 'Ledová jeskyně', 10),
    411: new Building(411, 'Oblačná hora', 15),
    412: new Building(412, 'Skalní jeskyně', 5),
    501: new Building(501, 'Mokřad', 25),
    502: new Building(502, 'Kamenolom', 15),
    503: new Building(503, 'Kráter', 20),
    504: new Building(504, 'Zpívající písky', 10),
    505: new Building(505, 'Lávové jezero', 15),
    506: new Building(506, 'Labyrint světla', 5),
    507: new Building(507, 'Ljossalheim', 25),
    508: new Building(508, 'Midgard', 15),
    509: new Building(509, 'Útgard', 20),
    510: new Building(510, 'Niflheim', 10),
    511: new Building(511, 'Vanaheim', 15),
    512: new Building(512, 'Asgard', 5),
    601: new Building(601, 'Oáza', 25),
    602: new Building(602, 'Hnízdo', 15),
    603: new Building(603, 'Útes', 20),
    604: new Building(604, 'Ruina', 10),
    605: new Building(605, 'Strž', 15),
    606: new Building(606, 'Propast', 5),
    607: new Building(607, 'Zahrada Hesperidek', 25),
    608: new Building(608, 'Hádes', 15),
    609: new Building(609, 'Zbrojírna', 20),
    610: new Building(610, 'Helléspont', 10),
    611: new Building(611, 'Tesařská dílna', 15),
    612: new Building(612, 'Delfská věštírna', 5),
}

let professions = [
    new Profession("CM", "Nekromant", [
        new Unit(1001, "Kostlivec", 0.0, 0.0, 0.0, 0.0, 0.11, 0.0, 0.42, 158.7, buildings[101]),
        new Unit(1002, "Zombie", 0.09, 0.03, 0.0, 1.2, 1.2, 0.1, 2.43, 20.62, buildings[101]),
        new Unit(1003, "Stín", 0.22, 0.22, 0.13, 1.9, 2.6, 1.2, 6.18, 8.44, buildings[102]),
        new Unit(1004, "Upír", 0.3, 0.75, 0.1, 3.5, 13.0, 1.0, 8.22, 7.0, buildings[103]),
        new Unit(1005, "Fext", 0.86, 2.48, 0.3, 8.0, 36.0, 3.0, 22.46, 2.55, buildings[103]),
        new Unit(1006, "Spektra", 1.57, 2.54, 0.5, 12.6, 50.0, 5.0, 38.87, 3.3, buildings[104]),
        new Unit(1007, "Banshee", 2.32, 10.2, 0.8, 18.9, 120.0, 8.0, 58.62, 0.87, buildings[105]),
        new Unit(1008, "Mumie", 3.6, 6.6, 1.1, 48.0, 102.0, 11.0, 77.95, 1.01, buildings[105]),
        new Unit(1009, "Lich", 10.0, 26.0, 2.0, 112.0, 260.0, 20.0, 199.78, 0.48, buildings[106]),
    ]),
    new Profession("CB", "Theurg", [
        new Unit(1013, "Fantóm", 0.0, 0.05, 0.0, 0.6, 0.2, 0.0, 0.96, 68.0, buildings[107]),
        new Unit(1014, "Přízrak", 0.62, 0.06, 0.0, 6.0, 0.6, 0.0, 14.0, 2.9, buildings[107]),
        new Unit(1016, "Rarach", 1.13, 0.3, 0.1, 10.0, 6.0, 1.0, 24.2, 3.1, buildings[108]),
        new Unit(1018, "Děs", 1.22, 1.7, 0.2, 16.0, 17.0, 2.0, 26.7, 2.25, buildings[109]),
        new Unit(1019, "Ďábel", 1.7, 3.6, 0.4, 20.0, 26.0, 3.0, 39.02, 1.46, buildings[109]),
        new Unit(1020, "Noční můra", 2.05, 3.05, 0.4, 28.8, 37.5, 3.8, 48.74, 2.85, buildings[110]),
        new Unit(1022, "Hrůza", 4.6, 6.0, 1.1, 110.0, 50.0, 11.0, 107.59, 0.56, buildings[111]),
        new Unit(1023, "Tempest", 12.0, 8.0, 1.8, 150.0, 100.0, 18.0, 191.72, 0.55, buildings[112]),
        new Unit(1024, "Dračí démon", 10.0, 13.0, 1.87, 170.0, 240.0, 20.4, 184.91, 0.38, buildings[111]),
    ]),
    new Profession("BM", "Klerik", [
        new Unit(2001, "Štítonoš", 0.0, 0.0, 0.0, 0.4, 0.0, 0.0, 0.62, 107.0, buildings[201]),
        new Unit(2002, "Kopiník", 0.08, 0.02, 0.0, 0.65, 0.0, 0.0, 1.7, 35.0, buildings[201]),
        new Unit(2003, "Mnich", 0.54, 0.8, 0.0, 2.8, 4.2, 0.0, 13.28, 5.8, buildings[202]),
        new Unit(2004, "Křižák", 0.36, 1.85, 0.0, 3.6, 18.0, 0.0, 14.9, 4.1, buildings[203]),
        new Unit(2005, "Apoštol", 0.63, 2.5, 0.0, 7.0, 26.0, 0.0, 21.34, 2.81, buildings[203]),
        new Unit(2006, "Anděl", 1.42, 3.3, 0.0, 12.6, 33.0, 0.0, 32.35, 3.9, buildings[204]),
        new Unit(2007, "Zealot", 2.9, 11.5, 0.0, 30.5, 130.0, 0.0, 70.43, 0.83, buildings[205]),
        new Unit(2008, "Paladin", 6.2, 13.8, 0.0, 80.0, 145.0, 0.0, 139.02, 0.58, buildings[205]),
        new Unit(2009, "Archanděl", 10.0, 34.0, 0.0, 150.0, 450.0, 0.0, 224.14, 0.43, buildings[206]),
    ]),
    new Profession("BB", "Válečník", [
        new Unit(2010, "Pikenýr", 0.04, 0.0, 0.0, 0.75, 0.0, 0.0, 1.64, 37.0, buildings[207]),
        new Unit(2011, "Práče", 0.18, 0.0, 0.0, 3.0, 0.0, 0.0, 4.58, 9.0, buildings[207]),
        new Unit(2012, "Gryf", 0.4, 0.5, 0.0, 7.5, 9.0, 0.0, 8.9, 9.4, buildings[208]),
        new Unit(2013, "Dragoun", 1.5, 0.95, 0.0, 25.0, 0.0, 0.0, 28.0, 1.5, buildings[209]),
        new Unit(2014, "Husar", 1.85, 1.7, 0.0, 35.0, 0.0, 0.0, 38.7, 1.63, buildings[209]),
        new Unit(2015, "Bezhlavý rytíř", 4.7, 7.4, 0.0, 95.0, 140.0, 0.0, 95.9, 1.27, buildings[210]),
        new Unit(2016, "Bílý drak", 6.3, 7.8, 0.0, 100.0, 190.0, 0.0, 103.4, 0.36, buildings[211]),
        new Unit(2017, "Houfnice", 9.0, 0.0, 0.0, 160.0, 0.0, 0.0, 132.8, 0.31, buildings[211]),
        new Unit(2018, "Obrněná jízda", 12.1, 10.0, 0.0, 200.0, 0.0, 0.0, 181.44, 1.31, buildings[212]),
    ]),
    new Profession("ZM", "Druid", [
        new Unit(3001, "Satyr", 0.07, 0.07, 0.0, 0.4, 1.0, 0.0, 1.69, 33.06, buildings[301]),
        new Unit(3002, "Víla", 0.18, 0.08, 0.0, 1.4, 1.4, 0.0, 4.24, 11.0, buildings[301]),
        new Unit(3003, "Dryáda", 0.28, 0.6, 0.0, 2.2, 0.5, 0.0, 7.41, 6.61, buildings[302]),
        new Unit(3004, "Pegas", 0.3, 0.5, 0.0, 3.5, 10.0, 0.0, 8.22, 7.55, buildings[303]),
        new Unit(3005, "Kentaur", 0.53, 0.85, 0.0, 6.3, 20.0, 0.0, 13.73, 5.4, buildings[303]),
        new Unit(3006, "Ohnivec", 2.0, 4.95, 0.0, 18.9, 90.0, 0.0, 51.49, 2.6, buildings[304]),
        new Unit(3007, "Ent", 5.0, 15.0, 0.0, 30.0, 90.0, 0.0, 118.48, 0.47, buildings[305]),
        new Unit(3008, "Jednorožec", 5.5, 12.1, 0.0, 85.0, 230.0, 0.0, 120.17, 0.66, buildings[305]),
        new Unit(3009, "Fénix", 7.3, 26.0, 0.0, 100.0, 400.0, 0.0, 178.94, 0.56, buildings[306]),
    ]),
    new Profession("ZB", "Hraničář", [
        new Unit(3010, "Vlk", 0.05, 0.0, 0.0, 0.9, 0.0, 0.0, 1.4, 41.5, buildings[307]),
        new Unit(3011, "Duch stromu", 0.34, 0.14, 0.0, 3.5, 1.5, 0.0, 8.28, 5.1, buildings[307]),
        new Unit(3012, "Elfí lučištník", 0.82, 0.15, 0.0, 8.5, 1.5, 0.0, 15.81, 3.46, buildings[308]),
        new Unit(3013, "Medvěd", 0.8, 0.8, 0.0, 13.0, 9.0, 0.0, 17.34, 4.1, buildings[309]),
        new Unit(3014, "Peryton", 0.7, 0.35, 0.0, 14.0, 4.0, 0.0, 27.87, 2.4, buildings[309]),
        new Unit(3015, "Obří dikobraz", 4.7, 6.0, 0.0, 90.0, 80.0, 0.0, 97.94, 0.95, buildings[310]),
        new Unit(3016, "Zelený drak", 5.2, 6.9, 0.0, 80.0, 105.0, 0.0, 107.54, 0.73, buildings[311]),
        new Unit(3017, "Gargantua", 7.27, 10.0, 0.0, 135.0, 100.0, 0.0, 142.31, 0.54, buildings[311]),
        new Unit(3018, "Zlatý drak", 10.9, 14.0, 0.0, 250.0, 330.0, 0.0, 208.62, 0.45, buildings[312]),
    ]),
    new Profession("MM", "Mág", [
        new Unit(4001, "Kobold", 0.06, 0.1, 0.0, 0.4, 2.8, 0.0, 1.7, 35.0, buildings[401]),
        new Unit(4002, "Mámení", 0.07, 0.06, 0.0, 0.7, 0.7, 0.0, 2.28, 25.86, buildings[401]),
        new Unit(4003, "Gargoyl", 0.26, 0.4, 0.0, 3.0, 12.0, 0.0, 5.74, 13.9, buildings[402]),
        new Unit(4004, "Kulový blesk", 0.32, 0.32, 0.0, 2.1, 6.3, 0.0, 8.52, 6.5, buildings[403]),
        new Unit(4005, "Železná panna", 0.55, 1.42, 0.0, 5.5, 27.0, 0.0, 13.14, 4.85, buildings[403]),
        new Unit(4006, "Čaroděj", 2.4, 6.0, 0.0, 24.0, 120.0, 0.0, 56.68, 1.75, buildings[404]),
        new Unit(4007, "Zlatá panna", 2.8, 5.47, 0.0, 37.8, 90.0, 0.0, 69.74, 1.3, buildings[405]),
        new Unit(4008, "Mystra", 9.0, 29.4, 0.0, 170.0, 170.0, 0.0, 177.1, 0.19, buildings[405]),
        new Unit(4009, "Titán", 8.7, 22.0, 0.0, 100.0, 385.0, 0.0, 188.16, 1.31, buildings[406]),
    ]),
    new Profession("MB", "Alchymista", [
        new Unit(4010, "Dřevěný kolos", 0.08, 0.0, 0.0, 0.95, 0.0, 0.0, 1.51, 39.0, buildings[407]),
        new Unit(4011, "Meluzína", 0.14, 0.1, 0.0, 2.9, 1.1, 0.0, 3.52, 16.2, buildings[407]),
        new Unit(4012, "Kamenný obr", 0.35, 0.05, 0.0, 10.0, 1.5, 0.0, 11.1, 6.0, buildings[408]),
        new Unit(4013, "Homunkulus", 0.7, 1.2, 0.0, 12.0, 9.0, 0.0, 16.75, 3.85, buildings[409]),
        new Unit(4014, "Železný golem", 1.8, 1.6, 0.0, 23.0, 16.0, 0.0, 32.39, 1.95, buildings[409]),
        new Unit(4015, "Bouřkový obr", 3.0, 3.3, 0.0, 50.0, 40.0, 0.0, 58.55, 1.47, buildings[410]),
        new Unit(4016, "Gorgona", 4.4, 5.5, 0.0, 110.0, 70.0, 0.0, 98.8, 0.85, buildings[411]),
        new Unit(4017, "Mračný obr", 7.52, 9.0, 0.0, 155.0, 150.0, 0.0, 144.02, 0.23, buildings[411]),
        new Unit(4018, "Kyklop", 13.7, 12.3, 0.0, 240.0, 130.0, 0.0, 202.88, 1.14, buildings[412]),
    ]),
    new Profession("SB", "Barbar", [
        new Unit(5001, "Polární liška", 0.01, 0.0, 0.0, 0.2, 0.0, 0.0, 0.42, 140.0, buildings[507]),
        new Unit(5002, "Yeti", 0.14, 0.0, 0.01, 2.1, 0.0, 1.0, 3.2, 17.8, buildings[507]),
        new Unit(5003, "Valkýra", 0.72, 1.2, 0.0, 14.0, 12.0, 0.0, 18.5, 5.0, buildings[508]),
        new Unit(5004, "Sterling", 1.75, 1.5, 0.0, 17.0, 4.0, 0.0, 33.6, 1.32, buildings[509]),
        new Unit(5005, "Firbolg", 2.05, 2.7, 0.0, 25.0, 22.0, 0.0, 44.4, 1.4, buildings[509]),
        new Unit(5006, "Ledový dráček", 5.0, 7.28, 0.0, 39.0, 110.0, 0.0, 89.31, 1.01, buildings[510]),
        new Unit(5007, "Ledový obr", 5.8, 8.1, 0.0, 75.0, 95.0, 0.0, 114.7, 0.42, buildings[511]),
        new Unit(5008, "Remorhaz", 8.4, 13.3, 1.0, 160.0, 100.0, 50.0, 174.4, 0.45, buildings[511]),
        new Unit(5009, "Polární bouře", 12.4, 18.2, 1.8, 220.0, 125.0, 60.0, 218.4, 0.94, buildings[512]),
    ]),
    new Profession("SM", "Iluzionista", [
        new Unit(5010, "Gremlin", 0.03, 0.0, 0.0, 0.4, 0.0, 0.0, 0.88, 54.0, buildings[501]),
        new Unit(5011, "Vzdušný vír", 0.15, 0.2, 0.0, 1.0, 3.0, 0.0, 4.4, 9.0, buildings[501]),
        new Unit(5012, "Cockatrice", 0.24, 0.28, 0.0, 1.8, 3.6, 0.0, 6.0, 16.5, buildings[502]),
        new Unit(5013, "Wyverna", 0.36, 0.55, 0.0, 3.5, 10.0, 0.0, 7.6, 8.5, buildings[503]),
        new Unit(5014, "Naga", 0.8, 1.3, 0.0, 7.0, 18.5, 0.0, 16.5, 2.8, buildings[503]),
        new Unit(5015, "Behir", 1.67, 3.8, 0.0, 12.0, 60.0, 0.0, 37.7, 3.4, buildings[504]),
        new Unit(5016, "Písečný démon", 5.2, 12.87, 0.0, 35.0, 120.0, 0.0, 99.06, 0.41, buildings[505]),
        new Unit(5017, "Efreet", 5.38, 12.0, 0.0, 85.0, 210.0, 0.0, 125.4, 0.57, buildings[505]),
        new Unit(5018, "Arkana", 10.84, 35.6, 0.0, 105.0, 350.0, 0.0, 172.8, 0.8, buildings[506]),
    ]),
    new Profession("FM", "Vědma", [
        new Unit(5501, "Škorpion", 0.16, 0.0, 0.0, 2.0, 0.0, 0.0, 4.2, 13.4, buildings[601]),
        new Unit(5502, "Kobra", 0.38, 0.0, 0.04, 4.0, 0.0, 0.0, 9.0, 4.4, buildings[601]),
        new Unit(5503, "Chiméra", 0.42, 0.8, 0.0, 7.0, 10.0, 0.0, 10.7, 8.6, buildings[602]),
        new Unit(5504, "Harpyje", 0.62, 1.25, 0.0, 6.0, 18.0, 0.0, 13.2, 4.2, buildings[603]),
        new Unit(5505, "Siréna", 1.26, 1.9, 0.17, 9.51, 27.17, 0.0, 25.0, 1.53, buildings[603]),
        new Unit(5506, "Medúza", 2.2, 8.0, 0.2, 18.9, 100.0, 0.0, 55.6, 1.7, buildings[604]),
        new Unit(5507, "Gérion", 4.2, 7.0, 0.0, 55.0, 90.0, 0.0, 89.2, 0.91, buildings[605]),
        new Unit(5508, "Erínye", 6.5, 10.5, 1.0, 90.0, 210.0, 0.0, 122.1, 0.31, buildings[605]),
        new Unit(5509, "Týfón", 8.0, 22.0, 0.0, 112.0, 212.0, 0.0, 194.2, 1.36, buildings[606]),
    ]),
    new Profession("FB", "Amazonka", [
        new Unit(5510, "Nymfa", 0.5, 0.15, 0.02, 0.0, 5.0, 0.0, 8.4, 4.0, buildings[607]),
        new Unit(5511, "Moira", 0.87, 0.2, 0.02, 0.0, 7.0, 0.0, 14.2, 2.8, buildings[607]),
        new Unit(5512, "Kerberos", 0.7, 1.2, 0.05, 7.0, 12.0, 0.0, 16.6, 5.89, buildings[608]),
        new Unit(5513, "Korybant", 1.15, 0.0, 0.0, 18.0, 0.0, 0.0, 25.3, 2.6, buildings[609]),
        new Unit(5514, "Falanga", 3.0, 0.0, 0.0, 50.0, 0.0, 0.0, 47.8, 1.22, buildings[609]),
        new Unit(5515, "Hoplit", 3.3, 0.0, 0.0, 45.0, 0.0, 0.0, 62.5, 2.3, buildings[610]),
        new Unit(5516, "Chariot", 6.7, 0.0, 0.0, 125.0, 0.0, 0.0, 101.1, 0.65, buildings[611]),
        new Unit(5517, "Balista", 8.8, 0.0, 0.0, 200.0, 0.0, 0.0, 127.8, 0.34, buildings[611]),
        new Unit(5518, "Sfinga", 14.2, 9.5, 2.4, 160.0, 320.0, 80.0, 197.5, 0.4, buildings[612]),
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

function spellCallbackPopPowerGold(popPerSpellPower, goldPerSpellPower) {
    return function (province, xp) {
        let extraPop = r(popPerSpellPower * province.spellPower * xp);
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
    new Spell(3505, "Klid a mír", 20, spellCallbackPop(500_000)),
    new Spell(1008, "Láska", 15, spellCallbackPopGold(400_000, 4_500)),
    new Spell(5503, "Ódinův zpěv", 25, spellCallbackPopGold(250_000, 7_500)),
    new Spell(2009, "Populační exploze", 15, spellCallbackPopGold(400_000, 4_666)),
    new Spell(4504, "Poklad", 30, spellCallbackGold(12_500)),
    new Spell(5005, "Blahobyt", 15, spellCallbackPopPowerGold(5_000, 3_000)),
    new Spell(3009, "Harmonie", 20, spellCallbackGold(4_000)),
    new Spell(2505, "Elixír", 15, spellCallbackPop(600_000)),
    new Spell(4007, "Koncentrace", 8, (province, xp) => {
        let extraMana = r(province.manaMax * 0.3 * xp);

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

let spellsByName = {}
spells.forEach(spell => spellsByName[spell.name] = spell);

let spellsStoredXp = {}
