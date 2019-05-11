var $$ = Dom7;

var app = new Framework7({
	root: '#app',
	name: 'OnLaundry',
	cache : false,
	id: 'com.ubaya.project',
	panel: {swipe: 'left'},
	theme: 'md',
	routes: [
		{
			name: 'home',
			path: '/home/',
			url: 'home.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					if (localStorage.status == 2)
					{
						$$('#btnTambahToko').hide();
					}
					mainView.router.refreshPage();
					var halouser = localStorage.namaUser;
					document.getElementById("namaa").innerHTML = "halo, "+halouser;
					
					$$('#btnCari').on('click', function(){
						var cari = $$('#txtCari').val();
						var pemilik = localStorage.idUser;
						var tipeSatuan = document.getElementById("cekSatuan").checked;
						var tipeKiloan = document.getElementById("cekKiloan").checked;
						
						if(cari != ""){
							app.request.post('http://localhost:99/onlaundry/carilaundry.php', {cari, pemilik}, function(data){
					    		alert(data);
					    		var obj = JSON.parse(data);
					    		if(data != 0)
					    		{
					    			app.router.navigate("/carilaundry/"+data+"/"+tipeSatuan+"/"+tipeKiloan+"");
					    		}
					    		
					    		else
					    		{
					    			app.dialog.alert("Laundry Tidak Ditemukan");
					    		}
					    	});
						}
						else
						{
							app.dialog.alert("Tidak ada nama laundry yang dicari");
						}


						
					});
					

					function jarak(lat1, long1, lat2, long2){
						if((lat1 == lat2) && (long1 == long2))
						{
							return 0;
						}
						else
						{
							var radlat1 = Math.PI * lat1/180;
							var radlat2 = Math.PI * lat2/180;
							var teta = long1-long2;
							var radteta = Math.PI * teta/180;
							var jarak = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radteta);
							if(jarak > 1){
								jarak = 1;
							}
							jarak = Math.acos(jarak);
							jarak = jarak * 180/Math.PI;
							jarak = jarak * 60 * 1.1515;
							jarak = jarak * 1.609344;
							return jarak;
						}
					}


					 var onSuccess = function(position) {
					        latitude = position.coords.latitude;
					    	longitude = position.coords.longitude;

					    	app.request.post('http://localhost:99/onlaundry/homeuser.php', {}, function(data){
								var obj = JSON.parse(data);
								if (obj.length != 0) {
									for(var i=0; i<obj.length; i++)
									{
										if(obj[i]['user_id'] != localStorage.idUser)
										{
											var isi = "<a href='/detailtoko/"+ obj[i]['id']+"' id='tes'>" +
													"<div class='card demo-card-header-pic'>"+
													"<div style='background-image:url(https://media2.s-nbcnews.com/j/newscms/2018_17/1335002/washing-machine-today-180426-main_70353b3b75f46ef51ce6d5e55f68604e.fit-760w.jpg); height:180px; width:100%; background-size:cover; background-position:center;' class='card-header align-items-flex-end'><p style='color:#ffffff;'>"+obj[i]['nama_toko']+"</p></div>"+
													"<div class='card-content card-content-padding'><p><i class='f7-icons'>placemark</i> "+obj[i]['alamat']+"</p>"+
													"<p><i class='f7-icons'>star_fill</i> "+obj[i]['rating']+" | <i class='f7-icons'>rocket</i> "+(jarak(latitude, longitude, obj[i]['pos_latitude'], obj[i]['pos_longitude'])).toFixed(2)+" KM</p>"+
													"<p><i class='f7-icons'>info_round</i> "+obj[i]['deskripsi_fasilitas']+"</p>" +
													"</div></div></a><br>";
											$$('#homepage').append($$(isi));
										}	
									}
								}
								
							});

					    };
					    function onError(error) {
					        alert('code: '    + error.code    + '\n' +
					              'message: ' + error.message + '\n');
					    }
					    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });

				},

				pageAfterIn: function(e, page){

					if(!localStorage.emailUser){
						page.router.navigate('/login/');
					}
				}
			}
		},
		{
			path:'/carilaundry/:cari/:tipeS/:tipeK',
			url:'carilaundry.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					
					function jarak(lat1, long1, lat2, long2){
						if((lat1 == lat2) && (long1 == long2))
						{
							return 0;
						}
						else
						{
							var radlat1 = Math.PI * lat1/180;
							var radlat2 = Math.PI * lat2/180;
							var teta = long1-long2;
							var radteta = Math.PI * teta/180;
							var jarak = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radteta);
							if(jarak > 1){
								jarak = 1;
							}
							jarak = Math.acos(jarak);
							jarak = jarak * 180/Math.PI;
							jarak = jarak * 60 * 1.1515;
							jarak = jarak * 1.609344;
							return jarak;
						}
					}

					var cari = page.router.currentRoute.params.cari;
					var tipeS = page.router.currentRoute.params.tipeS;
					var tipeK = page.router.currentRoute.params.tipeK;
					alert(tipeS);
					alert(tipeK);
					var obj = JSON.parse(cari);
	    			for(var i=0; i<obj.length; i++)
					{
						if (tipeS == 'false' && tipeK == 'false') {
							var isi = "<a href='/detailtoko/"+ obj[i]['id']+"' id='tes'>" +
								"<div class='card demo-card-header-pic'>"+
								"<div style='background-image:url(https://media2.s-nbcnews.com/j/newscms/2018_17/1335002/washing-machine-today-180426-main_70353b3b75f46ef51ce6d5e55f68604e.fit-760w.jpg); height:180px; width:100%; background-size:cover; background-position:center;' class='card-header align-items-flex-end'><p style='color:#ffffff;'>"+obj[i]['nama_toko']+"</p></div>"+
								"<div class='card-content card-content-padding'><p><i class='f7-icons'>placemark</i> "+obj[i]['alamat']+"</p>"+
								"<p><i class='f7-icons'>star_fill</i> "+obj[i]['rating']+" | <i class='f7-icons'>rocket</i> "+(jarak(latitude, longitude, obj[i]['pos_latitude'], obj[i]['pos_longitude'])).toFixed(2)+" KM</p>"+
								"<p><i class='f7-icons'>document_text</i> "+obj[i]['deskripsi_fasilitas']+"</p>" +
							  "</div></div></a>";
						}
						else if (tipeS == 'true' && tipeK == 'false') {
							if(obj[i]['tipe_laundry'] != 0 && obj[i]['tipe_laundry'] != 2)
							{
								var isi = "<a href='/detailtoko/"+ obj[i]['id']+"' id='tes'>" +
								"<div class='card demo-card-header-pic'>"+
								"<div style='background-image:url(https://media2.s-nbcnews.com/j/newscms/2018_17/1335002/washing-machine-today-180426-main_70353b3b75f46ef51ce6d5e55f68604e.fit-760w.jpg); height:180px; width:100%; background-size:cover; background-position:center;' class='card-header align-items-flex-end'><p style='color:#ffffff;'>"+obj[i]['nama_toko']+"</p></div>"+
								"<div class='card-content card-content-padding'><p><i class='f7-icons'>placemark</i> "+obj[i]['alamat']+"</p>"+
								"<p><i class='f7-icons'>star_fill</i> "+obj[i]['rating']+" | <i class='f7-icons'>rocket</i> "+(jarak(latitude, longitude, obj[i]['pos_latitude'], obj[i]['pos_longitude'])).toFixed(2)+" KM</p>"+
								"<p><i class='f7-icons'>document_text</i> "+obj[i]['deskripsi_fasilitas']+"</p>" +
							  "</div></div></a>";
							}
							
						}
						else if (tipeS == 'false' && tipeK == 'true') {
							if(obj[i]['tipe_laundry'] != 1 && obj[i]['tipe_laundry'] != 2)
							{
								var isi = "<a href='/detailtoko/"+ obj[i]['id']+"' id='tes'>" +
								"<div class='card demo-card-header-pic'>"+
								"<div style='background-image:url(https://media2.s-nbcnews.com/j/newscms/2018_17/1335002/washing-machine-today-180426-main_70353b3b75f46ef51ce6d5e55f68604e.fit-760w.jpg); height:180px; width:100%; background-size:cover; background-position:center;' class='card-header align-items-flex-end'><p style='color:#ffffff;'>"+obj[i]['nama_toko']+"</p></div>"+
								"<div class='card-content card-content-padding'><p><i class='f7-icons'>placemark</i> "+obj[i]['alamat']+"</p>"+
								"<p><i class='f7-icons'>star_fill</i> "+obj[i]['rating']+" | <i class='f7-icons'>rocket</i> "+(jarak(latitude, longitude, obj[i]['pos_latitude'], obj[i]['pos_longitude'])).toFixed(2)+" KM</p>"+
								"<p><i class='f7-icons'>document_text</i> "+obj[i]['deskripsi_fasilitas']+"</p>" +
							  "</div></div></a>";
							}
						}
						else
						{
							if(obj[i]['tipe_laundry'] != 1 && obj[i]['tipe_laundry'] != 0)
							{
								var isi = "<a href='/detailtoko/"+ obj[i]['id']+"' id='tes'>" +
								"<div class='card demo-card-header-pic'>"+
								"<div style='background-image:url(https://media2.s-nbcnews.com/j/newscms/2018_17/1335002/washing-machine-today-180426-main_70353b3b75f46ef51ce6d5e55f68604e.fit-760w.jpg); height:180px; width:100%; background-size:cover; background-position:center;' class='card-header align-items-flex-end'><p style='color:#ffffff;'>"+obj[i]['nama_toko']+"</p></div>"+
								"<div class='card-content card-content-padding'><p><i class='f7-icons'>placemark</i> "+obj[i]['alamat']+"</p>"+
								"<p><i class='f7-icons'>star_fill</i> "+obj[i]['rating']+" | <i class='f7-icons'>rocket</i> "+(jarak(latitude, longitude, obj[i]['pos_latitude'], obj[i]['pos_longitude'])).toFixed(2)+" KM</p>"+
								"<p><i class='f7-icons'>document_text</i> "+obj[i]['deskripsi_fasilitas']+"</p>" +
							  "</div></div></a>";
							}
						}

						$$('#caripage').append($$(isi));
					}
				}
			}
		},
		{
			path:'/login/',
			url:'login.html',
			on: {
				pageInit: function(e, page){
					app.panel.disableSwipe();
					$$('#btnsignin').on('click', function(){
						var email = $$('#email').val();
						var password = $$('#pass').val();

						app.request.post('http://localhost:99/onlaundry/login.php', 
							{email,password}, function(data){
							var obj = JSON.parse(data);
							if(obj[0]['id'] != 0)
							{
								app.dialog.alert("Selamat Datang, " + obj[0]['nama']);
								localStorage.emailUser = obj[0]['email'];
								localStorage.idUser = obj[0]['id'];
								localStorage.namaUser = obj[0]['nama'];
								localStorage.status = obj[0]['status'];

								if (localStorage.status == 1) {
									page.router.navigate('/home/');
								}
								else if (localStorage.status == 2)
								{
									$$('#btnTambahToko').hide();
									page.router.navigate('/homeowner/');
								}
								else if (localStorage.status == 3)
								{
									page.router.navigate('/admin/');
								}
								

							}
							else
							{
								app.dialog.alert("Invalid Email or Password");
							}
						});
					});
				}
			}
		},
		{
			path:'/registration/',
			url:'registration.html',
			on: {
				pageInit: function(e, page){
					$$('#btnsubmit').on('click', function(){
					var nama  = $$('#namaIn').val();
					var email = $$('#userIn').val();
					var password = $$('#passIn').val();
					var notelp = $$('#nomorIn').val();
					var alamat = $$('#alamatIn').val();
					var konfirpassword = $$('#konpassIn').val();
					var status = 1;
					app.request.post('http://localhost:99/onlaundry/registration.php', 
						{nama, email, password, konfirpassword, notelp, alamat, status}, function(data){
						app.dialog.alert(data);
						page.router.navigate('/login/');
						});
					});
				}
			}
		},
		{
			path:'/registertoko/',
			url: 'registertoko.html',
			on: {
				pageInit: function(e, page){
					app.panel.disableSwipe();
					var namatoko;
					var notelp;
					var alamat;
					var fasilitas;
					var tipelaundry;

					var onSuccess = function(position){
						lat1 = position.coords.latitude;
					   	long1 = position.coords.longitude;

					   	document.addEventListener("deviceready", function() {
					      var div = document.getElementById("mapregis");
					      var map = plugin.google.maps.Map.getMap(div);
					      map.animateCamera({
					          target: {lat: lat1, lng: long1},
					          zoom: 17,
					          tilt: 60,
					          bearing: 140,
					          duration: 5000
					        });
					      var marker = map.addMarker({
					          position: {lat: lat1, lng: long1},
					          title: "Disini Posisi Anda",
					          animation: plugin.google.maps.Animation.BOUNCE
					        });
					      marker.showInfoWindow();
					    }, false);

					    $$('#btnsubmit1').on('click', function(){
							namatoko  = $$('#tokoIn').val();
							notelp = $$('#nomortokoIn').val();
							alamat = $$('#alamatIn').val();
							fasilitas = $$('#fasilitasIn').val();

							if (document.getElementById('tipekiloan').checked) 
							{
								tipelaundry = document.getElementById('tipekiloan').value;
							}
							else if(document.getElementById('tipesatuan').checked)
							{
								tipelaundry = document.getElementById('tipesatuan').value;
							}
							else if(document.getElementById('tipecampuran').checked)
							{
								tipelaundry = document.getElementById('tipecampuran').value;
							}
							var pemilik = localStorage.idUser;

							if(namatoko != "" && notelp != "" && alamat != "" && fasilitas != ""){
								app.request.post('http://localhost:99/onlaundry/registertoko.php', 
								{namatoko, notelp, alamat, fasilitas, tipelaundry, pemilik, lat1, long1}, function(data){
								app.dialog.alert(data);
								page.router.navigate('/homeowner/');
								});

								app.request.post('http://localhost:99/onlaundry/ubahstatususer.php', 
								{pemilik}, function(data){
								app.dialog.alert(data);
								});

								localStorage.removeItem('emailUser');
								localStorage.removeItem('idtoko');
								localStorage.removeItem('idUser');
								localStorage.removeItem('namaUser');
								localStorage.removeItem('status');
								app.router.navigate('/login/');
								mainView.router.refreshPage();
							}
							else{
								app.dialog.alert("Data yang diinputkan Salah/Kurang Lengkap");
							}
						});
					}
					function onError(error) {
					    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
					}
					navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
						
				}
			}
		},
		{
			path:'/homeowner/',
			url:'homeowner.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					if (localStorage.status == 2)
					{
						$$('#btnTambahToko').hide();
					}
					var pemilik = localStorage.idUser;
					app.request.post('http://localhost:99/onlaundry/homeowner.php', 
						{pemilik}, function(data){
						var obj = JSON.parse(data);
						if (obj[0]['id'] !=0) {
							localStorage.idtoko = obj[0]['id'];

							document.getElementById("btnupdateinfo").innerHTML = "Update Info Toko";
							document.getElementById("btnupdateinfo").href = "/updateinfotoko/"+obj[0]['id']+"";
							document.getElementById("namaToko").innerHTML = obj[0]['nama_toko'];
							document.getElementById("alamat").innerHTML = obj[0]['alamat'];
							document.getElementById("nomortelepon").innerHTML = obj[0]['no_telp'];
							document.getElementById("fasilitas").innerHTML = obj[0]['fasilitas'];
							$$('#tombolpesanan').append("<a href='/pesananmasuk/"+obj[0]['id']+"/"+obj[0]['tipe_laundry']+"' id='btnPesananMasuk' class='button button-fill button-round'>Pesanan Masuk</a><br>");
							$$('#tombolpesanan').append("<a href='/pesananditerima/"+obj[0]['id']+"/"+obj[0]['tipe_laundry']+"' id='btnPesananditerima' class='button button-fill button-round'>Pesanan Diterima</a><br>");
							$$('#tombolpesanan').append("<a href='/pesananselesai/' id='btnPesananselesai' class='button button-fill button-round'>Pesanan Selesai</a><br>");
							

							if(obj[0]['tipe_laundry'] == 0)
							{
								document.getElementById("tipe").innerHTML = "Laundry Kiloan";
								var tokoid = localStorage.idtoko;
								app.request.post('http://localhost:99/onlaundry/showdeskhargakilo.php', {tokoid}, function(data){
										var objt = JSON.parse(data);
									if (objt.length != 0) {
										$$('#info').append("<li><div class='item-content item-input'><div class='item-inner'><div class='item-title item-label'>Harga/Kilo</div><div class='item-input-wrap'><p>"+objt[0]['harga_kiloan']+"</p></div></div></div></li>");
										document.getElementById("hargakilo").innerHTML = "Update Harga";
									}
									
									else if (objt == 0)
									{ 
										$$('#info').append("<li><div class='item-content item-input'><div class='item-inner'><div class='item-title item-label'>Harga/Kilo</div><div class='item-input-wrap'><p>-</p></div></div></div></li>");
										document.getElementById("hargakilo").innerHTML = "Update Harga";
									}
								});
							}
							else if(obj[0]['tipe_laundry'] == 1)
							{
								document.getElementById("tipe").innerHTML = "Laundry Satuan";
								var tokoid = localStorage.idtoko;
								app.request.post('http://localhost:99/onlaundry/showdeskharga.php', {tokoid}, function(data){
									var obj = JSON.parse(data);
									if (obj.length != 0) {
										$$('#rincianharga').append("<h3>Rincian harga</h3>");
										$$('#rincianharga').append("<p><a href='/tambahrinci/"+tokoid+"' class='tambah'>Tambah Rincian Harga</a></p>");
										$$('#isitabel').find('thead').append($$("<tr><th class='label-cell'>Jenis Pakaian</th><th class='numeric-cell'>Harga cuci</th><th class='label-cell'>hapus</th></tr>"));
										for(var i=0; i<obj.length; i++)
										{
											var isi = "<tr>"+
														"<td class='label-cell'>"+obj[i]['jenis_pakaian']+"</td>"+
														"<td class='label-cell'>"+obj[i]['harga_satuan']+"</td>"+
														"<td><a href='/hapusrincian/"+obj[i]['id']+"'><i class='f7-icons'>close</i></a</td>"+
													"</tr>";
											$$('#isitabel').find('tbody').append($$(isi));
										}
									}
									else if(obj == 0){
										$$('#rincianharga').append("<p><a href='/tambahrinci/"+tokoid+"' class='tambah'>Tambah Rincian Harga</a></p>");
										app.dialog.alert("Belum ada rincian harga");
									}
								});
							}
							else if(obj[0]['tipe_laundry'] == 2)
							{
								document.getElementById("tipe").innerHTML = "Laundry Satuan dan Kiloan";
								var tokoid = localStorage.idtoko;
								app.request.post('http://localhost:99/onlaundry/showdeskhargakilo.php', {tokoid}, function(data){
									var objt = JSON.parse(data);
									if (objt.length != 0) {
										$$('#info').append("<li><div class='item-content item-input'><div class='item-inner'><div class='item-title item-label'>Harga/Kilo</div><div class='item-input-wrap'><p>"+objt[0]['harga_kiloan']+"</p></div></div></div></li>");
										document.getElementById("hargakilo").innerHTML = "Update Harga Kiloan";
									}
									
									else if (objt == 0)
									{ 
										$$('#info').append("<li><div class='item-content item-input'><div class='item-inner'><div class='item-title item-label'>Harga/Kilo</div><div class='item-input-wrap'><p>-</p></div></div></div></li>");
										document.getElementById("hargakilo").innerHTML = "Update Harga Kiloan";
									}
								});
								app.request.post('http://localhost:99/onlaundry/showdeskharga.php', {tokoid}, function(data){
									var obj = JSON.parse(data);
									if (obj.length != 0) {
										$$('#rincianharga').append("<h3>Rincian harga</h3>");
										$$('#rincianharga').append("<p><a href='/tambahrinci/"+tokoid+"' class='tambah'>Tambah Rincian Harga Satuan</a></p>");
										$$('#isitabel').find('thead').append($$("<tr><th class='label-cell'>Jenis Pakaian</th><th class='numeric-cell'>Harga cuci</th><th class='label-cell'>hapus</th></tr>"));
										for(var i=0; i<obj.length; i++)
										{
											$$('#isitabel').find('tbody').append($$("<tr><td class='label-cell'>"+obj[i]['jenis_pakaian']+"</td><td class='label-cell'>"+obj[i]['harga_satuan']+"</td><td><a href='/hapusrincian/"+obj[i]['id']+"'><i class='f7-icons'>close</i></a</td></tr>"));
										}
									}
									else if(obj == 0){
										$$('#rincianharga').append("<p><a href='/tambahrinci/"+tokoid+"' class='tambah'>Tambah Rincian Harga</a></p>");
										app.dialog.alert("Belum ada rincian harga");
									}
								});
							}
						}
						else if(obj[0]['id'] == 0)
						{
							app.dialog.alert("Toko Anda belum terdaftar, mohon mendaftar terlebih dahulu");
						}
					});
				},
				pageAfterIn: function(e, page){
					if(!localStorage.emailUser){
						page.router.navigate('/login/');
					}
					if(!localStorage.idtoko){
						page.router.navigate('/home/');
					}


					$$('.prompt-ok').on('click', function () {
						app.dialog.prompt('Masukkan harga baru:', function (value) {
						var hargabaru = value;
						var idtk = localStorage.idtoko;
						var tanggal = getDate();
						app.request.post('http://localhost:99/onlaundry/updatehargakilo.php', {idtk, hargabaru, tanggal}, function(data){
							app.dialog.alert(data);
							mainView.router.refreshPage();
							});
						});
					});
				}
			}
		},
		{
			path: '/tambahrinci/:tokoid',
			url: 'tambahrinci.html',
			on:{
				pageInit: function(e, page){
					app.panel.enableSwipe();
					$$('#btnsubmit').on('click', function(){
					var idtoko  = page.router.currentRoute.params.tokoid;
					var jenis = $$('#jenisPakaianIn').val();
					var harga = $$('#hargaIn').val();
					var tanggal = getDate();
					app.request.post('http://localhost:99/onlaundry/tambahrinci.php', 
						{idtoko, jenis, harga, tanggal}, function(data){
						app.dialog.alert(data);
						app.router.navigate('/homeowner/');
						});
					});
				}
			}
		},
		{
			path: '/hapusrincian/:hargaid',
			url: 'hapusrincian.html',
			on:{
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var idharga  = page.router.currentRoute.params.hargaid;
					app.request.post('http://localhost:99/onlaundry/hapusrincian.php', 
						{idharga}, function(data){
						app.dialog.alert(data);
						});
					}
				}
		},
		{
			path: '/updateinfotoko/:tokoid',
			url: 'updateinfotoko.html',
			on:{
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var id = page.router.currentRoute.params.tokoid;
					app.request.post('http://localhost:99/onlaundry/showupdateinfo.php', {id}, function(data){
						var obj = JSON.parse(data);
						document.getElementById("namatokoup").value = obj[0]['nama_toko'];
						document.getElementById("alamattokoup").value = obj[0]['alamat'];
						document.getElementById("notokoup").value = obj[0]['no_telp'];
						document.getElementById("fasilitasup").value = obj[0]['deskripsi_fasilitas'];
					});

					var onSuccess = function(position){
						lat_baru = position.coords.latitude;
					   	long_baru = position.coords.longitude;

					   	document.addEventListener("deviceready", function() {
					      var div = document.getElementById("maptokoup1");

					      var map = plugin.google.maps.Map.getMap(div);
					      map.animateCamera({
					          target: {lat: lat_baru, lng: long_baru},
					          zoom: 17,
					          tilt: 60,
					          bearing: 140,
					          duration: 5000
					        });
					      var marker = map.addMarker({
					          position: {lat: lat_baru, lng: long_baru},
					          title: "Disini Posisi Anda",
					          animation: plugin.google.maps.Animation.BOUNCE
					        });
					      marker.showInfoWindow();
					    }, false);
					}
					function onError(error) {
					    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
					}
					navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
					
				},
				pageAfterIn: function(e, page){
					$$('#btnsubmit').on('click', function(){
						var idtoko = page.router.currentRoute.params.tokoid;
						var namatoko = $$('#namatokoup').val();
						var alamat = $$('#alamattokoup').val();
						var notoko = $$('#notokoup').val();
						var fasilitas = $$('#fasilitasup').val();

						app.request.post('http://localhost:99/onlaundry/updateinfotoko.php', {idtoko, namatoko, alamat, notoko, fasilitas}, function(data){
							app.dialog.alert(data);
							app.router.navigate('/homeowner/');
						});
					});

					$$('#btnupdatepos').on('click', function(){
						var onSuccess = function(position){
						var idtoko = page.router.currentRoute.params.tokoid;
						var lat_baru = position.coords.latitude;
					   	var long_baru = position.coords.longitude;

					    app.request.post('http://localhost:99/onlaundry/updateposisitoko.php', {idtoko, lat_baru, long_baru}, function(data){
							app.dialog.alert(data);
						});
					}
					function onError(error) {
					    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
					}
					navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
						
						
					});
				}
			}
		},
		{
			path:'/detailtoko/:tokoid',
			url:'detailtoko.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var idtoko = page.router.currentRoute.params.tokoid;
					app.request.post('http://localhost:99/onlaundry/getdetailtoko.php', 
						{idtoko}, function(data){
						var obj = JSON.parse(data);
						document.getElementById("namaToko1").innerHTML = obj[0]['nama_toko'];
						document.getElementById("alamat1").innerHTML = obj[0]['alamat'];
						document.getElementById("nomortelepon1").innerHTML = obj[0]['no_telp'];
						document.getElementById("fasilitas1").innerHTML = obj[0]['fasilitas'];						
						var objt;
						if(obj[0]['tipe_laundry'] == 0)
						{
							document.getElementById("tipe1").innerHTML = "Laundry Kiloan";
							var tokoid = page.router.currentRoute.params.tokoid;
							app.request.post('http://localhost:99/onlaundry/showdeskhargakilo.php', {tokoid}, function(data){
								objt = JSON.parse(data);
								if (objt.length != 0) {
									var isi = "<li>" +
												"<div class='item-content item-input'>" +
												"<div class='item-inner'>"+
												"<div class='item-title item-label'>Harga/Kilo</div>"+
												"<div class='item-input-wrap'><p>"+objt[0]['harga_kiloan']+"</p></div>"+
												"</div></li>";
									$$('#info1').append($$(isi));
									$$('#info1').append("<a href='/lihatlokasi/"+obj[0]['nama_toko']+"/"+obj[0]['rating']+"/"+obj[0]['pos_latitude']+"/"+obj[0]['pos_longitude']+"' class='button button-fill'>Lihat Lokasi</a><br>");
									$$('#info1').append("<a href='/pesanan/"+idtoko+"' class='button button-fill'>Input Pesanan Laundry</a>");
								}								
								else{
									var isi = "<li>" +
												"<div class='item-content item-input'>" +
												"<div class='item-inner'>"+
												"<div class='item-title item-label'>Harga/Kilo</div>"+
												"<div class='item-input-wrap'><p>tidak ada keterangan</p></div>"+
												"</div></li>";
									$$('#info1').append($$(isi));
									$$('#info1').append("<a href='/lihatlokasi/"+obj[0]['nama_toko']+"/"+obj[0]['rating']+"/"+obj[0]['pos_latitude']+"/"+obj[0]['pos_longitude']+"' class='button button-fill'>Lihat Lokasi</a><br>");
									$$('#info1').append("<a href='/pesanan/"+idtoko+"' class='button button-fill'>Input Pesanan Laundry</a>");
								}
							});
							
						}
						else if(obj[0]['tipe_laundry'] == 1)
						{
							document.getElementById("tipe1").innerHTML = "Laundry Satuan";
							$$('#info1').append("<a href='/lihatlokasi/"+obj[0]['nama_toko']+"/"+obj[0]['rating']+"/"+obj[0]['pos_latitude']+"/"+obj[0]['pos_longitude']+"' class='button button-fill'>Lihat Lokasi</a><br>");
							$$('#info1').append("<a href='/pesanan/"+idtoko+"' class='button button-fill'>Input Pesanan Laundry</a>");
						}
						else if(obj[0]['tipe_laundry'] == 2)
						{
							document.getElementById("tipe1").innerHTML = "Laundry Satuan dan Kiloan";
							var tokoid = page.router.currentRoute.params.tokoid;
							var objt;
							var obj;
							app.request.post('http://localhost:99/onlaundry/showdeskhargakilo.php', {tokoid}, function(data){
								objt = JSON.parse(data);
								if (objt.length != 0) {
									var isi = "<li>" +
												"<div class='item-content item-input'>" +
												"<div class='item-inner'>"+
												"<div class='item-title item-label'>Harga/Kilo</div>"+
												"<div class='item-input-wrap'><p>"+objt[0]['harga_kiloan']+"</p></div>"+
												"</div></li>";
									$$('#info1').append($$(isi));
									$$('#info1').append("<a href='/lihatlokasi/"+obj[0]['nama_toko']+"/"+obj[0]['rating']+"/"+obj[0]['pos_latitude']+"/"+obj[0]['pos_longitude']+"' class='button button-fill'>Lihat Lokasi</a><br>");
									$$('#info1').append("<a href='/pesanan/"+idtoko+"' class='button button-fill'>Input Pesanan Laundry</a>");
								}								
								else{
									var isi = "<li>" +
												"<div class='item-content item-input'>" +
												"<div class='item-inner'>"+
												"<div class='item-title item-label'>Harga/Kilo</div>"+
												"<div class='item-input-wrap'><p>belum ada keterangan</p></div>"+
												"</div></li>";
									$$('#info1').append($$(isi));
									$$('#info1').append("<a href='/lihatlokasi/"+obj[0]['nama_toko']+"/"+obj[0]['rating']+"/"+obj[0]['pos_latitude']+"/"+obj[0]['pos_longitude']+"' class='button button-fill'>Lihat Lokasi</a><br>");
									$$('#info1').append("<a href='/pesanan/"+idtoko+"' class='button button-fill'>Input Pesanan Laundry</a>");
								}
							});
						}
						
					});	
				},
			}
		},
		{
			path:'/pesanan/:tokoid',
			url:'pesanan.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var idtoko = page.router.currentRoute.params.tokoid;
					app.request.post('http://localhost:99/onlaundry/getdetailtoko.php', 
						{idtoko}, function(data){
						var jumlahPakaian = 0;
						var obj = JSON.parse(data);
						var objt;
						if(obj[0]['tipe_laundry'] == 0)
						{
							var tokoid = page.router.currentRoute.params.tokoid;
							app.request.post('http://localhost:99/onlaundry/showdeskhargakilo.php', {tokoid}, function(data){
								objt = JSON.parse(data);
								$$('#rincianharga').append("<h3>Input Jumlah Pakaian Laundry</h3>");
								if (objt.length != 0) {
									var isi = "<li>" +
								                  "<div class='item-content item-input'>"+
								                    "<div class='item-inner'>"+
								                      "<div class='item-title item-label'>Harga/kg</div>"+
								                      "<div class='item-input-wrap'>"+
								                        "<p>"+objt[0]['harga_kiloan']+"</p>"+
								                      "</div>"+
								                      "<div class='item-title item-label'>Jumlah yang akan dilaundry(KG):</div>"+
								                      "<div class='item-input-wrap'>"+
								                        "<input type='number' step='0.1' value='0' min='0' id='jumlahkilo'></div>"+
								                    "</div>"+
								                  "</div>"+
								                "</li>";
									$$('#infopesan').append($$(isi));
								}								
								else{
									$$('#btnpesan').hide();
									$$('#forminput').hide();
									var isi = "<li>" +
								                  "<div class='item-content item-input'>"+
								                    "<div class='item-inner'>"+
								                      "<div class='item-title item-label'>Harga/kg</div>"+
								                      "<div class='item-input-wrap'>"+
								                        "<p>-</p>"+
								                      "</div>"+
								                  "</div>"+
								                "</li>";
									$$('#infopesan').append($$(isi));
									app.dialog.alert("Maaf, belum ada rincian harga dari pemilik toko");
								}
							});

							$$('#btnpesan').on('click', function()
							{
								var nota = $$('#noteIn').val();
								var jumlahkilo = $$('#jumlahkilo').val();
								var carabayar;
								if (document.getElementById('bayartunai').checked) 
								{
									carabayar = document.getElementById('bayartunai').value;
								}
								else if(document.getElementById('bayartransfer').checked)
								{
									carabayar = document.getElementById('bayartransfer').value;
								}	
								var user = localStorage.idUser;
								var toko = page.router.currentRoute.params.tokoid;
								var totalharga = objt[0]['harga_kiloan'] * jumlahkilo;
								var harga = objt[0]['harga_kiloan'];
								var idharga = objt[0]['id'];

								var tanggal = getDate();
								app.request.post('http://localhost:99/onlaundry/pesanlaundrykiloan.php', {user, toko, tanggal, totalharga, carabayar, nota, jumlahkilo, idharga, harga}, function(data){
									alert(data);
									app.router.navigate('/home/');
								});
							});

						}
						else if(obj[0]['tipe_laundry'] == 1)
						{
							var tokoid = page.router.currentRoute.params.tokoid;
							app.request.post('http://localhost:99/onlaundry/showdeskharga.php', {tokoid}, function(data){
								var obj = JSON.parse(data);
								if (obj.length != 0) {
									$$('#rincianharga').append("<h3>Input Detail Pakaian Laundry</h3>");
									$$('#isitabel').find('thead').append($$("<tr><th class='label-cell'>Jenis Pakaian</th><th class='numeric-cell'>Harga</th><th class='label-cell'>jumlah</th></tr>"));
									
									jumlahPakaian = obj.length;
									for(var i=0; i<obj.length; i++)
									{
										var isi = "<tr>" +
													"<input id='jenis_" + i + "' type='hidden' value='" + obj[i]['jenis_pakaian'] + "'>" +
													"<input id='harga_" + i + "' type='hidden' value='" + obj[i]['harga_satuan'] + "'>" +
 										 			"<td class='label-cell'>"+obj[i]['jenis_pakaian']+"</td>" +
										 			"<td class='numeric-cell'>"+obj[i]['harga_satuan']+"</td>" +
										 			"<td><input type='number' style='width:1em' value='0' min='0' id='jumlahpesan_" + i + "'/></td>" +
												"</tr>";
										$$('#isitabel').find('tbody').append($$(isi));
									}
								}
								else if(obj == 0){
									$$('#btnpesan').hide();
									$$('#forminput').hide();
									$$('#rincianharga').append("<br><a href='/home/'>Kembali</a><hr>");
									app.dialog.alert("Maaf, belum ada rincian harga dari pemilik toko");
								}
							});

							$$('#btnpesan').on('click', function()
							{
								var nota = $$('#noteIn').val();
								var jumlahkilo = $$('#jumlahkilo').val();
								var carabayar;
								if (document.getElementById('bayartunai').checked) 
								{
									carabayar = document.getElementById('bayartunai').value;
								}
								else if(document.getElementById('bayartransfer').checked)
								{
									carabayar = document.getElementById('bayartransfer').value;
								}	
								var user = localStorage.idUser;
								var toko = page.router.currentRoute.params.tokoid;

								var tanggal = getDate();
								var detailPesan = new Array();
								var i = 0;

								for(var i=0; i<jumlahPakaian; i++)
								{
									var data = {
										jenis: $$('#jenis_' + i).val(),
										harga: $$('#harga_' + i).val(),
										jumlah: $$('#jumlahpesan_' + i).val()
									};
									detailPesan.push(data);
								}

								app.request.post('http://localhost:99/onlaundry/pesanlaundrysatuan.php', {user, toko, tanggal, carabayar, nota, detailPesan}, function(data){
									alert(data);
									app.router.navigate('/home/');
								});
							});
						}
						else if(obj[0]['tipe_laundry'] == 2)
						{
							var tokoid = page.router.currentRoute.params.tokoid;
							var objt;
							var obj;
							app.request.post('http://localhost:99/onlaundry/showdeskhargakilo.php', {tokoid}, function(data){
								objt = JSON.parse(data);
								if (objt.length != 0) {
									var isi = "<li>" +
												"<div class='item-content item-input'>" +
												"<div class='item-inner'>"+
												"<div class='item-title item-label'>Harga/Kilo</div>"+
												"<div class='item-input-wrap'><p>"+objt[0]['harga_kiloan']+"</p></div>"+
												"<div class='item-title item-label'>Jumlah yang akan dilaundry(KG):</div>"+
												"<div class='item-input-wrap'><input type='number' step='0.1' value='0' min='0' id='jumlahkilo'></div>"+
												"</div></li>";
									$$('#infopesan').append($$(isi));	
								}								
								else{
									var isi = "<li>" +
												"<div class='item-content item-input'>" +
												"<div class='item-inner'>"+
												"<div class='item-title item-label'>Harga/Kilo</div>"+
												"<div class='item-input-wrap'><p>-</p></div>"+
												"</div></li>";
									$$('#infopesan').append($$(isi));
								}
							});
							app.request.post('http://localhost:99/onlaundry/showdeskharga.php', {tokoid}, function(data){
								obj = JSON.parse(data);
								if (obj.length != 0) {
									$$('#rincianharga').append("<h3>Input Pesanan Laundry</h3>");
									$$('#isitabel').find('thead').append($$("<tr><th class='label-cell'>Jenis Pakaian</th><th class='numeric-cell'>Harga</th><th class='label-cell'>jumlah</th></tr>"));
									
									jumlahPakaian = obj.length;
									for(var i=0; i<obj.length; i++)
									{
										var isi = "<tr>" +
													"<input id='jenis_" + i + "' type='hidden' value='" + obj[i]['jenis_pakaian'] + "'>" +
													"<input id='harga_" + i + "' type='hidden' value='" + obj[i]['harga_satuan'] + "'>" +
 										 			"<td class='label-cell'>"+obj[i]['jenis_pakaian']+"</td>" +
										 			"<td class='label-cell'>"+obj[i]['harga_satuan']+"</td>" +
										 			"<td><input type='number' style='width:1em' value='0' min='0' id='jumlahpesan_" + i + "'/></td>" +
												"</tr>";
										$$('#isitabel').find('tbody').append($$(isi));
									}
								}
								else if(obj == 0){
									$$('#btnpesan').hide();
									$$('#forminput').hide();

									app.dialog.alert("Maaf, belum ada rincian harga dari pemilik toko");
								}
							});

							$$('#btnpesan').on('click', function()
							{
								var nota = $$('#noteIn').val();
								var jumlahkilo = $$('#jumlahkilo').val();
								var carabayar;
								if (document.getElementById('bayartunai').checked) 
								{
									carabayar = document.getElementById('bayartunai').value;
								}
								else if(document.getElementById('bayartransfer').checked)
								{
									carabayar = document.getElementById('bayartransfer').value;
								}	
								var user = localStorage.idUser;
								var toko = page.router.currentRoute.params.tokoid;
								
								var totalharga = objt[0]['harga_kiloan'] * jumlahkilo;
								var harga = objt[0]['harga_kiloan'];
								var idharga = objt[0]['id'];

								var tanggal = getDate();
								var detailPesan = new Array();
								var i = 0;

								for(var i=0; i<jumlahPakaian; i++)
								{
									var data = {
										jenis: $$('#jenis_' + i).val(),
										harga: $$('#harga_' + i).val(),
										jumlah: $$('#jumlahpesan_' + i).val()
									};
									detailPesan.push(data);
								}

								app.request.post('http://localhost:99/onlaundry/pesanlaundrysatuankiloan.php', {user, toko, tanggal, totalharga, carabayar, nota, detailPesan, idharga, harga, jumlahkilo}, function(data){
									alert(data);
									app.router.navigate('/home/');
								});
							});
						}
					});	
				},
			}
		},
		{
			path:'/pesananmasuk/:tokoid/:tipelaundry',
			url:'pesananmasuk.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var idtoko = page.router.currentRoute.params.tokoid;
					var tipelaundry = page.router.currentRoute.params.tipelaundry;
					
					var transaksiList;

					var isiHTML;
					app.request.post('http://localhost:99/onlaundry/getpesananmasuk.php', {idtoko, tipelaundry}, function(data){
						transaksiList = JSON.parse(data);

						alert(data);
						if (transaksiList != 0) 
						{
						for (var i =  0; i < transaksiList['umum'].length; i++) {
							if (tipelaundry == 1) {
									
										var tempIsiTabel = "<thead><tr><th>jenis pakaian</th><th>jumlah</th></tr></thead><tbody>";
										for(var j=0; j<transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']].length; j++){
											if(transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah'] > 0)
											{
												tempIsiTabel += "<tr>";
												tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jenis']+"</td>"
												tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah']+"</td>"
												tempIsiTabel += "</tr>";
											}
										}
										tempIsiTabel += "</tbody>";
									

										if (transaksiList['umum'][i]['tipe_bayar'] == 0) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+transaksiList['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+transaksiList['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+transaksiList['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+transaksiList['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Pembayaran Tunai</p>"+
														"<p>Detail Transaksi: </p>"+
														"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
														"<button class='button' onclick='terimaPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Terima Pesanan</button>"+
														"<button class='button' onclick='tolakPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Tolak Pesanan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
										else if (transaksiList['umum'][i]['tipe_bayar'] == 1) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+transaksiList['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+transaksiList['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+transaksiList['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+transaksiList['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Pembayaran Transfer</p>"+
														"<p>Detail Transaksi: </p>"+
														"<div class='data-table'><table id='isiHTMLfixtabel'>" + tempIsiTabel + "</table></div>" +
														"<button class='button' onclick='terimaPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Terima Pesanan</button>"+
														"<button class='button' onclick='tolakPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Tolak Pesanan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
							}

							else if (tipelaundry == 0) {
										if (transaksiList['umum'][i]['tipe_bayar'] == 0) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+transaksiList['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+transaksiList['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+transaksiList['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+transaksiList['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Pembayaran Tunai</p>"+
														"<p>Jumlah Pakaian Laundry: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
														"<button class='button' onclick='terimaPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Terima Pesanan</button>"+
														"<button class='button' onclick='tolakPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Tolak Pesanan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
										else if (transaksiList['umum'][i]['tipe_bayar'] == 1) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+transaksiList['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+transaksiList['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+transaksiList['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+transaksiList['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Pembayaran Transfer</p>"+
														"<p>Jumlah Pakaian Laundry: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
														"<button class='button' onclick='terimaPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Terima Pesanan</button>"+
														"<button class='button' onclick='tolakPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Tolak Pesanan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
									
							}
								

							else if (tipelaundry == 2) 
							{
								var tempIsiTabel = "<thead><tr><th>jenis pakaian</th><th>jumlah</th></tr></thead><tbody>";
								for(var j=0; j<transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']].length; j++){
									if(transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah'] > 0)
									{
										tempIsiTabel += "<tr>";
										tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jenis']+"</td>"
										tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah']+"</td>"
										tempIsiTabel += "</tr>";
									}
								}
								tempIsiTabel += "</tbody>";
								if (transaksiList['umum'][i]['tipe_bayar'] == 0) {
									var isiHTML = "<div class='card'>"+
												"<div class='card-content card-content-padding'>"+
												"<p>no transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
												"<p>nama pemesan : "+transaksiList['umum'][i]['nama']+"</p>"+
												"<p>alamat pemesan : "+transaksiList['umum'][i]['alamat']+"</p>"+
												"<p>No Telp Pemesan : "+transaksiList['umum'][i]['no_telp']+"</p>"+
												"<p>tanggal pesan : "+transaksiList['umum'][i]['tanggal_pesan']+"</p>"+
												"<p>Pembayaran Tunai</p>"+
												"<p>Jumlah Pakaian Laundry Kiloan: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
												"<p>Detail Pakaian Laundry Satuan: </p>"+
												"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
												"<button class='button' onclick='terimaPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Terima Pesanan</button>"+
												"<button class='button' onclick='tolakPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Tolak Pesanan</button>"+
												"</div></div>";

									$$('#pesanmasuk').append($$(isiHTML));
								}
								else if (transaksiList['umum'][i]['tipe_bayar'] == 1) {
									var isiHTML = "<div class='card'>"+
												"<div class='card-content card-content-padding'>"+
												"<p>no transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
												"<p>nama pemesan : "+transaksiList['umum'][i]['nama']+"</p>"+
												"<p>alamat pemesan : "+transaksiList['umum'][i]['alamat']+"</p>"+
												"<p>No Telp Pemesan : "+transaksiList['umum'][i]['no_telp']+"</p>"+
												"<p>tanggal pesan : "+transaksiList['umum'][i]['tanggal_pesan']+"</p>"+
												"<p>Pembayaran Transfer</p>"+
												"<p>Jumlah Pakaian Laundry Kiloan: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
												"<p>Detail Pakaian Laundry Satuan: </p>"+
												"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
												"<button class='button' onclick='terimaPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Terima Pesanan</button>"+
												"<button class='button' onclick='tolakPesanan("+transaksiList['umum'][i]['idtransaksi']+")'>Tolak Pesanan</button>"+
												"</div></div>";

									$$('#pesanmasuk').append($$(isiHTML));
								}	
							}
						}
					}
					else
					{
						$$('#pesanmasuk').append("tidak ada pesanan masuk");
					}
					});
				},

			}
		},
		{
			path:'/pesananditerima/:tokoid/:tipelaundry',
			url:'pesananditerima.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var idtoko = page.router.currentRoute.params.tokoid;
					var tipelaundry = page.router.currentRoute.params.tipelaundry;
					var jumlahdetail = 0;
					var pesananlist;

					app.request.post('http://localhost:99/onlaundry/getpesananditerima.php', {idtoko, tipelaundry}, function(data){
						pesananlist = JSON.parse(data);

						alert(data);
						if (pesananlist != 0) 
						{
						for (var i =  0; i < pesananlist['umum'].length; i++) {
							if (tipelaundry == 1) {
								
									var tempIsiTabel = "<thead><tr><th>jenis pakaian</th><th>jumlah</th></tr></thead><tbody>";
									for(var j=0; j<pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']].length; j++){
										if(pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']][j]['jumlah'] >0)
										{
											tempIsiTabel += "<tr>";
											tempIsiTabel += "<td>"+pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']][j]['jenis']+"</td>"
											tempIsiTabel += "<td>"+pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']][j]['jumlah']+"</td>"
											tempIsiTabel += "</tr>";
										}
									}
									tempIsiTabel += "</tbody>";

										if (pesananlist['umum'][i]['tipe_bayar'] == 0) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+pesananlist['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+pesananlist['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+pesananlist['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+pesananlist['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+pesananlist['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Total Harga : "+pesananlist['umum'][i]['total_harga']+"</p>"+
														"<p>Pembayaran Tunai</p>"+
														"<p>Detail Transaksi: </p>"+
														"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
														"<a href='/koreksipesanan/"+pesananlist['umum'][i]['idtransaksi']+"/"+tipelaundry+"' class='button'>Koreksi Detail Pakaian Laundry</a>"+
														"<button class='button' onclick='selesaiTransaksi("+pesananlist['umum'][i]['idtransaksi']+")'>Selesai Dikerjakan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
										else if (pesananlist['umum'][i]['tipe_bayar'] == 1) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+pesananlist['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+pesananlist['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+pesananlist['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+pesananlist['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+pesananlist['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Total Harga : "+pesananlist['umum'][i]['total_harga']+"</p>"+
														"<p>Pembayaran Transfer</p>"+
														"<p>Detail Transaksi: </p>"+
														"<div class='data-table'><table id='isiHTMLfixtabel'>" + tempIsiTabel + "</table></div>" +
														"<a href='/koreksipesanan/"+pesananlist['umum'][i]['idtransaksi']+"/"+tipelaundry+"' class='button'>Koreksi Detail Pakaian Laundry</a>"+
														"<button class='button' onclick='selesaiTransaksi("+pesananlist['umum'][i]['idtransaksi']+")'>Selesai Dikerjakan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
							}

							else if (tipelaundry == 0) {
										if (pesananlist['umum'][i]['tipe_bayar'] == 0) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+pesananlist['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+pesananlist['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+pesananlist['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+pesananlist['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+pesananlist['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Total Harga : "+pesananlist['umum'][i]['total_harga']+"</p>"+
														"<p>Pembayaran Tunai</p>"+
														"<p>Jumlah Pakaian Laundry: "+pesananlist['umum'][i]['jumlah_kiloan']+" KG</p>"+
														"<a href='/koreksipesanan/"+pesananlist['umum'][i]['idtransaksi']+"/"+tipelaundry+"' class='button'>Koreksi Jumlah Pakaian</a>"+
														"<button class='button' onclick='selesaiTransaksi("+pesananlist['umum'][i]['idtransaksi']+")'>Selesai Dikerjakan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
										else if (pesananlist['umum'][i]['tipe_bayar'] == 1) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+pesananlist['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+pesananlist['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+pesananlist['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+pesananlist['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+pesananlist['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Total Harga : "+pesananlist['umum'][i]['total_harga']+"</p>"+
														"<p>Pembayaran Transfer</p>"+
														"<p>Jumlah Pakaian Laundry: "+pesananlist['umum'][i]['jumlah_kiloan']+" KG</p>"+
														"<a href='/koreksipesanan/"+pesananlist['umum'][i]['idtransaksi']+"/"+tipelaundry+"' class='button'>Koreksi Jumlah Pakaian</a>"+
														"<button class='button' onclick='selesaiTransaksi("+pesananlist['umum'][i]['idtransaksi']+")'>Selesai Dikerjakan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
									
							}
								

							else if (tipelaundry == 2) {
							
									var tempIsiTabel = "<thead><tr><th>jenis pakaian</th><th>jumlah</th></tr></thead><tbody>";
									for(var j=0; j<pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']].length; j++){
										if(pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']][j]['jumlah'] >0)
										{
											tempIsiTabel += "<tr>";
											tempIsiTabel += "<td>"+pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']][j]['jenis']+"</td>"
											tempIsiTabel += "<td>"+pesananlist['detail'][pesananlist['umum'][i]['idtransaksi']][j]['jumlah']+"</td>"
											tempIsiTabel += "</tr>";
										}
									}
									tempIsiTabel += "</tbody>";

										if (pesananlist['umum'][i]['tipe_bayar'] == 0) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+pesananlist['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+pesananlist['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+pesananlist['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+pesananlist['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+pesananlist['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Total Harga : "+pesananlist['umum'][i]['total_harga']+"</p>"+
														"<p>Pembayaran Tunai</p>"+
														"<p>Jumlah Pakaian Laundry Kiloan: "+pesananlist['umum'][i]['jumlah_kiloan']+" KG</p>"+
														"<p>Detail Pakaian Laundry Satuan: </p>"+
														"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
														"<a href='/koreksipesanan/"+pesananlist['umum'][i]['idtransaksi']+"/"+tipelaundry+"' class='button'>Koreksi Detail Pakaian Laundry</a>"+
														"<button class='button' onclick='selesaiTransaksi("+pesananlist['umum'][i]['idtransaksi']+")'>Selesai Dikerjakan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
										else if (pesananlist['umum'][i]['tipe_bayar'] == 1) {
											var isiHTML = "<div class='card'>"+
														"<div class='card-content card-content-padding'>"+
														"<p>no transaksi : "+pesananlist['umum'][i]['idtransaksi']+"</p>"+
														"<p>nama pemesan : "+pesananlist['umum'][i]['nama']+"</p>"+
														"<p>alamat pemesan : "+pesananlist['umum'][i]['alamat']+"</p>"+
														"<p>No Telp Pemesan : "+pesananlist['umum'][i]['no_telp']+"</p>"+
														"<p>tanggal pesan : "+pesananlist['umum'][i]['tanggal_pesan']+"</p>"+
														"<p>Total Harga : "+pesananlist['umum'][i]['total_harga']+"</p>"+
														"<p>Pembayaran Transfer</p>"+
														"<p>Jumlah Pakaian Laundry Kiloan: "+pesananlist['umum'][i]['jumlah_kiloan']+" KG</p>"+
														"<p>Detail Pakaian Laundry Satuan: </p>"+
														"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
														"<a href='/koreksipesanan/"+pesananlist['umum'][i]['idtransaksi']+"/"+tipelaundry+"' class='button'>Koreksi Detail Pakaian Laundry</a>"+
														"<button class='button' onclick='selesaiTransaksi("+pesananlist['umum'][i]['idtransaksi']+")'>Selesai Dikerjakan</button>"+
														"</div></div>";

											$$('#pesanmasuk').append($$(isiHTML));
										}
									
								}
						}
					}
					else
					{
						$$('#pesanmasuk').append("Belum ada pesanan yang diterima");
					}
					});
				},

			}
		},
		{
			path:'/koreksipesanan/:idtransaksi/:tipelaundry',
			url:'koreksipesanan.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var idtransaksi = page.router.currentRoute.params.idtransaksi;
					var tipelaundry = page.router.currentRoute.params.tipelaundry;
					var idtoko = localStorage.idtoko;
					
					var koreksilist;

					$$('#btnkembali').on('click', function(){
						app.router.navigate('/pesananditerima/'+idtoko+'/'+tipelaundry);
					});

					app.request.post('http://localhost:99/onlaundry/getdetailtransaksi.php', {idtransaksi, tipelaundry}, function(data){
						koreksilist = JSON.parse(data);

						alert(data);
						if (tipelaundry == 1) 
						{
							if (koreksilist['satuan'].length != 0) {
								$$('#keterangan').append("<h4>Koreksi Pesanan Laundry</h4>");
								$$('#tabeldetail').find('thead').append($$("<tr><th class='label-cell'>Jenis Pakaian</th><th class='numeric-cell'>Harga</th><th class='label-cell'>jumlah</th></tr>"));
								
								jumlahdetail = koreksilist['satuan'].length;
								for(var i=0; i<koreksilist['satuan'].length; i++)
								{
									var isi = "<tr>"+
												"<input id='id_" + i + "' type='hidden' value='" + koreksilist['satuan'][i]['id'] + "'>"+
												"<input id='harga_" + i + "' type='hidden' value='" + koreksilist['satuan'][i]['harga'] + "'>"+
												"<td class='label-cell'>"+koreksilist['satuan'][i]['jenis_pakaian']+"</td>"+
									 			"<td class='label-cell'>"+koreksilist['satuan'][i]['harga']+"</td>"+
									 			"<td><input type='number' style='width:2em' value='"+koreksilist['satuan'][i]['jumlah_pakaian']+"' min='0' id='jumlahpakaian_" + i + "'/></td>"+
											"</tr>";
									$$('#tabeldetail').find('tbody').append($$(isi));
								}
								
							}
							else if(koreksilist['satuan'].length == 0){
								app.dialog.alert("Tidak ada detail");
							}

							$$('#btnkoreksi').on('click', function(){
								var detailpakaian = new Array();
								for(var i=0; i<jumlahdetail; i++)
								{
									var data = {
										id: $$('#id_' + i).val(),
										harga: $$('#harga_' + i).val(),
										jumlah: $$('#jumlahpakaian_' + i).val()
									};
									detailpakaian.push(data);	
								}

								app.request.post('http://localhost:99/onlaundry/koreksipesanansatuan.php', {idtransaksi, detailpakaian}, function(data){
									alert(data);
									app.router.navigate('/pesananditerima/'+idtoko+'/'+tipelaundry);
								});
								
							});

						}
						else if (tipelaundry == 0)
						{
							$$('#rincianharga').append("<h4>Koreksi Pesanan Laundry</h4>");
								var isi = "<li>" +
							                  "<div class='item-content item-input'>"+
							                    "<div class='item-inner'>"+
							                      "<div class='item-title item-label'>Koreksi Jumlah Pakaian(KG):</div>"+
							                      "<div class='item-input-wrap'>"+
							                        "<input type='number' step='0.1' value='"+koreksilist['kiloan'][0]['jumlah_kiloan']+"' min='0' id='jumlahkilo'></div>"+
							                    "</div>"+
							                  "</div>"+
							                "</li>";
								$$('#info1').append($$(isi));

							$$('#btnkoreksi').on('click', function(){
								var idDetail = koreksilist['kiloan'][0]['id'];
								var hargakilo = koreksilist['kiloan'][0]['harga_kiloan'];
								var jumlahkilobaru = $$('#jumlahkilo').val();

								app.request.post('http://localhost:99/onlaundry/koreksipesanankiloan.php', {idtransaksi, idDetail, hargakilo, jumlahkilobaru}, function(data){
									alert(data);
									app.router.navigate('/pesananditerima/'+idtoko+'/'+tipelaundry);
								});
								
							});
						}
						else if (tipelaundry == 2)
						{
							$$('#rincianharga').append("<h4>Koreksi Pesanan Laundry</h4>");
							var isi = "<li>" +
						                  "<div class='item-content item-input'>"+
						                    "<div class='item-inner'>"+
						                      "<div class='item-title item-label'>Koreksi Jumlah Pakaian Kiloan(KG):</div>"+
						                      "<div class='item-input-wrap'>"+
						                        "<input type='number' step='0.1' value='"+koreksilist['kiloan'][0]['jumlah_kiloan']+"' min='0' id='jumlahkilo'></div>"+
						                    "</div>"+
						                  "</div>"+
						                "</li>";
							$$('#info1').append($$(isi));

							$$('#tabeldetail').find('thead').append($$("<tr><th class='label-cell'>Jenis Pakaian</th><th class='numeric-cell'>Harga</th><th class='label-cell'>jumlah</th></tr>"));	
							
							jumlahdetail = koreksilist['satuan'].length;
							for(var i=0; i<koreksilist['satuan'].length; i++)
							{
								var isi = "<tr>"+
											"<input id='id_" + i + "' type='hidden' value='" + koreksilist['satuan'][i]['id'] + "'>"+
											"<input id='harga_" + i + "' type='hidden' value='" + koreksilist['satuan'][i]['harga'] + "'>"+
											"<td class='label-cell'>"+koreksilist['satuan'][i]['jenis_pakaian']+"</td>"+
								 			"<td class='label-cell'>"+koreksilist['satuan'][i]['harga']+"</td>"+
								 			"<td><input type='number' style='width:1em' value='"+koreksilist['satuan'][i]['jumlah_pakaian']+"' min='0' id='jumlahpakaian_" + i + "'/></td>"+
										"</tr>";
								$$('#tabeldetail').find('tbody').append($$(isi));
							}

							$$('#btnkoreksi').on('click', function(){
								var detailpakaian = new Array();
								for(var i=0; i<jumlahdetail; i++)
								{
									var data = {
										id: $$('#id_' + i).val(),
										harga: $$('#harga_' + i).val(),
										jumlah: $$('#jumlahpakaian_' + i).val()
									};
									detailpakaian.push(data);	
								}

								var idDetail = koreksilist['kiloan'][0]['id'];
								var hargakilo = koreksilist['kiloan'][0]['harga_kiloan'];
								var jumlahkilobaru = $$('#jumlahkilo').val();

								app.request.post('http://localhost:99/onlaundry/koreksipesanansatuankiloan.php', {idtransaksi, detailpakaian, idDetail, hargakilo, jumlahkilobaru}, function(data){
									alert(data);
									app.router.navigate('/pesananditerima/'+idtoko+'/'+tipelaundry);
								});
								
							});
						}
					});
				}
			}
		},
		{
			path:'/pesananpengguna/',
			url:'pesananpengguna.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					var iduser = localStorage.idUser;
					
					var transaksiList;

					var isiHTML;
					app.request.post('http://localhost:99/onlaundry/getinfopesananpengguna.php', {iduser}, function(data){
						transaksiList = JSON.parse(data);
						var status;
						if (transaksiList != 0) 
						{
						for (var i =  0; i < transaksiList['umum'].length; i++) {
							if(transaksiList['umum'][i]['status_transaksi'] == 1)
							{
								status = "Menunggu Konfirmasi Penyedia Jasa";
							}
							else if(transaksiList['umum'][i]['status_transaksi'] == 2)
							{
								status = "Pesanan Diterima dan Sedang Dikerjakan";
							}
							else if(transaksiList['umum'][i]['status_transaksi'] == 3)
							{
								status = "Selesai dikerjakan";
							}

							if (transaksiList['umum'][i]['tipe_laundry'] == 1) 
							{
								var tempIsiTabel = "<thead><tr><th>jenis pakaian</th><th>jumlah</th></tr></thead><tbody>";
								for(var j=0; j<transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']].length; j++){
									if(transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah'] > 0)
									{
										tempIsiTabel += "<tr>";
										tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jenis']+"</td>"
										tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah']+"</td>"
										tempIsiTabel += "</tr>";
									}
								}
								tempIsiTabel += "</tbody>";
								

									if (transaksiList['umum'][i]['tipe_bayar'] == 0) {
										var isiHTML = "<div class='card'>"+
													"<div class='card-content card-content-padding'>"+
													"<p>No Transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
													"<p>Status Transaksi : "+status+"</p>"+
													"<p>Laundry : "+transaksiList['umum'][i]['nama_toko']+"</p>"+
													"<p><i class='f7-icons'>placemark</i>"+transaksiList['umum'][i]['alamat']+"</p>"+
													"<p><i class='f7-icons'>phone_fill</i>"+transaksiList['umum'][i]['no_telp']+"</p>"+
													"<p><i class='f7-icons'>money_dollar</i>Rp. "+transaksiList['umum'][i]['total_harga']+",00- | Tunai</p>"+
													"<p>Detail Transaksi: </p>"+
													"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
													"</div></div>";

										$$('#pesan').append($$(isiHTML));
									}
									else if (transaksiList['umum'][i]['tipe_bayar'] == 1) {
										var isiHTML = "<div class='card'>"+
													"<div class='card-content card-content-padding'>"+
													"<p>No Transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
													"<p>Status Transaksi : "+status+"</p>"+
													"<p>Laundry : "+transaksiList['umum'][i]['nama_toko']+"</p>"+
													"<p><i class='f7-icons'>placemark</i>"+transaksiList['umum'][i]['alamat']+"</p>"+
													"<p><i class='f7-icons'>phone_fill</i>"+transaksiList['umum'][i]['no_telp']+"</p>"+
													"<p><i class='f7-icons'>money_dollar</i>Rp. "+transaksiList['umum'][i]['total_harga']+",00- | Transfer</p>"+
													"<p>Detail Transaksi: </p>"+
													"<div class='data-table'><table id='isiHTMLfixtabel'>" + tempIsiTabel + "</table></div>" +
													"<button class='button' id='btninfobayar_"+i+"'>Info Pembayaran</button>"+
													"</div></div>";

										$$('#pesan').append($$(isiHTML));
									}
							}

							else if (transaksiList['umum'][i]['tipe_laundry'] == 0) {
								if (transaksiList['umum'][i]['tipe_bayar'] == 0) {
									var isiHTML = "<div class='card'>"+
												"<div class='card-content card-content-padding'>"+
												"<p>No Transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
												"<p>"+transaksiList['umum'][i]['nama_toko']+"</p>"+
												"<p>Status Transaksi : "+status+"</p>"+
												"<p><i class='f7-icons'>placemark</i>"+transaksiList['umum'][i]['alamat']+"</p>"+
												"<p><i class='f7-icons'>phone_fill</i>"+transaksiList['umum'][i]['no_telp']+"</p>"+
												"<p><i class='f7-icons'>money_dollar</i>Rp. "+transaksiList['umum'][i]['total_harga']+",00- | Tunai</p>"+
												"<p>Jumlah Pakaian Laundry: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
												"</div></div>";

									$$('#pesan').append($$(isiHTML));
								}
								else if (transaksiList['umum'][i]['tipe_bayar'] == 1) {
									var isiHTML = "<div class='card'>"+
												"<div class='card-content card-content-padding'>"+
												"<p>No Transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
												"<p>Status Transaksi : "+status+"</p>"+
												"<p>Laundry : "+transaksiList['umum'][i]['nama_toko']+"</p>"+
												"<p><i class='f7-icons'>placemark</i>"+transaksiList['umum'][i]['alamat']+"</p>"+
												"<p><i class='f7-icons'>phone_fill</i>"+transaksiList['umum'][i]['no_telp']+"</p>"+
												"<p><i class='f7-icons'>money_dollar</i>Rp. "+transaksiList['umum'][i]['total_harga']+",00- | Transfer</p>"+
												"<p>Jumlah Pakaian Laundry: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
												"<button class='button' id='btninfobayar_"+i+"'>Info Pembayaran</button>"+
												"</div></div>";

									$$('#pesan').append($$(isiHTML));
								}
							}
								

							else if (transaksiList['umum'][i]['tipe_laundry'] == 2) 
							{
								var tempIsiTabel = "<thead><tr><th>jenis pakaian</th><th>jumlah</th></tr></thead><tbody>";
								for(var j=0; j<transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']].length; j++){
									if(transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah'] > 0)
									{
										tempIsiTabel += "<tr>";
										tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jenis']+"</td>"
										tempIsiTabel += "<td>"+transaksiList['detail'][transaksiList['umum'][i]['idtransaksi']][j]['jumlah']+"</td>"
										tempIsiTabel += "</tr>";
									}
								}
								tempIsiTabel += "</tbody>";
									if (transaksiList['umum'][i]['tipe_bayar'] == 0) {
										var isiHTML = "<div class='card'>"+
													"<div class='card-content card-content-padding'>"+
													"<p>No Transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
													"<p>Status Transaksi : "+status+"</p>"+
													"<p>Laundry : "+transaksiList['umum'][i]['nama_toko']+"</p>"+
													"<p><i class='f7-icons'>placemark</i>"+transaksiList['umum'][i]['alamat']+"</p>"+
													"<p><i class='f7-icons'>phone_fill</i>"+transaksiList['umum'][i]['no_telp']+"</p>"+
													"<p><i class='f7-icons'>money_dollar</i>Rp. "+transaksiList['umum'][i]['total_harga']+",00- | Tunai</p>"+
													"<p>Jumlah Pakaian Laundry Kiloan: "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
													"<p>Detail Pakaian Laundry Satuan: </p>"+
													"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
													"</div></div>";

										$$('#pesan').append($$(isiHTML));
									}
									else if (transaksiList['umum'][i]['tipe_bayar'] == 1) {
										var isiHTML = "<div class='card'>"+
													"<div class='card-content card-content-padding'>"+
													"<p>No Transaksi : "+transaksiList['umum'][i]['idtransaksi']+"</p>"+
													"<p>Status Transaksi : "+status+"</p>"+
													"<p>Laundry : "+transaksiList['umum'][i]['nama_toko']+"</p>"+
													"<p><i class='f7-icons'>placemark</i>"+transaksiList['umum'][i]['alamat']+"</p>"+
													"<p><i class='f7-icons'>phone_fill</i>"+transaksiList['umum'][i]['no_telp']+"</p>"+
													"<p><i class='f7-icons'>money_dollar</i>Rp. "+transaksiList['umum'][i]['total_harga']+",00- | Transfer</p>"+
													"<p>Jumlah Pakaian Laundry Kiloan : "+transaksiList['umum'][i]['jumlah_kiloan']+" KG</p>"+
													"<p>Detail Pakaian Laundry Satuan: </p>"+
													"<div class='data-table'><table id='isiHTMLtabel'>" + tempIsiTabel + "</table></div>" +
													"<button class='button' id='btninfobayar_"+i+"'>Info Pembayaran</button>"+
													"</div></div>";

										$$('#pesan').append($$(isiHTML));
									}
							}
							$$('#btninfobayar_'+i).on('click', function(){
								app.dialog.alert('Silahkan Melakukan Pembayaran Sesuai Nominal ke Nomor Rekening berikut : 088xxxxxxxx');
							});
						}
						
					}
					else
					{
						app.dialog.alert("Anda belum melakukan pemesanan laundry");
					}
					});
				},

			}
		},
		{
			path:'/lihatlokasi/:namatoko/:rating/:lat/:long',
			url:'lihatlokasi.html',
			on: {
				pageInit: function(e, page){
					app.panel.disableSwipe();
					var namatoko = page.router.currentRoute.params.namatoko;
					var rating = page.router.currentRoute.params.rating;
					var lati = page.router.currentRoute.params.lat;
					var long = page.router.currentRoute.params.long;
					document.addEventListener("deviceready", function() {
				      var div = document.getElementById("map_canvas");

				      var map = plugin.google.maps.Map.getMap(div);
				      map.animateCamera({
				          target: {lat: lati, lng: long},
				          zoom: 17,
				          tilt: 60,
				          bearing: 140,
				          duration: 5000
				        });
				      var marker = map.addMarker({
				          position: {lat: lati, lng: long},
				          title: namatoko,
				          snippet: "RATING : "+rating+"/5",
				          animation: plugin.google.maps.Animation.BOUNCE
				        });
				      marker.showInfoWindow();
				    }, false);
				}
			}
		},
		{
			path:'/rating/',
			url:'rating.html',
			on: {
				pageInit: function(e, page){
					app.panel.enableSwipe();
					app.dialog.alert("ini halaman rating");
					var rate = $$('.star input:checked').val();
					if(document.getElementById('star-5').checked)
					{
						rate = document.getElementById('star-5').value;
					}
					else if(document.getElementById('star-4').checked)
					{
						rate = document.getElementById('star-4').value;
					}
					else if(document.getElementById('star-3').checked)
					{
						rate = document.getElementById('star-3').value;
					}
					else if(document.getElementById('star-2').checked)
					{
						rate = document.getElementById('star-2').value;
					}
					else if(document.getElementById('star-1').checked)
					{
						rate = document.getElementById('star-1').value;
					}

					$$('#cekRating').on('click', function(){
						app.dialog.alert();
					});
				}
			}
		},
		{
			path:'/admin/',
			url:'admin.html',
			on: {
				pageInit: function(e, page){
					app.panel.disableSwipe();
					app.dialog.alert("ini halaman admin");
					$$('#btnKeluar').on('click', function(){
						localStorage.removeItem('emailUser');
						localStorage.removeItem('idtoko');
						localStorage.removeItem('idUser');
						localStorage.removeItem('namaUser');
						localStorage.removeItem('status');
						$$('#btnTambahToko').show();
						app.router.navigate('/login/');
					});
					
				}
			}
		}
	]
	
});

var mainView = app.views.create('.view-main',{
    url:'/login/'
});

if(localStorage.status == 1)
{
	var mainView = app.views.create('.view-main', {
		url:'/home/'
	});
}
else if(localStorage.status == 2)
{
	var mainView = app.views.create('.view-main', {
		url:'/homeowner/'
	});
}
else if(localStorage.status == 3)
{
	var mainView = app.views.create('.view-main', {
		url:'/admin/'
	});
}


$$(document).on('page:init', function(e, page){

	$$('#btnkeluar').on('click', function(){
		localStorage.removeItem('emailUser');
		localStorage.removeItem('idtoko');
		localStorage.removeItem('idUser');
		localStorage.removeItem('namaUser');
		localStorage.removeItem('status');
		$$('#btnTambahToko').show();
		app.router.navigate('/login/');
	});


	if (localStorage.emailUser == null)
  	{
  		mainView.router.navigate('/login/');
  	}

});

$$('#btnPesanan').on('click', function(){
	app.panel.close();
});
$$('#btnHome').on('click', function(){
	app.panel.close();
});
$$('#btnHistory').on('click', function(){
	app.panel.close();
});
$$('#btnHomeOwner').on('click', function(){
	app.panel.close();
});
$$('#btnTambahToko').on('click', function(){
	app.panel.close();
});
$$('#btnkeluar').on('click', function(){
	app.panel.close();
});

function terimaPesanan(idtransaksi)
{
	var result = confirm("Apakah anda yakin?");
	if (result){
		app.request.post('http://localhost:99/onlaundry/terimapesanan.php', {idtransaksi}, function(data){
			app.dialog.alert(data);
		});
	app.router.navigate('/homeowner/');
	}
}
function tolakPesanan(idtransaksi)
{
	var result = confirm("Apakah anda yakin ingin menolak?");
	if (result) {
		app.request.post('http://localhost:99/onlaundry/tolakpesanan.php', {idtransaksi}, function(data){
			app.dialog.alert(data);
		});
	app.router.navigate('/homeowner/');
	}
}

function selesaiTransaksi(idtransaksi)
{
	var result = confirm("Apakah anda yakin?");
	if (result) {
		app.request.post('http://localhost:99/onlaundry/selesaitransaksi.php', {idtransaksi}, function(data){
			app.dialog.alert(data);
		});
	app.router.navigate('/homeowner/');
	}
}



function getDate(){
	var tanggal = new Date();
	var dd = tanggal.getDate();
	var mm = tanggal.getMonth()+1;
	var yyyy = tanggal.getFullYear();
	if(dd < 10){
		dd = '0' + dd;
	}
	if(mm < 10){
		mm = '0' + mm;
	}
	return tanggal = yyyy + '/' + mm + '/' + dd;
}