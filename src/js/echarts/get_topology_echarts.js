//import echarts from 'echarts'  // 不可以用这个
let echarts = require("echarts"); // 需要使用require方式引入库

// https://www.makeapie.com/editor.html?c=xO6bpzhc_c

var myChart;


var colors = [
    {
        c1: "#00c7ef",  // 根节点的颜色-蓝绿色
        c2: "#b0c0f0",  // 浅紫色
    },
    {
        c1: "#FF8E14",  // 橙色
        c2: "#a0a0a0",  // 未运行节点默认颜色 - 浅灰色
    },
    {
        c1: "#AF5AFF",
        c2: "#e0b0f0",  // slave节点运行颜色 - 粉色
    },
    {
        c1: "#AF5AFF",
        c2: "#A0A020", // 运行中shadow节点颜色 - 橘色
    },
];

var toppoElementID = "topologyEchart";

var listRunNode = []; // 运行中节点个数
var masterNodeID = -1; // master节点ID
var shadowNodeID = -1; // shadow节点ID

var listData = [];  // 数组 只有一个元素，根节点
var list = [];
var links = [];

var categories = [{
    name: '根节点',
    itemStyle: {
        color: colors[0].c1
    }
},
{
    name: '不在线节点',
    itemStyle: {
        color: colors[1].c2
    }
},
{
    name: 'slave节点',
    itemStyle: {
        color: colors[2].c2
    }
},
{
    name: 'shadow节点',
    itemStyle: {
        color: colors[3].c2
    }
}];

var option = {
    // // backgroundColor: "rgb(30, 30, 30)",
    toolbox: {
        show: true,
        left: "right",
        right: 20,
        top: "bottom",
        bottom: 20,
    },

    selectedMode: "false",
    bottom: 20,
    left: 0,
    right: 0,
    top: 0,
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
        {
            name: "拓扑图",
            type: "graph",
            hoverAnimation: false,
            //'none'无部局，需要自己添加坐标,'circular'环形布局,'force'引导布局，出来的效果随机
            layout: "force",
            force: {
                repulsion: 200,
                edgeLength: 160,
            },
            nodeScaleRatio: 0.6,
            draggable: true,
            roam: true,
            symbol: "circle",
            data: list,
            links: links,
            categories: categories,
            focusNodeAdjacency: true,
            scaleLimit: {
                //所属组件的z分层，z值小的图形会被z值大的图形覆盖
                min: 0.5, //最小的缩放值
                max: 9, //最大的缩放值
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [3, 6],
            label: {
                normal: {
                    show: true,
                    position: "right",
                    color: "#fff",
                    distance: 5,
                    fontSize: 10,
                },
            },
            lineStyle: {
                normal: {
                    width: 1.5,
                    curveness: 0,
                    type: "solid",
                },
            },
        },
    ],
};



/**
 * 获取所有节点数据，data结构体中的value表示节点id
 * @param {*} masterID  master节点的ID，作为根节点
 * @param {*} allNodeNum   所有节点数量，不包含master节点
 */
function getData(masterID, allNodeNum) {
    let data = {
        name: "根节点",
        value: masterID,
        list: [],  // 根节点下的子节点
    };
    for (let i = 0; i <= allNodeNum; i++) {
        if (i == masterID) {
            continue;
        }
        let obj = {
            name: "节点" + i,
            value: i, // 节点ID
            list: [],
        };

        data.list.push(obj);
    }
    var arr = [];
    arr.push(data);
    return arr;
}


// 计算links
function handle3(arr, index, color) {
    arr.forEach((item) => {
        if (item.list) {
            item.list.forEach((item2, eq) => {
                if (index === 0) {
                    // 线条颜色
                    if (listRunNode.includes(item2.value)) {
                        if (item2.value == shadowNodeID) {
                            color = colors[3]; // shadow线条颜色
                            item2.category = 2;
                        } else {
                            color = colors[2];
                            item2.category = 1;
                        }
                    } else {
                        color = colors[1];
                        item2.category = 3;
                    }
                }
                let lineStyle = null;
                switch (index) {
                    case 0:
                        if (item2.list.length > 0) {
                            lineStyle = {
                                normal: {
                                    color: "target",
                                },
                            };
                        } else {
                            lineStyle = {
                                normal: {
                                    color: color.c2,
                                },
                            };
                        }
                        break;
                    default:
                        lineStyle = {
                            normal: {
                                color: "source",
                            },
                        };
                        break;
                }
                let obj = {
                    source: item.name,
                    target: item2.name,
                    lineStyle,
                };
                links.push(obj);
                if (item2.list && item.list.length > 0) {
                    handle3(item.list, index + 1);
                }
            });
        }
    });
}

//计算list
function handle2(arr, idx, color, category) {
    // idx=0 -- 根节点, idx=1 -- 子节点
    arr.forEach((item, index) => {
        if (item.name === null) {
            return false;
        }
        // 设置节点大小
        let symbolSize = 10;
        switch (idx) {
            case 0:
                symbolSize = 70;
                break;
            case 1:
                symbolSize = 50;
                break;
            default:
                symbolSize = 10;
                break;
        }

        // 每个节点所对应的文本标签的样式。
        let label = null;
        switch (idx) {
            case 0:
            case 1:
                label = {
                    position: "inside",
                    rotate: 0,
                };
                break;
            default:
                break;
        }

        //计算出颜色,从第二级开始
        if (idx === 0) {
            if (masterNodeID == -1) {  // master节点不在线
                color = colors[1];
            } else {
                color = colors[0];
            }
        }

        if (idx == 1) {
            // 颜色
            if (listRunNode.includes(item.value)) {  // item.value 表示节点id
                if (item.value == shadowNodeID) {
                    color = colors[3]; // 运行中shadow节点颜色
                } else {
                    color = colors[2];  // 运行中slave节点颜色
                }
            } else {
                //color = colors.find((itemm, eq) => eq == index % 3);
                color = colors[1];  // 没有运行的节点颜色
            }

        }
        // 设置线条颜色
        let lineStyle = {
            color: color.c2,
        };
        // 设置节点样式
        let bgcolor = null;
        if (idx === 0) {
            bgcolor = {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                    {
                        offset: 0,
                        color: color.c1, // 0% 处的颜色
                    },
                    {
                        offset: 0.8,
                        color: color.c1, // 80% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)", // 100% 处的颜色 -- 灰黑色
                    },
                ],
                global: false,
            };
        } else {
            bgcolor = {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                    {
                        offset: 0,
                        color: color.c1, // 0% 处的颜色
                    },
                    {
                        offset: 0.4,
                        color: color.c1, // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: color.c2, // 100% 处的颜色
                    },
                ],
                global: false,
            };
        }
        let itemStyle = null;
        if (item.list && item.list.length !== 0) {
            //非子节点 根节点
            if (masterNodeID == -1) {
                itemStyle = {
                    color: color.c2,
                    borderColor: color.c2,
                };
            } else {
                itemStyle = {
                    color: bgcolor,
                    borderColor: color.c2,
                };
            }

        } else {
            //子节点
            item.isEnd = true;
            if (item.isdisease == "true") {
                itemStyle = {
                    color: bgcolor,
                    borderColor: color.c2,
                };
            } else {
                itemStyle = {   // 设置子节点的颜色，默认灰色#a0a0a0
                    color: color.c2,
                    borderColor: color.c2,
                };
            }
        }
        //可以改变来实现节点发光效果，但体验不好
        itemStyle = Object.assign(itemStyle, {
            shadowColor: "rgba(255, 255, 255, 0.5)",
            shadowBlur: 10,
        });

        if (idx == 1) {
            category = item.name;
        }
        let obj = {
            name: item.name,
            symbolSize: symbolSize,
            category: category,
            label,
            color: bgcolor,
            itemStyle,
            lineStyle,
        };
        obj = Object.assign(item, obj);
        if (idx === 0) {
            obj = Object.assign(obj, {
                root: true,
            });
        }
        if (item.list && item.list.length === 0) {
            obj = Object.assign(obj, {
                isEnd: true,
            });
        }
        list.push(obj);
        if (item.list && item.list.length > 0) {
            handle2(item.list, idx + 1, color, category);
        }
    });
}

/**
 * 显示首页时画图，系统异常（master节点不在线也要显示的）
 * @param {*} masterID  master节点ID
 * @param {*} shadowID  shadow节点的ID
 * @param {*} allNodeNum  所有节点个数（除了master节点）
 * @param {*} runNodeIDList  运行中节点的id（只包含slave节点）
 * @param {*} router  路由，用于单击节点执行跳转使用
 */
function drawTopologyEchart(masterID, shadowID, allNodeNum, runNodeIDList, router) {
    // 重新绘图前先清空
    let dom = document.getElementById(toppoElementID);
    let existInstance = echarts.getInstanceByDom(dom);
    if (existInstance) {
        if (true) {
            echarts.dispose(existInstance);
        }
    }

    // 获取数据
    myChart = echarts.init(document.getElementById(toppoElementID));
    masterNodeID = masterID;
    shadowNodeID = shadowID;
    listRunNode = runNodeIDList;
    listData = getData(masterID, allNodeNum);

    // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值：“name: 节点x”格式
    // categories = listData[0].list.map((item) => {
    //     return {
    //         name: item.name,
    //     };
    // });
    console.log("&&&", categories);

    // 绘图
    handle2(JSON.parse(JSON.stringify(listData)), 0);
    handle3(JSON.parse(JSON.stringify(listData)), 0);
    myChart.setOption(option);

    // 添加节点点击事件
    addNodeRouter(router)

    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

/**
 * 系统正常运行后，获取节点信息后，刷新拓扑图使用
 * @param {*} masterID  master节点ID
 * @param {*} shadowID  shadow节点的ID
 * @param {*} allNodeNum  所有节点个数（除了master节点）
 * @param {*} runNodeIDList  运行中节点的id（只包含slave节点）
 * @param {*} router  路由，用于单击节点执行跳转使用
 */
function refreshEchart(masterID, shadowID, allNodeNum, runNodeIDList, router) {
    //刷新数据
    masterNodeID = masterID;
    shadowNodeID = shadowID;
    listRunNode = runNodeIDList;
    list = [];
    links = [];
    var option = myChart.getOption();
    listData = getData(masterID, allNodeNum);

    handle2(JSON.parse(JSON.stringify(listData)), 0);
    handle3(JSON.parse(JSON.stringify(listData)), 0);

    option.series[0].data = list;
    option.series[0].links = links;
    myChart.setOption(option);
    addNodeRouter(router)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

/**
 *  添加节点点击事件
 * @param {*} router  页面传递过来的全局的路由器对象
 */
function addNodeRouter(router) {
    myChart.on(
        'click',
        (param) => {
            // console.log('param---->', param);  // 打印出param, 可以看到里边有很多参数可以使用
            //获取被点击节点的id
            var arrayIndex = param.data.value;
            if ((param.dataType == 'node' && arrayIndex != -1) && (listRunNode.includes(arrayIndex) || masterNodeID == arrayIndex)) {
                // let routeData = router.resolve({
                //     path: "/node",
                //     query: { nodeID: arrayIndex },
                // });
                // window.open(routeData.href, '_blank'); // 浏览器新开一个窗口，但是集成到vscode中不能跳转
                router.push({
                    path: "/node",
                    query: { nodeID: arrayIndex },
                });
            } else {
                console.log("节点不在线");
                //alert("点击了边" + param.value);
            }
        });
}

export { drawTopologyEchart, refreshEchart };