<template>
    <v-card
            class="mx-auto text-xs-center"
            color="secondary"
            dark
            min-width=100%
    >
        <v-card-text>
            <div class="display-1 font-weight-thin">Pedometer</div>
        </v-card-text>

        <v-card-text>
            <v-sheet color="green lighten-3">
                <v-sparkline
                        :labels="labels"
                        :value="values"
                        color="rgba(255, 255, 255, .7)"
                        height="120"
                        padding="24"
                        line-width="2"
                        stroke-linecap="round"
                        smooth
                >
                </v-sparkline>
                <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
            </v-sheet>
        </v-card-text>

        <v-card-text>
            <div class="display-3 font-weight-regular">{{stepNumbers}}</div>
            <div class="body-1 font-weight-light">
                <v-icon class="mr-1">timer</v-icon>
                Start at: {{startTime}}
            </div>
        </v-card-text>

    </v-card>
</template>


<script>
    export default {
        data () {
            return {
                mapChangeTracker: 1,
                stepData: new Map(),
                stepNumbers: 0,
                startTime: ''
            }
        },
        computed: {
            labels () {
                var x = this.mapChangeTracker;
                return Array.from(this.stepData.keys());
            },
            values () {
                var y = this.mapChangeTracker;
                return Array.from(this.stepData.values());
            }
        },

        created () {
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("stepData")) {
                let jsonStr = localStorage.getItem("stepData");
                let objMap =  JSON.parse(jsonStr);
                for (let k of Object.keys(objMap)) {
                    this.stepData.set(k, objMap[k]);
                }
                this.mapChangeTracker++;
            }
            if (localStorage.getItem("stepNumbers")) {
                this.stepNumbers = localStorage.getItem("stepNumbers");
            }
            if (localStorage.getItem("startTime")) {
                this.startTime = localStorage.getItem("startTime");
            }

            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",() => {
                let objMap = Object.create(null);
                for (let [k,v] of this.stepData) {
                    objMap[k] = v;
                }
                localStorage.setItem("stepData", JSON.stringify(objMap));
                localStorage.setItem("stepNumbers", this.stepNumbers);
                localStorage.setItem("startTime", this.startTime);
            });


            this.stepCounter();
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            stepCounter: function () {
                //获取传感器上加速器的数据
                function motionHandler(event) {
                    var accGravity = event.accelerationIncludingGravity;
                    let nowminu = getNowMinutes();
                    if (!this.stepData.has(nowminu)) {
                        this.stepData.set(nowminu, 0);
                        this.mapChangeTracker++;
                    }
                    if (onSensorChanged(accGravity.x, accGravity.y, accGravity.z)) {
                        this.stepNumbers++;
                        this.stepData.set(nowminu, this.stepData.get(nowminu)+1);
                        this.mapChangeTracker++;
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
                    if (gravityOld == 0) {
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

                    if (tmpcount > 0) {
                        return true;
                    } else {
                        return false;
                    }
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

                if (this.startTime == '') {
                    this.startTime = getNowTime();
                }

                if (window.DeviceMotionEvent) {
                    window.addEventListener("devicemotion", motionHandler.bind(this), false);
                }

                //获取时间
                function getNowTime() {
                    var date = new Date();
                    var Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                    var Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    var Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                    var time = Hours + ':' + Minutes + ':' + Seconds;
                    return time;
                }

                //获取时间
                function getNowMinutes() {
                    var date = new Date();
                    var Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                    var Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    var time = Hours + ':' + Minutes;
                    return time;
                }
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    // title: { text: '在Vue中使用echarts' },
                    type: 'category',
                    boundaryGap: false,
                    xAxis: {
                        // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                        data: Array.from(this.stepData.keys())
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'line',
                        areaStyle: {},
                        // data: [5, 20, 36, 10, 10, 20]
                        data: Array.from(this.stepData.values())
                    }]
                });
            }
        }
    }
</script>
