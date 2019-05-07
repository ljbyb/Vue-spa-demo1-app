<template>
    <v-card
            class="mx-auto text-xs-center"
            min-width=100%
    >
        <v-card-text>
            <div class="body-1 font-weight-light">今日已行走步数</div>
            <div class="display-3 font-weight-regular">{{stepNumbers}}</div>
            <div class="body-1 font-weight-light">
                <v-icon class="mr-1">timer</v-icon>
                开始时间：{{startTime}}
            </div>
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
            <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
        </v-card-text>
    </v-card>
</template>


<script>
    const MAXRECORDS = 100;

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
                startTime: '',
                xKeys: [],
                yValues: [],
                xKeys2: [],
                yValues2: [],
                userName: 'YuanYuan',
                nowDate: ''
            }
        },
        created () {
            //在页面加载时读取localStorage里的信息，如果与登录用户相符则取出对应缓存信息，否则清除原有缓存信息
            this.nowDate = this.getNowDate();
            // let info1 = 'nowDate=' + this.nowDate + ' userName=' + this.userName;
            // alert(info1);
            // let info2 = '1----xKeys is '+ typeof this.xKeys + ' xKeys2 is ' + typeof this.xKeys2;
            // console.log(info2);
            let userName = localStorage.getItem("userName");
            if (userName !== null) {
                if (userName === this.userName) {
                    let xJsonStr2 = localStorage.getItem("xKeys2");
                    if (xJsonStr2 !== null) {
                        this.xKeys2 = JSON.parse(xJsonStr2);
                    }
                    let yJsonStr2 = localStorage.getItem("yValues2");
                    if (yJsonStr2 !== null) {
                        this.yValues2 = JSON.parse(yJsonStr2);
                    }
                    // let info = "1----nowDate="+ this.nowDate + " lastDate=" + lastDate + " xKeys2=" + xJsonStr2 + " yValues2=" + yJsonStr2;
                    // alert(info);
                    let lastDate = localStorage.getItem('lastDate');
                    // 如果缓存中的状态信息、累加步数与当前日期不符，则清理,否则读取继续累加
                    if (lastDate == null || lastDate !== this.nowDate) {
                        localStorage.removeItem("xKeys");
                        localStorage.removeItem("yValues");
                        // localStorage.removeItem("lastDate");
                        localStorage.removeItem("startTime");
                        localStorage.removeItem("stepNumbers");
                        // console.log(typeof this.xKeys2);
                        this.xKeys2.push(this.nowDate);
                        this.yValues2.push(0);
                    } else {
                        let xJsonStr = localStorage.getItem("xKeys");
                        if (xJsonStr !== null) {
                            this.xKeys = JSON.parse(xJsonStr);
                        }
                        let yJsonStr = localStorage.getItem("yValues");
                        if (yJsonStr !== null) {
                            this.yValues = JSON.parse(yJsonStr);
                        }
                        this.startTime = localStorage.getItem("startTime");
                        this.stepNumbers = localStorage.getItem("stepNumbers");
                        // let info = "2---nowDate="+ this.nowDate + " lastDate=" + lastDate + " xKeys=" + xJsonStr + " yValues=" + yJsonStr;
                        // alert(info);
                    }
                }
            } else {
                this.xKeys2.push(this.nowDate);
                this.yValues2.push(0);
                localStorage.removeItem("userName");
                localStorage.removeItem("lastDate");
                localStorage.removeItem("startTime");
                localStorage.removeItem("stepNumbers");
                localStorage.removeItem("xKeys");
                localStorage.removeItem("yValues");
                localStorage.removeItem("xKeys2");
                localStorage.removeItem("yValues2");
            }


            // let info3 = '3----xKeys is '+ typeof this.xKeys + ' xKeys2 is ' + typeof this.xKeys2;
            // console.log(info3);

            // if (localStorage.getItem("xKeys")) {
            //     let jsonStr = localStorage.getItem("xKeys");
            //     this.xKeys =  JSON.parse(jsonStr);
            //     // localStorage.removeItem("xKeys");
            // }
            //
            // if (localStorage.getItem("yValues")) {
            //     let jsonStr = localStorage.getItem("yValues");
            //     this.yValues =  JSON.parse(jsonStr);
            //     // localStorage.removeItem("yValues");
            // }
            // if (localStorage.getItem("stepNumbers")) {
            //     this.stepNumbers = localStorage.getItem("stepNumbers");
            //     // localStorage.removeItem("stepNumbers");
            // }
            // if (localStorage.getItem("startTime")) {
            //     this.startTime = localStorage.getItem("startTime");
            //     // localStorage.removeItem("startTime");
            // }

            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",() => {
                localStorage.setItem("userName", this.userName);
                localStorage.setItem("lastDate", this.nowDate);
                localStorage.setItem("stepNumbers", this.stepNumbers);
                localStorage.setItem("startTime", this.startTime);
                localStorage.setItem("xKeys", JSON.stringify(this.xKeys));
                localStorage.setItem("yValues", JSON.stringify(this.yValues));
                localStorage.setItem("xKeys2", JSON.stringify(this.xKeys2));
                localStorage.setItem("yValues2", JSON.stringify(this.yValues2));
            });

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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xKeys

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
                            data: this.yValues
                        }
                    ]
                };

                if (option1 && typeof option1 === "object") {
                    myChart.setOption(option1, true);
                }

                setInterval(function () {
                    let nowTime = getNowTime();
                    if (this.xKeys[this.xKeys.length-1] !== nowTime) {
                        this.xKeys.push(nowTime);
                        this.yValues.push(0);
                        for (let i = 0; i < this.xKeys.length-MAXRECORDS; i++) {
                            this.xKeys.shift();
                        }
                        for (let i = 0; i < this.yValues.length-MAXRECORDS; i++) {
                            this.yValues.shift();
                        }
                    }
                    myChart.setOption({
                        xAxis: {
                            data: this.xKeys
                        },
                        series: [{
                            name:'步数',
                            data: this.yValues
                        }]
                    });
                }.bind(this), 1000);

                //获取时间（分钟）
                function getNowTime() {
                    let date = new Date();
                    let Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                    let Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    // let Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                    // return Hours + ':' + Minutes + ':' + Seconds;
                    return Hours + ':' + Minutes;
                }


                let myChart2 = echarts.init(document.getElementById('myChart2'));
                // var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
                // var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
                var yMax = 100;
                var dataShadow = [];

                for (let i = 0; i < this.yValues2.length; i++) {
                    if (yMax < this.yValues2[i]) {
                        yMax = (this.yValues2[i]/100 + 1) * 100;
                    }
                }

                // for (var i = 0; i < data.length; i++) {
                for (let i = 0; i < this.yValues2.length; i++) {
                    dataShadow.push(yMax);
                }

                let option2 = {
                    // title: {
                    //     text: '特性示例：渐变色 阴影 点击缩放',
                    //     subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
                    // },
                    xAxis: {
                        // data: dataAxis,
                        data: this.xKeys2,
                        // axisLabel: {
                        //     inside: true,
                        //     textStyle: {
                        //         color: '#fff'
                        //     }
                        // },
                        // axisTick: {
                        //     show: false
                        // },
                        // axisLine: {
                        //     show: false
                        // },
                        // z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
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
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            // data: data
                            data: this.yValues2
                        }
                    ]
                };


                if (option2 && typeof option2 === "object") {
                    myChart2.setOption(option2, true);
                }

                // Enable data zoom when user click bar.
                // var zoomSize = 6;
                // myChart2.on('click', function (params) {
                //     console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                //     myChart2.dispatchAction({
                //         type: 'dataZoom',
                //         startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                //         endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                //     });
                // });



            },
            stepCounter: function () {
                if (this.startTime === '') {
                    this.startTime = this.getNowDate() + ' ' + getNowTime();
                }

                if (window.DeviceMotionEvent) {
                    window.addEventListener("devicemotion", motionHandler.bind(this), false);
                }

                //获取传感器上加速器的数据
                function motionHandler(event) {
                    var accGravity = event.accelerationIncludingGravity;
                    let nowTime = getNowTime();
                    if (this.xKeys[this.xKeys.length-1] !== nowTime) {
                        this.xKeys.push(nowTime);
                        this.yValues.push(0);
                        for (let i = 0; i < this.xKeys.length-MAXRECORDS; i++) {
                            this.xKeys.shift();
                        }
                        for (let i = 0; i < this.yValues.length-MAXRECORDS; i++) {
                            this.yValues.shift();
                        }
                    }
                    if (onSensorChanged(accGravity.x, accGravity.y, accGravity.z)) {
                        this.yValues[this.yValues.length-1]++;
                        this.stepNumbers++;
                        this.yValues2[this.yValues2.length-1] = this.stepNumbers;
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
                //获取日期
                // function getNowDate() {
                //     let date = new Date();
                //     let yyyy = date.getFullYear();
                //     let month = date.getMonth()+ 1;
                //     let mm = month < 10 ? '0' + month : month;
                //     let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                //     return yyyy + ' ' + mm + '/' + dd;
                // }

                //获取时间
                function getNowTime() {
                    let date = new Date();
                    let Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                    let Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    // let Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                    return Hours + ':' + Minutes;
                }
            },
            //获取日期
            getNowDate: function () {
                let date = new Date();
                let yyyy = date.getFullYear();
                let month = date.getMonth()+ 1;
                let mm = month < 10 ? '0' + month : month;
                let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                // return yyyy + ' ' + mm + '/' + dd;
                return mm + '/' + dd;
            }
        }
    }
</script>
