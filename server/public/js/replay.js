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
// $scope.src = 'http://forocomm.oos.ctyunapi.cn/test/QQ%E8%A7%86%E9%A2%91_B5C8B09B2E9B9EB9FEABC9AE9AFD5742.mp4'
// $scope.src = 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"'

  // function GetQueryString(name) {
  //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //     var r = window.location.search.substr(1).match(reg);
  //     if(r != null) return decodeURIComponent(r[2]);
  //     return null;
  // }
  // camID = GetQueryString('id')
  // if(!camID){
  //   camID=''
  // }
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

// 获得摄像头列表
  $scope.getCameraList = function(){
    $http.get('/getCameraList').success(function(res){
      console.log(res)
      for(var i=0;i<res.data.list.length;i++){
        $('.selectDate select').append('<option value="'+res.data.list[i]+'">摄像头'+res.data.list[i]+'</option>');

        console.log(123)
      }
  // $('#cam option[value='+camID+']').attr('selected','true')
    }).error(function(res){
      // alert("数据异常，请稍后再试")
    })
  }
  $scope.check = function(){
    $scope.src = 'http://forocomm.oos.ctyunapi.cn/test/test.mp4'
    // $scope.src = 'http://101.89.214.156:8000/vod/rc/cam02.m3u8?stime=20180522T164700&dur=10000'
     var myPlayer =  videojs("my-video");  //初始化视频
    // myPlayer.src('http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400')
    myPlayer.src($scope.src)
  }
    
}])