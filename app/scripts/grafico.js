
var arrayDePaises=[];
var arrayDePaisesEU=["ITA","ESP","FRA","PRT","NLD","DNK","GBR"];
var arrayDePaisesSA=["ARG","BRA","URY","PAR","CHL","BOL"];
var array=[];
var cantidadDeDias=0;
var valor1;
var valor1;
var logaritmico;

//var diaActual =new Date();
//var diaCero = new Date("12/25/2019");
//var Difference_In_Time = diaActual.getTime() - diaCero.getTime();
//var numeroDeDias = parseInt(Difference_In_Time / (1000 * 3600 * 24));



$(".countryList").change( function(){
    valor1=$("#paisElegido :selected").val();
    valor2=$("#paisesParaComparar :selected").val();
  
    if(valor2=="Europa"){
        arrayDePaises=[];                     
        arrayDePaises.push(valor1);
        arrayDePaises=arrayDePaises.concat(arrayDePaisesEU);
    }
    else if(valor2=="America Del Sur"){
        arrayDePaises=[];                     
        arrayDePaises.push(valor1);
        arrayDePaises=arrayDePaises.concat(arrayDePaisesSA);
    }      
    else{
        arrayDePaises=[];                                    
        arrayDePaises.push(valor1);
        arrayDePaises.push(valor2);
    }
    

    //}else if(arrayDePaises.length>1){
    //    arrayDePaises.pop();
    //    arrayDePaises.push(paisesParaComparar);
    //} else{
    //    arrayDePaises.push(paisesParaComparar);
    //}
    limpiarGrafico();    
    dibujante(logaritmico);
})




$("#botonSwitch").change( function(){
    limpiarGrafico();
    paisesParaComparar=$("#paisesParaComparar :selected").val();
    console.log("hola");
    dibujante(logaritmico);
})


//////////////////////////////////////////////////////
///////   F - U - N - C - I - O  - N - E - S   ///////
//////////////////////////////////////////////////////

//FUNCION QUE OBTIENE LA CURVA DE CONFIRMADOS DEL PAIS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function curvaPais (PAIS){
    var confirmadosPAIS=[PAIS];
     fetch(`${"https://covidapi.info/api/v1/"}country/${PAIS}`).then((response)=>
     response.json().then(function(data){
         var arrayPAIS =  Object.values(data.result);
         for (var i=0;i<arrayPAIS.length; i++){
             var valor=arrayPAIS[i].confirmed;
             if (valor!=0) confirmadosPAIS.push(valor);
         }       
     }) 
 )

 return confirmadosPAIS;
}


//RENDERIZA GRAFICO UTILIZANDO APEX CHARTS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function renderizarGrafico(elemento,logaritmico){
    var options =       {
            chart:      {type: 'line',toolbar:{show:false}},
            xaxis:      {categories: ["0"]},
            yaxis:      {labels:{style:{fontsize:'0.5 em',}},logarithmic:logaritmico,forceNiceScale: true},
            series:    elemento,
            labels:    ["Argentina", "otro pais","sdf","asdas"],
        responsive:    [{breakpoint: 1025,options :{chart: {height:"100%"}}}],
        stroke:         {width:3},
        fill:           {type:'gradient'}
    }
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}



//DEVUELVE UN BOLEAN SI SE APRETA O NO LOS SWITCH
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

$(document).ready(function(){
    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            console.log("Checkbox is checked.");
            logaritmico=true;
            console.log(logaritmico);
        }
        else if($(this).prop("checked") == false){
            console.log("Checkbox is unchecked.");
            logaritmico=false;
            console.log(logaritmico);
        }
    });
});

//FUNCION DIBUJATNEDE
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function dibujante(logaritmico){
    //TRAE TODAS LAS PROMESAS
    array=[];
    Promise.all(arrayDePaises.map(element => curvaPais(element))).then(function(values) {      
        for (var i =0; i<values.length;i++){
            var nombreCurva = values[i][0];
            values[i].shift();
            array[i]={name:nombreCurva,data:values[i]};
        }
    });
    //RENDERIZO GRAFICO
    setTimeout(function() {renderizarGrafico(array,logaritmico)},800);
}


//BORRA ELEMNTO DIV DE GRAFICO Y LO VUELVE A CREAR
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function limpiarGrafico(){
    document.getElementById("chart").remove();
    var nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("id","chart");
    document.getElementById("bloqueGrafico").appendChild(nuevoDiv);
}


//CREA EL ARRAY DE PAISES SEGUN LAS VARIABLES D ELOS INPUTS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//////////////////////////////////////////////////////
///////   F - U - N - C - I - O  - N - E - S   ///////
//////////////////////////////////////////////////////

$("#titulo").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#bloqueHeader").offset().top
    }, 200);
  })