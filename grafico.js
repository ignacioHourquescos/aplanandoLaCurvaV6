
var arrayDePaises=["ARG"];
var array=[];
var cantidadDeDias=0;
var paisesParaComparar;

dibujante();

document.getElementById("paisesParaComparar").addEventListener("change", function(){
    paisesParaComparar=$("#paisesParaComparar :selected").val();
    document.getElementById("chart").remove();
    var nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("id","chart");
    document.getElementById("bloqueGrafico").appendChild(nuevoDiv)
    if(paisesParaComparar=="Europa"){
        arrayDePaises=["ARG","ITA","ESP","FRA"];
    }else if(paisesParaComparar=="Vecinos"){
        arrayDePaises=["ARG","BRA","URY","PAR","CHL","BOL",];
    }else if(paisesParaComparar=="Todos"){
        arrayDePaises=["AFG","ALB","DZA","ASM","AND","BHR","BLR","BRA","KHM","CAN","ECU","EST","EGY"];
    }
    dibujante();
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
function renderizarGrafico(elemento){
    var options =       {
            chart:      {type: 'line',toolbar:{show:false}},
            xaxis:      {categories: ["0"]},
            yaxis:      {labels:{show:false}},
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
var lineal=true;
$(document).ready(function(){
    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            console.log("Checkbox is checked.");
            lineal=false;
        }
        else if($(this).prop("checked") == false){
            console.log("Checkbox is unchecked.");
            lineal=true;
        }
    });
});

//FUNCION DIBUJATNEDE
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function dibujante(){
    //TRAE TODAS LAS PROMESAS
    Promise.all(arrayDePaises.map(element => curvaPais(element))).then(function(values) {
        for (var i =0; i<values.length;i++){
            var nombreCurva = values[i][0];
            values[i].shift();
            array[i]={name:nombreCurva,data:values[i]};
        }
    });
    //RENDERIZO GRAFICO
    setTimeout(function() {renderizarGrafico(array)},3000);
}