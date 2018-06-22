var app = angular.module('myApp',[]);
app.controller('indexController',['$scope','$http',function($scope,$http){

	  var x1 = 1;
	  var sext = 1;
	  var aget = 1;
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var dd = date.getDate()-1;
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
  var time4 = y + '-' + m + '-' + dd;
  $scope.time3 = time4;

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
      $('#datetimepicker1').datetimepicker('setEndDate', time2);
      $('#datetimepicker2').datetimepicker('setEndDate', timeEnd);
  },300000)

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
  $('#datetimepicker2').datetimepicker('setEndDate', timeEnd);
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
		$http.get('/getPersonTimes?camID=&sex='+sex+'&startTime=&endTime=&startAge=&endAge=').success(function(res){
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
  		$http.get('/getPersonTimes?camID=&sex='+sex+'&startTime=&endTime=&startAge=&endAge=').success(function(res){
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
		$http.get('/getPersonTimes?camID=&sex=&startTime=&endTime=&startAge='+age1+'&endAge='+age2).success(function(res){
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
	  		$http.get('/getPersonTimes?camID=&sex=&startTime=&endTime=&startAge='+age1+'&endAge='+age2).success(function(res){
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
		$http.get('/getPersonTimes?camID=&sex=&startTime='+a+'&endTime='+b+'&startAge=&endAge=').success(function(res){
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
		$http.get('/getCameraList').success(function(res){
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
		$http.get('/getPersonTimes?camID=&sex=&startTime=&endTime=&startAge=&endAge=').success(function(res){
			$scope.timesCount = res.data.list
		}).error(function(res){
			// alert("数据异常，请稍后再试")
		})
	}
	$scope.times()

  $scope.showData = function(id){
    $('#myDay').datepicker('setValue', $scope.time3)
    $scope.dataCamId = id
    $scope.ageData($scope.time3);
    $scope.timeData($scope.time3);
  }

   $('#myDay').datepicker().
      on('changeDate.datepicker.amui',function(event){
        var mm = (event.date.getMonth()-1+2) < 10 ? ('0' + (event.date.getMonth()-1+2)) : (event.date.getMonth()-1+2);
        var dd = event.date.getDate() < 10 ? ('0' + event.date.getDate()) : event.date.getDate();
        var day = event.date.getFullYear()+'-'+mm+'-'+dd;
        $scope.ageData(day);
        $scope.timeData(day);
      })
  $scope.ageData = function(date){
       var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        $http.get('/getAgeGroupCount?camID='+$scope.dataCamId+'&date='+date).success(function(res){
          var res = res.data.list;
          console.log(res)
          var data = new Array();
          for(index in res){
            if(index==0&&res[0]!=null){
              data.push({value:res[0],name:"<20"})
            }else if(index==1&&res[1]!=null){
              data.push({value:res[1],name:"20-30"})
            }else if(index==2&&res[2]!=null){
              data.push({value:res[2],name:"30-40"})
            }else if(index==3&&res[3]!=null){
              data.push({value:res[3],name:"40-50"})
            }else if(index==4&&res[4]!=null){
              data.push({value:res[4],name:">50"})
            }
          }
          console.log(data);
                  
          option = {
            title: {
                text: '每日年龄段分布',
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                // data: ['西凉', '益州','兖州','荆州','幽州']
            },
            series : [
                {
                    name: '年龄段',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        })


  }
  $scope.timeData = function(date){
        var dom = document.getElementById("container1");
        var myChart = echarts.init(dom);
        var app = {};
        var data = new Array();
        option = null;
        $http.get('/getHourCount?camID='+$scope.dataCamId+'&date='+date).success(function(res){
          var res = res.data.list;
          console.log(res)
          var data = new Array();
          for(index in res){
            if(res[index].hour<10){
              data.push(["0"+res[index].hour+":00",res[index].count])
            }else{
              data.push([res[index].hour+":00",res[index].count])
            }
          }
          console.log(data)
           // data = [["00:00",116],["01:00",129],["02:00",135],["03:00",86],["04:00",73],["05:00",85],["06:00",73],["07:00",68],["08:00",92],["09:00",130],["10:00",245],["11:00",139],["12:00",115],["13:00",111],["14:00",309],["15:00",206],["16:00",137],["17:00",128],["18:00",85],["19:00",94],["20:00",71],["21:00",106],["22:00",84],["23:00",0],["24:00",0]];
        var dateList = data.map(function (item) {
            return item[0];
        });
        var valueList = data.map(function (item) {
            return item[1];
        });

        option = {
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],


            title: [{
                left: 'center',
                text: '每日客流分布'
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: [{
                splitLine: {show: false}
            }],
            grid: [{
                top: '20%'
            },{
              bottom: '20%'
            }],
            series: [{
                type: 'line',
                showSymbol: false,
                data: valueList
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        })
       
  }
}])