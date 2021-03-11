const { count } = require("console");

var aura = "Aura";
var ment_block = "Mentalne blokade";
var s_ment_block = "Skrivene mentalne blokade";
var spir_block = "Spiritualne blokade";
var s_spir_block = "Skrivene spiritualne blokade";
var vows = "Zaveti";
var curse = "Kletve";
var carma = "Karme"; 
var emo = "Zarobljene emocije";
var emo_life = "Zarobljene emocije iz prethodnih zivota";
var emo_gen = "Zarobljene emocije iz prethodnih generacija";
var block = [ment_block, s_ment_block, spir_block, s_spir_block, vows, curse, carma, emo, emo_life, emog_gen];
var mother_block = "Blokada sa majcine strane";
var father_block = "Blokada sa oceve strane";
 

connect (); //povezi se sa visim ja
scan ();  //Skeniraj celu auru
has_block (); 
count(); //Broji blokade
cleaning_protocol()// Kompletna funkcija za ciscenje.
clean1 (); //Koliki je broj blokada, toliko posalji kristalnih kugli koje skupljaju blokade, kada pokupe blokade posalji kugle u belu kristalnu piramidu, puni piramidu belim ruzama, posalji u svetlost.
clean2 (); // Pozovi sve zavete da se pokazu, bozanskom vatrom ih spali;
clean3(); // Pozovi sve karme da se pokazu kao ugovori na papiru, uzmi pecat na kojem je ispisano ponisteno, lupi pecatom na svaki karmicki ugovor da bi ga ponistio.
clean4(); // Lociraj prethodni zivot pozovi cleaning_protocol na zivot;
line_test();//idi jednu generaciju iznad, testiraj mother_block, father_block, if TRUE,  line_test; if false, go back to last TRUE and cleaning_protocol;