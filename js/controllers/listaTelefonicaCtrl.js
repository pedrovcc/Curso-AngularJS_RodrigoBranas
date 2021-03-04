angular.module("listaTelefonica", []).controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function() {
		contatosAPI.getContatos().then(function(data) {	
			return $scope.contatos = data.data;
		});
	};

	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().then(function(data){
			return $scope.operadoras = data.data;
		});
	};

	$scope.adicionarContato = function (contato) {
		contatosAPI.saveContato(contato).then(function(data){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});
	};

	$scope.apagarContatos = function (contatos) {
		$http({
			method: 'DELETE',
			url: "http://localhost:3412/contatos",
			data: contatos.filter(function(contato){
				if (contato.selecionado) return contato;})

		}).then(function(data){
			delete $scope.contatos;
			$scope.contatoForm.$setPristine(); 
			carregarContatos();
		});
	};

	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
	};

	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	carregarContatos();
	carregarOperadoras();

});
