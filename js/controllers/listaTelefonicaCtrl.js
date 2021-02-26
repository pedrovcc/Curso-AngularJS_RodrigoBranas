angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function() {
		$http({
		method: 'GET',
		url: "http://localhost:3412/contatos"

	}).then(function(data){
		$scope.contatos = data;
	}).error(function(data){
		$scope.message = "Aconteceu um problema: " + data;
	});
	};

	var carregarOperadoras = function () {
		$http({
			method: 'GET',
			url: "http://localhost:3412/operadoras"
		
		}).then(function(success, data){
			$scope.operadoras = data;
		},function(error){
		});
	};

	$scope.adicionarContato = function (contato) {
		contato.data = new Date();
		$http({
			method: 'POST',
			url: "http://localhost:3412/contatos"
		}).then(function(success){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		},function(error){
		});
		
	};


	carregarContatos();
	carregarOperadoras();
});
