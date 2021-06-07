let echarts = require("echarts"); // 需要使用require方式引入库

let myChart;

let angle = 0; //角度，用来做简单的动画效果的
let timerId;  // 动画刷新

let value = 20; // 比例值
let chipID = 0;

function buildOption() {
    let option = {
        // backgroundColor: 'rgb(30,30,30)',
        title: {
            text: '{a|' + value + '}{c|%}',
            subtext: '芯片' + chipID,
            x: 'center',
            y: 'center',
            textStyle: {
                rich: {
                    a: {
                        fontSize: 56,
                        color: '#30AEC2'
                    },

                    c: {
                        fontSize: 56,
                        color: '#30AEC2',
                        // padding: [5,0]
                    }
                }
            },
            subtextStyle: {
                fontSize: 26,
                color: '#30AEC2',
                align: 'center',
            },
            itemGap: 2,
        },


        series: [
            // 紫色
            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                            startAngle: (0 + angle) * Math.PI / 180,
                            endAngle: (90 + angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#855fff",
                            fill: "transparent",
                            lineWidth: 6
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                name: "ring5", //紫点
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                    let point = getCirlPoint(x0, y0, r, (90 + angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 6
                        },
                        style: {
                            stroke: "#855fff",
                            fill: "#ab91ff"
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            // 蓝色
            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                            startAngle: (180 + angle) * Math.PI / 180,
                            endAngle: (270 + angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#ac776f",
                            fill: "transparent",
                            lineWidth: 5
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            {
                name: "ring5", // 蓝点
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                    let point = getCirlPoint(x0, y0, r, (180 + angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 6
                        },
                        style: {
                            stroke: "#ac776f",
                            fill: "#ee9580"
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            // 绿色
            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                            startAngle: (270 + -angle) * Math.PI / 180,
                            endAngle: (40 + -angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#07c9e1",
                            fill: "transparent",
                            lineWidth: 7
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            // 橘色
            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                            startAngle: (90 + -angle) * Math.PI / 180,
                            endAngle: (220 + -angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#FF8E89",
                            fill: "transparent",
                            lineWidth: 6
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            { //橘点
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                    let point = getCirlPoint(x0, y0, r, (90 + -angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 6
                        },
                        style: {
                            stroke: "#FF8E89", //粉
                            fill: "#FF8E89"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                name: "ring5", //绿点
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                    let point = getCirlPoint(x0, y0, r, (270 + -angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 6
                        },
                        style: {
                            stroke: "#0CD3DB", //绿
                            fill: "#0CD3DB"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, 
            // {
            //     name: '芯片使用比例',
            //     type: 'pie',
            //     radius: ['52%', '40%'],
            //     silent: true,
            //     clockwise: true,
            //     startAngle: 90,
            //     z: 0,
            //     zlevel: 0,
            //     label: {
            //         normal: {
            //             position: "center",

            //         }
            //     },
            //     data: [{
            //         value: value,
            //         name: "",
            //         itemStyle: {
            //             normal: {
            //                 color: { // 完成的圆环的颜色
            //                     colorStops: [{
            //                         offset: 0,
            //                         color: '#A098FC' // 0% 处的颜色
            //                     },
            //                     {
            //                         offset: 0.3,
            //                         color: '#4386FA' // 0% 处的颜色
            //                     },
            //                     {
            //                         offset: 0.6,
            //                         color: '#4FADFD' // 0% 处的颜色
            //                     },
            //                     {
            //                         offset: 0.8,
            //                         color: '#0CD3DB' // 100% 处的颜色
            //                     }, {
            //                         offset: 1,
            //                         color: '#7ab5ff' // 100% 处的颜色
            //                     }
            //                     ]
            //                 },
            //             }
            //         }
            //     },
            //     {
            //         value: 100 - value,
            //         name: "",
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: "#7ab5ff"  // 第二圈宽圈颜色
            //             }
            //         }
            //     }
            //     ]
            // },
            // {
            //     name: '芯片使用率',
            //     type: 'pie',
            //     radius: ['32%', '35%'],
            //     silent: true,
            //     clockwise: true,
            //     startAngle: 270,
            //     z: 0,
            //     zlevel: 0,
            //     label: {
            //         normal: {
            //             position: "center",

            //         }
            //     },
            //     data: [{
            //         value: value,
            //         name: "",
            //         itemStyle: {
            //             normal: {
            //                 color: { // 完成的圆环的颜色
            //                     colorStops: [{
            //                         offset: 0,
            //                         color: '#7ab5ff' // 0% 处的颜色
            //                     }, {
            //                         offset: 1,
            //                         color: '#7ab5ff' // 100% 处的颜色
            //                     }]
            //                 },
            //             }
            //         }
            //     },
            //     {
            //         value: 100 - value,
            //         name: "",
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: "#7ab5ff"  //最中间细圈颜色
            //             }
            //         }
            //     }
            //     ]
            // },

        ]
    };
    return option;
}

let option;

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirlPoint(x0, y0, r, angle) {
    let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
    let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
    return {
        x: x1,
        y: y1
    }
}

function draw() {
    angle = angle + 3
    myChart.setOption(option, true)
    //window.requestAnimationFrame(draw);
}


// https://www.makeapie.com/editor.html?c=xBnZdDvvZz

function drawChipEchart(val, id) {
    myChart = echarts.init(document.getElementById("chipPie"));

    value = val;
    chipID = id;  //
    option = buildOption();
    myChart.setOption(option);
    console.log("draw ok");

    window.addEventListener("resize", function () {
        myChart.resize();
    });

    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(function () {
        //用setInterval做动画感觉有问题
        draw()
    }, 100);
}

export { drawChipEchart };