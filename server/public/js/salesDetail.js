var app = angular.module('myApp',[]);
app.controller('warnController',['$scope','$http',function($scope,$http){

  var x1 = 1;
  var camID;
  var sex='';
  var age1='';
  var age2='';
  var date = new Date();
  
     function getBeforeDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if(day <= n) {
            if(mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    }

  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var m1 = m-1+2;
  if(m1 > 12){
    m1=1
    y=y+1;
  }
  m1 = m1 < 10 ? ('0' + m1) : m1;
  var m2 = m-1;
  if(m2==0){
    m2=12;
    y=y-1
  }
  m2 = m2 < 10 ? ('0' + m2) : m2;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  var minute1 = minute+5
  minute = minute < 10 ? ('0' + minute) : minute;
  minute1 = minute1 < 10 ? ('0' + minute1) : minute1;
  var time1 = y + '-' + m2 + '-' + d+' '+h+':'+minute;
  var time2 = y + '-' + m1 + '-' + d+' '+h+':'+minute;
  var timeEnd = y + '-' + m1 + '-' + d+' '+h+':'+minute1;
  var time3 = y + '-' + m + '-' + d;
  time4 = time1
  time5 = time2
  $scope.date= time3
  console.log($scope.date);
          

  function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) return decodeURIComponent(r[2]);
      return null;
  }
  camID = GetQueryString('id')
  if(!camID){
    camID=''
  }

  // 摄像机选择
  camSelect = function(event){
    if($(event.target).val()!=0){
      camID = $(event.target).val()
    }else{
      camID=''
    }
  
  }

  $('.am-datepicker-date').datepicker().
    on('changeDate.datepicker.amui', function(event) {
      var d = event.date;
      $scope.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    });


// 获得摄像头列表
  $scope.getCameraList = function(){
    $('#modal2').modal('close')
    // $('.pagination').addClass('hide')
    // $scope.pos=0;
    // $scope.page = 1;
    $http.get('/getPersonList?lib_id=1&limitStartPos=0&limitNumber=1000').success(function(res){
      $scope.totalCount = res.data.totalCount;
      // $scope.totalPage = Math.ceil($scope.totalCount/20)
      $scope.salesList = res.data.list
      console.log(res.data.list);
      $scope.check();
      // if($scope.totalCount>20){
      //   $('.pagination').removeClass('hide')
      //   $('.next').attr('disabled',false)
      //   $('.prev').attr('disabled',true)
      // }else 
      if($scope.salesList.length ==0){
        $('#modal1').modal();
      }
      setTimeout(function(){
        $('#modal2').modal('close')
      },500)

    })
  }
   $scope.getCameraList()
  // 查询
	$scope.check = function(){
    $('#modal2').modal()
    for(index in $scope.salesList){
      $http.get('/getSalesmanReception?topID='+$scope.salesList[index].person_id+'&date='+$scope.date).success(function(res){
        var findIndex = -1;
        for(var i=0;i<$scope.salesList.length;i++){
          if($scope.salesList[i].person_id == res.data.topID){
            findIndex = i;
          }
        }

        if(findIndex>=0){
          $scope.salesList[findIndex].count = res.data.count;
          $scope.$apply();
        }
      })

    }
    setTimeout(function(){
      $('#modal2').modal('close')
    },500)
    $scope.$apply()
    console.log($scope.userLists);      
	}
  $scope.check();
  // 上一页
  // $scope.prev = function(){
  //   $('.next').attr('disabled',false)
  //   $('#modal2').modal();
  //   if($scope.pos>1){
  //     $scope.pos-=20;
  //     $http.get('/getPersonList?lib_id=1&limitStartPos='+$scope.pos+'&limitNumber=20').success(function(res){
  //     console.log(res)
  //     $scope.salesList = res.data.list
  //     $scope.page--;
  //     $scope.check($scope.salesList);
  //     setTimeout(function(){
  //       $('#modal2').modal('close')
  //     },200)
  //   })
  //   }
  //   if($scope.pos==0){
  //     $('.prev').attr('disabled',true)
  //   }
  // }
  // // 下一页
  // $scope.next = function(){
  //   $('.prev').attr('disabled',false)
  //   $('#modal2').modal();
  //   if($scope.pos<$scope.totalCount){
  //     $scope.pos+=20;
  //   $http.get('/getPersonList?lib_id=1&limitStartPos='+$scope.pos+'&limitNumber=20').success(function(res){
  //     console.log(res)
  //     $scope.salesList = res.data.list
  //     $scope.page++;
  //     $scope.check($scope.salesList);
  //     if($scope.page==$scope.totalPage){
  //         $('.next').attr('disabled',true)
  //       }
  //     setTimeout(function(){
  //       $('#modal2').modal('close')
  //     },200)
  //   }).error(function(res){
  //     console.log(res)
  //   })
  // }
  // }
}])