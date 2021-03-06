angular.module('coinstats', [])
	.controller('StatsController', function($scope, $http, $timeout, $filter) {
		$scope.coinGroupCount = 4;

		$scope.pools = {};
		$scope.coins = {};
		$scope.exchange = {};

		$scope.coinGroups = $filter('group')($scope.coins, $scope.coinGroupCount);

		$http.get('fetch.php').
		success(function(data) {
			$scope.pools = data;
			angular.forEach(data, $scope.fetch_pool);
		});

		$scope.fetch_pool = function(pool) {
			for (var i = 0; i < $scope.pools.length; i++) {
				if ($scope.pools[i].id == pool.id) {
					var id = i;
				}
			}
			$scope.pools[id].loaded = false;
			$http.get('fetch.php?pool=' + pool.id)
				.success(function(data) {
					$scope.pools[id].data = data;
					$scope.process_data();
					$scope.pools[id].loaded = true;

					var timer = (Math.random() * 30) + 45;
					console.log("Updating " + pool.name + " in " + timer + " seconds");
					$timeout(function() {
						$scope.fetch_pool(pool)
					}, timer * 1000);
				});
		};

		$scope.process_data = function() {
            var coins = {};
			angular.forEach($scope.pools, function(pool, key) {
				if (pool.data == undefined) {
					return;
				}

				angular.forEach(pool.data.balance, function(val) {
					if (coins[val.type] == undefined) {
						coins[val.type] = {
							name: val.type,
							balance: 0,
							pools: {}
						};
					}

					coins[val.type].balance += parseFloat(val.value);
					coins[val.type].pools[pool.id] = {
						pool: key,
						balance: parseFloat(val.value)
					};
				});

				angular.forEach(pool.data.exchange, function(val) {
					$scope.exchange[val.from] = val
				});
			})
            $scope.coins = coins;
			$scope.coinGroups = $filter('group')($scope.coins, $scope.coinGroupCount);

		};
	})
	.filter('group', function() {
		return function(items, count) {
			var keys = Object.keys(items);
			keys.sort();

			var newArr = [];
			angular.forEach(keys, function(val, key) {
				var row = Math.floor(key / count);
				var col = key % count;

				if (newArr[row] == undefined) {
					newArr[row] = [];
				}

				newArr[row][col] = items[val];
			});

			return newArr;
		};
	});