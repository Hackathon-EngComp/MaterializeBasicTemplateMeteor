
if (Meteor.isClient) {

Template.home.onRendered(function(){
     $.getJSON("http://api.convenios.gov.br/siconv/v1/consulta/convenios.json?uf=pa",function (data) {
        //dados = data.convenios;
        console.log(data);
        // for (var i = dados.length - 1; i >= 0; i--) {
        //   $("ol").append('<li>'+dados[i].valor_global+'</li>');
        // }
      }              
    );
  })


}
