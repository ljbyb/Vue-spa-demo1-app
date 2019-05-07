<template>
  <v-container
          fluid
          grid-list-lg
  >
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color='#F5F5F5' class="mx-auto text-xs-center" min-width=100% >
          <v-card-title>
            <v-icon small left > directions_walk </v-icon>
            <span class="body-1 font-weight-light">今日已经行走：</span>
          </v-card-title>
          <v-card-text class="display-3 font-weight-bold">
            {{stepNumbers}}
          </v-card-text>
          <v-divider></v-divider>
          <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
          <v-divider></v-divider>
          <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // const MAXRECORDS = 10;

  // 引入基本模板
  var echarts = require('echarts/lib/echarts');

  // 引入折线图、柱状图组件
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/bar');

  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  export default {
    data () {
      return {
        stepNumbers: 0,
        // startTime: '',
        // xKeys: [],
        // yValues: [],
        // userName: 'YuanYuan',
        nowDate: '',

        //存放三轴数据
        oriValues: [],
        //当前传感器的值
        gravityNew: 0,
        //上次传感器的值
        gravityOld: 0,
        //上次波峰的时间
        timeOfLastPeak: 0,
        //此次波峰的时间
        timeOfThisPeak: 0,
        //波峰波谷时间差
        TimeInterval: 250,
        //当前的时间
        timeOfNow: 0,
        //波峰值
        peakOfWave: 0,
        //初始阈值
        ThreadValue: 2.0,
        //动态阈值需要动态的数据，这个值用于这些动态数据的阈值
        InitialValue: 1.3,
        //上一点的状态，上升还是下降
        lastStatus: false,
        //是否上升的标志位
        isDirectionUp: false,
        //持续上升次数
        continueUpCount: 0,
        //上一点的持续上升的次数，为了记录波峰的上升次数
        continueUpFormerCount: 0,
        //波谷值
        valleyOfWave: 0,
        //用于存放计算阈值的波峰波谷差值
        ValueNum: 4,
        tempValue: new Array(this.ValueNum),
        tempCount: 0,
      }
    },
    created () {
      //在页面加载时读取localStorage里的信息，如果与登录用户相符则取出对应缓存信息，否则清除原有缓存信息
      this.nowDate = this.getNowDate();
      //
      console.log(' sport created-----------------------');
      // console.log('before addSportTimeData');
      // console.log(this.$store.state.sportday);
      // console.log(this.$store.state.sporttime);
      if (this.$store.state.sporttime.length > 0) {
        // console.log('sporttime length > 0!');
        // console.log('this.nowDate == sporttime ?')
        // console.log(this.nowDate);
        // console.log(this.$store.state.sporttime[this.$store.state.sporttime.length-1][0]);
        // 如果当前日期与缓存日期不一致，则清除缓存内容
        if (!this.$store.state.sportday.has(this.nowDate)) {
          // console.log('before-----------------------removeSportTimeData');
          // console.log(this.$store.state.sporttime);
          this.$store.dispatch('removeSportTimeData');
          // console.log('after-----------------------removeSportTimeData');
          // console.log(this.$store.state.sporttime);
          this.$store.dispatch('addSportTimeData', this.getNowTime());
          this.$store.dispatch('addSportDayData', this.nowDate);
        } else {
          this.stepNumbers = this.$store.state.sportday.get(this.nowDate);
        }
      } else {
        // console.log('sporttime  length <= 0!');
        this.$store.dispatch('addSportTimeData', this.getNowTime());
        this.$store.dispatch('addSportDayData', this.nowDate);
      }
      // console.log('after addSportTimeData');
      // console.log(this.$store.state.sportday);
      // console.log(this.$store.state.sporttime);

      // let userName = localStorage.getItem("userName");
      // if (userName !== null) {
      //   if (userName === this.userName) {
      //     let lastDate = localStorage.getItem('lastDate');
      //     // 如果缓存中的状态信息、累加步数与当前日期不符，则清理,否则读取继续累加
      //     if (lastDate == null || lastDate !== this.nowDate) {
      //       localStorage.removeItem("xKeys");
      //       localStorage.removeItem("yValues");
      //       localStorage.removeItem("startTime");
      //       localStorage.removeItem("stepNumbers");
      //       this.$store.dispatch('addSport2', this.nowDate);
      //     } else {
      //       let xJsonStr = localStorage.getItem("xKeys");
      //       if (xJsonStr !== null) {
      //         this.xKeys = JSON.parse(xJsonStr);
      //       }
      //       let yJsonStr = localStorage.getItem("yValues");
      //       if (yJsonStr !== null) {
      //         this.yValues = JSON.parse(yJsonStr);
      //       }
      //       this.startTime = localStorage.getItem("startTime");
      //       this.stepNumbers = localStorage.getItem("stepNumbers");
      //     }
      //   }
      // } else {
      //   this.$store.dispatch('addSport2', this.nowDate);
      //   localStorage.removeItem("userName");
      //   localStorage.removeItem("lastDate");
      //   localStorage.removeItem("startTime");
      //   localStorage.removeItem("stepNumbers");
      //   localStorage.removeItem("xKeys");
      //   localStorage.removeItem("yValues");
      //   localStorage.removeItem("countData");
      // }
      // //在页面刷新时将vuex里的信息保存到localStorage里
      // window.addEventListener("beforeunload",() => {
      //   localStorage.setItem("userName", this.userName);
      //   localStorage.setItem("lastDate", this.nowDate);
      //   localStorage.setItem("stepNumbers", this.stepNumbers);
      //   localStorage.setItem("startTime", this.startTime);
      //   localStorage.setItem("xKeys", JSON.stringify(this.xKeys));
      //   localStorage.setItem("yValues", JSON.stringify(this.yValues));
      // });

      // this.stepCounter();

      // 添加监听陀螺仪动作检测事件
      if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", this.motionHandler.bind(this), false);
      }
    },

    mounted(){
      this.drawLine();
    },

    // computed: {
    //   stepNumbers() {
    //       return this.$store.state.sportday.get(this.nowDate);
    //   }
    // },

    beforeDestroy() {
      // 删除监听陀螺仪动作检测事件，避免重复事件处理
      if (window.DeviceMotionEvent) {
        console.log('window.removeEventListener------------devicemotion');
        window.removeEventListener("devicemotion", this.motionHandler.bind(this), false);
      }
    },

    methods: {
      drawLine(){
        // console.log('drawLine--------------------------------------');
        // console.log(this.$store.state.sporttime);
        // console.log(this.$store.state.sportday);
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表选项
        let option1 = {
          title: {
            text: '行走速率',
            // subtext: '开始时间：' + this.startTime,
            subtext: '开始时间：' + this.$store.state.sporttime[0][0],
            x: '50%',
            y: '3%',
            textAlign: 'center'
          },
          xAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            type: 'category',
            boundaryGap: false,
            // data: this.xKeys

          },
          yAxis: {
            // boundaryGap: [0, '50%'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            type: 'value'
          },
          series: [
            {
              // name:'步数',
              type:'line',
              smooth:true,
              // symbol: 'none',
              // stack: 'a',
              areaStyle: {
                normal: {}
              },
              // data: this.yValues
              data: this.$store.state.sporttime
            }
          ]
        };

        if (option1 && typeof option1 === "object") {
          myChart.setOption(option1, true);
        }

        setInterval(function () {
          let nowTime = this.getNowTime();
          if (nowTime !== this.$store.state.sporttime[this.$store.state.sporttime.length-1][0]) {
            this.$store.dispatch('addSportTimeData', nowTime)
          }
          // if (this.xKeys[this.xKeys.length-1] !== nowTime) {
          //   this.xKeys.push(nowTime);
          //   this.yValues.push(0);
          //   for (let i = 0; i < this.xKeys.length-MAXRECORDS; i++) {
          //     this.xKeys.shift();
          //   }
          //   for (let i = 0; i < this.yValues.length-MAXRECORDS; i++) {
          //     this.yValues.shift();
          //   }
          // }
          myChart.setOption({
            // xAxis: {
            //   data: this.xKeys
            // },
            series: [{
              name:'步数',
              // data: this.yValues
              data: this.$store.state.sporttime
            }]
          });
        }.bind(this), 1000);

        let myChart2 = echarts.init(document.getElementById('myChart2'));
        let yMax = 100;
        let dataShadow = [];
        for (let value of this.$store.state.sportday.values()) {
          if (yMax < value) {
            yMax = ( Math.floor(value/100) + 1) * 100;
          }
        }

        for (let i = 0; i < this.$store.state.sportday.size; i++) {
          dataShadow.push(yMax);
        }

        let option2 = {
          title: {
            text: '行走记录',
            subtext: '已记录' + this.$store.state.sportday.size + '天',
            x: '50%',
            y: '3%',
            textAlign: 'center'
          },
          xAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: Array.from(this.$store.state.sportday.keys()),
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            // axisLabel: {
            //   textStyle: {
            //     color: '#999'
            //   }
            // }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                            {offset: 0, color: '#FFCDD2'},
                            {offset: 0.5, color: '#E57373'},
                            {offset: 1, color: '#D32F2F'}
                          ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                            {offset: 0, color: '#D32F2F'},
                            {offset: 0.7, color: '#E57373'},
                            {offset: 1, color: '#FFCDD2'}
                          ]
                  )
                }
              },
              data: Array.from(this.$store.state.sportday.values())
            }
          ]
        };

        if (option2 && typeof option2 === "object") {
          myChart2.setOption(option2, true);
        }

        // //获取时间（分钟）
        // function getNowTime() {
        //   let date = new Date();
        //   let Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        //   let Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        //   return Hours + ':' + Minutes;
        // }

      },
      stepCounter: function () {
        // if (this.startTime === '') {
        //   this.startTime = this.getNowDate() + ' ' + getNowTime();
        // }

        if (window.DeviceMotionEvent) {
          window.addEventListener("devicemotion", this.motionHandler.bind(this), false);
        }
      },

      //获取传感器上加速器的数据
      motionHandler: function(event) {
        // function motionHandler(event) {
        var accGravity = event.accelerationIncludingGravity;
        let nowTime = this.getNowTime();
        if (this.onSensorChanged(accGravity.x, accGravity.y, accGravity.z)) {
          // console.log('1---updateSportTimeData[%s]', nowTime);
          console.log(this);
          this.$store.dispatch('updateSportTimeData', nowTime);
          // console.log('2---updateSportDayData[%s]  ',this.nowDate);
          this.$store.dispatch('updateSportDayData', this.nowDate);
          // TODO: 因为Vue模板中无法响应map变化，临时只能赋值data中的一个变量进行动态响应
          this.stepNumbers = this.$store.state.sportday.get(this.nowDate);
        }
      },

      // //存放三轴数据
      // var oriValues = [];
      // //当前传感器的值
      // var gravityNew = 0;
      // function onSensorChanged(x, y, z) {
      onSensorChanged: function(x, y, z) {
        this.oriValues[0] = x;
        this.oriValues[1] = y;
        this.oriValues[2] = z;
        this.gravityNew = Math.sqrt(this.oriValues[0] * this.oriValues[0] + this.oriValues[1] * this.oriValues[1] +
          this.oriValues[2] * this.oriValues[2]);
        return this.detectorNewStep(this.gravityNew);
      },

      /*
      * 检测步子，并开始计步
      * 1.传入sersor中的数据
      * 2.如果检测到了波峰，并且符合时间差以及阈值的条件，则判定为1步
      * 3.符合时间差条件，波峰波谷差值大于initialValue，则将该差值纳入阈值的计算中
      * */
      // //上次传感器的值
      // var gravityOld = 0;
      // //上次波峰的时间
      // var timeOfLastPeak = 0;
      // //此次波峰的时间
      // var timeOfThisPeak = 0;
      // //波峰波谷时间差
      // var TimeInterval = 250;
      // //当前的时间
      // var timeOfNow = 0;
      // //波峰值
      // var peakOfWave = 0;
      // //初始阈值
      // var ThreadValue = 2.0;
      // //动态阈值需要动态的数据，这个值用于这些动态数据的阈值
      // var InitialValue = 1.3;
      // function detectorNewStep(values) {
      detectorNewStep: function (values) {
        let tmpcount = 0;
        if (this.gravityOld === 0) {
          this.gravityOld = values;
        } else {
          if (this.detectorPeak(values, this.gravityOld)) {
            this.timeOfLastPeak = this.timeOfThisPeak;
            this.timeOfNow = Date.now();
            // System.currentTimeMillis
            if (this.timeOfNow - this.timeOfLastPeak >= this.TimeInterval
                    && (this.peakOfWave - this.valleyOfWave >= this.ThreadValue)) {
              this.timeOfThisPeak = this.timeOfNow;
              /*
               * 更新界面的处理，不涉及到算法
               * 一般在通知更新界面之前，增加下面处理，为了处理无效运动：
               * 1.连续记录10才开始计步
               * 2.例如记录的9步用户停住超过3秒，则前面的记录失效，下次从头开始
               * 3.连续记录了9步用户还在运动，之前的数据才有效
               * */
              tmpcount++;
            }
            if (this.timeOfNow - this.timeOfLastPeak >= this.TimeInterval
                    && (this.peakOfWave - this.valleyOfWave >= this.InitialValue)) {
              this.timeOfThisPeak = this.timeOfNow;
              this.ThreadValue = this.peakValleyThread(this.peakOfWave - this.valleyOfWave);
            }
          }
        }
        this.gravityOld = values;

        return tmpcount > 0;
      },

      /*
       * 检测波峰
       * 以下四个条件判断为波峰：
       * 1.目前点为下降的趋势：isDirectionUp为false
       * 2.之前的点为上升的趋势：lastStatus为true
       * 3.到波峰为止，持续上升大于等于2次
       * 4.波峰值大于20
       * 记录波谷值
       * 1.观察波形图，可以发现在出现步子的地方，波谷的下一个就是波峰，有比较明显的特征以及差值
       * 2.所以要记录每次的波谷值，为了和下次的波峰做对比
       * */
      // //上一点的状态，上升还是下降
      // var lastStatus = false;
      // //是否上升的标志位
      // var isDirectionUp = false;
      // //持续上升次数
      // var continueUpCount = 0;
      // //上一点的持续上升的次数，为了记录波峰的上升次数
      // var continueUpFormerCount = 0;
      // //波谷值
      // var valleyOfWave = 0;
      // function detectorPeak(newValue, oldValue) {
      detectorPeak: function(newValue, oldValue) {
        this.lastStatus = this.isDirectionUp;
        if (newValue >= oldValue) {
          this.isDirectionUp = true;
          this.continueUpCount++;
        } else {
          this.continueUpFormerCount = this.continueUpCount;
          this.continueUpCount = 0;
          this.isDirectionUp = false;
        }

        if (!this.isDirectionUp && this.lastStatus
                && (this.continueUpFormerCount >= 2 || oldValue >= 20)) {
          this.peakOfWave = oldValue;
          return true;
        } else if (!this.lastStatus && this.isDirectionUp) {
          this.valleyOfWave = oldValue;
          return false;
        } else {
          return false;
        }
      },

      /*
       * 阈值的计算
       * 1.通过波峰波谷的差值计算阈值
       * 2.记录4个值，存入tempValue[]数组中
       * 3.在将数组传入函数averageValue中计算阈值
       * */
      // //用于存放计算阈值的波峰波谷差值
      // var ValueNum = 4;
      // var tempValue = new Array(ValueNum);
      // var tempCount = 0;
      // function peakValleyThread(value) {
      peakValleyThread: function(value) {
        var tempThread = this.ThreadValue;
        if (this.tempCount < this.ValueNum) {
          this.tempValue[this.tempCount] = value;
          this.tempCount++;
        } else {
          tempThread = this.averageValue(this.tempValue, this.ValueNum);
          for (var i = 1; i < this.ValueNum; i++) {
            this.tempValue[i - 1] = this.tempValue[i];
          }
          this.tempValue[this.ValueNum - 1] = value;
        }
        return tempThread;
      },

      /*
       * 梯度化阈值
       * 1.计算数组的均值
       * 2.通过均值将阈值梯度化在一个范围里
       * */
      // function averageValue(value, n) {
      averageValue: function(value, n) {
        var ave = 0;
        for (var i = 0; i < n; i++) {
          ave += value[i];
        }
        ave = ave / this.ValueNum;
        if (ave >= 8)
          ave = 4.3;
        else if (ave >= 7 && ave < 8)
          ave = 3.3;
        else if (ave >= 4 && ave < 7)
          ave = 2.3;
        else if (ave >= 3 && ave < 4)
          ave = 2.0;
        else {
          ave = 1.3;
        }
        return ave;
      },

        // //获取时间
        // function getNowTime() {
        //   let date = new Date();
        //   let Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        //   let Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        //   return Hours + ':' + Minutes;
        // }
      // },

      //获取日期
      getNowDate: function () {
        let date = new Date();
        let month = date.getMonth()+ 1;
        let mm = month < 10 ? '0' + month : month;
        let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return mm + '/' + dd;
      },

      //获取时间
      getNowTime: function () {
        let date = new Date();
        let Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return Hours + ':' + Minutes;
      }
    }
  }
</script>