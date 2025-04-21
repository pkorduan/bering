$(function() {
  var availableOrte = ["Insel Walfisch", "Insel Langenwerder", "Kieler Ort", "Böhmke und Werder"];
  var walfischPos = '535600N112600E';
  var walfischOrtId = '53';
  var langenwerderPos = '540200N0113000E';
  var langenwerderOrtId = '60';
  var warte = 'DEH';//zentrale=warte
  var kreis = 'A021';
  
  let beringungsort_zwei_nutzen =  window.models.setting.findByBezeichnung('beringungsort_zwei_nutzen').wert
    
  $(".autocomplete").autocomplete({
    source: availableOrte,
	select: function(event, ui){
		console.log('Bin in Klickevent'+event+ui.item.label);
		console.log('beringungsort_zwei_nutzen '+beringungsort_zwei_nutzen);
        
		if (beringungsort_zwei_nutzen == "aus") {
			switch (ui.item.label) {
				case "Insel Walfisch":
					$('#beringungsort_position').val(walfischPos);
					$('#beringungsort_id').val(walfischOrtId);
					break;
				case "Insel Langenwerder":
					$('#beringungsort_position').val(langenwerderPos);
					$('#beringungsort_id').val(langenwerderOrtId);
					break;
				default:
					$('#beringungsort_position').val('');
					break;
			}
			$('#beringungsort_kreis').val(kreis);
			$('#zentrale').val(warte);
		}
		else {
			switch (ui.item.label) {
				case "Insel Walfisch":
					$('#beringungsort_position_zwei').val(walfischPos);
					$('#beringungsort_zwei_id').val(walfischOrtId);
					break;
				case "Insel Langenwerder":
					$('#beringungsort_position_zwei').val(langenwerderPos);
					$('#beringungsort_zwei_id').val(langenwerderOrtId);
					break;
				default:
					$('#beringungsort_position_zwei').val('');
					break;
			}
			$('#beringungsort_kreis_zwei').val(kreis);
			$('#zentrale_zwei').val(warte);
		}
		
		
    }
  });
});