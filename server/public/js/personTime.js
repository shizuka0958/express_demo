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

 // 查询
  $scope.check = function(){
    $('.pagination').addClass('hide')
    $scope.pos=0;
    $scope.page = 1;
    $('#modal2').modal();
    $scope.userList=''
    $scope.start = $scope.date+' 00:00'
    $scope.end = $scope.date+' 23:59'
    $http.get('/getDetailData?camID='+ 100 +'&startTime='+$scope.start+'&endTime='+$scope.end+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
      console.log(res)
      
      $scope.userList = res.data.list
      $scope.totalCount = res.data.totalCount;
      $scope.totalPage = Math.ceil($scope.totalCount/10)
      if($scope.totalCount>10){
        $('.pagination').removeClass('hide')
        $('.next').attr('disabled',false)
        $('.prev').attr('disabled',true)
      }else if($scope.userList.length ==0){
        $('#modal1').modal();
        setTimeout(function(){
          $('#modal1').modal('close');
        },1000)
      }
      if($scope.userList.length!=0){
        setTimeout(function(){
          $('#modal2').modal('close')
        },1000)
      }

      $scope.getTime();

      setTimeout(function(){
        $('#modal2').modal('close')
      },500)
    }).error(function(res){
      // alert("数据异常，请稍后再试")
      $scope.totalCount=0
    })
  }
  $scope.check();
  $scope.getTime = function(){
    for(index in $scope.userList){
      if($scope.userList[index].topID==0){

        var temp ={
          "index":index-1+1,
          "picPath":$scope.userList[index].pic,
          "threshold":0.75,
          "topn":100,
          "camIds":1
        }
        var data=JSON.stringify(temp)
        $.post("http://127.0.0.1:18008/passer/comparen", 
          data,
        function(res){
         console.log(res.index);
         var findIndex = -1;
         for(var i=0;i<$scope.userList.length;i++){
          if(i == res.index){
            console.log("for i=",i);
            findIndex = i;
          }
        }

        if(findIndex >=0 && findIndex<10){
          var outTime = $scope.userList[findIndex].time;
          var outDate = new Date(outTime);
          var inTime = "未知";
          for(var j=0;j<res.persons.length;j++){
            var inDate =  new Date(res.persons[j].time);
            if(outDate.getTime()>inDate.getTime()){
               if(outDate.getDate() == inDate.getDate()){
                 inTime = res.persons[j].time;
               }
               else{
                inTime = "未知";
               }
               break;
            }else{
              continue;
            }
          }
          $scope.userList[findIndex].entertime = inTime;
         // $scope.userList[findIndex].entertime = res.persons[0].time;
          $scope.$apply();
        }
        
      
        

        //  for (index in res.persons){
        //   $http.get('/getPicByPath?path='+res.persons[index].pic_path).success(function(res){
        //     $scope.imgArr.push(res.src)
        //   })
        //  }
        })

      }else{

        $http.get('/getPersonHistoryData?camID=1'+'&index='+(index-1+1)+'&topID='+$scope.userList[index].topID).success(function(res){
         // $scope.hisList = res.data.list;
          // for (index in $scope.hisList){
          //   $http.get('/getPicByPath?path='+$scope.hisList[index].pic).success(function(res){
          //     $scope.imgArr.push(res.src)
          //     console.log($scope.imgArr)
          //   }) 
          // }
          console.log("getPersonHistoryData res=",res.data.resIndex)
          var findIndex = -1;
          for(var i=0;i<$scope.userList.length;i++){
            if(i == res.data.resIndex){
              console.log("getPersonHistoryData if i=",i);
              findIndex = i;
            }
          }
          console.log("findIndex = ",findIndex);
          if(findIndex >=0 && findIndex<10){
            var outTime = $scope.userList[findIndex].time;
            var outDate = new Date(outTime);
            var inTime = "未知"
            for(var j=0;j<res.data.list.length;j++){
              var inDate =  new Date(res.data.list[j].time);
              if(outDate.getTime()>inDate.getTime()){
                 if(outDate.getDate() == inDate.getDate()){
                   inTime = res.data.list[j].time;
                 }
                 else{
                  inTime = "未知";
                 }
                 break;
              }else{
                continue;
              }
            }
            $scope.userList[findIndex].entertime = inTime;
            //$scope.userList[findIndex].entertime = res.data.list[0].time;
            $scope.$apply();    
            console.log("findIndex = ",findIndex);
          }
            
        })
      }
    }
  }
  // 上一页
  $scope.prev = function(){
    $('.next').attr('disabled',false)
    $('#modal2').modal();
    if($scope.pos>1){
      $scope.pos-=10;
      $http.get('/getDetailData?camID='+ 100 +'&startTime='+$scope.start+'&endTime='+$scope.end+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.page--;
      $scope.getTime();
      setTimeout(function(){
        $('#modal2').modal('close')
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
    $('#modal2').modal();
    if($scope.pos<$scope.totalCount){
      $scope.pos+=10;
    $http.get('/getDetailData?camID='+ 100 +'&startTime='+$scope.start+'&endTime='+$scope.end+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.page++
      $scope.getTime();
      if($scope.page==$scope.totalPage){
          $('.next').attr('disabled',true)
        }
      setTimeout(function(){
        $('#modal2').modal('close')
      },200)
    }).error(function(res){
      console.log(res)
    })
  }
  }
}])