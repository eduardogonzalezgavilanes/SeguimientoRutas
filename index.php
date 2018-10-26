<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <title>Location Track - Laravelcode</title>
    <style>
		#map {height: 500px;}
		html, body {
			height: 100%;
			margin: 0;
			padding: 0;
		}
	
    </style>
</head>
<body>
  <div class="jumbotron" align="center" style="background: #337ab7; color: #fff">
    <h1>GONZALEZ GAVILANES EDUARDO ARIEL</h1> 
    <p>seguimiento de rutas</p> 
  </div>
	<div class="row">  
		<div class="col-md-12 col-xs-12 col-sm-12 col-lg-12">
   <div class="panel panel-primary">
    <div class="panel-heading">SEGUIMIENTO DE RUTAS</div>
    <div class="panel-body">  
        <label>Punto A</label>
    <input tye="text" id="start1" class="form-control" value="Flopec Esmeraldas, Simon Plata Torres, Esmeraldas, Ecuador"><!-- Starting Location -->
        <label>Punto B</label>
    <input type="text" id="end1" class="form-control" value="Pontificia Universidad Católica del Ecuador - Sede Esmeraldas, Esmeraldas, Ecuador"><!-- Ending Location -->  
    <br>
    	<div id="map"></div>
    </div>


</div>

	</div>
</div>
    

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCDNt1biVyfA8h-eCZyZ69CKS6NNBCeEQ&callback=initMap&libraries=places,geometry"></script>
    <script async defer src="funciones.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

 </body>
</html>