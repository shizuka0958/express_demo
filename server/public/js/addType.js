var app = angular.module('myApp',[]);
app.controller('warnController',['$scope','$http',function($scope,$http){

  // 查询
	$scope.check = function(){
    $('#loadModal').modal('show');
    $scope.userList=''
		$http.get('/getLibList').success(function(res){
			console.log(res)
      $scope.typeList = res.data.list
      $scope.totalCount = res.data.length;
      if($scope.typeList.length ==0){
        alert('暂无数据')
      }
      setTimeout(function(){
        $('#loadModal').modal('hide')
      },500)
		}).error(function(res){
			alert("数据异常，请稍后再试")
      $scope.totalCount=0
		})
	}
  $scope.check();
  $scope.addType = function(){
    alert('此功能暂时不可用')
    // if($('#name').val().length==0){
    //   alert('库名不能为空')
    // }else{
    //   var temp ={
    //         'name':$('#name').val(),
    //         'remark':''
    //   }
    //   var data=JSON.stringify(temp)
    //   $.post("http://127.0.0.1:18008/library/add", 
    //       data,
    //     function(res){
    //      if(res.status == 200){
    //       alert('添加成功')
    //     }else{
    //       alert(res.msg)
    //     }
    //     })
    //   $('#myModal3').modal('hide')
    //   $scope.check();
    // }
  }
  $scope.deleteType = function(id){
    alert('此功能暂时不可用')
      // if(confirm('确定要删除此库吗？')){
      //   var temp = {
      //       'lib_id':id,
      //       'remark':''
      //     }
      //   var data=JSON.stringify(temp)
      //   $.post("http://127.0.0.1:18008/library/del", 
      //     data,
      //   function(res){
      //    if(res.status == 200){
      //     alert('删除成功')
      //   }else{
      //     alert(res.msg)
      //   }
      //   })
      //   $scope.check();
      // }
  }
}])