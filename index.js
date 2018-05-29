//Funcion import Safety JSON
const URL = "https://data.cityofnewyork.us/resource/qgea-i56i.json?$where=cmplnt_fr_dt=%222015-12-31T00:00:00%22";

var safetyData = [];
function getSafetyData(URL){
var data = $.get(URL, function(){
  console.log(URL)
})
  .done( function(){
    //Success
    //console.log(data);
    safetyData = data.responseJSON;
  })
  .fail( function(error){
    console.error(error);
  })
}
//getSafetyData(URL);


//Funcion import Housing JSON
const HousingURL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";

var housingData = [];
function getHousingData(HousingURL){
var data = $.get(HousingURL, function(){
  console.log(HousingURL)
})
  .done( function(){
    //Success
    //console.log(data);
    housingData = data.responseJSON.data;
  })
  .fail( function(error){
    console.error(error);
  })
}
//getHousingData(HousingURL);


//Funcion import Museums JSON
const MuseumsURL = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";

var museumsData = [];
function getMuseumsData(MuseumsURL){
var data = $.get(MuseumsURL, function(){
  console.log(MuseumsURL)
})
  .done( function(){
    //Success
    //console.log(data);
    museumsData = data.responseJSON.data;
  })
  .fail( function(error){
    console.error(error);
  })
}
//getMuseumsData(MuseumsURL);

//Funcion import Art Galleries JSON
const ArtGalleriesURL = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";

var artGalleriesData = [];
function getArtGalleriesData(ArtGalleriesURL){
var data = $.get(ArtGalleriesURL, function(){
  console.log(ArtGalleriesURL)
})
  .done( function(){
    //Success
    //console.log(data);
    artGalleriesData = data.responseJSON.data;
  })
  .fail( function(error){
    console.error(error);
  })
}
//getArtGalleriesData(ArtGalleriesURL);

$(document).ready( function(){
  graficar();
  getSafetyData(URL);
  getHousingData(HousingURL);
  getMuseumsData(MuseumsURL);
  getArtGalleriesData(ArtGalleriesURL);
  $("#updateButton").on("click", countCrimes);
})

//Funciones------------------------------------------------------------------------
var times=0;
function countCrimes(){
  var statenIsland = 0;
  var queens = 0;
  var bronx = 0;
  var manhattan = 0;
  var brooklyn = 0;
  //conteo crimenes por distritos
  for (var c = 0; c < safetyData.length; c++) {
    var prueba = safetyData[c].boro_nm;
    if (prueba=="STATEN ISLAND"){
      statenIsland=statenIsland+1;
    }else if (prueba=="QUEENS") {
      queens=queens+1;
    }else if (prueba=="BRONX") {
      bronx=bronx+1;
    }else if (prueba=="MANHATTAN") {
      manhattan=manhattan+1;
    }else if (prueba=="BROOKLYN") {
      brooklyn=brooklyn+1;
    }
  }
  //alert(brooklyn);

  //ordenarDatosSafety
  var arreglo = [];
  arreglo.push(statenIsland,queens,bronx,manhattan,brooklyn);
  for (var i = 0 ; i < arreglo.length - 1 ; i++) {
      var min = i;

      //buscar numero menor
      for (var j = i + 1 ; j < arreglo.length ; j++) {
          if (arreglo[j] < arreglo[min]) {
              min = j;
          }
      }

      if (i != min) {
          //permutar los valores
          var aux = arreglo[i];
          arreglo[i] = arreglo[min];
          arreglo[min] = aux;
      }
  }

  //datosAffordability

  var arregloStatenIsland = [];
  var arregloQueens = [];
  var arregloBronx = [];
  var arregloManhattan = [];
  var arregloBrooklyn = [];
  for (var i = 0; i < housingData.length; i++) {
    if(housingData[i][23]!=null && housingData[i][24]!=null){
      var districtStringNumber = housingData[i][19].substr(3,4);
      var districtFloatNumber = parseFloat(districtStringNumber);
      var lowUnitString = housingData[i][33];
      var lowUnitFloat = parseFloat(lowUnitString);

     //error dataset
      if (districtFloatNumber==304) {
        districtFloatNumber=04;
      }

      if(housingData[i][15]=="Staten Island"){
        if(arregloStatenIsland[districtFloatNumber]==null){
          arregloStatenIsland[districtFloatNumber]=lowUnitFloat;
        }else{
          arregloStatenIsland[districtFloatNumber]=arregloStatenIsland[districtFloatNumber]+lowUnitFloat;
        }
      }else if(housingData[i][15]=="Queens"){
        if(arregloQueens[districtFloatNumber]==null){
          arregloQueens[districtFloatNumber]=lowUnitFloat;
        }else{
          arregloQueens[districtFloatNumber]=arregloQueens[districtFloatNumber]+lowUnitFloat;
        }
      }else if(housingData[i][15]=="Bronx"){
        if(arregloBronx[districtFloatNumber]==null){
          arregloBronx[districtFloatNumber]=lowUnitFloat;
        }else{
          arregloBronx[districtFloatNumber]=arregloBronx[districtFloatNumber]+lowUnitFloat;
        }
      }else if(housingData[i][15]=="Manhattan"){
        if(arregloManhattan[districtFloatNumber]==null){
          arregloManhattan[districtFloatNumber]=lowUnitFloat;
        }else{
          arregloManhattan[districtFloatNumber]=arregloManhattan[districtFloatNumber]+lowUnitFloat;
        }
      }else if(housingData[i][15]=="Brooklyn"){
        if(arregloBrooklyn[districtFloatNumber]==null){
          arregloBrooklyn[districtFloatNumber]=lowUnitFloat;
        }else{
          arregloBrooklyn[districtFloatNumber]=arregloBrooklyn[districtFloatNumber]+lowUnitFloat;
        }
      }
    }
  }
//alert(arregloQueens[2]);

//distanciaDistricts
  var arregloDistancias=[];
  var nombresSubDistritos=[];
  for (var i = 0; i < housingData.length; i++) {
    if(housingData[i][23]!=null && housingData[i][24]!=null){

      if (housingData[i][19]=="BK-304") {
        housingData[i][19]="BK-04";
      }
      var lat1 = parseFloat(housingData[i][23]);
      var lon1 = parseFloat(housingData[i][24]);
      var lat2 = 40.7291;
      var lon2 = -73.9965;

      Distancia = Dist(lat1, lon1, lat2, lon2);   //Retorna numero en Km

      function Dist(lat1, lon1, lat2, lon2){
        rad = function(x) {return x*Math.PI/180;}

        var R     = 6378.137;                     //Radio de la tierra en km
        var dLat  = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d.toFixed(3);                      //Retorna tres decimales
      }
      if (nombresSubDistritos.length==0) {
        arregloDistancias.push(Distancia);
        nombresSubDistritos.push(housingData[i][19]);
      }else{
        var ind = nombresSubDistritos.indexOf(housingData[i][19]);
        if (ind==-1) {
          arregloDistancias.push(Distancia);
          nombresSubDistritos.push(housingData[i][19]);
        }else{
          arregloDistancias[ind]=parseFloat(arregloDistancias[ind])+Distancia/2;
        }
      }
    }
  }
  //ordenarDatosDistancias
  for (var i = 0 ; i < arregloDistancias.length - 1 ; i++) {
      var min = i;

      //buscar numero menor
      for (var j = i + 1 ; j < arregloDistancias.length ; j++) {
          if (arregloDistancias[j] < arregloDistancias[min]) {
              min = j;
          }
      }

      if (i != min) {
          //permutar los valores Distancias
          var aux = arregloDistancias[i];
          arregloDistancias[i] = arregloDistancias[min];
          arregloDistancias[min] = aux;
          //permutar los nombres de distritos
          var aux2 = nombresSubDistritos[i];
          nombresSubDistritos[i] = nombresSubDistritos[min];
          nombresSubDistritos[min] = aux2;
      }
  }


  //Tabla////////////////////////////////////////////////////////////////////

  //Manejo tabla
  tableReference = $("#bodyRanking")[0];
  var newRow;
  var district;
  var distance;
  var safety;
  var rank;
  var spl;
  var spl2;

  if (times==0) {
    for (var i = 0; i < 10; i++) {
      newRow = tableReference.insertRow(tableReference.rows.length);
      district = newRow.insertCell();
      safety = newRow.insertCell();
      distance = newRow.insertCell();
      affordability = newRow.insertCell();
      rank = newRow.insertCell();

      spl=nombresSubDistritos[i].split("-");
      spl2=spl[1].split("");

      if(spl[0]=="SI"){
        safety.innerHTML = statenIsland;
        if (spl2[0]==0) {
          affordability.innerHTML = arregloStatenIsland[spl2[1]];
        }else {
          affordability.innerHTML = arregloStatenIsland[spl[1]];
        }
      }else if (spl[0]=="QN") {
        safety.innerHTML = queens;
        if (spl2[0]==0) {
          affordability.innerHTML = arregloQueens[spl2[1]];
        }else {
          affordability.innerHTML = arregloQueens[spl[1]];
        }
      }else if (spl[0]=="BX") {
        safety.innerHTML = bronx;
        if (spl2[0]==0) {
          affordability.innerHTML = arregloBronx[spl2[1]];
        }else {
          affordability.innerHTML = arregloBronx[spl[1]];
        }
      }else if (spl[0]=="MN") {
        safety.innerHTML = manhattan;
        if (spl2[0]==0) {
          affordability.innerHTML = arregloManhattan[spl2[1]];
        }else {
          affordability.innerHTML = arregloManhattan[spl[1]];
        }
      }else if (spl[0]=="BK") {
        safety.innerHTML = brooklyn;
        if (spl2[0]==0) {
          affordability.innerHTML = arregloBrooklyn[spl2[1]];
        }else {
          affordability.innerHTML = arregloBrooklyn[spl[1]];
        }
      }
      district.innerHTML = nombresSubDistritos[i];
      //safety.innerHTML = arreglo[i];
      if (arregloDistancias[i]==14.814499999999999) {
        distance.innerHTML = 14.814;
      }else {
        distance.innerHTML = arregloDistancias[i];
      }
    //  affordability.innerHTML = "<h6>Affordability</h6>";
      rank.innerHTML = i+1;
      times++;
    }
  }
}

//Grafico Barras //////////////////////////////////////////////////////////////////
//Manejo Grafica
  var datos = [286, 220, 231, 203, 60];

  function graficar(){
    var w= 500;
    var h= 350;

  var svg = d3.select('.grafica')
      .append('svg')
      .attr("width",w)
      .attr("height",h);


  svg.selectAll("rect")
      .data(datos)
      .enter()
      .append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width",50)
      .attr("height",100)

  .attr("x", function(d,i){
    return i*51+30
  })
  .attr("height", function(d){
    return d;
  })
  .attr("y", function (d){
    return h-d;
  })

  svg.selectAll("text")
    .data(datos)
    .enter()
    .append("text")
    .text(function(d) {
      if (d==286){
        return "BK:286";
      }else if (d==220){
        return "MN:220";
      }else if (d==231){
        return "BX:231";
      }else if (d==203){
        return "QN:203";
      }else if (d==60){
        return "SI:60";
      }

    })
  .attr("x", function(d, i) {
      return (i * (w / (datos.length))-(48*i))+35;
  })
  .attr("y", function(d) {
      return h - (d * 1.02);
  });
}


//Google Map------------------------------------------------------------------------
  function initMap(){
    //default
    //map options
    var options = {
      zoom:12,
      center: {lat:40.7291,lng:-73.9965}   //lat long New York (NYU Stern School of Business)
    }
    //map options
    var optionsAirport = {
      zoom:11,
      center: {lat:40.7292,lng:-73.9966}   //lat long New York (NYU Stern School of Business)
    }


    //New map Housing
    var map = new google.maps.Map(document.getElementById('map'),options);
    var marker = new google.maps.Marker({
      position:{lat:40.7291,lng:-73.9965},     //lat long NYU Stern School of Business
      icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png',
      map:map
    });

    //Si se oprime el boton NY Map
    document.getElementById("icono1").addEventListener("click", function () {
      //New map Housing
      var map = new google.maps.Map(document.getElementById('map'),options);
    });

    //Si se oprime el boton de Housing
    document.getElementById("icono2").addEventListener("click", function () {
      //New map Housing
      var map = new google.maps.Map(document.getElementById('map'),options);
      for (var w = 0; w < housingData.length; w++) {
        var latiHous = parseFloat(housingData[w][23]);
        var longiHous = parseFloat(housingData[w][24]);
        //Agreger marcador
        var marker = new google.maps.Marker({
          position:{lat:latiHous,lng:longiHous},     //lat long NYU Stern School of Business
          icon: 'http://maps.google.com/mapfiles/kml/pal2/icon10.png',
          map:map
        });
      }
    });

    //Si se oprime el boton de Districts
    document.getElementById("icono3").addEventListener("click", function () {

      //New map Districts
      var map = new google.maps.Map(document.getElementById('map'),options);

      //Graficar distritos
      map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
      //Estilo del mapa, color, grosor linea
      map.data.setStyle({
        fillColor: 'white',   //color poligono
        strokeWeight: 1,       //grosor borde
        strokeColor: 'grey'   //color borde
      });
      //cambia color mientras el cursor esté sobre el area
      map.data.addListener('mouseover', function(event) {
        map.data.overrideStyle(event.feature, {fillColor: 'red'});
      });
      //cambia color cuando el cursor sale del Area
      map.data.addListener('mouseout', function(event) {
        map.data.overrideStyle(event.feature, {fillColor: 'white'});
      });
    });

    //Si se oprime el boton de Safety
    document.getElementById("icono4").addEventListener("click", function () {

      //New map Housing
      var map = new google.maps.Map(document.getElementById('map'),options);
      //Marcar puntos de crimenes
      for (var i = 0; i < safetyData.length; i++) {
        var lati = parseFloat(safetyData[i].latitude);
        var longi = parseFloat(safetyData[i].longitude);

        //Agreger marcador
        var marker = new google.maps.Marker({
          position:{lat:lati,lng:longi},     //lat long NYU Stern School of Business
          icon: 'http://maps.google.com/mapfiles/kml/pal4/icon49.png',
          map:map
        });
      }
    });

    //Si se oprime el boton de Tourism-Mouseums
    document.getElementById("icono5").addEventListener("click", function () {
      //New map Museums
      var map = new google.maps.Map(document.getElementById('map'),options);
      //Museos
      for (var a = 0; a < museumsData.length; a++) {
        var arrLong = museumsData[a][8].substr(7,19);
        var arrLat = museumsData[a][8].substr('26','45');

        var arrLati = arrLat.split(")");

        var longit = parseFloat(arrLong);
        var latit = parseFloat(arrLati[0]);
        //Agreger marcador museos
        var marker = new google.maps.Marker({
          position:{lat:latit,lng:longit},
          icon: 'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png',
          map:map
        });
      }
      //Art Galleries
      for (var a = 0; a < artGalleriesData.length; a++) {
        var arrLong = artGalleriesData[a][9].substr(7,19);
        var arrLat = artGalleriesData[a][9].substr('26','45');

        var arrLati = arrLat.split(")");

        var longit = parseFloat(arrLong);
        var latit = parseFloat(arrLati[0]);
        //Agreger marcador museos
        var marker = new google.maps.Marker({
          position:{lat:latit,lng:longit},
          icon: 'http://maps.google.com/mapfiles/ms/micons/arts.png',
          map:map
        });
      }


      //Agreger marcador
      var marker = new google.maps.Marker({
        position:{lat:40.689249400,lng:-74.044500400},    //Statue of Liberty
        icon: 'http://maps.google.com/mapfiles/kml/pal4/icon46.png',
        map:map
      });
      var marker = new google.maps.Marker({
        position:{lat:40.782864700,lng:-73.965355100},     //Central Park
        icon: 'http://maps.google.com/mapfiles/kml/pal4/icon46.png',
        map:map
      });
      var marker = new google.maps.Marker({
        position:{lat:40.748817,lng:-73.985428},     //Empire State
        icon: 'http://maps.google.com/mapfiles/kml/pal4/icon46.png',
        map:map
      });
      var marker = new google.maps.Marker({
        position:{lat:40.758896,lng:-73.985130},     //Times Square
        icon: 'http://maps.google.com/mapfiles/kml/pal4/icon46.png',
        map:map
      });
      var marker = new google.maps.Marker({
        position:{lat:40.759487,lng:-73.978356},     //Rockefeller Center
        icon: 'http://maps.google.com/mapfiles/kml/pal4/icon46.png',
        map:map
      });
    });

    //Si se oprime el boton Bicycle
    document.getElementById("icono6").addEventListener("click", function () {

      //New map Housing
      var map = new google.maps.Map(document.getElementById('map'),options);
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    });

    //Si se oprime el boton Transit
    document.getElementById("icono7").addEventListener("click", function () {

      //New map Transit
      var map = new google.maps.Map(document.getElementById('map'),options);
      var transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(map);

    });

    //Si se oprime el boton Traffic
    document.getElementById("icono8").addEventListener("click", function () {

      //New map Housing
      var map = new google.maps.Map(document.getElementById('map'),options);

      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

    });

    //Si se oprime el boton Airport
    document.getElementById("icono9").addEventListener("click", function () {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;

      //New map Housing
      var map = new google.maps.Map(document.getElementById('map'),optionsAirport);
      //Agreger marcador
      directionsDisplay.setMap(map);

      var request = {
         origin: {lat:40.641311100,lng:-73.778139100},
         destination: {lat:40.7291,lng:-73.9965},
         travelMode: 'DRIVING'
       };
       directionsService.route(request, function(result, status) {
         if (status == 'OK') {
           directionsDisplay.setDirections(result);
         }
       });

    });

    //Si se oprime el boton Distance
    document.getElementById("icono10").addEventListener("click", function () {

      //New map Distance
      var map = new google.maps.Map(document.getElementById('map'),options);

    });

  }



  //Cargar primero todo el cuerpo de la pagina antes que el mapa
  google.maps.event.addDomListener(window,'load',initMap);
