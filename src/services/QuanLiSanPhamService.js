let app = angular.module("adminShopApp", []);

app.controller("quanLiSanPham", ($scope, $http , $window) => {
  $scope.sanPham = [];
  $scope.listBrand = [];
  $scope.requestDataProduct = {
    nameProduct: "",
    quantity: "",
    price: "",
    idBrand: "",
  };

  $scope.loadSanPham = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/product/list");
      $scope.sanPham = response.data;
      $scope.$apply();
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  $scope.loadBrand = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/brand/all");
      $scope.listBrand = response.data;
      $scope.$apply();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  $scope.saveProduct = async function() {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/product/add", $scope.requestDataProduct);
      console.log(response.data); 
      $scope.loadSanPham();
      Swal.fire({
        icon: 'success',
        title: 'Save thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      $('#exampleModal').modal('hide');
      $scope.requestDataProduct = {
        nameProduct: "",
        quantity: "",
        price: "",
        idBrand: "",
      }; 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  $scope.deleteProduct = async function(id) {
    try {
      const { value } = await $window.Swal.fire({
        title: 'Bạn chắc chắn muốn xóa?',
        text: 'Hành động này sẽ không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa'
      });

      if (value) {
        const response = await axios.delete("http://localhost:8080/api/v1/product/delete/" + id);
        console.log(response.data);
        $scope.loadSanPham();
        $window.Swal.fire('Xóa thành công!', '', 'success');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      $window.Swal.fire('Lỗi khi xóa!', 'Đã xảy ra lỗi khi thực hiện xóa.', 'error');
    }
  };

  $scope.loadSanPham();
  $scope.loadBrand();
});
