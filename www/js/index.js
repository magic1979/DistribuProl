
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
		
		 $(document).on("touchmove", function(e){
			$('#via').blur();
			$('#civico').blur();
			$('#nvolantini').blur();
			$('#data').blur();
			$('#ora').blur();
			$('#ora_fine').blur();
			$('#volantini').blur();
			$('#NomeAzienda').blur();
			$('#Settore').blur();
			$('#TelAzienda').blur();

			cordova.plugins.Keyboard.close();
		 });
		

		last_click_time = new Date().getTime();
		
		document.addEventListener('click', function (e) {
								  
								  click_time = e['timeStamp'];
								  
								  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  }
								  
								  last_click_time = click_time;
								  
								  }, true);
		
		
		// Workaround for buggy header/footer fixed position when virtual keyboard is on/off
		$('input, select')
		.on('focus', function (e) {
			$('header, footer').css('position', 'absolute');
			})
		.on('blur', function (e) {
			$('header, footer').css('position', 'fixed');
			//force page redraw to fix incorrectly positioned fixed elements
			setTimeout( function() {
        window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
					   }, 20 );
			});
		

		var idoperatore = localStorage.getItem("idoperatore");
		var loginvera = localStorage.getItem("loginvera");
		
		
		if (localStorage.getItem("idoperatore") === null || localStorage.getItem("idoperatore")=="null" || typeof(localStorage.getItem("idoperatore")) == 'undefined' || localStorage.getItem("idoperatore")==0 || localStorage.getItem("idoperatore")=="") {
			
			window.location.href = "Login.html";
			$(".spinner").hide();
			
		}
		else
		{
			
			if(localStorage.getItem("conteggio") === null || localStorage.getItem("conteggio")=="null" || typeof(localStorage.getItem("conteggio")) == 'undefined' || localStorage.getItem("conteggio")=="0" || localStorage.getItem("conteggio")=="") {
			
				self.document.formia.volantini.value = "0";
			}
			else{
				self.document.formia.volantini.value = localStorage.getItem("conteggio")
			}
			
			//self.document.formia.operatore.value = localStorage.getItem("email")
			self.document.formia.operatore.value = localStorage.getItem("idoperatore")
			self.document.formia.id.value = "2790";
			
		}
		
		
		var ciao = "";
		var ciao1 = "";
		var distanza = "";
		var Categoria="";
		var Provincia="";
		localStorage.setItem("unico", "0");
		self.document.formia.volantini.value = 0;
		var db;
		var dbCreated = false;
		
		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;//January is 0, so always add + 1
			
			var ora = today.getHours()
			if(ora<10){ora="0"+ora}
			
			var minuti = today.getMinutes();
			if(minuti<10){minuti="0"+minuti}
			
			var secondi = today.getSeconds();
			if(secondi<10){secondi="0"+secondi}
			
			self.document.formia.ora.value = ora + ":" + minuti
			
			var yyyy = today.getFullYear();
			if(dd<10){dd="0"+dd}
			if(mm<10){mm="0"+mm}
			today = dd+'/'+mm+'/'+yyyy;
			
			self.document.formia.data.value = today
			
			checkPos();
			agg();
			
			//mostrapunti()
			$(".spinner").hide();
			
			setTimeout (function(){
				$("#footer").show();
			}, 1500);

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

function agg(){
	db = window.openDatabase('mydb', '1.0', 'TestDB', 1000000);
	
	db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (Email, Via, Data, Ora, Civico, Longitudine, Latitudine, Volantini, Foto)');
	});
	
	//agg3();
	
	seleziona()
	
}

function agg3(){
	db2 = window.openDatabase('mydb2', '1.0', 'Coord', 1000000);
	
	db2.transaction(function (tx2) {
       tx2.executeSql('CREATE TABLE IF NOT EXISTS Coordinate (Data, Ora, Civico, Latitudine, Longitudine)');
	});
	
	
	seleziona()
	
}

/*function agg2(){
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	
	var idunico = (parseInt(localStorage.getItem("unico"))+1);
	//alert();
	
	db.transaction(function (tx) {
       //tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (Email, Via, Data, Ora, Civico, Volantini, Foto)');
       tx.executeSql('INSERT INTO Ordine (Email, Via, Data, Ora, Civico, Volantini, lat, lng, Foto) VALUES ("'+ localStorage.getItem("email") +'", "'+ self.document.formia.via.value +'", "'+ self.document.formia.data.value +'", "'+ self.document.formia.ora.value +'", "'+self.document.formia.civico.value+'", "'+self.document.formia.nvolantini.value+'", "lat", "lng", "Fotoo")');
	});
	
	
	seleziona();
}*/

function seleziona() {
	//alert("1")
	var lend = "<br><table border='0' align='center' width='100%'><tr><td align='center' width='33%'><b>Via</b></td><td align='center'  width='33%'><b>Civico</b></td><td align='center'  width='33%'><b>N.Volantini</b></td></tr>"
	
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 for (i = 0; i < len; i++){

					 
					 lend = lend + "<tr><td align='center' width='33%'>"+ results.rows.item(i).Via +"</td><td align='center'  width='33%'>"+ results.rows.item(i).Civico +"</td><td align='center'  width='33%'>"+ results.rows.item(i).Volantini +"</td></tr>";
					 
					 }
					 
					  $("#contenuto").html(lend + "</table>");
					 
					 
					 }, null);
				   
				   
				   $('#via').blur();
				   $('#civico').blur();
				   $('#nvolantini').blur();
				   $('#data').blur();
				   $('#ora').blur();
				   $('#ora_fine').blur();
				   $('#volantini').blur();
				   $('#NomeAzienda').blur();
				   $('#Settore').blur();
				   $('#TelAzienda').blur();
					 
				   initscroll()
				   
		});
	
	
	/*db2.transaction(function (tx2) {
	 tx2.executeSql('SELECT * FROM Coordinate', [], function (tx2, results2) {
	 var len = results2.rows.length, i;
	 
	 for (i = 0; i < len; i++){
	 
		lend = lend + "<tr><td align='center' width='33%'>"+ results2.rows.item(i).Latitudine +"</td><td align='center'  width='33%'>"+ results2.rows.item(i).Longitudine +"</td><td align='center'  width='33%'>"+ results2.rows.item(i).Civico +"</td></tr>";
	 
	 }
	 
	 $("#contenuto").html(lend + "</table>");
	 
	 
	 }, null);
	 
	 
	 initscroll()
	 
	});*/

	
}

function dlt(){
	
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
	}, null);
	});
	
	/*db2.transaction(function (tx2) {
		tx2.executeSql('DELETE FROM Coordinate', [], function (tx2, results2) {
		}, null);
	});*/
	
	
	$("#btncancella").hide();
	$("#btnsalva").show();
	
	localStorage.setItem("imgvolantino", "");
	localStorage.setItem("imgvolantino2", "");
	localStorage.setItem("imgvolantino3", "");
	localStorage.setItem("imgvolantino4", "");
	localStorage.setItem("imgvolantino5", "");
	localStorage.setItem("imgvolantino6", "");
	
	var image001 = document.getElementById('myImageVol');
	image001.src = "img/vol1.png";
	var image002 = document.getElementById('myImageVol2');
	image002.src = "img/vol1.png";
	var image003 = document.getElementById('myImageVol3');
	image003.src = "img/vol1.png";
	var image004 = document.getElementById('myImageVol4');
	image004.src = "img/vol1.png";
	var image005 = document.getElementById('myImageVol5');
	image005.src = "img/vol1.png";
	var image006 = document.getElementById('myImageVol6');
	image006.src = "img/vol1.png";
	
	$("#ufoto").hide();
	
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
		
		self.document.formia.Lati.value = ciao;
		self.document.formia.Longi.value = ciao1;


		codeLatLng(ciao,ciao1)

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

	
	myScroll.refresh();

}

function gomappa(){
	var addressLongLat = '41.862321,12.692804';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');

	
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
		
		myScroll.scrollToElement("#segna", "1s");
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
	
	myScroll.scrollToElement("#via", "1s");
	
}

function vedicivico(){
	$("#civiccia").show()
	self.document.formia.nvolantini.value = ""
	self.document.formia.civico.value = ""
	
	//initscroll()
	myScroll.refresh();
	
	myScroll.scrollToElement("#civico", "1s");
	
	//myScroll.scrollTo(0, myScroll.maxScrollY, 0);
}

// FOTO VOLANTINO

function prendi(){

	navigator.camera.getPicture(Successo, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo(imageData) {
	
	localStorage.setItem("imgvolantino", "data:image/png;base64," + imageData);
	
	var image000 = document.getElementById('myImageVol');
	image000.src = localStorage.getItem("imgvolantino");

}

function prendi2(){
	
	navigator.camera.getPicture(Successo2, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo2(imageData) {
	
	localStorage.setItem("imgvolantino2", "data:image/png;base64," + imageData);
	
	var image002 = document.getElementById('myImageVol2');
	image002.src = localStorage.getItem("imgvolantino2");
	
}

function prendi3(){
	
	navigator.camera.getPicture(Successo3, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo3(imageData) {
	
	localStorage.setItem("imgvolantino3", "data:image/png;base64," + imageData);
	
	var image003 = document.getElementById('myImageVol3');
	image003.src = localStorage.getItem("imgvolantino3");
	
}

function prendi4(){
	
	navigator.camera.getPicture(Successo4, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo4(imageData) {
	
	localStorage.setItem("imgvolantino4", "data:image/png;base64," + imageData);
	
	var image004 = document.getElementById('myImageVol4');
	image004.src = localStorage.getItem("imgvolantino4");
	
}

function prendi5(){
	
	navigator.camera.getPicture(Successo5, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo5(imageData) {
	
	localStorage.setItem("imgvolantino5", "data:image/png;base64," + imageData);
	
	var image005 = document.getElementById('myImageVol5');
	image005.src = localStorage.getItem("imgvolantino5");
	
}

function prendi6(){
	
	navigator.camera.getPicture(Successo6, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo6(imageData) {
	
	localStorage.setItem("imgvolantino6", "data:image/png;base64," + imageData);
	
	var image006 = document.getElementById('myImageVol6');
	image006.src = localStorage.getItem("imgvolantino6");
	
}


// FOTO E ARCHIVIO

function scatta(){
	//localStorage.setItem("imgcivico", "");
	
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
		targetWidth: 200,
		targetHeight: 200
	});
}




function onSuccess(imageData) {
	var today = new Date();

	var ora = today.getHours()
	if(ora<10){ora="0"+ora}
	
	var minuti = today.getMinutes();
	if(minuti<10){minuti="0"+minuti}

	var nuovoOrario = ora + ":" + minuti
	

	var image00 = document.getElementById('myImage');
	
	sogno = "data:image/png;base64," + imageData;
	
	
	var ciccioL = parseFloat(self.document.formia.Lati.value)
	
	var ciccioP = parseFloat(self.document.formia.Longi.value)
	
	setTimeout (function(){
				
	db.transaction(function (tx) {

       tx.executeSql('INSERT INTO Ordine (Email, Via, Data, Ora, Civico, Volantini, Longitudine, Latitudine, Foto) VALUES ("'+ localStorage.getItem("email") +'", "'+ self.document.formia.via.value +'", "'+ self.document.formia.data.value +'", "'+ nuovoOrario +'", "'+ self.document.formia.civico.value +'", "'+ self.document.formia.nvolantini.value +'", "'+ ciccioP +'", "'+ ciccioL +'", "'+ sogno +'")');
	});
				
	}, 300);
	
	var conteggio = (parseInt(self.document.formia.volantini.value) + parseInt(self.document.formia.nvolantini.value))
	localStorage.setItem("conteggio", conteggio);
	
	self.document.formia.volantini.value = conteggio
	
				
	image00.src = sogno;
	
	/*db2.transaction(function (tx2) {
				   
       tx2.executeSql('INSERT INTO Coordinate (Data, Ora, Civico, Latitudine, Longitudine) VALUES ("'+ self.document.formia.data.value +'", "'+ nuovoOrario +'", "'+ self.document.formia.civico.value +'", "'+ self.document.formia.Lati.value +'", "'+ self.document.formia.Longi.value +'")');
	});*/
	
	setTimeout (function(){
	
		$("#ufoto").show();
	
		seleziona();
				
	}, 500);
	
	//controllo internet
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
	
	/*$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/prolution/Check_Coordinate.asp",
		   contentType: "application/json",
		   data: {Data:self.document.formia.data.value, Ora:nuovoOrario, Civico:self.document.formia.civico.value, Longitudine:ciccioP, Latitudine:ciccioL},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (item.Token == 1024){

				  
				  }
			});
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   

		   },
	dataType:"jsonp"});*/
		
		/*setTimeout (function(){
		
		var nuovadata = self.document.formia.data.value.replace("/","&#47;")
		nuovadata = nuovadata.replace("/","&#47;")
					
		$.ajax({
			type: "POST",
			url: "http://www.gtechplay.com/prolution/Check_Coordinate.asp",
			data: {Data:nuovadata, Ora:nuovoOrario, Civico:self.document.formia.civico.value, Longitudine:ciccioP, Latitudine:ciccioL, Nome:sogno},
			cache: false,
			contentType: "application/x-www-form-urlencoded",
			success: function (result) {
			   $.each(result, function(i,item){
					//$("#codice").html(item.Token);
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
					
		seleziona();
					
		}, 1200);*/
	}
	
	
}

function onFail(message) {
	navigator.notification.alert(
								 'Nessuna foto archiviata',  // message
								 alertDismissed,         // callback
								 'Foto',            // title
								 'OK'                  // buttonName
								 );
}


function start() {
	
	document.getElementById("email").value = "F10620"
	
	localStorage.setItem("idoperatore", result.idoperatore);
	
	
}


function salva() {
	var imgvolantino = "";
	var imgvolantino2 = "";
	$("#opzioni").hide();
	
	if (self.document.formia.ora_fine.value == "") {
		navigator.notification.alert(
									 'inserire un orario di fine lavoro',  // message
									 alertDismissed,         // callback
									 'Orario',            // title
									 'OK'                  // buttonName
									 );
								 
		 $('#ora_fine').focus();
		return;
	}
	
	if (self.document.formia.NomeAzienda.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia.TelAzienda.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		$('#TelAzienda').focus();
		return;
	}
	
	if (self.document.formia.Settore.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		$('#Settore').focus();
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
	
	if (localStorage.getItem("imgvolantino") === null || localStorage.getItem("imgvolantino")=="null" || typeof(localStorage.getItem("imgvolantino")) == 'undefined' || localStorage.getItem("imgvolantino")==0 || localStorage.getItem("imgvolantino")=="") {
		
		navigator.notification.alert(
									 'inserire una foto del Volantino',  // message
									 alertDismissed,         // callback
									 'Volantino',            // title
									 'OK'                  // buttonName
									 );
		return;

		imgvolantino = "";
		
	}
	else
	{
	
		imgvolantino = localStorage.getItem("imgvolantino");
		imgvolantino2 = localStorage.getItem("imgvolantino2");
		
	}

	
	$(".spinner").show();
	$.ajax({
		   type: "POST",
		   url: "https://app.prolution.it/api/volantinaggio/dettagli",
		   data: {servizio:localStorage.getItem("servizio"),operatore:localStorage.getItem("idoperatore"), data:localStorage.getItem("data"), inizio:localStorage.getItem("inizio"), fine:localStorage.getItem("fine"),volantino:imgvolantino,volantino2:imgvolantino2,nomeazienda:self.document.formia.NomeAzienda.value,telefonoazienda:self.document.formia.TelAzienda.value,settoreazienda:self.document.formia.Settore.value},
		   cache: false,
		   contentType: "application/x-www-form-urlencoded",
		   success: function (result) {
		    //alert("Rapporto: " + result.idrapporto);
			localStorage.setItem("rapporto", result.idrapporto);
		    //alert(result.result);
		   
			setTimeout (function(){
				salvatutto()
			}, 500);
	 
		   
		   },
		   error: function(){
		   $("#opzioni").show();
		   
		   navigator.notification.alert(
									 'Errore Imprevisto, contatta il fornitore',  // message
									 alertDismissed,         // callback
									 'Errore',            // title
									 'OK'                  // buttonName
									 );
	 
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

function lista() {
	
	var test="";
	
	db.transaction(function (tx) {
	tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
		var len = results.rows.length, i;
								 
			for (i = 0; i < len; i++){

				  test = test + "<br>Foto: <br>" +  results.rows.item(0).Foto + "<br>Foto: <br>" +  results.rows.item(1).Foto
				  
			}
				  
				$("#contenuto").html("<div width='320px'><br>Foto: <br>" +  results.rows.item(0).Foto + "<br>Foto: <br>" +  results.rows.item(1).Foto +"<div>");
				  
		});
								 

		});
	
	initscroll()
	

}


function salvatutto() {
	var times;
	 db.transaction(function (tx) {
	 tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
	 var len = results.rows.length, i;
	 times = parseInt(len)*2000;
	 
	 for (i = 0; i < len; i++){
				   
				   //Pausa di 2 secondi tra un inserimento ed un altro.
				   (function(i){
					
					setTimeout (function(){
									  
									  $.ajax({
											 type: "POST",
											 url: "https://app.prolution.it/api/volantinaggio/civico",
											 data: { rapporto:localStorage.getItem("rapporto"), data:results.rows.item(i).Data, ora:results.rows.item(i).Ora, via:results.rows.item(i).Via, civico:results.rows.item(i).Civico, citta:"Roma", volantini:results.rows.item(i).Volantini, longitudine:results.rows.item(i).Longitudine, latitudine:results.rows.item(i).Latitudine, foto:results.rows.item(i).Foto },
											 //url: "http://www.gtechplay.com/prolution/Check_CoordinateV2.asp",
											 //data: {Data:results.rows.item(i).Data, Ora:results.rows.item(i).Ora, Civico:results.rows.item(i).Civico, Nome:results.rows.item(i).Foto},
											 cache: false,
											 contentType: "application/x-www-form-urlencoded",
											 success: function (result) {
											 //alert(result.idrapportocivico)
											 
											 },
											 error: function(){
											 $("#opzioni").show();
											 
											 navigator.notification.alert(
																		  'Errore imprevisto nel caricamento dei dati',  // message
																		  alertDismissed,         // callback
																		  'Connessione Internet',            // title
																		  'OK'                  // buttonName
																		  );
											 
											 $(".spinner").hide();
											 
											 }
											 
											 });
					}, i * 2000);
					
					}(i));
				   
				   /*$.ajax({
						  type: "POST",
						  url: "http://www.gtechplay.com/prolution/Check_Coordinate.asp",
						  data: {Data:results.rows.item(i).Data, Ora:results.rows.item(i).Ora, Civico:results.rows.item(i).Civico, Nome:results.rows.item(i).Foto},
						  cache: false,
						  contentType: "application/x-www-form-urlencoded",
						  success: function (result) {
						  $.each(result, function(i,item){
								 //$("#codice").html(item.Token);
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
						  
						  });*/

	 }
	
	 //aggiornatutto()
	setTimeout (function(){
				$(".spinner").hide();
				
				$("#btnsalva").hide();
				$("#btncancella").show();
				
				$("#opzioni").show();
	}, times);
				   
				   
	 }, null);
	 
	 });

}

function aggiornatutto() {
	//longitudine:parseFloat(11.1111), latitudine:parseFloat(41.343434),
	
	db.transaction(function (tx) {
				   tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
								 var len = results.rows.length, i;
								 
								 for (i = 0; i < len; i++){
								 
								 var nuovadata2 = results.rows.item(i).Data.replace("/","&#47;")
								 nuovadata2 = nuovadata2.replace("/","&#47;")
								 
								 $.ajax({
										type:"GET",
										url:"http://www.gtechplay.com/prolution/Leggi_Coordinate.asp",
										contentType: "application/json",
										data: {Data:nuovadata2, Ora:results.rows.item(i).Ora, Civico:results.rows.item(i).Civico},
										timeout: 7000,
										jsonp: 'callback',
										crossDomain: true,
										success:function(result){
										
										$.each(result, function(i,item){
											   
											   if (item.ID == 1024){
												alert("insert" + item.Longitudine + " -- " + item.Latitudine)
											   
											   /*$.ajax({
													  
													  type:"GET",
													  
													  url:"https://app.prolution.it/api/volantinaggio/coordinate",
													  
													  data: {rapportocivico:item.IdRapporto,longitudine:item.Longitudine,latitudine:item.Latitudine},
													  
													  contentType: "application/json; charset=utf-8",
													  
													  json: 'callback',
													  
													  timeout: 7000,
													  
													  crossDomain: true,
													  
													  success:function(result){
													  
													  
													  
													  
													  
													  },
													  
													  error: function(){
													  
													  
													  
													  navigator.notification.alert(
																				   
																				   'possible network error',  // message
																				   
																				   alertDismissed,         // callback
																				   
																				   'Error',            // title
																				   
																				   'OK'                  // buttonName
																				   
																				   );
													  
													  
													  
													  
													  
													  },
													  
													  dataType:"json"});*/

											   
											   }
											   else
											   {
												//Niente
											   }
										});
										
										$(".spinner").hide();
										
										},
										error: function(){
										$(".spinner").hide();
										
										
										},
									dataType:"jsonp"});
								 
								 
									/*$.ajax({
										type: "POST",
										url: "https://app.prolution.it/api/volantinaggio/civico",
										data: { rapporto:localStorage.getItem("rapporto"), data:results.rows.item(i).Data, ora:results.rows.item(i).Ora, via:results.rows.item(i).Via, civico:results.rows.item(i).Civico, citta:"Roma", longitudine:parseFloat(11.1111), latitudine:parseFloat(41.343434), volantini:results.rows.item(i).Volantini, foto:results.rows.item(i).Foto },
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
										
										});*/
								 
								 }
								 
								 $(".spinner").hide();
								 
								 $("#btnsalva").hide();
								 $("#btncancella").show();
								 
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





