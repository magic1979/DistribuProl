
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
		
		    $('#NomeAzienda').focus(function(){
				myScroll.scrollToElement("#NomeAzienda", "1s");
			});
			
			$('#Settore').focus(function(){
				myScroll.scrollToElement("#Settore", "1s");
			});
			
			$('#TelAzienda').focus(function(){
				myScroll.scrollToElement("#TelAzienda", "1s");
			});

            $('#NomeAzienda1').focus(function(){
				myScroll.scrollToElement("#NomeAzienda", "1s");
			});
			
			$('#Settore1').focus(function(){
				myScroll.scrollToElement("#Settore", "1s");
			});
			
			$('#TelAzienda1').focus(function(){
				myScroll.scrollToElement("#TelAzienda", "1s");
			});

            $('#NomeAzienda2').focus(function(){
				myScroll.scrollToElement("#NomeAzienda", "1s");
			});
			
			$('#Settore2').focus(function(){
				myScroll.scrollToElement("#Settore", "1s");
			});
			
			$('#TelAzienda2').focus(function(){
				myScroll.scrollToElement("#TelAzienda", "1s");
			});

            $('#NomeAzienda3').focus(function(){
				myScroll.scrollToElement("#NomeAzienda", "1s");
			});
			
			$('#Settore3').focus(function(){
				myScroll.scrollToElement("#Settore", "1s");
			});
			
			$('#TelAzienda3').focus(function(){
				myScroll.scrollToElement("#TelAzienda", "1s");
			});

            $('#NomeAzienda4').focus(function(){
				myScroll.scrollToElement("#NomeAzienda", "1s");
			});
			
			$('#Settore4').focus(function(){
				myScroll.scrollToElement("#Settore", "1s");
			});
			
			$('#TelAzienda4').focus(function(){
				myScroll.scrollToElement("#TelAzienda", "1s");
			});

             $('#NomeAzienda5').focus(function(){
				myScroll.scrollToElement("#NomeAzienda", "1s");
			});
			
			$('#Settore5').focus(function(){
				myScroll.scrollToElement("#Settore", "1s");
			});
			
			$('#TelAzienda5').focus(function(){
				myScroll.scrollToElement("#TelAzienda", "1s");
			});
			
			
		 $(document).on("touchmove", function(e){
			$('#via').blur();
			$('#civico').blur();
			$('#nvolantini').blur();
			$('#data').blur();
			$('#ora').blur();
			$('#ora_fine').blur();
			$('#volantini').blur();

			$('#NomeAzienda').blur();
            $('#NomeAzienda1').blur();
            $('#NomeAzienda2').blur();
            $('#NomeAzienda3').blur();
            $('#NomeAzienda4').blur();
            $('#NomeAzienda5').blur();

			$('#Settore').blur();
            $('#Settore1').blur();
            $('#Settore2').blur();
            $('#Settore3').blur();
            $('#Settore4').blur();
            $('#Settore5').blur();

			$('#TelAzienda').blur();
            $('#TelAzienda1').blur();
            $('#TelAzienda2').blur();
            $('#TelAzienda3').blur();
            $('#TelAzienda4').blur();
            $('#TelAzienda5').blur();

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
			//self.document.formia.id.value = "2790";
			
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
                    $('#NomeAzienda1').blur();
                    $('#NomeAzienda2').blur();
                    $('#NomeAzienda3').blur();
                    $('#NomeAzienda4').blur();
                    $('#NomeAzienda5').blur();

			        $('#Settore').blur();
                    $('#Settore1').blur();
                    $('#Settore2').blur();
                    $('#Settore3').blur();
                    $('#Settore4').blur();
                    $('#Settore5').blur();

			        $('#TelAzienda').blur();
                    $('#TelAzienda1').blur();
                    $('#TelAzienda2').blur();
                    $('#TelAzienda3').blur();
                    $('#TelAzienda4').blur();
                    $('#TelAzienda5').blur();
					 
				   initscroll()
				   
		});
	
	
}

function dlt(){
	
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
	}, null);
	});
	
	
	$("#btncancella").hide();
	$("#btnsalva").show();
	
	localStorage.setItem("imgvolantino", "");
	localStorage.setItem("imgvolantino2", "");
	localStorage.setItem("imgvolantino3", "");
	localStorage.setItem("imgvolantino4", "");
	localStorage.setItem("imgvolantino5", "");
	localStorage.setItem("imgvolantino6", "");

        localStorage.setItem("NomeAzienda", "");
	localStorage.setItem("TelAzienda", "");
	localStorage.setItem("Settore", "");

        localStorage.setItem("NomeAzienda1", "");
	localStorage.setItem("TelAzienda1", "");
	localStorage.setItem("Settore1", "");

        localStorage.setItem("NomeAzienda2", "");
	localStorage.setItem("TelAzienda2", "");
	localStorage.setItem("Settore2", "");

        localStorage.setItem("NomeAzienda3", "");
	localStorage.setItem("TelAzienda3", "");
	localStorage.setItem("Settore3", "");

        localStorage.setItem("NomeAzienda4", "");
	localStorage.setItem("TelAzienda4", "");
	localStorage.setItem("Settore4", "");

        localStorage.setItem("NomeAzienda5", "");
	localStorage.setItem("TelAzienda5", "");
	localStorage.setItem("Settore5", "");
	
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
					 
					 var mySplitResult = viadotto.split(",");
					 
					 localStorage.setItem("Via", mySplitResult[0].replace(/[0-9]/g, '').replace('-', ''))

					 self.document.formia.via.value = mySplitResult[0].replace(/[0-9]/g, '').replace('-', '');
					 
					 
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
					 
					 if(results[1]){
					 
						var cittaa = results[1].formatted_address;
						var mySplitResult1 = cittaa.split(",");
					 
						localStorage.setItem("Citta", mySplitResult1[1].replace(/[0-9]/g, ''))
						
						 self.document.formia.citta.value = localStorage.getItem("Citta");
						
						//alert(mySplitResult1[1].replace(/[0-9]/g, ''))
					 
						return;
						
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

function initscroll2() {
	
	myScroll = new IScroll('#wrapper', { click: true });
	
	setTimeout (function(){
		myScroll.refresh();
		
		myScroll.scrollToElement("#segna", "1s");
		$("#btnVia").click();

	}, 1000);
				   
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

    //sparire dati
    $("#dati").hide();
    $("#btnavanti").show();
     $("#btnindietroA").show();

	checkPos()
	
	$("#viale").show();
	$("#civiccia1").show();
	
	myScroll.scrollToElement("#via", "1s");
	
	
	//$('#id').focus();
	
}

function indietrovia(){
    
	$("#viale").hide();
    $("#civiccia").hide()
	$("#civiccia1").hide();
     $("#btnindietroA").hide();

    $("#dati").show();
    $("#btnavanti").hide();
	
	
	myScroll.scrollToElement("#id", "1s");
	$('#id').focus();
	
	myScroll.refresh();
	
}

function vedicivico(){
	$("#civiccia").show()
	self.document.formia.nvolantini.value = ""
	self.document.formia.civico.value = ""
	
	//initscroll()

	myScroll.scrollToElement("#civico", "1s");
	
	myScroll.refresh();
}

// FOTO VOLANTINO

function prendi(){
    	if (self.document.formia2.NomeAzienda.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.TelAzienda.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.Settore.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		return;
	}

	navigator.camera.getPicture(Successo, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo(imageData) {
	
	localStorage.setItem("imgvolantino", "data:image/png;base64," + imageData);

    localStorage.setItem("NomeAzienda", self.document.formia2.NomeAzienda.value);
	localStorage.setItem("TelAzienda", self.document.formia2.TelAzienda.value);
	localStorage.setItem("Settore", self.document.formia2.Settore.value);
	
	var image000 = document.getElementById('myImageVol');
	image000.src = localStorage.getItem("imgvolantino");

}

function prendi2(){
    if (self.document.formia2.NomeAzienda1.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.TelAzienda1.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.Settore1.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	navigator.camera.getPicture(Successo2, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo2(imageData) {
	
	localStorage.setItem("imgvolantino2", "data:image/png;base64," + imageData);

    localStorage.setItem("NomeAzienda1", self.document.formia2.NomeAzienda1.value);
	localStorage.setItem("TelAzienda1", self.document.formia2.TelAzienda1.value);
	localStorage.setItem("Settore1", self.document.formia2.Settore1.value);
	
	var image002 = document.getElementById('myImageVol2');
	image002.src = localStorage.getItem("imgvolantino2");
	
}

function prendi3(){
    if (self.document.formia2.NomeAzienda2.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.TelAzienda2.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.Settore2.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	navigator.camera.getPicture(Successo3, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo3(imageData) {
	
	localStorage.setItem("imgvolantino3", "data:image/png;base64," + imageData);

    localStorage.setItem("NomeAzienda2", self.document.formia2.NomeAzienda2.value);
	localStorage.setItem("TelAzienda2", self.document.formia2.TelAzienda2.value);
	localStorage.setItem("Settore2", self.document.formia2.Settore2.value);
	
	var image003 = document.getElementById('myImageVol3');
	image003.src = localStorage.getItem("imgvolantino3");
	
}

function prendi4(){
    	if (self.document.formia2.NomeAzienda3.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.TelAzienda3.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.Settore3.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	navigator.camera.getPicture(Successo4, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo4(imageData) {
	
	localStorage.setItem("imgvolantino4", "data:image/png;base64," + imageData);

    localStorage.setItem("NomeAzienda3", self.document.formia2.NomeAzienda3.value);
	localStorage.setItem("TelAzienda3", self.document.formia2.TelAzienda3.value);
	localStorage.setItem("Settore3", self.document.formia2.Settore3.value);
	
	var image004 = document.getElementById('myImageVol4');
	image004.src = localStorage.getItem("imgvolantino4");
	
}

function prendi5(){
    if (self.document.formia2.NomeAzienda4.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.TelAzienda4.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.Settore4.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	navigator.camera.getPicture(Successo5, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo5(imageData) {
	
	localStorage.setItem("imgvolantino5", "data:image/png;base64," + imageData);

    localStorage.setItem("NomeAzienda4", self.document.formia2.NomeAzienda4.value);
	localStorage.setItem("TelAzienda4", self.document.formia2.TelAzienda4.value);
	localStorage.setItem("Settore4", self.document.formia2.Settore4.value);
	
	var image005 = document.getElementById('myImageVol5');
	image005.src = localStorage.getItem("imgvolantino5");
	
}

function prendi6(){
    	if (self.document.formia2.NomeAzienda5.value == "") {
		navigator.notification.alert(
									 'inserire un Nome Azienda',  // message
									 alertDismissed,         // callback
									 'Nome Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.TelAzienda5.value == "") {
		navigator.notification.alert(
									 'inserire un Telefono',  // message
									 alertDismissed,         // callback
									 'Tel. Azienda',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (self.document.formia2.Settore5.value == "") {
		navigator.notification.alert(
									 'inserire un Settore Azienda',  // message
									 alertDismissed,         // callback
									 'Settore',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	navigator.camera.getPicture(Successo6, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function Successo6(imageData) {
	
	localStorage.setItem("imgvolantino6", "data:image/png;base64," + imageData);

    localStorage.setItem("NomeAzienda5", self.document.formia2.NomeAzienda5.value);
	localStorage.setItem("TelAzienda5", self.document.formia2.TelAzienda5.value);
	localStorage.setItem("Settore5", self.document.formia2.Settore5.value);
	
	var image006 = document.getElementById('myImageVol6');
	image006.src = localStorage.getItem("imgvolantino6");
	
}


// FOTO E ARCHIVIO

function scatta(){
	if (self.document.formia.via.value == "") {
		navigator.notification.alert(
									 'inserire un indirizzo corretto',  // message
									 alertDismissed,         // callback
									 'Indirizzo',            // title
									 'OK'                  // buttonName
									 );
		$('#via').focus();
		return;
	}
	if (self.document.formia.citta.value == "") {
		navigator.notification.alert(
									 'inserire una citta corretta',  // message
									 alertDismissed,         // callback
									 'Indirizzo',            // title
									 'OK'                  // buttonName
									 );
		$('#citta').focus();
		return;
	}
	
	
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
	
	
	setTimeout (function(){
	
		$("#ufoto").show();
	
		seleziona();
				
	}, 500);
	
	//controllo internet
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
	
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
	var imgvolantino3 = "";
	var imgvolantino4 = "";
	var imgvolantino5 = "";
	var imgvolantino6 = "";
	
	var nomeazienda = "";
	var telazienda="";
	var settore="";
	var nomeazienda1 = "";
	var telazienda1="";
	var settore1="";
	var nomeazienda2 = "";
	var telazienda2="";
	var settore2="";
	var nomeazienda3 = "";
	var telazienda3="";
	var settore3="";
	var nomeazienda4 = "";
	var telazienda4="";
	var settore4="";
	var nomeazienda5 = "";
	var telazienda5="";
	var settore5="";
	
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
	
	if (self.document.formia.id.value == "") {
		navigator.notification.alert(
									 'inserire un codice servizio valido',  // message
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
		imgvolantino3 = localStorage.getItem("imgvolantino3");
		imgvolantino4 = localStorage.getItem("imgvolantino4");
		imgvolantino5 = localStorage.getItem("imgvolantino5");
		imgvolantino6 = localStorage.getItem("imgvolantino6");
		
		nomeazienda = localStorage.getItem("NomeAzienda");
		nomeazienda1 = localStorage.getItem("NomeAzienda1");
		nomeazienda2 = localStorage.getItem("NomeAzienda2");
		nomeazienda3 = localStorage.getItem("NomeAzienda3");
		nomeazienda4 = localStorage.getItem("NomeAzienda4");
		nomeazienda5 = localStorage.getItem("NomeAzienda5");
		
		telazienda = localStorage.getItem("TelAzienda");
		telazienda1 = localStorage.getItem("TelAzienda1");
		telazienda2 = localStorage.getItem("TelAzienda2");
		telazienda3 = localStorage.getItem("TelAzienda3");
		telazienda4 = localStorage.getItem("TelAzienda4");
		telazienda5 = localStorage.getItem("TelAzienda5");
		
		settore = localStorage.getItem("Settore");
		settore1 = localStorage.getItem("Settore1");
		settore2 = localStorage.getItem("Settore2");
		settore3 = localStorage.getItem("Settore3");
		settore4 = localStorage.getItem("Settore4");
		settore5 = localStorage.getItem("Settore5");
		
	}

	
	$(".spinner").show();
	$.ajax({
		   type: "POST",
		   url: "https://app.prolution.it/api/volantinaggio/dettagli",
		   data: {servizio:localStorage.getItem("servizio"),operatore:localStorage.getItem("idoperatore"), data:localStorage.getItem("data"), inizio:localStorage.getItem("inizio"), fine:localStorage.getItem("fine"),volantino:imgvolantino,volantino2:imgvolantino2,volantino3:imgvolantino3,volantino4:imgvolantino4,volantino5:imgvolantino5,volantino6:imgvolantino6,nomeazienda:nomeazienda,telefonoazienda:telazienda,settoreazienda:settore,nomeazienda2:nomeazienda1,telefonoazienda2:telazienda1,settoreazienda2:settore1,nomeazienda3:nomeazienda2,telefonoazienda3:telazienda2,settoreazienda3:settore2,nomeazienda4:nomeazienda3,telefonoazienda4:telazienda3,settoreazienda4:settore3,nomeazienda5:nomeazienda4,telefonoazienda5:telazienda4,settoreazienda5:settore4,nomeazienda6:nomeazienda5,telefonoazienda6:telazienda5,settoreazienda6:settore5},
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
											 data: { rapporto:localStorage.getItem("rapporto"), data:results.rows.item(i).Data, ora:results.rows.item(i).Ora, via:results.rows.item(i).Via, civico:results.rows.item(i).Civico, citta:localStorage.getItem("Citta"), volantini:results.rows.item(i).Volantini, longitudine:results.rows.item(i).Longitudine, latitudine:results.rows.item(i).Latitudine, foto:results.rows.item(i).Foto },
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
								 

								 }
								 
								 $(".spinner").hide();
								 
								 $("#btnsalva").hide();
								 $("#btncancella").show();
								 
								 }, null);
				   });
}

function carica2(){
var myScroll2;

myScroll2 = new IScroll('#wrapper2', { click: true });
setTimeout (function(){
	myScroll2.refresh();
}, 500);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

}

function salvalavoro(){
   $("#tutto").hide();
   $("#btnavanti").hide();
   $("#btnindietroA").hide();
   $("#btnsalva").show();
   $("#btnindietroB").show();
   $("#ultimatbl").show();
   
   myScroll.scrollToElement("#ora_fine", "1s");
   
   myScroll.refresh();
}

function indietro(){
   $("#tutto").show();
   $("#btnavanti").show();
   $("#btnindietroA").show();
   $("#btnsalva").hide();
   $("#ultimatbl").hide();
   $("#btnindietroB").hide();
   
   	myScroll.scrollToElement("#civico", "1s");
	$('#civico').focus();
	
	myScroll.refresh();
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





