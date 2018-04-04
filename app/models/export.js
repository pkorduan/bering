// model export
'use strict'

const fs = require('fs');
const path = require('path');
const SQL = require('sql.js');

module.exports.calculateSpaces = function (strOrNumber, lengthField) {
  var spaces = '';
  for (var i = strOrNumber.toString().length; i < lengthField; i++) {
    spaces+='\u0020';
    }
  return spaces;
}

module.exports.exportBering = function (beringernr, pfad, year, notExportedYet) {
  //to call function in if statement, cf. https://stackoverflow.com/a/21769487
  var self = this;
  console.log('Model export.exportBering');

  var where = "beringernr = '"+beringernr+"'";
  this.calculateSpaces(200.8, 7);
  //Build String: Ringnummer Vogelart Alter ?? Gewicht Datum Beringungsort Koordinaten ?? ô )Freifeld)+249 Leerezeichen Familienzugehörigkeit (250 lang)
  //ô ist der Beginn einer Freifelddefinition. Dabei handelt es sich in Ihrem Fall einfach um 250 Leerzeichen. Dann folgen 250 Zeichen in denen die Familienzugehörigkeit bestimmt werden kann. (z.B. „N:IA0167138+IA0167139;E:IA0131895;“)
  //ACHTUNG: freifeld hier erstmal fest definiert!
  //TODO: ersetzen durch bemerkung?!
  var freifeld = '\u00f4';
  //ACHTUNG: Familienzugehörigkeit hier erstmal fest definiert!
  //TODO; durch was in der db ersetze?
  var family = 'N:IA0167138+IA0167139;E:IA0131895;';
  var strWrite = '';
  var gewichtSpaces = '';
  let beringung = {}
  let beringungen = window.models.beringung.findWhere(where),
        keys = Object.keys(beringungen)

    if (keys.length > 0) {
    keys.forEach(function(key) {
      beringung = beringungen[key];
      //Go through all entries if checkbox is unchecked
      if (notExportedYet==false) {
        //Check year
        if (new Date(beringung.datum).getFullYear()==year) {
          //console.log(beringung);
          // console.log("Gewicht: "+beringung.gewicht);
          //Gewicht von 0 muss als "0.0" in der Exportdatei gespeichert werden
          if (beringung.gewicht==0) beringung.gewicht = "0.0";
          //\u0020=normal space; \n=LF; \r=CR; ô = \u00f4
          strWrite+='\u0020\u0020\u0020'+beringung.ringnr+'\u0020'+beringung.vogelart+'\u0020\u0020'+beringung.alter+'\u0020\u0020\u0020'+'ubekannt1'+self.calculateSpaces(beringung.gewicht, 7)+beringung.gewicht+'\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020'+beringung.datum+'\u0020\u0020\u0020\u0020'+beringung.beringungsort+self.calculateSpaces(beringung.beringungsort, 30)+beringung.koordinaten+self.calculateSpaces('ubekannt2', 77)+'ubekannt2'+self.calculateSpaces(freifeld, 51)+freifeld+self.calculateSpaces(freifeld, 250)+family+self.calculateSpaces(family, 250)+'\r\n';
        }
      }
      else {
      //only export entry if entry has not been exported yet (exportiert=0 [false])
      if (beringung.exportiert==0) {
        //Check year
        if (new Date(beringung.datum).getFullYear()==year) {
            //console.log(beringung);
            // console.log("Gewicht: "+beringung.gewicht);
            //Gewicht von 0 muss als "0.0" in der Exportdatei gespeichert werden
            if (beringung.gewicht==0) beringung.gewicht = "0.0";
            //\u0020=normal space; \n=LF; \r=CR; ô = \u00f4
            strWrite+='\u0020\u0020\u0020'+beringung.ringnr+'\u0020'+beringung.vogelart+'\u0020\u0020'+beringung.alter+'\u0020\u0020\u0020'+'ubekannt1'+self.calculateSpaces(beringung.gewicht, 7)+beringung.gewicht+'\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020'+beringung.datum+'\u0020\u0020\u0020\u0020'+beringung.beringungsort+self.calculateSpaces(beringung.beringungsort, 30)+beringung.koordinaten+self.calculateSpaces('ubekannt2', 77)+'ubekannt2'+self.calculateSpaces(freifeld, 51)+freifeld+self.calculateSpaces(freifeld, 250)+family+self.calculateSpaces(family, 250)+'\r\n';
          }
      }
      }
    });
    }
  //Dateiende: ^Z = \u001a
  strWrite+='\u001a';
  // console.log(strWrite);


  if (window.models.settings.checkPath(pfad)) {
    console.log('checkPath ok');
  fs.writeFile(path.join(pfad, 'test1.sdf'), strWrite, (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }

        alert("The file has been succesfully saved");
    });
  }
}
