/* Fotos: Wikimedia Commons (CC). s = tarjeta, l = portada/hero */
const IMG = {
 "dus_city": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rheinuferpromenade%2C_D%C3%BCsseldorf%2C_Germany_at_night.jpg/960px-Rheinuferpromenade%2C_D%C3%BCsseldorf%2C_Germany_at_night.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rheinuferpromenade%2C_D%C3%BCsseldorf%2C_Germany_at_night.jpg/1280px-Rheinuferpromenade%2C_D%C3%BCsseldorf%2C_Germany_at_night.jpg"
 },
 "dus_rheinufer": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/D%C3%BCsseldorf_Rheinuferpromenade.jpg/960px-D%C3%BCsseldorf_Rheinuferpromenade.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/D%C3%BCsseldorf_Rheinuferpromenade.jpg/1280px-D%C3%BCsseldorf_Rheinuferpromenade.jpg"
 },
 "dus_koebogen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/D%C3%BCsseldorf%2C_K%C3%B6-Bogen%2C_Februar_2019.jpg/960px-D%C3%BCsseldorf%2C_K%C3%B6-Bogen%2C_Februar_2019.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/D%C3%BCsseldorf%2C_K%C3%B6-Bogen%2C_Februar_2019.jpg/1280px-D%C3%BCsseldorf%2C_K%C3%B6-Bogen%2C_Februar_2019.jpg"
 },
 "dus_altstadt": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Altstadt_in_D%C3%BCsseldorf_-_panoramio_%281%29.jpg/960px-Altstadt_in_D%C3%BCsseldorf_-_panoramio_%281%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Altstadt_in_D%C3%BCsseldorf_-_panoramio_%281%29.jpg/1280px-Altstadt_in_D%C3%BCsseldorf_-_panoramio_%281%29.jpg"
 },
 "dus_engel": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Weihnachtsmarkt_der_D%C3%BCsseldorfer_Altstadt.jpg/960px-Weihnachtsmarkt_der_D%C3%BCsseldorfer_Altstadt.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Weihnachtsmarkt_der_D%C3%BCsseldorfer_Altstadt.jpg/1280px-Weihnachtsmarkt_der_D%C3%BCsseldorfer_Altstadt.jpg"
 },
 "dus_wm_rathaus": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/D%C3%BCsseldorf%2C_Weihnachtsmarkt_vor_dem_Rathaus%2C_Dezember_2022.jpg/960px-D%C3%BCsseldorf%2C_Weihnachtsmarkt_vor_dem_Rathaus%2C_Dezember_2022.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/D%C3%BCsseldorf%2C_Weihnachtsmarkt_vor_dem_Rathaus%2C_Dezember_2022.jpg/1280px-D%C3%BCsseldorf%2C_Weihnachtsmarkt_vor_dem_Rathaus%2C_Dezember_2022.jpg"
 },
 "dus_wm2": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/D%C3%BCsseldorf%2C_Weihnachtsmarkt_2018%2C_vor_dem_Rathaus_%281%29.jpg/960px-D%C3%BCsseldorf%2C_Weihnachtsmarkt_2018%2C_vor_dem_Rathaus_%281%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/D%C3%BCsseldorf%2C_Weihnachtsmarkt_2018%2C_vor_dem_Rathaus_%281%29.jpg/1280px-D%C3%BCsseldorf%2C_Weihnachtsmarkt_2018%2C_vor_dem_Rathaus_%281%29.jpg"
 },
 "dus_riesenrad": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burgplatz_Riesenrad_%2851249312135%29.jpg/960px-Burgplatz_Riesenrad_%2851249312135%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burgplatz_Riesenrad_%2851249312135%29.jpg/1280px-Burgplatz_Riesenrad_%2851249312135%29.jpg"
 },
 "dus_schlossturm": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Duesseldorf_Lambertus_Burgplatz.jpg/960px-Duesseldorf_Lambertus_Burgplatz.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Duesseldorf_Lambertus_Burgplatz.jpg/1280px-Duesseldorf_Lambertus_Burgplatz.jpg"
 },
 "dus_medienhafen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/D_medienhafen.jpg/960px-D_medienhafen.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/c/c6/D_medienhafen.jpg"
 },
 "dus_japan": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tokyo_Ramen%2C_D%C3%BCsseldorf%2C_Immermannstra%C3%9Fe_%28Februar_2021%29.jpg/960px-Tokyo_Ramen%2C_D%C3%BCsseldorf%2C_Immermannstra%C3%9Fe_%28Februar_2021%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tokyo_Ramen%2C_D%C3%BCsseldorf%2C_Immermannstra%C3%9Fe_%28Februar_2021%29.jpg/1280px-Tokyo_Ramen%2C_D%C3%BCsseldorf%2C_Immermannstra%C3%9Fe_%28Februar_2021%29.jpg"
 },
 "dus_uerige": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/D%C3%BCsseldorf-Altstadt_Uerige.jpg/960px-D%C3%BCsseldorf-Altstadt_Uerige.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/D%C3%BCsseldorf-Altstadt_Uerige.jpg/1280px-D%C3%BCsseldorf-Altstadt_Uerige.jpg"
 },
 "dus_schiffchen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/D%C3%BCsseldorf%2C_Zum_Schiffchen%2C_April_2017_%281%29.jpg/960px-D%C3%BCsseldorf%2C_Zum_Schiffchen%2C_April_2017_%281%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/D%C3%BCsseldorf%2C_Zum_Schiffchen%2C_April_2017_%281%29.jpg/1280px-D%C3%BCsseldorf%2C_Zum_Schiffchen%2C_April_2017_%281%29.jpg"
 },
 "dus_carlsplatz": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/D%C3%BCsseldorf_Carlsplatz%2C_Markt_Gang_B%2C_Juni_2023.JPG/960px-D%C3%BCsseldorf_Carlsplatz%2C_Markt_Gang_B%2C_Juni_2023.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/D%C3%BCsseldorf_Carlsplatz%2C_Markt_Gang_B%2C_Juni_2023.JPG/1280px-D%C3%BCsseldorf_Carlsplatz%2C_Markt_Gang_B%2C_Juni_2023.JPG"
 },
 "dus_hofgarten": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/0/00/Duesseldorf_Hofgarten.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/0/00/Duesseldorf_Hofgarten.jpg"
 },
 "cgn_dom": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg/960px-K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg/1280px-K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg"
 },
 "cgn_wmdom": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dom_mit_Weihnachtsmarkt_2011.jpg/960px-Dom_mit_Weihnachtsmarkt_2011.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dom_mit_Weihnachtsmarkt_2011.jpg/1280px-Dom_mit_Weihnachtsmarkt_2011.jpg"
 },
 "cgn_heinzel": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/K%C3%B6ln_Heinzels_Winterm%C3%A4rchen.jpg/960px-K%C3%B6ln_Heinzels_Winterm%C3%A4rchen.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/K%C3%B6ln_Heinzels_Winterm%C3%A4rchen.jpg/1280px-K%C3%B6ln_Heinzels_Winterm%C3%A4rchen.jpg"
 },
 "cgn_engel": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Heinzels_Winterm%C3%A4rchen_%2852615446389%29.jpg/960px-Heinzels_Winterm%C3%A4rchen_%2852615446389%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Heinzels_Winterm%C3%A4rchen_%2852615446389%29.jpg/1280px-Heinzels_Winterm%C3%A4rchen_%2852615446389%29.jpg"
 },
 "cgn_choco": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Schoko_Koeln_20061015.jpg/960px-Schoko_Koeln_20061015.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Schoko_Koeln_20061015.jpg"
 },
 "cgn_bridge": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Hohenzollernbr%C3%BCcke_K%C3%B6ln_von_oben.jpg/960px-Hohenzollernbr%C3%BCcke_K%C3%B6ln_von_oben.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Hohenzollernbr%C3%BCcke_K%C3%B6ln_von_oben.jpg/1280px-Hohenzollernbr%C3%BCcke_K%C3%B6ln_von_oben.jpg"
 },
 "cgn_martin": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Koeln_gross_st_martin.jpg/960px-Koeln_gross_st_martin.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Koeln_gross_st_martin.jpg"
 },
 "cgn_kranhaus": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Kranh%C3%A4user_2013-06-14-05.JPG/960px-Kranh%C3%A4user_2013-06-14-05.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Kranh%C3%A4user_2013-06-14-05.JPG/1280px-Kranh%C3%A4user_2013-06-14-05.JPG"
 },
 "cgn_triangle": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/K%C3%B6lnTriangle_%280684%29.jpg/960px-K%C3%B6lnTriangle_%280684%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/K%C3%B6lnTriangle_%280684%29.jpg/1280px-K%C3%B6lnTriangle_%280684%29.jpg"
 },
 "cgn_ludwig": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Museum_Ludwig_002.jpg/960px-Museum_Ludwig_002.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Museum_Ludwig_002.jpg/1280px-Museum_Ludwig_002.jpg"
 },
 "cgn_4711": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/4711-Logo_am_Haus_in_der_Glockengasse_2011-3117.jpg/960px-4711-Logo_am_Haus_in_der_Glockengasse_2011-3117.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/4711-Logo_am_Haus_in_der_Glockengasse_2011-3117.jpg/1280px-4711-Logo_am_Haus_in_der_Glockengasse_2011-3117.jpg"
 },
 "cgn_frueh": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Zunft-K%C3%B6lsch_Glas.JPG/960px-Zunft-K%C3%B6lsch_Glas.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/0/09/Zunft-K%C3%B6lsch_Glas.JPG"
 },
 "cgn_koelsch": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Zunft-K%C3%B6lsch_Glas.JPG/960px-Zunft-K%C3%B6lsch_Glas.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/0/09/Zunft-K%C3%B6lsch_Glas.JPG"
 },
 "cgn_reibekuchen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Kartoffelpuffer.jpg/960px-Kartoffelpuffer.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Kartoffelpuffer.jpg/1280px-Kartoffelpuffer.jpg"
 },
 "cgn_halvehahn": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2018-10-28-Halve_Hahn-9090.jpg/960px-2018-10-28-Halve_Hahn-9090.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2018-10-28-Halve_Hahn-9090.jpg/1280px-2018-10-28-Halve_Hahn-9090.jpg"
 },
 "mst_city": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Maastricht_sunset.jpg/960px-Maastricht_sunset.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Maastricht_sunset.jpg/1280px-Maastricht_sunset.jpg"
 },
 "mst_magisch": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2022_Magisch_Maastricht_%2806%29.jpg/960px-2022_Magisch_Maastricht_%2806%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2022_Magisch_Maastricht_%2806%29.jpg/1280px-2022_Magisch_Maastricht_%2806%29.jpg"
 },
 "mst_vrijthof": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Vrijthof_-_Maastricht%2C_Holland_-_panoramio.jpg/960px-Vrijthof_-_Maastricht%2C_Holland_-_panoramio.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Vrijthof_-_Maastricht%2C_Holland_-_panoramio.jpg/1280px-Vrijthof_-_Maastricht%2C_Holland_-_panoramio.jpg"
 },
 "mst_servaas": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Maastricht%2C_de_Sint_Servaasbasiliek_op_het_Vrijhof_foto8_2011-01-30_13.01.JPG/960px-Maastricht%2C_de_Sint_Servaasbasiliek_op_het_Vrijhof_foto8_2011-01-30_13.01.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Maastricht%2C_de_Sint_Servaasbasiliek_op_het_Vrijhof_foto8_2011-01-30_13.01.JPG/1280px-Maastricht%2C_de_Sint_Servaasbasiliek_op_het_Vrijhof_foto8_2011-01-30_13.01.JPG"
 },
 "mst_brug": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Maastricht%2C_Sint_Servaasbrug_-_montage.jpg/960px-Maastricht%2C_Sint_Servaasbrug_-_montage.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Maastricht%2C_Sint_Servaasbrug_-_montage.jpg/1280px-Maastricht%2C_Sint_Servaasbrug_-_montage.jpg"
 },
 "mst_stadhuis": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Maastricht_2010-30-03_%E2%80%93_Stadthaus_am_Markt_-_panoramio_%28cropped%29.jpg/960px-Maastricht_2010-30-03_%E2%80%93_Stadthaus_am_Markt_-_panoramio_%28cropped%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Maastricht_2010-30-03_%E2%80%93_Stadthaus_am_Markt_-_panoramio_%28cropped%29.jpg/1280px-Maastricht_2010-30-03_%E2%80%93_Stadthaus_am_Markt_-_panoramio_%28cropped%29.jpg"
 },
 "mst_olv": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/c/c0/OLV-01_%28cropped%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/c/c0/OLV-01_%28cropped%29.jpg"
 },
 "mst_olvplein": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Maastricht_platz_vor_liebfrauenkirche.jpg/960px-Maastricht_platz_vor_liebfrauenkirche.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Maastricht_platz_vor_liebfrauenkirche.jpg"
 },
 "mst_helpoort": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Maastricht_Helpoort_BW_2017-08-19_13-58-28.jpg/960px-Maastricht_Helpoort_BW_2017-08-19_13-58-28.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Maastricht_Helpoort_BW_2017-08-19_13-58-28.jpg/1280px-Maastricht_Helpoort_BW_2017-08-19_13-58-28.jpg"
 },
 "mst_molen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Maastricht-Bisschopsmolen-1.JPG/960px-Maastricht-Bisschopsmolen-1.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Maastricht-Bisschopsmolen-1.JPG/1280px-Maastricht-Bisschopsmolen-1.JPG"
 },
 "mst_geis": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mestreechter_Geis_Mari_Andriessen_Het_Bat_Maastricht.JPG/960px-Mestreechter_Geis_Mari_Andriessen_Het_Bat_Maastricht.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mestreechter_Geis_Mari_Andriessen_Het_Bat_Maastricht.JPG/1280px-Mestreechter_Geis_Mari_Andriessen_Het_Bat_Maastricht.JPG"
 },
 "mst_wyck": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Maastricht%2C_stadszicht_over_de_Maas_met_de_Sint-Janskerk_RM27704%2C_de_Augustijnenkerk_RM27612_en_de_Sint-Servaasbasiliek_RM27671_2022-04-03_10.00.jpg/960px-Maastricht%2C_stadszicht_over_de_Maas_met_de_Sint-Janskerk_RM27704%2C_de_Augustijnenkerk_RM27612_en_de_Sint-Servaasbasiliek_RM27671_2022-04-03_10.00.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Maastricht%2C_stadszicht_over_de_Maas_met_de_Sint-Janskerk_RM27704%2C_de_Augustijnenkerk_RM27612_en_de_Sint-Servaasbasiliek_RM27671_2022-04-03_10.00.jpg/1280px-Maastricht%2C_stadszicht_over_de_Maas_met_de_Sint-Janskerk_RM27704%2C_de_Augustijnenkerk_RM27612_en_de_Sint-Servaasbasiliek_RM27671_2022-04-03_10.00.jpg"
 },
 "mst_dominicanen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Dominicanenkerkplein%2C_Maastricht%2C_Netherlands_-_panoramio_%289a%29_%28cropped%29.jpg/960px-Dominicanenkerkplein%2C_Maastricht%2C_Netherlands_-_panoramio_%289a%29_%28cropped%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Dominicanenkerkplein%2C_Maastricht%2C_Netherlands_-_panoramio_%289a%29_%28cropped%29.jpg/1280px-Dominicanenkerkplein%2C_Maastricht%2C_Netherlands_-_panoramio_%289a%29_%28cropped%29.jpg"
 },
 "mst_vlaai": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Kirsch-Vlario.jpg/960px-Kirsch-Vlario.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Kirsch-Vlario.jpg/1280px-Kirsch-Vlario.jpg"
 },
 "food_currywurst": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/20220430_currywurst.jpg/960px-20220430_currywurst.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/20220430_currywurst.jpg/1280px-20220430_currywurst.jpg"
 },
 "food_gluehwein": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Gl%C3%BChwein_Weinnachtsmarkt_OS.JPG/960px-Gl%C3%BChwein_Weinnachtsmarkt_OS.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Gl%C3%BChwein_Weinnachtsmarkt_OS.JPG/1280px-Gl%C3%BChwein_Weinnachtsmarkt_OS.JPG"
 },
 "food_haxe": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/5/54/00ane_Haxen.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/5/54/00ane_Haxen.jpg"
 },
 "food_ramen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Shoyu_Ramen%EF%BC%88Tokyo_Ramen%EF%BC%89_-_01.jpg/960px-Shoyu_Ramen%EF%BC%88Tokyo_Ramen%EF%BC%89_-_01.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Shoyu_Ramen%EF%BC%88Tokyo_Ramen%EF%BC%89_-_01.jpg/1280px-Shoyu_Ramen%EF%BC%88Tokyo_Ramen%EF%BC%89_-_01.jpg"
 },
 "food_frites": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG"
 },
 "food_stollen": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Stollen-Dresdner_Christstollen.jpg/960px-Stollen-Dresdner_Christstollen.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Stollen-Dresdner_Christstollen.jpg/1280px-Stollen-Dresdner_Christstollen.jpg"
 },
 "dus_ko": {
  "s": "img/dus_ko.webp",
  "l": "img/dus_ko.webp"
 },
 "dus_rheinturm": {
  "s": "img/dus_rheinturm.webp",
  "l": "img/dus_rheinturm.webp"
 },
 "cgn_altermarkt": {
  "s": "img/cgn_altermarkt.webp",
  "l": "img/cgn_altermarkt.webp"
 },
 "dus_eko": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/D%C3%BCsseldorf_-_Br%C3%BCggener_Weg_-_EKO-Haus_-_Japanischer_Garten_%2B_Tempel_01_ies.jpg/960px-D%C3%BCsseldorf_-_Br%C3%BCggener_Weg_-_EKO-Haus_-_Japanischer_Garten_%2B_Tempel_01_ies.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/D%C3%BCsseldorf_-_Br%C3%BCggener_Weg_-_EKO-Haus_-_Japanischer_Garten_%2B_Tempel_01_ies.jpg/1280px-D%C3%BCsseldorf_-_Br%C3%BCggener_Weg_-_EKO-Haus_-_Japanischer_Garten_%2B_Tempel_01_ies.jpg"
 },
 "dus_nordpark": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/D%C3%BCsseldorf%2C_Japanischer_Garten_im_Nordpark_%281%29.jpg/960px-D%C3%BCsseldorf%2C_Japanischer_Garten_im_Nordpark_%281%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/D%C3%BCsseldorf%2C_Japanischer_Garten_im_Nordpark_%281%29.jpg/1280px-D%C3%BCsseldorf%2C_Japanischer_Garten_im_Nordpark_%281%29.jpg"
 },
 "dus_k21": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/20170609_153054a.jpg/960px-20170609_153054a.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/20170609_153054a.jpg/1280px-20170609_153054a.jpg"
 },
 "dus_k20": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bild_K20_aktuell.jpg/960px-Bild_K20_aktuell.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bild_K20_aktuell.jpg/1280px-Bild_K20_aktuell.jpg"
 },
 "dus_kaiserswerth": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Panopfalz-innen.jpg/960px-Panopfalz-innen.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/1/14/Panopfalz-innen.jpg"
 },
 "cgn_kolumba": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kolumba.jpg/960px-Kolumba.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Kolumba.jpg"
 },
 "cgn_belgisch": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Belgisches_Viertel_Kreuzung_Bruesseler-_und_Luetticher_Strasse.jpg/960px-Belgisches_Viertel_Kreuzung_Bruesseler-_und_Luetticher_Strasse.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Belgisches_Viertel_Kreuzung_Bruesseler-_und_Luetticher_Strasse.jpg/1280px-Belgisches_Viertel_Kreuzung_Bruesseler-_und_Luetticher_Strasse.jpg"
 },
 "mst_kruisheren": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kruisherenkerk_Maastricht_1.JPG/960px-Kruisherenkerk_Maastricht_1.JPG",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kruisherenkerk_Maastricht_1.JPG/1280px-Kruisherenkerk_Maastricht_1.JPG"
 },
 "mst_bassin": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Montage_Maastricht_Bassin.jpg/960px-Montage_Maastricht_Bassin.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Montage_Maastricht_Bassin.jpg"
 },
 "mst_fort": {
  "s": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Maastricht-Fort_Sint_Pieter_%2812%29.jpg/960px-Maastricht-Fort_Sint_Pieter_%2812%29.jpg",
  "l": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Maastricht-Fort_Sint_Pieter_%2812%29.jpg/1280px-Maastricht-Fort_Sint_Pieter_%2812%29.jpg"
 }
};
const IMG_FILES = {
 "dus_city": "Rheinuferpromenade, Düsseldorf, Germany at night.jpg",
 "dus_rheinufer": "Düsseldorf Rheinuferpromenade.jpg",
 "dus_koebogen": "Düsseldorf, Kö-Bogen, Februar 2019.jpg",
 "dus_altstadt": "Altstadt in Düsseldorf - panoramio (1).jpg",
 "dus_engel": "Weihnachtsmarkt der Düsseldorfer Altstadt.jpg",
 "dus_wm_rathaus": "Düsseldorf, Weihnachtsmarkt vor dem Rathaus, Dezember 2022.jpg",
 "dus_wm2": "Düsseldorf, Weihnachtsmarkt 2018, vor dem Rathaus (1).jpg",
 "dus_riesenrad": "Burgplatz Riesenrad (51249312135).jpg",
 "dus_schlossturm": "Duesseldorf Lambertus Burgplatz.jpg",
 "dus_medienhafen": "D medienhafen.jpg",
 "dus_japan": "Tokyo Ramen, Düsseldorf, Immermannstraße (Februar 2021).jpg",
 "dus_uerige": "Düsseldorf-Altstadt Uerige.jpg",
 "dus_schiffchen": "Düsseldorf, Zum Schiffchen, April 2017 (1).jpg",
 "dus_carlsplatz": "Düsseldorf Carlsplatz, Markt Gang B, Juni 2023.JPG",
 "dus_hofgarten": "Duesseldorf Hofgarten.jpg",
 "cgn_dom": "Kölner Dom - Westfassade 2022 ohne Gerüst-0968 b.jpg",
 "cgn_wmdom": "Dom mit Weihnachtsmarkt 2011.jpg",
 "cgn_heinzel": "Köln Heinzels Wintermärchen.jpg",
 "cgn_engel": "Heinzels Wintermärchen (52615446389).jpg",
 "cgn_choco": "Schoko Koeln 20061015.jpg",
 "cgn_bridge": "Hohenzollernbrücke Köln von oben.jpg",
 "cgn_martin": "Koeln gross st martin.jpg",
 "cgn_kranhaus": "Kranhäuser 2013-06-14-05.JPG",
 "cgn_triangle": "KölnTriangle (0684).jpg",
 "cgn_ludwig": "Museum Ludwig 002.jpg",
 "cgn_4711": "4711-Logo am Haus in der Glockengasse 2011-3117.jpg",
 "cgn_frueh": "Zunft-Kölsch Glas.JPG",
 "cgn_koelsch": "Zunft-Kölsch Glas.JPG",
 "cgn_reibekuchen": "Kartoffelpuffer.jpg",
 "cgn_halvehahn": "2018-10-28-Halve Hahn-9090.jpg",
 "mst_city": "Maastricht sunset.jpg",
 "mst_magisch": "2022 Magisch Maastricht (06).jpg",
 "mst_vrijthof": "Vrijthof - Maastricht, Holland - panoramio.jpg",
 "mst_servaas": "Maastricht, de Sint Servaasbasiliek op het Vrijhof foto8 2011-01-30 13.01.JPG",
 "mst_brug": "Maastricht, Sint Servaasbrug - montage.jpg",
 "mst_stadhuis": "Maastricht 2010-30-03 – Stadthaus am Markt - panoramio (cropped).jpg",
 "mst_olv": "OLV-01 (cropped).jpg",
 "mst_olvplein": "Maastricht platz vor liebfrauenkirche.jpg",
 "mst_helpoort": "Maastricht Helpoort BW 2017-08-19 13-58-28.jpg",
 "mst_molen": "Maastricht-Bisschopsmolen-1.JPG",
 "mst_geis": "Mestreechter Geis Mari Andriessen Het Bat Maastricht.JPG",
 "mst_wyck": "Maastricht, stadszicht over de Maas met de Sint-Janskerk RM27704, de Augustijnenkerk RM27612 en de Sint-Servaasbasiliek RM27671 2022-04-03 10.00.jpg",
 "mst_dominicanen": "Dominicanenkerkplein, Maastricht, Netherlands - panoramio (9a) (cropped).jpg",
 "mst_vlaai": "Kirsch-Vlario.jpg",
 "food_currywurst": "20220430 currywurst.jpg",
 "food_gluehwein": "Glühwein Weinnachtsmarkt OS.JPG",
 "food_haxe": "00ane Haxen.jpg",
 "food_ramen": "Shoyu Ramen（Tokyo Ramen） - 01.jpg",
 "food_frites": "French Fries.JPG",
 "food_stollen": "Stollen-Dresdner Christstollen.jpg",
 "dus_ko": "GER Düsseldorf, Königsallee, Stadtgraben 0003.jpg",
 "dus_rheinturm": "Rheinturm - Gesamtansicht vom Medienhafen.jpg",
 "cgn_altermarkt": "Alter Markt, Köln-7847.jpg",
 "dus_eko": "Düsseldorf - Brüggener Weg - EKO-Haus - Japanischer Garten + Tempel 01 ies.jpg",
 "dus_nordpark": "Düsseldorf, Japanischer Garten im Nordpark (1).jpg",
 "dus_k21": "20170609 153054a.jpg",
 "dus_k20": "Bild K20 aktuell.jpg",
 "dus_kaiserswerth": "Panopfalz-innen.jpg",
 "cgn_kolumba": "Kolumba.jpg",
 "cgn_belgisch": "Belgisches Viertel Kreuzung Bruesseler- und Luetticher Strasse.jpg",
 "mst_kruisheren": "Kruisherenkerk Maastricht 1.JPG",
 "mst_bassin": "Montage Maastricht Bassin.jpg",
 "mst_fort": "Maastricht-Fort Sint Pieter (12).jpg"
};
