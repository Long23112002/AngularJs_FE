let app = angular.module("adminShopApp", []);

app.controller("quanLiSanPham", ($scope, $http) => {
  $scope.sanPham = [];

  $scope.loadSanPham = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/product/list');
      $scope.sanPham.push(...response.data);
      $scope.$apply();
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log($scope.sanPham);
  $scope.loadSanPham();
});
