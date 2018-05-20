var app = angular.module('myApp',[]);
app.controller('indexController',['$scope','$http',function($scope,$http){

	  var x1 = 1;
	  var sext = 1;
	  var aget = 1;
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var d1 = d-5;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var time1 = y + '-' + m + '-' + d1+' '+h+':'+minute;
  var time2 = y + '-' + m + '-' + d+' '+h+':'+minute;
  var time3 = y + '-' + m + '-' + d

  // $('#chooseDate').attr('value',time3)
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
  $('#datetimepicker3').datetimepicker({
    format: 'yyyy-mm-dd',
  	language:  'zh-CN'
  }).attr('value',time3)
  $('#datetimepicker1').datetimepicker('setStartDate', '2015-12-31');
  $('#datetimepicker1').datetimepicker('setEndDate', time2);
  $('#datetimepicker2').datetimepicker('setStartDate', $('#datetimepicker1').val());
  $('#datetimepicker2').datetimepicker('setEndDate', time2);
  $('#datetimepicker3').datetimepicker('setStartDate', '2015-12-31');
  $('#datetimepicker3').datetimepicker('setEndDate', time2);

  function CompareDate(){
    time4 = $('#datetimepicker1').val();
    time5 = $('#datetimepicker2').val();
    return ((new Date(time4.replace(/-/g,"\/"))) > (new Date(time5.replace(/-/g,"\/"))));
  }
  var ifOk1 = true;
  var ifOk2 = true;
  startChange = function(event){
  	$('#datetimepicker2').datetimepicker('setStartDate', $('#datetimepicker1').val());
    if(CompareDate()){
      alert('开始时间必须早于结束时间')
      $('#datetimepicker1').datetimepicker('hide');
      $('#datetimepicker1').val(time1)
      ifOk1 = false;
    }else{
      	$('#datetimepicker1').datetimepicker('hide');
    	ifOk1 = true;
    	$scope.timeSelect()
    }
  }
  endChange = function(event){
    if(CompareDate()){
      alert('结束时间必须晚于开始时间')
      $('#datetimepicker2').datetimepicker('hide');
      $('#datetimepicker2').val(time2)
      ifOk2 = false;
    }else{
      $('#datetimepicker2').datetimepicker('hide');
      ifOk2 = true;
      $scope.timeSelect()
    }
  }
  	// 性别选择
  sexSelect = function(event){
  	if(sext!=1){
		$('#modal2').modal();
  	}
  	if($(event.target).val()!=0){
  		if($(event.target).val()==1){
			var sex = 1
		}else if($(event.target).val()==2){
			var sex = 2
		}
		$http.get('http://localhost:8080/getPersonTimes?camID=&sex='+sex+'&startTime=&endTime=&startAge=&endAge=').success(function(res){
				$scope.sexList = res.data.list
				console.log($scope.sexList[0].count);
				setTimeout(function(){
		        $('#modal2').modal('close')
		      },300)
			}).error(function(res){
				// alert("数据异常，请稍后再试")
			})
  	}else{
  		sex='';
  		$http.get('http://localhost:8080/getPersonTimes?camID=&sex='+sex+'&startTime=&endTime=&startAge=&endAge=').success(function(res){
				$scope.sexList = res.data.list
				console.log($scope.sexList[0].count)
				sext++;
				setTimeout(function(){
		        $('#modal2').modal('close')
		      },300)
			}).error(function(res){
				// alert("数据异常，请稍后再试")
			})
  	}
	
  }
  // 年龄段选择
  ageSelect = function(event){
  	if(aget!=1){
		$('#modal2').modal();
  	}
  	if($(event.target).val()!=0){
		if($(event.target).val()==20){
			var age1 = '';
			var age2 = '20'
		}else if($(event.target).val()==50){
			var age1 = '50';
			var age2 = ''
		}else{
			var age3 = $(event.target).val().split(',')
			var age1 = age3[0]
			var age2 = age3[1]
			console.log(age1+','+age2)
		}
		$http.get('http://localhost:8080/getPersonTimes?camID=&sex=&startTime=&endTime=&startAge='+age1+'&endAge='+age2).success(function(res){
				console.log(res)
				$scope.ageList = res.data.list;
				setTimeout(function(){
			        $('#modal2').modal('close')
			      },300)
			}).error(function(res){
				// alert("数据异常，请稍后再试")
			})
	  	}else{
	  		age1='';
	  		age2='';
	  		$http.get('http://localhost:8080/getPersonTimes?camID=&sex=&startTime=&endTime=&startAge='+age1+'&endAge='+age2).success(function(res){
				console.log(res)
				$scope.ageList = res.data.list;
				setTimeout(function(){
		        $('#modal2').modal('close')
		      },300)
				aget++;
			}).error(function(res){
				// alert("数据异常，请稍后再试")
			})
	  	}
	}
  // 时间段选择
$scope.timeSelect = function(mark){
		if(mark!=1){
			$('#modal2').modal();
		}
		var a = $('#datetimepicker1').val();
		var b = $('#datetimepicker2').val();
		console.log(a+','+b)
		$http.get('http://localhost:8080/getPersonTimes?camID=&sex=&startTime='+a+'&endTime='+b+'&startAge=&endAge=').success(function(res){
			console.log(res)
			$scope.timeSelectList = res.data.list
			setTimeout(function(){
		        $('#modal2').modal('close')
		      },300)
		}).error(function(res){
			// alert("数据异常，请稍后再试")
		})
}
$scope.timeSelect(1);

// 获得摄像头列表
	$scope.getCameraList = function(){
		$('#modal2').modal();
		$http.get('http://localhost:8080/getCameraList').success(function(res){
			$scope.cameraList = res.data.list;
			setTimeout(function(){
		        $('#modal2').modal('close')
		      },300)
		}).error(function(res){
		       $('#modal2').modal('close')
			alert("数据异常，请稍后再试")
		})
	}
	$scope.getCameraList();
	
	// 获得人次
	$scope.times = function(){
		$http.get('http://localhost:8080/getPersonTimes?camID=&sex=&startTime=&endTime=&startAge=&endAge=').success(function(res){
			$scope.timesCount = res.data.list
		}).error(function(res){
			// alert("数据异常，请稍后再试")
		})
	}
	$scope.times()
}])