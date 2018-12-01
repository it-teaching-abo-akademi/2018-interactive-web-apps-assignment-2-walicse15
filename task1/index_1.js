
//Hide and show button 
$(document).ready(function() {
    $('.hide').click(function() {
        $('.container').slideToggle("fast");
            $(this).val( $(this).val() == 'Hide' ? 'Show' : 'Hide' );
        });
    });


var varcodeInput = document.querySelector("input");
var varcodeInput11 = document.querySelector("input").value;
var decodeButton = document.querySelector(".decode");
var iban = document.querySelector("#iban");
var dueamount = document.querySelector("#dueamount");
var reference = document.querySelector("#reference");
var duedate = document.querySelector("#duedate");

//Color change to light grey when input is pressed
varcodeInput.addEventListener("change",function(){ 
   varcodeInput.style.backgroundColor = '#d3d3d3'; 
});

decodeButton.addEventListener("click", function(){
    console.log(varcodeInput.value);
    console.log(varcodeInput.value);
//  check if field is empty or not  
    if(varcodeInput.value===''){
        alert("Please enter the virtual bar code");
    }
    
    if(varcodeInput.value.length<54){
        alert("Please enter valid virtual bar code");
    }
    
//    Check version number
    
    var version = varcodeInput.value.substring(0,1);
    console.log(version);
    
//    Calculate and display IBAN 
    
    var resultIBAN = varcodeInput.value.substring(1,17);
    console.log(resultIBAN);
    if(varcodeInput.value===''|| varcodeInput.value.length<54){
      document.getElementById('iban').innerHTML = '';  
    }else{
      document.getElementById('iban').innerHTML = resultIBAN;  
    }
    
    
////    Calculate and display DUEamount
    
    var dueamount = varcodeInput.value.substring(18,25);
    var euro = dueamount.toString().substring(0,5) ;
    var cents = dueamount.toString().substring(5,8);
    console.log(euro);
    console.log(cents);
    console.log(dueamount);
    if(varcodeInput.value==='' || varcodeInput.value.length<54){
    document.getElementById('duedate').innerHTML = '';
    }else{
    document.getElementById('dueamount').innerHTML = Number(euro) + "," + cents;
    }
    
////    Calculate and display reference number
    
    var reference = varcodeInput.value.substring(26,48);
    var referenceWO = reference.replace(/^0+/, '');
    console.log(reference);
    if(version === "4"){
        document.getElementById('reference').innerHTML = referenceWO;    
    }
    
    if(version === "5"){
        var reference4 = varcodeInput.value.substring(25,27);
        console.log(reference4);
        var reference5 = varcodeInput.value.substring(27,48);
        var referenceWO5 = reference5.replace(/^0+/, '');
        console.log(reference5);
        document.getElementById('reference').innerHTML = "RF"+reference4+referenceWO5;
    }
    
    
////    Calculate and display DUEdate 
    var duedate = varcodeInput.value.substring(varcodeInput.value.length-6);
    console.log(duedate);
    var year = duedate.toString().substring(0,2);
    console.log(year);
    var month = duedate.substring(2,4);
    console.log(month);
    var day = duedate.substring(4,6);
    console.log(day);
    
    if(varcodeInput.value==='' || varcodeInput.value.length<54){
    document.getElementById('duedate').innerHTML = '';    
    }else if(day==="00" && month==="00" && year==="00"){
    document.getElementById('duedate').innerHTML = "None";
    } else{
    document.getElementById('duedate').innerHTML = Number(day) + "." + Number(month) + ".20" + year;
    }
//     document.getElementById('#barcodeDisplay').JsBarcode(varcodeInput.value, {format: "CODE128C"});
    $("#barcodeDisplay").JsBarcode(varcodeInput.value, {format: "CODE128C"});
    
});

