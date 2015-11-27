
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:@
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler@
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//document.addEventListener("resume", onResume, false);
        app.receivedEvent('deviceready');

		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		last_click_time = new Date().getTime();
		
		document.addEventListener('click', function (e) {
								  
								  click_time = e['timeStamp'];
								  
								  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  }
								  
								  last_click_time = click_time;
								  
								  }, true);
		
		
		var idoperatore = localStorage.getItem("idoperatore");
		var loginvera = localStorage.getItem("loginvera");
		
		
		if (localStorage.getItem("idoperatore") === null || localStorage.getItem("idoperatore")=="null" || typeof(localStorage.getItem("idoperatore")) == 'undefined' || localStorage.getItem("idoperatore")==0 || localStorage.getItem("idoperatore")=="") {
			
			window.location.href = "Login.html";
			$(".spinner").hide();
			
		}
		else
		{
			
			
			self.document.formia.operatore.value = localStorage.getItem("idoperatore")
			
			
		}
		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;//January is 0, so always add + 1
			
			
			var yyyy = today.getFullYear();
			if(dd<10){dd="0"+dd}
			if(mm<10){mm="0"+mm}
			today = dd+'/'+mm+'/'+yyyy;
			
			self.document.formia.data.value = today
			
			//checkPos();
			//agg();
			
			$(".spinner").hide();
			
			$(".spinner").hide();
			

		}
		else{
			
			var tabella = "<table align='center' border='0' width='100%' height='120px'>";
			tabella = tabella + "<tr><td align='center'><a href='javascript:riparti()' class='btn'><font color='#fff'>Connetti</font></a></td></tr>";
			tabella = tabella + "</table>";
			
			$("#noconn").html(tabella);
			
			
			$("#footer").show();
		}
    }
	
}

function lista() {
	var numero=0;
	
	if (self.document.formia.data.value == "") {
		navigator.notification.alert(
									 'inserire una data',  // message
									 alertDismissed,         // callback
									 'Data',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	$("#formreg").hide();
	$("#tabella").show();
	
	$("#dataa").html(self.document.formia.data.value);
	$("#operatorea").html(self.document.formia.operatore.value);
	
	
	var lend = "<br><table border='0' align='center' width='100%'><tr><td align='center' width='33%'><b>Via</b></td><td align='center'  width='33%'><b>Civico</b></td><td align='center'  width='33%'><b>N.Volantini</b></td></tr>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://app.prolution.it/api/volantinaggio/lista",
		   data: {operatore:localStorage.getItem("idoperatore"),data:self.document.formia.data.value},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.result==1){
		   
		   $.each(result.data, function(i,item){
				  
				  //alert(item.inizio + item.fine);
				  
				  var civici = item.civici
				  
				  for ( i=0; i < civici.length; i++ )
				  {
				  
				  lend = lend + "<tr><td align='center' width='33%'>"+ civici[i]["via"] +"</td><td align='center'  width='33%'>"+ civici[i]["civico"] +"</td><td align='center'  width='33%'>"+ civici[i]["volantini"] +"</td></tr>";
				  
				  numero = parseInt(numero) + parseInt(civici[i]["volantini"])
				  //alert(civici[i]["via"])
				  
				  }
			});
		   
		   $("#volantinia").html(numero);
		   
		   $("#contenuto").html(lend + "</table>");
		   
		   myScroll.refresh();
		   
		   }
		   else{
		   //alert("Non sei autorizzato");
		   //window.location.href = "Froala/basic.html";
		   
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   
		   },
		   dataType:"json"});
	
	
}

function agg(){
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	
	db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (Email, Via, Data, Ora, Civico, Volantini, lat, lng, Foto)');
       //tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES (1, 1, 1, "Omaggio", "Omaggio")');
	});
	
	seleziona() 
	
}

function agg2(){
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	
	var idunico = (parseInt(localStorage.getItem("unico"))+1);
	//alert();
	
	db.transaction(function (tx) {
       //tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (Email, Via, Data, Ora, Civico, Volantini, Foto)');
       tx.executeSql('INSERT INTO Ordine (Email, Via, Data, Ora, Civico, Volantini, lat, lng, Foto) VALUES ("'+ localStorage.getItem("email") +'", "'+ self.document.formia.via.value +'", "'+ self.document.formia.data.value +'", "'+ self.document.formia.ora.value +'", "'+self.document.formia.civico.value+'", "'+self.document.formia.nvolantini.value+'", "lat", "lng", "Fotoo")');
	});
	
	
	seleziona();
}

function seleziona() {
	//alert("1")
	var lend = "<br><table border='0' align='center' width='100%'><tr><td align='center' width='33%'><b>Via</b></td><td align='center'  width='33%'><b>Civico</b></td><td align='center'  width='33%'><b>N.Volantini</b></td></tr>"
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					  //alert(len)
					 
					 for (i = 0; i < len; i++){

					 
					 lend = lend + "<tr><td align='center' width='33%'>"+ results.rows.item(i).Via +"</td><td align='center'  width='33%'>"+ results.rows.item(i).Civico +"</td><td align='center'  width='33%'>"+ results.rows.item(i).Volantini +"</td></tr>";
					 
					 }
					 
					  $("#contenuto").html(lend + "</table>");
					 //<tr><td colspan='3' align='center'><a href='javascript:dlt()'>Delete</a></td></tr>
					 
					 
					 }, null);
				   
				   
				   initscroll()
				   
				   //$("#viale").hide();
				   //$("#civiccia1").hide();
				   //$("#civiccia").hide()
		});
	
}

function dlt(){
	
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
	}, null);
	});
	
	seleziona();
	
}



function onConfirm(button) {
	
	if (button==1){
		localStorage.setItem("email3", 1);
		dlt()
	}
	else{
		localStorage.setItem("email2", localStorage.getItem("emailStory"));
		
		localStorage.setItem("loginvera", "")
		localStorage.setItem("email", "")
		
		window.location.href = "Login.html";
	}
}




function verificawifi(){
	$("#verifica").click();
}


function onResume() {
	app.initialize();
}

function checkPos() {
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
	
	function onSuccess(position) {
		ciao = position.coords.latitude;
		ciao1 = position.coords.longitude;
		
		localStorage.setItem("lat", ciao)
		localStorage.setItem("lng", ciao1)
		
		localStorage.setItem("geostory", "SI")
		
		$("#coord").html("maps:saddr="+ ciao +","+ ciao1 +"");

		codeLatLng(ciao,ciao1)
		//alert('Lat' + ciao + 'Lng' + ciao1);

	}
	
	
	function onError(error) {
		
		localStorage.setItem("geostory", "NO")
		
		/*$("#radio").attr("maps:q=Via di Acilia, 17,Roma");
		$("#radio2").attr("maps:q=Via di Acilia, 17,Roma");
		$("#radio9").attr("maps:q=Via di Acilia, 17,Roma");*/

	}
	
}


function codeLatLng(lati,lngi) {

	
	var geocoder;
	geocoder = new google.maps.Geocoder();
	//var input = "41.875094, 12.478151";
	//var latlngStr = input.split(',', 2);
	var lat = parseFloat(lati);
	var lng = parseFloat(lngi);
	var latlng = new google.maps.LatLng(lat, lng);
	
	geocoder.geocode({'latLng': latlng}, function(results, status) {
					 if (status == google.maps.GeocoderStatus.OK) {
					 if (results[0]) {
					 
					 //var tabella = '<table align="center" border="0" width="310px" height="60px">';
					 //tabella = tabella + '<tr><td align="center" width="50px"><a href="maps:daddr=41.913010,12.442009&saddr=41.875094,12.478151"><img src="images/pin.png" width="32px"></a></td><td align="left"><font color="white" size="2">'+ results[1].formatted_address +'</font></td></tr>';
					 //tabella = tabella + '</table>';
					 
					 var viadotto = results[0].formatted_address;
					 
					 localStorage.setItem("Via", viadotto)

					 self.document.formia.via.value = viadotto
					 
					 
					 $(".spinner").hide();

					 
					 } else {
					 navigator.notification.alert(
												  'Non riesco a rilevare la tua posizione',  // message
												  alertDismissed,         // callback
												  'Attenzione',            // title
												  'OK'                  // buttonName
												  );
					 $(".spinner").hide();

					 }
					 } else {
					 navigator.notification.alert(
												  'Non riesco a rilevare la tua posizione',  // message
												  alertDismissed,         // callback
												  'Attenzione',            // title
												  'OK'                  // buttonName
												  );
					 
					 $(".spinner").hide();


					 }
			});
	
	setTimeout (function(){
		$("#footer").show();
	}, 1500);
	
	myScroll.refresh();

}

function gomappa(){
	var addressLongLat = '41.862321,12.692804';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	//window.open("http://maps.google.com/?q="+addressLongLat, '_system');
	
	//var ref = window.open('http://maps.apple.com/?q=Via di Acilia, 7', '_system');
	
}

function getDistance(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1);
	var a =
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	Math.sin(dLon/2) * Math.sin(dLon/2)
	;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}



function apri() {
	var pagina = "donazione";
	var ref = window.open('http://www.pokeranswer.it/live/'+ pagina +'.asp', '_blank', 'location=no');
	//www.pokeranswer.it/live/aams.html
}

function GoBack() {
	$(window).scroll(function() {
					 if($(window).scrollTop() + $(window).height() > $(document).height() - 40) {
					 buildprodotto(localStorage.getItem("Categoria"),localStorage.getItem("Provincia"),2,1);
					 }
					 });
	  history.go(-1);
	
	}




function compraEmail() {
	window.plugin.email.open({
		to:      ['info@mistertod.it'],
		subject: 'Contatti',
		body:    '',
		isHtml:  true
	});
}

function EmailDimenticata() {
	navigator.notification.prompt(
								  'Inserisci il tuo indirizzo email',  // message
								  onPrompt,                  // callback to invoke
								  'Recupera la Password',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  'Email'                 // defaultText
								  );
}

function onPrompt(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'inserire indirizzo email',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		EmailAddr = results.input1;
		Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
		if (Filtro.test(EmailAddr)) {
			
		}
		else {
			navigator.notification.alert(
										 'Caratteri email non consentiti',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}

		//Recupera la Password
		//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://www.mistertod.it/www/Check_RecPassword.asp",
			   contentType: "application/json",
			   data: {email:results.input1},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					if(item.Token==1024){
					  navigator.notification.alert(
												   'Invio eseguito correttamente',  // message
												   alertDismissed,         // callback
												   'Recupero Password',            // title
												   'OK'                  // buttonName
												   );
					}
					else{
						navigator.notification.alert(
												   'Recupero fallito, riprova in seguito',  // message
												   alertDismissed,         // callback
												   'Errore Recupero',            // title
												   'OK'                  // buttonName
												   );
					}

			   
					  
				});
			   
			   $(".spinner").hide();
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Attenzione',            // title
											'Done'                  // buttonName@
											);
			   
			   },
		dataType:"jsonp"});

		
	}
		
}

function errorHandler(error) {
	navigator.notification.alert(
								 'Possibile errore di rete, riprova tra qualche minuto',  // message
								 alertDismissed,         // callback
								 'Attenzione',            // title
								 'Done'                  // buttonName
								 );
}

function getKey(key){
	if ( key == null ) {
		keycode = event.keyCode;
		
	} else {
		keycode = key.keyCode;
	}
	
	if (keycode ==13){
		
		document.activeElement.blur();
		$("input").blur()
		return false;
		
	}
	
}

function alertDismissed() {
	
}

function initscroll() {
	
	myScroll = new IScroll('#wrapper', { click: true });
	
	setTimeout (function(){
		myScroll.refresh();
	}, 500);
				   
	document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
				   
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

}

function uscire(){
localStorage.setItem("loginvera", "")
localStorage.setItem("email", "")
	
window.location.href = "index.html";
}

function goprofilo(){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
	}else{
		
		window.location.href = "Profilo.html";
	}
}

function exitapp(){
	navigator.app.exitApp();
}

function riparti(){
	
	window.location.href = "index.html";
	
}

function vedivia(){
	checkPos()
	
	$("#viale").show();
	$("#civiccia1").show();
	
}

function vedicivico(){
	$("#civiccia").show()
	
	//initscroll()
	myScroll.refresh();
	
	 $(window).scrollTop(200);
	
	//myScroll.scrollTo(0, myScroll.maxScrollY, 0);
}



// FOTO E ARCHIVIO

function scatta(){
	if (self.document.formia.nvolantini.value == "") {
		navigator.notification.alert(
									 'inserire il numero dei volantini',  // message
									 alertDismissed,         // callback
									 'N. Volantini',            // title
									 'OK'                  // buttonName
									 );
		return;
	}

	
	if (self.document.formia.civico.value == "") {
		navigator.notification.alert(
									 'inserire un numero civico',  // message
									 alertDismissed,         // callback
									 'Civico',            // title
									 'OK'                  // buttonName
									 );
		return;
	}

	
	//agg2()
	
	navigator.camera.getPicture(onSuccess, onFail, { quality: 30,
		destinationType: Camera.DestinationType.DATA_URL,
		encodingType: Camera.EncodingType.PNG,
		targetWidth: 100,
		targetHeight: 100
	});
}




function onSuccess(imageData) {
	//alert(imageData);
	var image00 = document.getElementById('myImage');
	//var imgData = imageData.replace(/^data:image\/(png|jpg);base64,/, "");
	image00.src = "data:image/png;base64," + imageData;
	//document.getElementById("demo").innerHTML = imageData;
	
	
	var sogno = "data:image/png;base64," + imageData;
	
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	
	
	db.transaction(function (tx) {
       //tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (Email, Via, Data, Ora, Civico, Volantini, Foto)');
       tx.executeSql('INSERT INTO Ordine (Email, Via, Data, Ora, Civico, Volantini, lat, lng, Foto) VALUES ("'+ localStorage.getItem("email") +'", "'+ self.document.formia.via.value +'", "'+ self.document.formia.data.value +'", "'+ self.document.formia.ora.value +'", "'+self.document.formia.civico.value+'", "'+self.document.formia.nvolantini.value+'", "'+ localStorage.getItem("lat") +'", "'+ localStorage.getItem("lng") +'", "'+ sogno +'")');
	});
	
	var conteggio = (parseInt(self.document.formia.volantini.value) + parseInt(self.document.formia.nvolantini.value))
	localStorage.setItem("conteggio", conteggio);
	
	self.document.formia.volantini.value = conteggio
	
	seleziona();
	
	
}

function onFail(message) {
	alert("");
}


function start() {
	
	document.getElementById("email").value = "F10620"
	
	localStorage.setItem("idoperatore", result.idoperatore);
	
	
}


function salva() {
	if (self.document.formia.ora_fine.value == "") {
		navigator.notification.alert(
									 'inserire un orario di fine lavoro',  // message
									 alertDismissed,         // callback
									 'Orario',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	

	localStorage.setItem("servizio", document.getElementById("id").value);
	
	localStorage.setItem("data", document.getElementById("data").value);
	localStorage.setItem("inizio", document.getElementById("ora").value);
	localStorage.setItem("fine", document.getElementById("ora_fine").value);
	
	/*
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://app.prolution.it/api/volantinaggio/lista",
		   data: {operatore:localStorage.getItem("idoperatore"),data:"09/11/2015"},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.result==1){
			//OK
			alert(result.result);
		   

		   }
		   else{
		    //alert("Non sei autorizzato");
		    //window.location.href = "Froala/basic.html";
		   
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   
		   },
		   dataType:"json"});
	 */
	
	
	/*
	$(".spinner").show();
	$.ajax({
		   type:"POST",
		   url:"https://app.prolution.it/api/volantinaggio/dettagli",
		   data: {servizio:localStorage.getItem("servizio"),operatore:localStorage.getItem("idoperatore"), data:localStorage.getItem("data"), inizio:localStorage.getItem("inizio"), fine:localStorage.getItem("fine"),volantino:""},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){
		   //alert(result.result);
		   
		   if (result.result==1){
			alert(result.result);

		   
		   }
		   else{
			alert(result.result);
			//window.location.href = "Froala/basic.html";
		   
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   
		   },
		   dataType:"json"});
	
	*/
	
	$(".spinner").show();
	$.ajax({
		   type: "POST",
		   url: "https://app.prolution.it/api/volantinaggio/dettagli",
		   data: {servizio:localStorage.getItem("servizio"),operatore:localStorage.getItem("idoperatore"), data:localStorage.getItem("data"), inizio:localStorage.getItem("inizio"), fine:localStorage.getItem("fine"),volantino:""},
		   cache: false,
		   contentType: "application/x-www-form-urlencoded",
		   success: function (result) {
		    //alert("Rapporto: " + result.idrapporto);
			localStorage.setItem("rapporto", result.idrapporto);
		    //alert(result.result);
			salvatutto()
	 
		   
		   },
		   error: function(){
		    alert(result.result);
	 
		   
		   }
		   
		   });
	

	/*
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 for (i = 0; i < len; i++){

					  
					  $.ajax({
					  type: "POST",
					  url: "http://www.gtechplay.com/coiros/www/Check_TakePhoto.asp",
					  data: { nome:results.rows.item(i).Foto, img_id:1, name:localStorage.getItem("email") },
					  cache: false,
					  contentType: "application/x-www-form-urlencoded",
					  success: function (result) {
					  $.each(result, function(i,item){
					  
					  //initscroll()
					  $("#ufoto").show()
					  
					  });
					  
					  
					  },
					  error: function(){
					  
					  navigator.notification.alert(
					  'NOOO',  // message
					  alertDismissed,         // callback
					  'Connessione Internet',            // title
					  'OK'                  // buttonName
					  );
					  
					  }
					  
					  });
					 
					 
					 }
					 
					 
		}, null);
				   

	});
	

	setTimeout (function(){
		dlt()
	}, 2000);
	*/
	
}

function lista22() {

	 $(".spinner").show();
	 $.ajax({
	 type:"GET",
	 url:"https://app.prolution.it/api/volantinaggio/lista",
	 data: {operatore:localStorage.getItem("idoperatore"),data:"14/10/2015"},
	 contentType: "application/json; charset=utf-8",
	 json: 'callback',
	 timeout: 7000,
	 crossDomain: true,
	 success:function(result){
			
	if (result.result==1){
		
	$.each(result.data, function(i,item){
		
	alert(item.inizio + item.fine);
		   
		   var civici = item.civici
		   
		   for ( i=0; i < civici.length; i++ )
		   {
		   
			alert(civici[i]["via"])
				 
		   }
	});
	 
	 
	 }
	 else{
	 //alert("Non sei autorizzato");
	 //window.location.href = "Froala/basic.html";
	 
	 }
	 
	 $(".spinner").hide();
	 
	 },
	 error: function(){
	 $(".spinner").hide();
	 
	 navigator.notification.alert(
	 'possible network error',  // message
	 alertDismissed,         // callback
	 'Error',            // title
	 'OK'                  // buttonName
	 );
	 
	 
	 },
	 dataType:"json"});
	

}


function salvatutto() {
	

	 db.transaction(function (tx) {
	 tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
	 var len = results.rows.length, i;
	 
	 for (i = 0; i < len; i++){
	 
	 $.ajax({
	 type: "POST",
	 url: "https://app.prolution.it/api/volantinaggio/civico",
	 data: { rapporto:localStorage.getItem("rapporto"), data:results.rows.item(i).Data, ora:results.rows.item(i).Ora, via:results.rows.item(i).Via, civico:results.rows.item(i).Civico, citta:"Roma", longitudine:results.rows.item(i).lng, latitudine:results.rows.item(i).lat, volantini:results.rows.item(i).Volantini, foto:results.rows.item(i).Foto },
	 cache: false,
	 contentType: "application/x-www-form-urlencoded",
	 success: function (result) {
	 
	 },
	 error: function(){
	 
	 navigator.notification.alert(
	  'Errore imprevisto nel caricamento dei dati',  // message
	   alertDismissed,         // callback
	  'Connessione Internet',            // title
	  'OK'                  // buttonName
	 );
			
	 $(".spinner").hide();
	 
	 }
	 
	 });

	 }
	
	 $(".spinner").hide();
				   
	 //dlt()
	 //compare il tasto cancella tutto
				   
		}, null);
	 
	 });

}


function logout(){
	localStorage.setItem("loginvera", "NO")
	localStorage.setItem("Nome", "");
	localStorage.setItem("Cognome", "");
	
	localStorage.setItem("email", "");
	localStorage.setItem("idoperatore", "");
	
	
	window.location.href = "index.html";
}

//PRENDI COORDINATE GPS
function prendicoordinate(){
	
var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
	"address": "Via Emilio Malerba,16A, 00125, Roma"
	}, function(results) {
	
	alert(results[0].geometry.location); //LatLng
});
}





