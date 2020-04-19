
var arrayDePaises=["ARG"];
var array=[];
var cantidadDeDias=0;
var paisesParaComparar;
var logaritmico;

var diaActual =new Date();
var diaCero = new Date("12/25/2019");
var Difference_In_Time = diaActual.getTime() - diaCero.getTime();
var numeroDeDias = parseInt(Difference_In_Time / (1000 * 3600 * 24));



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
    }else if(arrayDePaises.length>1){
        arrayDePaises.pop();
        arrayDePaises.push(paisesParaComparar);
    } else{
        arrayDePaises.push(paisesParaComparar);
    }
    
    dibujante(logaritmico);
})



document.getElementById("botonSwitch").addEventListener("change", function(){
    document.getElementById("chart").remove();
    var nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("id","chart");
    document.getElementById("bloqueGrafico").appendChild(nuevoDiv);
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
    Promise.all(arrayDePaises.map(element => curvaPais(element))).then(function(values) {      
        for (var i =0; i<values.length;i++){
            var nombreCurva = values[i][0];
            values[i].shift();
            array[i]={name:nombreCurva,data:values[i]};
        }
    });
    //RENDERIZO GRAFICO
    setTimeout(function() {renderizarGrafico(array,logaritmico)},600);
}




$(document).ready(function(){
    $.each(paises, function(key, value) {   
        $('#paisesParaComparar')
            .append($("<option></option>")
                       .attr("value",value)
                       .text(key)); 
                        
   });
   $.each(paises, function(key, value) {   
    $('#paisElegido')
        .append($("<option></option>")
                   .attr("value",value)
                   .text(key)); 
                   $('#paisesParaComparar')
});
})
var paises={"Afghanistan": "AFG",
"Albania": "ALB",
"Algeria": "DZA",
"Andorra": "AND",
"Angola": "AGO",
"Antigua and Barbuda": "ATG",
"Argentina": "ARG",
"Armenia": "ARM",
"Australia": "AUS",
"Austria": "AUT",
"Azerbaijan": "AZE",
"Bahamas": "BHS",
"Bahamas, The": "BHS",
"Bahrain": "BHR",
"Bangladesh": "BGD",
"Barbados": "BRB",
"Belarus": "BLR",
"Belgium": "BEL",
"Belize": "BLZ",
"Benin": "BEN",
"Bhutan": "BTN",
"Bolivia": "BOL",
"Bosnia and Herzegovina": "BIH",
"Botswana": "BWA",
"Brazil": "BRA",
"Brunei": "BRN",
"Bulgaria": "BGR",
"Burkina Faso": "BFA",
"Burma": "MMR",
"Burundi": "BDI",
"Cabo Verde": "CPV",
"Cambodia": "KHM",
"Cameroon": "CMR",
"Canada": "CAN",
"Cape Verde": "CBV",
"Central African Republic": "CAF",
"Chad": "TCD",
"Chile": "CHL",
"China": "CHN",
"Colombia": "COL",
"Congo (Brazzaville)": "COG",
"Congo (Kinshasa)": "COD",
"Costa Rica": "CRI",
"Cote d'Ivoire": "CIV",
"Croatia": "HRV",
"Cruise Ship": "SHP",
"Cuba": "CUB",
"Cyprus": "CYP",
"Czechia": "CZE",
"Denmark": "DNK",
"Diamond Princess": "DPS",
"Djibouti": "DJI",
"Dominica": "DMA",
"Dominican Republic": "DOM",
"East Timor": "ETL",
"Ecuador": "ECU",
"Egypt": "EGY",
"El Salvador": "SLV",
"Equatorial Guinea": "GNQ",
"Eritrea": "ERI",
"Estonia": "EST",
"Eswatini": "SWZ",
"Ethiopia": "ETH",
"Fiji": "FJI",
"Finland": "FIN",
"France": "FRA",
"Gabon": "GAB",
"Gambia": "GMB",
"Gambia, The": "GMB",
"Georgia": "GEO",
"Germany": "DEU",
"Ghana": "GHA",
"Greece": "GRC",
"Grenada": "GRD",
"Guatemala": "GTM",
"Guinea": "GIN",
"Guinea-Bissau": "GNB",
"Guyana": "GUY",
"Haiti": "HTI",
"Holy See": "VAT",
"Honduras": "HND",
"Hungary": "HUN",
"Iceland": "ISL",
"India": "IND",
"Indonesia": "IDN",
"Iran": "IRN",
"Iraq": "IRQ",
"Ireland": "IRL",
"Israel": "ISR",
"Italy": "ITA",
"Jamaica": "JAM",
"Japan": "JPN",
"Jordan": "JOR",
"Kazakhstan": "KAZ",
"Kenya": "KEN",
"Korea, South": "KOR",
"Kosovo": "RKS",
"Kuwait": "KWT",
"Kyrgyzstan": "KGZ",
"Laos": "LAO",
"Latvia": "LVA",
"Lebanon": "LBN",
"Liberia": "LBR",
"Libya": "LBY",
"Liechtenstein": "LIE",
"Lithuania": "LTU",
"Luxembourg": "LUX",
"Madagascar": "MDG",
"Malawi": "MWI",
"Malaysia": "MYS",
"Maldives": "MDV",
"Mali": "MLI",
"Malta": "MLT",
"Martinique": "MTQ",
"Mauritania": "MRT",
"Mauritius": "MUS",
"Mexico": "MEX",
"Moldova": "MDA",
"Monaco": "MCO",
"Mongolia": "MNG",
"Montenegro": "MNE",
"Morocco": "MAR",
"Mozambique": "MOZ",
"MS Zaandam": "MSZ",
"Myanmar": "MMR",
"Namibia": "NAM",
"Nepal": "NPL",
"Netherlands": "NLD",
"New Zealand": "NZL",
"Nicaragua": "NIC",
"Niger": "NER",
"Nigeria": "NGA",
"North Macedonia": "MKD",
"Norway": "NOR",
"Oman": "OMN",
"Pakistan": "PAK",
"Panama": "PAN",
"Papua New Guinea": "PNG",
"Paraguay": "PRY",
"Peru": "PER",
"Philippines": "PHL",
"Poland": "POL",
"Portugal": "PRT",
"Qatar": "QAT",
"Romania": "ROU",
"Russia": "RUS",
"Rwanda": "RWA",
"Saint Kitts and Nevis": "KNA",
"Saint Lucia": "LCA",
"Saint Vincent and the Grenadines": "VCT",
"San Marino": "SMR",
"Sao Tome and Principe": "STP",
"Saudi Arabia": "SAU",
"Senegal": "SEN",
"Serbia": "SRB",
"Seychelles": "SYC",
"Sierra Leone": "SLE",
"Singapore": "SGP",
"Slovakia": "SVK",
"Slovenia": "SVN",
"Somalia": "SOM",
"South Africa": "ZAF",
"South Sudan": "SSD",
"Spain": "ESP",
"Sri Lanka": "LKA",
"Sudan": "SDN",
"Suriname": "SUR",
"Sweden": "SWE",
"Switzerland": "CHE",
"Syria": "SYR",
"Taiwan*": "TWN",
"Tanzania": "TZA",
"Thailand": "THA",
"The West Bank and Gaza": "WBG",
"Timor-Leste": "TLS",
"Togo": "TGO",
"Trinidad and Tobago": "TTO",
"Tunisia": "TUN",
"Turkey": "TUR",
"Uganda": "UGA",
"Ukraine": "UKR",
"United Arab Emirates": "ARE",
"United Kingdom": "GBR",
"Uruguay": "URY",
"US": "USA",
"Uzbekistan": "UZB",
"Venezuela": "VEN",
"Vietnam": "VNM",
"West Bank and Gaza": "WBG",
"Western Sahara": "ESH",
"Yemen": "YEM",
"Zambia": "ZMB",
"Zimbabwe": "ZWE",

  }