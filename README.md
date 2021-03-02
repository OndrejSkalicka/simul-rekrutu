# simul-rekrutu
Savannah's Toolshopless Simul Rekrutu

## Some queries to help out with data generation

```
SELECT CONCAT(
               'new Unit(',
               id, ', \'',
               jmeno,'\', ',
               plat_z,', ',
               plat_m,', ',
               plat_l,', ',
               rekrut_z,', ',
               rekrut_m,', ',
               rekrut_l,', ',
               power,', ',
               jedn_za_tu,', buildings[',
               rekrut_bud, ']),'
           )
FROM jednotky
WHERE id BETWEEN 1000 AND 6000
```

```
SELECT CONCAT(
    id, ': new Building(',
    id, ', \'',
    nazev, '\', ',
    max, '),'
    )
FROM budovy
WHERE id IN (SELECT DISTINCT rekrut_bud FROM jednotky WHERE rekrut_bud IS NOT NULL);
```