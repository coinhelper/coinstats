<!doctype html>
<html ng-app='coinstats'>
<head>
	<title>Coin Stats</title>
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<link rel="icon" href="favicon.ico" type="image/x-icon">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="//netdna.bootstrapcdn.com/bootswatch/3.0.3/cyborg/bootstrap.min.css" rel="stylesheet">
	<link rel='stylesheet' href='css/style.css' />
</head>
<body>
	<div class='container'>
		<h1>Coin Stats</h1>

		<div class='row' ng-controller="StatsController">
			<div class='col-md-9'>
				<div class='row' ng-repeat="coinGroup in coinGroups">
					<div class='coin col-md-3' ng-repeat="coin in coinGroup">
						<div class='panel panel-default'>
							<div class='panel-heading'>
								<h2 class='panel-title'>{{coin.name}}</h2>
							</div>
							<div class='panel-body'>{{coin.balance}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class='list-group col-md-3'>
				<h4 class='list-group-item active'>Sources</h4>
				<a href="{{pool.link}}" target='_blank' class='list-group-item' ng-class="{loading: !pool.loaded}" ng-repeat="pool in pools">{{pool.name}}</a>
			</div>
		</div>

	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular.min.js"></script>
	<script src='js/stats.js'></script>
</body>
</html>