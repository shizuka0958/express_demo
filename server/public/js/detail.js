var app = angular.module('myApp',[]);
app.controller('detailController',['$scope','$http',function($scope,$http){

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
  console.log(getBeforeDate(-10));//十天后的日期  
  console.log(getBeforeDate(10));//前七天的日期 

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
  // var d = date.getDate();
  // d = d < 10 ? ('0' + d) : d;
  var d = 15
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

  setInterval(function(){
    date = new Date();
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
    // var d = date.getDate();
    // d = d < 10 ? ('0' + d) : d;
    var d = 15
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
    $('#datetimepicker1').datetimepicker('setEndDate', time2);
    $('#datetimepicker2').datetimepicker('setEndDate', timeEnd);
  },300000)

  $scope.pos=0;
  $scope.page = 1

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
  $.fn.datetimepicker.dates['zh-CN'] = {
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  today: "今天",
  suffix: [],
  meridiem: ["上午", "下午"],
  rtl: false // 从右向左书写的语言你可以使用 rtl: true 来设置
};
  $('#datetimepicker1').datetimepicker({
    format: 'yyyy-mm-dd hh:ii',
  	language:  'zh-CN'
  }).attr('value',time1)
  $('#datetimepicker2').datetimepicker({
    format: 'yyyy-mm-dd hh:ii',
  	language:  'zh-CN'
  }).attr('value',time2)
  $('#datetimepicker1').datetimepicker('setStartDate', '2015-12-31');
  $('#datetimepicker1').datetimepicker('setEndDate', time2);
  $('#datetimepicker2').datetimepicker('setStartDate', $('#datetimepicker1').val());
  $('#datetimepicker2').datetimepicker('setEndDate', timeEnd);

  // 摄像机选择
  camSelect = function(event){
    if($(event.target).val()!=0){
      camID = $(event.target).val()
    }else{
      camID=''
    }
  
  }
// 时间段选择
  chooseDate = function(event){
    // $('.selectSub button').attr('disabled',false)
    $('#datetimepicker1').datetimepicker('hide');
    $('#datetimepicker2').datetimepicker('hide');
    $('#datetimepicker2').datetimepicker('setStartDate', $('#datetimepicker1').val());
    console.log((new Date($('#datetimepicker1').val().replace(/-/g,"\/"))) > (new Date($('#datetimepicker2').val().replace(/-/g,"\/"))))
    if((new Date($('#datetimepicker1').val().replace(/-/g,"\/"))) > (new Date($('#datetimepicker2').val().replace(/-/g,"\/")))){
      alert("结束时间必须晚于开始时间")
      $('#datetimepicker1').datetimepicker('hide');
      $('#datetimepicker1').val(time4)
    }
    time4 = $('#datetimepicker1').val();
    time5 = $('#datetimepicker2').val();
  }

  	// 性别选择
  sexSelect = function(event){
  	if($(event.target).val()!=0){
  		if($(event.target).val()==1){
			sex = 1
		}else if($(event.target).val()==2){
			sex = 2
		}
  	}else{
      sex=''
    }
	
  }
  // 年龄段选择
  ageSelect = function(event){
  	if($(event.target).val()!=0){
		if($(event.target).val()==20){
			age1 = '';
			age2 = '20'
		}else if($(event.target).val()==50){
			age1 = '50';
			age2 = ''
		}else{
			age3 = $(event.target).val().split(',')
			age1 = age3[0]
			age2 = age3[1]
			console.log(age1+','+age2)
		}
	  	}else{
        age1='';
        age2=''
      }
	}

// 获得摄像头列表
  $scope.getCameraList = function(){
    $http.get('/getCameraList').success(function(res){
      console.log(res)
      for(var i=0;i<res.data.list.length;i++){
        $('.selectDate select').append('<option value="'+res.data.list[i]+'">摄像头'+res.data.list[i]+'</option>');

        console.log(123)
      }
  $('#cam option[value='+camID+']').attr('selected','true')
    }).error(function(res){
        $('#modal2').modal('close')
      alert("数据异常，请稍后再试")
    })
  }
   $scope.getCameraList()
  // 查询
	$scope.check = function(){
    $('#myPage').val('');
    $('.pagination').addClass('hide')
    $scope.pos=0;
    $scope.page = 1;
    $('#modal2').modal();
    $scope.userList=''
		$http.get('/getDetailData?camID='+camID+'&sex='+sex+'&startTime='+time4+'&endTime='+time5+'&startAge='+age1+'&endAge='+age2+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
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
      }
      setTimeout(function(){
        $('#modal2').modal('close')
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
    $('#modal2').modal();
    if($scope.pos>1){
      $scope.pos-=10;
      $http.get('/getDetailData?camID='+camID+'&sex='+sex+'&startTime='+time4+'&endTime='+time5+'&startAge='+age1+'&endAge='+age2+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.page--;
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
    $http.get('/getDetailData?camID='+camID+'&sex='+sex+'&startTime='+time4+'&endTime='+time5+'&startAge='+age1+'&endAge='+age2+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
      console.log(res)
      $scope.userList = res.data.list
      $scope.page++
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
  selectPage = function(){
    $scope.enterPage=$('#myPage').val();
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
    $('#modal2').modal();
      $scope.pos = ($scope.enterPage-1)*10;
    $http.get('/getDetailData?camID='+camID+'&sex='+sex+'&startTime='+time4+'&endTime='+time5+'&startAge='+age1+'&endAge='+age2+'&limitStartPos='+$scope.pos+'&limitNumber=10').success(function(res){
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
        $('#modal2').modal('close')
      },200)
    }).error(function(res){
      console.log(res)
    })
  }
 
  $scope.checkHis = function(cam,top,src){
    $scope.imgArr = new Array();
    $scope.hisList='';
    if(top>0){
      $http.get('/getPersonHistoryData?camID='+cam+'&topID='+top).success(function(res){
        $scope.hisList = res.data.list;
        for (index in $scope.hisList){
          $http.get('/getPicByPath?path='+$scope.hisList[index].pic).success(function(res){
            $scope.imgArr.push(res.src)
            console.log($scope.imgArr)
          }) 
        }
        setTimeout(function(){console.log($scope.imgArr)},1000)
      })
    }else{
        var temp ={
          "picPath":src,
          "threshold":0.75,
          "topn":100,
          "camIds":cam
        }
        var data=JSON.stringify(temp)
        $.post("http://127.0.0.1:18008/passer/comparen", 
          data,
        function(res){
         $scope.hisList = res.persons;
         $scope.$apply();

         for (index in res.persons){
          $http.get('/getPicByPath?path='+res.persons[index].pic_path).success(function(res){
            $scope.imgArr.push(res.src)
          })
         }
        })
    }
            
  }
}])