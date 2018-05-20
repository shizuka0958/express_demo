var app = angular.module('myApp',[]);
app.controller('detailController',['$scope','$http',function($scope,$http){

  var x1 = 1;
  var camID;
  var sex='';
  var age1='';
  var age2='';
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
  var time3 = y + '-' + m + '-' + d;
  time4 = time1
  time5 = time2
$scope.src = 'http://forocomm.oos.ctyunapi.cn/test/QQ%E8%A7%86%E9%A2%91_B5C8B09B2E9B9EB9FEABC9AE9AFD5742.mp4'

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
    format: 'yyyy-mm-dd',
  	language:  'zh-CN',
    minView: 2
  }).attr('value',time3)
  $('#datetimepicker1').datetimepicker('setStartDate', '2015-12-31');
  $('#datetimepicker1').datetimepicker('setEndDate', time2);

  chooseDate = function(event){
    $('#datetimepicker1').datetimepicker('hide');
    $('#datetimepicker2').datetimepicker('hide');
    time4 = $('#datetimepicker1').val();
    time5 = $('#datetimepicker2').val();
  }
  // 摄像机选择
  camSelect = function(event){
    if($(event.target).val()!=0){
      camID = $(event.target).val()
    }else{
      camID=''
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
      // alert("数据异常，请稍后再试")
    })
  }
    $scope.src = 'http://forocomm.oos.ctyunapi.cn/test/test.mp4'
     var myPlayer =  videojs("my-video");  //初始化视频
        myPlayer.src($scope.src);  //重置video的src
        myPlayer.load($scope.src); 

}])