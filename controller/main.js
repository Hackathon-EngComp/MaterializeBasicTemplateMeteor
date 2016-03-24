
if (Meteor.isClient) {

	var dados = new Array();

	Template.home.onRendered(function(){
	    $('select').material_select();
	     	
	  });

	Template.home.events({
		'change select': function () {
			var uf = $('select').val();
			
			$(".progress").show();
			$("#result").hide();
			$.getJSON("http://api.convenios.gov.br/siconv/v1/consulta/convenios.json?uf="+uf, function(data){
				$(".progress").hide();
				$("#result").html("<p>O total de convênios: "+data.metadados.total_registros+"</p>");
				$("#result").show();
			});
		}
	});
}
