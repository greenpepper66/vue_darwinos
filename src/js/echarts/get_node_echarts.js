let echarts = require("echarts"); // 需要使用require方式引入库

let myChart;

// https://www.makeapie.com/editor.html?c=xz5megftae

let scaleData = [{
    'name': '芯片0',
    'value': 10
},
{
    'name': '芯片1',
    'value': 10
},
{
    'name': '芯片2',
    'value': 10
},
{
    'name': '芯片3',
    'value': 10
},
{
    'name': '芯片4',
    'value': 10
},
{
    'name': '芯片5',
    'value': 10
},
{
    'name': '芯片6',
    'value': 10
},
{
    'name': '芯片7',
    'value': 10
},
{
    'name': '芯片8',
    'value': 10
},
{
    'name': '芯片9',
    'value': 10
},
{
    'name': '芯片10',
    'value': 10
},
{
    'name': '芯片11',
    'value': 10
},

];
let rich = {
    white: {
        color: '#fff',
        align: 'center',
        fontWeight: 'bold',
        padding: [3, 0]
    }
};
let placeHolderStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
};
let data = [];
let color1 = [
    'rgb(255, 235, 205)',
    'rgb(240, 255, 240)',
    'rgb(205, 140, 149)',
    'rgb(190, 190, 190)',
    'rgb(84, 139, 84)',
    'rgb(135, 206, 235)',

    'rgb(230, 230, 250)',
    'rgb(238, 221, 130)',
    'rgb(255, 187, 255)',
    'rgb(205, 179, 139)',
    'rgb(224, 238, 238)',
    'rgb(130, 130, 130)',
];

for (var i = 0; i < scaleData.length; i++) {
    data.push({
        value: scaleData[i].value,
        name: scaleData[i].name,
        itemStyle: {
            normal: {
                borderWidth: 4,
                shadowBlur: 30,
                borderColor: color1[i],
                shadowColor: color1[i],
                color: color1[i],
                opacity: 0.75,
            }
        }
    }, {
        value: 2,
        name: '',
        itemStyle: placeHolderStyle
    });
}
let seriesObj = [{
    name: '',
    type: 'pie',
    clockWise: false,
    radius: ['50%', '90%'], // 设置饼图大小，只有百分比可以实现大小自适应
    hoverAnimation: false,
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: 'inner',
                fontWeight: 'bold',
                formatter: function (params) {
                    var percent = 0;
                    var total = 0;
                    for (var i = 0; i < scaleData.length; i++) {
                        total += scaleData[i].value;
                    }
                    percent = ((params.value / total) * 100).toFixed(0);
                    // if(params.name !== '') {
                    //     return params.name + '\n{white|' + '占比' + percent + '%}';
                    // }else {
                    //     return '';
                    // }
                },
                rich: rich
            },
            labelLine: {
                show: false,
            }
        }
    },
    data: data
}];
let option = {
    // backgroundColor: '#1E1E1E',
    tooltip: {
        show: false
    },
    legend: {
        show: false
    },
    toolbox: {
        show: false
    },
    series: seriesObj
}

function drawNodeEchart(router, nodeID) {
    myChart = echarts.init(document.getElementById("nodeChipsEchart"));

    myChart.setOption(option);
    console.log("draw ok");
    addChipRouter(router, nodeID);

    window.addEventListener("resize", function () {
        console.log("resize");
        myChart.resize();
    });

}

// 添加节点点击事件
function addChipRouter(router, nodeID) {
    myChart.on(
        'click',
        (param) => {
            console.log('param---->', param.data.name);  // 打印出param, 可以看到里边有很多参数可以使用
            //获取芯片点击的数组序号
            if (param.data.name != "" && param.data.name.search("芯片") != -1) {
                let chipID = param.data.name.split("芯片")[1];
                console.log("chipID:", chipID);
                // let routeData = router.resolve({
                //     path: "/chip",
                //     query: { 
                //         nodeID: nodeID,
                //         chipID: chipID,
                //      },
                // });
                // window.open(routeData.href, '_blank');
                router.push({
                    path: "/chip",
                    query: {
                        nodeID: nodeID,
                        chipID: chipID,
                    },
                });
            } else {
                console.log("没有点中芯片");
                //alert("点击了边" + param.value);
            }
        });

}

export { drawNodeEchart };