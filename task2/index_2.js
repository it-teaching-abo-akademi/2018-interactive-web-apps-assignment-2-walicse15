var search = document.getElementById("search");
var clear = document.getElementById("clear");
var country = document.getElementById("countrynames");


search.addEventListener("click",function(){
  var countryValue;
  var zipcode =  document.getElementById("zipcode").value;
   // alert(zipcode);
    var slct = country.options[country.selectedIndex].text;
    if(slct === "Finland"){
        countryValue = "FI"
    //    alert(countryValue);
    }else if(slct === "France"){
        countryValue = "FR"
      //  alert(countryValue);
    //alert(slct);
    }else if(slct === "Sweden"){
        countryValue = "SE"
       // alert(countryValue);
    }else{
        countryValue = "DE"
       // alert(countryValue);
    }
        var apiLINK = "https://api.zippopotam.us/"+countryValue+"/"+zipcode;
   // alert(apiLINK);
        var latitude,longitude,myObj,data;
        var client = new XMLHttpRequest();
        client.open("GET", apiLINK, true);
        client.onreadystatechange = function() {
       if(client.readyState == 4) {
       console.log(client.responseText);
           if(client.responseText=="{}"){
               alert("please enter correct zip code!!")
           }else{
            myObj = JSON.parse(this.responseText);
            var zipcode = myObj["post code"];
            var countryName = myObj.country;
            saveData(zipcode,countryName);
            updateData();
            for(var i=0;i<myObj.places.length;i++){
               data = myObj.places[i];
               latitude = parseFloat(data.latitude);
               longitude = parseFloat(data.longitude);
               document.getElementById("myTable").innerHTML += "<tr><td>"+data["place name"]+"</td><td>"+data.longitude+"</td><td>"+data.latitude+"</td></tr>"
                }
                myMap(latitude,longitude);     
           }

       }
    };
        client.send();
});

    clear.addEventListener('click',function(){
    clearData(); 
});



function myMap(latitude,longitude){
    var latitude,longitude;
    console.log(latitude);
    console.log(longitude);
    if(latitude===undefined && longitude===undefined){
    var mapProp= {
    center:new google.maps.LatLng(42.678693,23.321737),
    zoom:5
};
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    
    else if(latitude!=59.3293 && longitude!=18.0686){
            var mapProp= {
    center:new google.maps.LatLng(latitude,longitude),
    zoom:12
            };
    }
    
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
    var marker = new google.maps.Marker({
    position:{lat:latitude,lng:longitude},
    map:map
});
}

function saveData (zipcode,countryName){
    if (typeof(Storage) == "undefined") {

    }
    else{
        var historyZipcode = localStorage.getItem("historyZipcode");
        var historyCountry = localStorage.getItem("historyCountry");
        if(historyZipcode==null && historyCountry==null){
            localStorage.setItem("historyZipcode", zipcode);
            localStorage.setItem("historyCountry", countryName);
        } 
        else{
            //var historystrings = historyString.split('\n');
            var h1C = historyCountry.split('\n');
            var h1Z = historyZipcode.split('\n');
            var newHistoryZIP = zipcode;
            var newHistoryCountry = countryName;
            for (var i = 0 ; i < h1Z.length; i++) {
                if(i<9)
                newHistoryZIP += "\n" + h1Z[i];
            }
            for (var i = 0 ; i < h1C.length; i++) {
                if(i<9)
                newHistoryCountry += "\n" + h1C[i];
            }
            localStorage.setItem("historyZipcode", newHistoryZIP);
            localStorage.setItem("historyCountry", newHistoryCountry);
        }			
    }
}

		
function updateData (){
    var historyZipcode = null;
    var historyCountry = null;
    historyZipArray = {};
    historyCountryArray = {};
    if (typeof(Storage) == "undefined") {
        historyZipcode = null;
        historyCountry = null;
    }
    else{
        historyZipcode = localStorage.getItem("historyZipcode");
        historyZipArray = historyZipcode.split('\n');
        historyCountry = localStorage.getItem("historyCountry");
        historyCountryArray = historyCountry.split('\n');
    }

    if(historyZipcode!=null && historyCountry!=null){
        for (var i = 0 ; i < historyZipArray.length; i++) {
                    document.getElementById("history").innerHTML += "<p>"+historyCountryArray[i]+ " - " +historyZipArray[i]+ "\n"+"</p>"
                }				
    }	
}

    function clearData(){
    var historyZipcode = localStorage.getItem("historyZipcode");
    var historyCountry = localStorage.getItem("historyCountry");
    if(historyZipcode!=null && historyCountry!=null){
        localStorage.clear();
        document.getElementById("history").innerHTML = null;
    }
}
