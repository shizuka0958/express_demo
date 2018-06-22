var app = angular.module('myApp',[]);
app.controller('warnController',['$scope','$http',function($scope,$http){

  var x1 = 1;
  
  $scope.pos=0;
  $scope.page = 1
  $scope.libId = '';
  $scope.gender= '';
  $scope.arr = [1,2,3,4,5,6]
  $scope.imgSrc = 0;

  $scope.getLib = function(){
    $http.get('/getLibList').success(function(res){
      $scope.libList = res.data.list;
    })
  }
  $scope.getLib()

    // 库选择
  libSelect = function(event){
    if($(event.target).val()!=0){
      $scope.libId = $(event.target).val()
    }else{
      $scope.libId=''
    }
  
  }
  // 查询
  $scope.check = function(){
    $('.pagination').addClass('hide')
    $scope.pos=0;
    $scope.page = 1;
    $('#loadModal').modal('show');
    $scope.userList=''
    $http.get('/getPersonList?lib_id='+$scope.libId+'&limitStartPos='+$scope.pos+'&limitNumber=20').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.totalCount = res.data.totalCount;
      $scope.totalPage = Math.ceil($scope.totalCount/20)
      if($scope.totalCount>20){
        $('.pagination').removeClass('hide')
        $('.next').attr('disabled',false)
        $('.prev').attr('disabled',true)
      }else if($scope.userList.length ==0){

      }
      setTimeout(function(){
        $('#loadModal').modal('hide');
      },500)
    }).error(function(res){
      // alert("数据异常，请稍后再试")
      $scope.totalCount=0
    })
  }
  $scope.check();
  // 上一页
  $scope.prev = function(){
    $('.next').attr('disabled',false)
    $('#loadModal').modal('show');
    if($scope.pos>1){
      $scope.pos-=20;
      $http.get('/getHumanoidData?camID='+camID+'&startTime='+time4+'&endTime='+time5+'&limitStartPos='+$scope.pos+'&limitNumber=20').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.page--;
      setTimeout(function(){
        $('#loadModal').modal('hide');
      },200)
    }).error(function(res){
      // alert("数据异常，请稍后再试")
    })
    }
    if($scope.pos==0){
      $('.prev').attr('disabled',true)
    }
  }
  // 下一页
  $scope.next = function(){
    $('.prev').attr('disabled',false)
    $('#loadModal').modal('show');
    if($scope.pos<$scope.totalCount){
      $scope.pos+=20;
    $http.get('/getHumanoidData?camID='+camID+'&startTime='+time4+'&endTime='+time5+'&limitStartPos='+$scope.pos+'&limitNumber=20').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.page++
      if($scope.page==$scope.totalPage){
          $('.next').attr('disabled',true)
        }
      setTimeout(function(){
        $('#loadModal').modal('hide');
      },200)
    }).error(function(res){
      console.log(res)
    })
  }

  }
  selectPage = function(){
    $scope.enterPage=parseInt($('#myPage').val());

    var tt = /^\d+$/g;
    if(!tt.test($scope.enterPage) || $scope.enterPage<=0){
        $('#jump').attr('disabled',true)
    }else if($scope.enterPage>$scope.totalPage){
      $scope.enterPage = $scope.totalPage
      $('#myPage').val($scope.totalPage)
      $('#jump').attr('disabled',false)
    }else{
      $('#jump').attr('disabled',false)
    }
  }
  $scope.jump = function(){
    $('#loadModal').modal('show');
      $scope.pos = ($scope.enterPage-1)*20;
    $http.get('/getHumanoidData?camID='+camID+'&startTime='+time4+'&endTime='+time5+'&limitStartPos='+$scope.pos+'&limitNumber=20').success(function(res){
      console.log(res)
      if($scope.enterPage==$scope.totalPage){
          $('.next').attr('disabled',true)
          $('.prev').attr('disabled',false)
        }else if($scope.enterPage==1){
          $('.prev').attr('disabled',true)
        }else if($scope.enterPage>1){
          $('.prev').attr('disabled',false)
        }
        if($scope.enterPage<$scope.totalPage){
          $('.next').attr('disabled',false)
        }
      $scope.userList = res.data.list
      $scope.page=$scope.enterPage
      setTimeout(function(){
        $('#loadModal').modal('hide');
      },200)
    }).error(function(res){
      console.log(res)
    })
  }
  $scope.getLibId = function(){

  }
  $scope.doAction1 = function(index,id){
      $('.dropdown1 .dropdown-menu li').removeClass('hid')
      $('.dropdown1 .dropdown-menu li:nth-child('+(index-1+2)+')').addClass('hid')
      $('.dropdown1>button:first-child').html($(' .dropdown1 .dropdown-menu li:nth-child('+(index-1+2)+')').children('a').html());
      $scope.libId1 = id
  }
  $scope.doAction = function(id){
      $('.dropdown2 .dropdown-menu li').removeClass('hid')
      $('.dropdown2 .dropdown-menu li:nth-child('+(id)+')').addClass('hid')
      $('.dropdown2>button:first-child').html($(' .dropdown2 .dropdown-menu li:nth-child('+(id)+')').children('a').html());
      $scope.gender = id;
  }
  
  $scope.addPeople  = function(){
    $scope.name = $('#name').val();
    $scope.phone = $('#phone').val();
    $scope.cardNo = $('#cardNo').val();
    $scope.address = $('#address').val();
    if(!$scope.libId1){
      alert("请选择人员库")
    }else if(!$scope.gender&&$scope.gender!=0){
      alert("请选择性别")
    }else if($('#name').val().length==0){
      alert("请填写姓名，若姓名未知则填写普通顾客")
    }else{
      // alert($scope.libId+','+$scope.gender+','+$scope.name+','+$scope.phone+','+$scope.cardNo+','+$scope.address)
      var temp =  {
            "lib_id":$scope.libId1,
            "name":$scope.name,
            "gender":$scope.gender,
            "phone":$scope.phone,
            "cardNo":$scope.cardNo,
            "address":$scope.address
          }
      var data=JSON.stringify(temp)
      $.post("http://127.0.0.1:18008/person/add", 
          data,
        function(res){
         if(res.status == 200){
          alert('添加成功')
          $('#myModal').modal('hide');
          $scope.check();
        }else{
          alert(res.msg)
        }
        })
    }
  }
  $scope.checkPhoto = function(libid,personid,mark){
    $('#loadModal').modal('show');
    $scope.recordPerid = personid;
    $scope.recordlibid = libid;
    $('[data-toggle="popover"]').popover('hide')
    if(mark==1){
    setTimeout(function(){
      $('[data-toggle="popover"]').popover('show')
    },500)
  }
    $http.get('/getPersonPicture?lib_id='+libid+'&person_id='+personid).success(function(res){
      $scope.imgList = res.data.list;
      setTimeout(function(){
            $('#loadModal').modal('hide');
          },500)
      if(res.data.list.length==0){
        $('#imgLabel').html('暂无照片，点击以添加')
      }else{
        $('#imgLabel').html('添加更多照片')
      }
    })
  }
  $scope.deletePro = function(id){
    if(confirm('是否要删除此照片')){
      var temp =  {
            "face_id":id,
          }
      var data=JSON.stringify(temp)
      $.post("http://127.0.0.1:18008/face/del", 
          data,
        function(res){
         if(res.status == 200){
          alert('删除成功')
            $scope.checkPhoto($scope.recordlibid,$scope.recordPerid);
        }else{
          alert(res.msg)
        }
        })
    }
  }
    $scope.deleteUser = function(id){
      if(confirm('确定要删除此用户吗？')){
        var temp =  {
            'person_id':id
          }
        var data=JSON.stringify(temp)
        $.post("http://127.0.0.1:18008/person/del", 
            data,
          function(res){
           if(res.status == 200){
            alert('删除成功')
            $scope.check();
          }else{
            alert(res.msg)
          }
          })
      }
  }

    $('#profile').on('change',function(){
      var value = $(this).val();
      value = value.split("\\")[2];
      $scope.imgSrc = value;
       var temp =  {
            'person_id':$scope.recordPerid,
            'pic_path':$scope.imgSrc
          }
        var data=JSON.stringify(temp)
        $.post("http://127.0.0.1:18008/face/add", 
            data,
          function(res){
           if(res.status == 200){
            alert('添加成功')
            $scope.checkPhoto($scope.recordlibid,$scope.recordPerid);
            $('#profile').val('');
          }else{
            alert(res.msg)
          }
          })
    })
    $scope.upload = function(){
      $('#myModal2').modal('hide')
    }
      setTimeout(function(){
        $("#loadModal").modal('hide');
      },1000)
}])