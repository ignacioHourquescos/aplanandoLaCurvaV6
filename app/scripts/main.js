$('body').append
<div id="titulo">
    <div></br><h1 style="color:blue">COMPARADOR DE CURVAS</h1>          
        <h4 style="color:rgb(87, 83, 83)">Comparadaor de curvas del COVID19 (fuente:john Hopkins Insitu¿itute)</h4>    
    
    </div>
    <div class="container">
        <a href="#bloqueHeader" class="arrow down"></a>
      </div>
</div>   
<div id="bloqueHeader">
    <p>Comparar </p>
    
    <div id="bloqueDropDowns">
        <select id="paisElegido" class="countryList">
            <option value="seleccionar" selected>Seleccionar</option>
            <option value="ARG">Argentina</option>
            <option value="BRA">Brazil</option>
            <option value="URU">Uruguay</option>
            <option value="PAR">paraguay</option>
        </select>
    </div>

    <p> con </p>

    <div id="bloqueDropDowns">
        <select id="paisesParaComparar" class="countryList">
           <option value="seleccionar" selected>Seleccionar</option>
           <option value="Europa">Europa</option>
           <option value="America Del Sur">America Del Sur</option>
           <option value="ninguno">----------</option>
        </select>
    </div>      

     <div id="botonSwitch"><p>Lineal</p>
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
             </label> 
             <p>Logaritimico</p>
        </div>
        
        
</div>


<div id="bloqueGrafico">
    <div id="chart"> <h2 style="color:grey">Seleccionar las cruvas a comparar</h2></div>
</div>

