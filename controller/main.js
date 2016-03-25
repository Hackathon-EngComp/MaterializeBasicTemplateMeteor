
if (Meteor.isClient) {

	var convenios = new Array();
	var allConvenios = new Array();
	var offset = 0;
	var valorTotalConvenios = .0;
	var cont = 0;
	var totalConvenios = 0;
	var uf = '';

	Template.home.onRendered(function(){
	    $('select').material_select();
	     	
	  });

	Template.home.events({
		'change select': function () {
			prepararTela();
			console.log('conectando...');
			$("#result").html("<p>Conectando-se à http://api.convenios.gov.br/siconv/v1/consulta/convenios.json</p>");

			$.getJSON("http://api.convenios.gov.br/siconv/v1/consulta/convenios.json?uf="+uf, function(data){
				console.log('conectado');
				
				totalConvenios = data.metadados.total_registros;
				$("#result").html("<p>Quantidade Total de convênios: "+totalConvenios+"</p>");
				convenios.push(data.convenios);

				if(totalConvenios > 500){
					while (offset < totalConvenios) {
						offset += 500;
						
						$("#valor").html("<p>Obtendo mais dados</p>");
						allConvenios = getRestoConvenios(uf, offset);
						var data = $.parseJSON(allConvenios);
						console.log(data);
						convenios.push(data.convenios);

						for (var i = 0; i < convenios.length; i++) {
							for (var j = 0; j < convenios[i].length; j++) {
								valorTotalConvenios += parseFloat(convenios[i][j].valor_global);
								cont++;
								$("#valor").html("<p>(em processo...)</p><p id='valor'>Valor total de convênios: "+converteFloatMoeda(valorTotalConvenios)+"</p>");

							}
						}
					}
				}
				$("#valor").html("<p>Valor total de convênios: "+converteFloatMoeda(valorTotalConvenios)+"</p>");
				$(".progress").hide();
				$('select').material_select();
			});
		}
	});

	function getRestoConvenios(uf, offset){
		var value= $.ajax({ 
		       url: "http://api.convenios.gov.br/siconv/v1/consulta/convenios.json?uf="+uf+"&offset="+offset, 
		       async: false
		    }).responseText;
		    return value;
	}

	function returnConvenios(Convenios){
		return Convenios;
	}

	function converteFloatMoeda(valor){
      var inteiro = null, decimal = null, c = null, j = null;
      var aux = new Array();
      valor = ""+valor;
      c = valor.indexOf(".",0);
      //encontrou o ponto na string
      if(c > 0){
         //separa as partes em inteiro e decimal
         inteiro = valor.substring(0,c);
         decimal = valor.substring(c+1,valor.length);
      }else{
         inteiro = valor;
      }
      
      //pega a parte inteiro de 3 em 3 partes
      for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
         aux[c]=inteiro.substring(j-3,j);
      }
      
      //percorre a string acrescentando os pontos
      inteiro = "";
      for(c = aux.length-1; c >= 0; c--){
         inteiro += aux[c]+'.';
      }
      //retirando o ultimo ponto e finalizando a parte inteiro
      
      inteiro = inteiro.substring(0,inteiro.length-1);
      
      decimal = parseInt(decimal);
      if(isNaN(decimal)){
         decimal = "00";
      }else{
         decimal = ""+decimal;
         if(decimal.length === 1){
            decimal = decimal+"0";
         }
      }
      
      
      valor = "R$ "+inteiro+","+decimal;
      
      
      return valor;
	}

	function prepararTela(){
		convenios.length = 0;
		allConvenios.length = 0;
		offset = 0;
		valorTotalConvenios = .0;
		cont = 0;
		uf = $('select').val();
		$('select').material_select('destroy');
		$("#result").html("");
		$("#valor").html("");
		$(".progress").show();

	}
}
