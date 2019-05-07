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
        nowDate: '',
      }
    },
    created () {
      //在页面加载时读取localStorage里的信息，如果与登录用户相符则取出对应缓存信息，否则清除原有缓存信息
      this.nowDate = this.getNowDate();
      if (this.$store.state.sporttime.length > 0) {
        // 如果当前日期与缓存日期不一致，则清除缓存内容
        if (!this.$store.state.sportday.has(this.nowDate)) {
          this.$store.dispatch('removeSportTimeData');
          this.$store.dispatch('addSportTimeData', this.getNowTime());
          this.$store.dispatch('addSportDayData', this.nowDate);
        } else {
          this.stepNumbers = this.$store.state.sportday.get(this.nowDate);
        }
      } else {
        this.$store.dispatch('addSportTimeData', this.getNowTime());
        this.$store.dispatch('addSportDayData', this.nowDate);
      }

      this.stepCounter();
    },

    mounted(){
      this.drawLine();
    },

    methods: {
      drawLine(){
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
      },
      stepCounter: function () {
        if (window.DeviceMotionEvent) {
          window.addEventListener("devicemotion", motionHandler.bind(this), false);
        }

        //获取传感器上加速器的数据
        function motionHandler(event) {
          var accGravity = event.accelerationIncludingGravity;
          let nowTime = this.getNowTime();
          if (onSensorChanged(accGravity.x, accGravity.y, accGravity.z)) {
            this.$store.dispatch('updateSportTimeData', nowTime);
            this.$store.dispatch('updateSportDayData', this.nowDate);
            // TODO: 因为Vue模板中无法响应map变化，临时只能赋值data中的一个变量进行动态响应
            this.stepNumbers = this.$store.state.sportday.get(this.nowDate);
          }
        }

        //存放三轴数据
        var oriValues = [];
        //当前传感器的值
        var gravityNew = 0;
        function onSensorChanged(x, y, z) {
          oriValues[0] = x;
          oriValues[1] = y;
          oriValues[2] = z;
          gravityNew = Math.sqrt(oriValues[0] * oriValues[0] + oriValues[1] * oriValues[1] + oriValues[2] * oriValues[2]);
          return detectorNewStep(gravityNew);
        }

        /*
        * 检测步子，并开始计步
        * 1.传入sersor中的数据
        * 2.如果检测到了波峰，并且符合时间差以及阈值的条件，则判定为1步
        * 3.符合时间差条件，波峰波谷差值大于initialValue，则将该差值纳入阈值的计算中
        * */
        //上次传感器的值
        var gravityOld = 0;
        //上次波峰的时间
        var timeOfLastPeak = 0;
        //此次波峰的时间
        var timeOfThisPeak = 0;
        //波峰波谷时间差
        var TimeInterval = 250;
        //当前的时间
        var timeOfNow = 0;
        //波峰值
        var peakOfWave = 0;
        //初始阈值
        var ThreadValue = 2.0;
        //动态阈值需要动态的数据，这个值用于这些动态数据的阈值
        var InitialValue = 1.3;
        function detectorNewStep(values) {
          let tmpcount = 0;
          if (gravityOld === 0) {
            gravityOld = values;
          } else {
            if (detectorPeak(values, gravityOld)) {
              timeOfLastPeak = timeOfThisPeak;
              timeOfNow = Date.now();
              // System.currentTimeMillis
              if (timeOfNow - timeOfLastPeak >= TimeInterval
                      && (peakOfWave - valleyOfWave >= ThreadValue)) {
                timeOfThisPeak = timeOfNow;
                /*
                 * 更新界面的处理，不涉及到算法
                 * 一般在通知更新界面之前，增加下面处理，为了处理无效运动：
                 * 1.连续记录10才开始计步
                 * 2.例如记录的9步用户停住超过3秒，则前面的记录失效，下次从头开始
                 * 3.连续记录了9步用户还在运动，之前的数据才有效
                 * */
                tmpcount++;
              }
              if (timeOfNow - timeOfLastPeak >= TimeInterval
                      && (peakOfWave - valleyOfWave >= InitialValue)) {
                timeOfThisPeak = timeOfNow;
                ThreadValue = peakValleyThread(peakOfWave - valleyOfWave);
              }
            }
          }
          gravityOld = values;

          return tmpcount > 0;
        }

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
        //上一点的状态，上升还是下降
        var lastStatus = false;
        //是否上升的标志位
        var isDirectionUp = false;
        //持续上升次数
        var continueUpCount = 0;
        //上一点的持续上升的次数，为了记录波峰的上升次数
        var continueUpFormerCount = 0;
        //波谷值
        var valleyOfWave = 0;
        function detectorPeak(newValue, oldValue) {
          lastStatus = isDirectionUp;
          if (newValue >= oldValue) {
            isDirectionUp = true;
            continueUpCount++;
          } else {
            continueUpFormerCount = continueUpCount;
            continueUpCount = 0;
            isDirectionUp = false;
          }

          if (!isDirectionUp && lastStatus
                  && (continueUpFormerCount >= 2 || oldValue >= 20)) {
            peakOfWave = oldValue;
            return true;
          } else if (!lastStatus && isDirectionUp) {
            valleyOfWave = oldValue;
            return false;
          } else {
            return false;
          }
        }

        /*
         * 阈值的计算
         * 1.通过波峰波谷的差值计算阈值
         * 2.记录4个值，存入tempValue[]数组中
         * 3.在将数组传入函数averageValue中计算阈值
         * */
        //用于存放计算阈值的波峰波谷差值
        var ValueNum = 4;
        var tempValue = new Array(ValueNum);
        var tempCount = 0;
        function peakValleyThread(value) {
          var tempThread = ThreadValue;
          if (tempCount < ValueNum) {
            tempValue[tempCount] = value;
            tempCount++;
          } else {
            tempThread = averageValue(tempValue, ValueNum);
            for (var i = 1; i < ValueNum; i++) {
              tempValue[i - 1] = tempValue[i];
            }
            tempValue[ValueNum - 1] = value;
          }
          return tempThread;
        }

        /*
         * 梯度化阈值
         * 1.计算数组的均值
         * 2.通过均值将阈值梯度化在一个范围里
         * */
        function averageValue(value, n) {
          var ave = 0;
          for (var i = 0; i < n; i++) {
            ave += value[i];
          }
          ave = ave / ValueNum;
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
        }
      },
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