$(function() {
  var availableOrte = ["Insel Walfisch", "Insel Langenwerder", "Kieler Ort", "Böhmke und Werder"];
  var walfischPos = '535600N112600E';
  var langenwerderPos = '540200N0113000E';
  var warte = 'DEH';//zentrale=warte
  var kreis = 'A021';
  
  
  $(".autocomplete").autocomplete({
    source: availableOrte,
	select: function(event, ui){
		console.log('Bin in Klickevent'+event+ui.item.label);
        //$('#div2').html(ui.item.value);
		switch (ui.item.label) {
			case "Insel Walfisch":
				$('#beringungsort_position').val(walfischPos);
				break;
			case "Insel Langenwerder":
				$('#beringungsort_position').val(langenwerderPos);
				break;
			default:
				$('#beringungsort_position').val('');
				break;
		}
		$('#beringungsort_kreis').val(kreis);
		$('#zentrale').val(warte);
    }
  });
});