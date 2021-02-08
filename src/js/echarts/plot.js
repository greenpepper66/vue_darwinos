// import echarts from "echarts";
// import "echarts-gl";
import { walk_data } from "../utils/utils";

let echarts = require("echarts");

function plt_heatmap(
  elementId,
  row_num,
  col_num,
  data,
  color_map = [
    {
      value: 0,
      color: "rgb(0, 255, 0)",
    },
    {
      value: 1,
      color: "rgb(255, 255, 0)",
    },
    {
      value: -1,
      color: "rgb(255, 0, 0)",
    },
  ]
) {
  let dom = document.getElementById(elementId);
  let myChart = echarts.init(dom);
  // let app = {};
  let x_label = [];
  for (let i = 0; i < col_num; i++) {
    x_label.push(i);
  }
  let y_label = [];
  for (let i = 0; i < row_num; i++) {
    y_label.push(i);
  }

  let axisLabel = {
    interval: 9,
  };

  let option = {
    // 提示框组件
    tooltip: {
      position: "top",
      formatter: (p) => {
        let data = p.data;
        if (data && data.length != 3) {
          return "数据格式错误";
        }
        return "(" + data[0] + "," + data[1] + "): " + data[2].toFixed(4);
      },
    },
    animation: false,
    grid: {
      height: "70%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: x_label,
      axisLabel: axisLabel,
    },
    yAxis: {
      type: "category",
      data: y_label,
      axisLabel: axisLabel,
    },
    visualMap: {
      type: "piecewise",
      show: false,
      pieces: color_map,
    },
    series: [
      {
        // name: "Punch Card",
        type: "heatmap",
        data: data,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          // set boundary line of every entry
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderType: "solid",
        },
      },
    ],
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
  return myChart;
}

/*auto generate data*/
function pltHeatmap(elementId, row_num, col_num) {
  let dom = document.getElementById(elementId);
  let myChart = echarts.init(dom);
  // let app = {};
  let x_label = [];
  for (let i = 0; i < col_num; i++) {
    x_label.push(i);
  }
  let y_label = [];
  for (let i = 0; i < row_num; i++) {
    y_label.push(i);
  }
  let data = [];

  for (let i = 0; i < row_num; i++) {
    for (let j = 0; j < col_num; j++) {
      data.push([i, j, Math.floor(Math.random() * 2)]);
    }
  }

  let axisLabel = {
    interval: 9,
  };

  let option = {
    // 提示框组件
    tooltip: {
      position: "top",
      formatter: (p) => {
        let data = p.data;
        if (data && data.length != 3) {
          return "数据格式错误";
        }
        return "(" + data[0] + "," + data[1] + "): " + data[2].toFixed(4);
      },
    },
    animation: false,
    grid: {
      height: "70%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: x_label,
      axisLabel: axisLabel,
    },
    yAxis: {
      type: "category",
      data: y_label,
      axisLabel: axisLabel,
    },
    visualMap: {
      type: "piecewise",
      show: false,
      pieces: [
        {
          value: 0,
          color: "rgb(0, 255, 0)",
        },
        {
          value: 1,
          color: "rgb(255, 0, 0)",
        },
      ],
      borderColor: "#ccc",
      borderWidth: 2,
    },
    series: [
      {
        // name: "Punch Card",
        type: "heatmap",
        data: data,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          // set boundary line of every entry
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderType: "solid",
        },
      },
    ],
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
  return myChart;
}

function pltEffectScatter(
  elementId,
  row_num,
  col_num,
  data,
  symbolSize = 10,
  color_map = {
    0: "rgba(0,255,0, 0.5)",
    1: "rgba(255,255,0, 0.5)",
    "-1": "rgba(255,0,0, 0.5)",
    "-2": "rgba(200,200,200, 0.5)",
  }
  /* color_map: 0(空闲)，1（工作），-1（输出），-2（离线）*/
) {

  let dom = document.getElementById(elementId);
  let existInstance = echarts.getInstanceByDom(dom);
  if (existInstance) {
    if (true) {
      echarts.dispose(existInstance);
    }
  }

  let myChart = echarts.init(dom);

  console.log("begin draw")

  let _data = [];
  for (let i = 0; i < data.length; i++) {
    let x = data[i][0];
    let y = data[i][1];
    let color_str = color_map[data[i][2]];
    _data.push({
      value: [x, y],
      itemStyle: { color: color_str },
    });
  }
  // 指定图表的配置项和数据
  let option = {
    // backgroundColor: "white",
    grid: {
      show: true,
    },
    xAxis: {
      type: "category",
      min: 0,
      max: col_num,
      splitLine: {
        show: true,
        interval: 23,
        lineStyle: {
          color: "rgba(0,0,0,0.1)",
          width: 2,
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      min: 0,
      max: row_num,
      splitLine: {
        show: true,
        interval: 23,
        lineStyle: {
          color: "rgba(0,0,0,0.1)",
          width: 2,
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: "scatter",
        symbolSize: symbolSize,
        data: _data,
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  return myChart;
}

// plot line chart, all data updated
function plt_static_line(elementId, data, xlim = [-200, 200]) {
  let dom = document.getElementById(elementId);
  let myChart = echarts.init(dom);
  let option = null;

  option = {
    title: {
      text: "动态数据 + 时间坐标轴",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        params = params[0];
        let date = new Date(params.name);
        return (
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " : " +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: "value",
      min: xlim[0],
      max: xlim[1],
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: {
        interval: 0,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "模拟数据",
        type: "line",
        showSymbol: false,
        hoverAnimation: false,
        animation: false,
        // smooth: true,
        data: data,
      },
    ],
  };

  myChart.setOption(option);
  return myChart;
}

//内部设置数据生成动态折线图
function buildLineChart(elementId) {
  let dom = document.getElementById(elementId);
  let myChart = echarts.init(dom);
  let option = null;

  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      Math.round(value),
    ];
    // return {
    //   // name: now.toString() + "hello",
    //   value: [
    //     [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
    //     Math.round(value),
    //   ],
    // };
  }

  let data = [];
  let now = +new Date(1997, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  option = {
    title: {
      text: "动态数据 + 时间坐标轴",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        params = params[0];
        let date = new Date(params.name);
        return (
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " : " +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "模拟数据",
        type: "line",
        showSymbol: false,
        hoverAnimation: false,
        data: data,
      },
    ],
  };

  setInterval(function () {
    for (let i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }

    myChart.setOption(option);
  }, 1000);

  return myChart;
}

//内部设置数据生成动态折线图
function buildLineChart2(elementId) {
  let dom = document.getElementById(elementId);
  let myChart = echarts.init(dom);
  let option = null;

  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      Math.round(value),
    ];
    // return {
    //   // name: now.toString() + "hello",
    //   value: [
    //     [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
    //     Math.round(value),
    //   ],
    // };
  }

  let data = [];
  let now = +new Date(1997, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  option = {
    animation: false,
    grid: {
      // 调整表格边距 和 大小
      height: "70%",
      top: "10%",
      left: "20%",
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
      },
      formatter: (p) => {
        try {
          return p.dataIndex + ": " + p.data[1].toFixed(4);
        } catch (error) {
          console.log(error);
        }
      },
    },
    xAxis: {
      // type: "category",
      type: "value",
      name: "x",
      minorTick: {
        show: true,
      },
      axisLabel: {
        interval: 9,
        showMaxLabel: true,
      },
      data: [],
    },
    yAxis: {
      name: "y",
      minorTick: {
        show: true,
      },
    },
    series: [
      {
        type: "line",
        animation: false,
        clip: true,
        symbol: "none",
        // smooth: true,
        data: data,
      },
    ],
  };

  setInterval(function () {
    for (let i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }

    myChart.setOption(option);
  }, 1000);

  return myChart;
}

/**
 * 折线图绘图函数
 * @param {*} elementId
 * @param {*} data
 * @param {*} xlim
 * @param {*} ylim
 */
function pltLineChart(elementId, data, xlim = [0, 60], ylim = [null, null]) {

  let dom = document.getElementById(elementId);
  let existInstance = echarts.getInstanceByDom(dom);
  if (existInstance) {
    if (true) {
      echarts.dispose(existInstance);
    }
  }

  let myChart = echarts.init(dom);

  let splitLine = {
    show: true,
    lineStyle: {
      color: "#999",
    },
  };

  let minorSplitLine = {
    show: true,
    lineStyle: {
      color: "#ddd",
    },
  };
  // if (typeof data == "undefined" || data.length == 0) {
  //   data.push([0, 0, 0]);
  // }
  let option = {
    backgroundColor: "white",
    animation: false,
    grid: {
      // 调整表格边距 和 大小
      height: "70%",
      top: "10%",
      left: "20%",
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
      },
      formatter: (p) => {
        try {
          return p.dataIndex + ": " + p.data[1].toFixed(4);
        } catch (error) {
          console.log(error);
        }
      },
    },
    xAxis: {
      // type: "category",
      type: "value",
      name: "x",
      minorTick: {
        show: true,
      },
      min: xlim[0],
      max: xlim[1],
      // splitNumber: 12,
      splitLine: splitLine,
      minorSplitLine: minorSplitLine,
      axisLabel: {
        interval: 9,
        showMaxLabel: true,
      },
      data: new Array(xlim[1])
        .toString()
        .split(",")
        .map((item, index) => index),
    },
    yAxis: {
      name: "y",
      min: ylim[0],
      max: ylim[1],
      minorTick: {
        show: true,
      },
      splitLine: splitLine,
      minorSplitLine: minorSplitLine,
    },
    series: [
      {
        type: "line",
        animation: false,
        clip: true,
        symbol: "none",
        // smooth: true,
        data: data,
      },
    ],
  };
  myChart.setOption(option);
  return myChart;
}

/**
 * 折线图绘图函数
 * @param {*} elementId
 * @param {*} data
 * @param {*} xlim
 * @param {*} ylim
 */
function pltScatterChart(elementId, data, xlim = [0, 60], ylim = [null, null]) {
  let dom = document.getElementById(elementId);
  let existInstance = echarts.getInstanceByDom(dom);
  if (existInstance) {
    if (true) {
      echarts.dispose(existInstance);
    }
  }

  let myChart = echarts.init(dom);

  let splitLine = {
    show: true,
    lineStyle: {
      color: "#999",
    },
  };

  let minorSplitLine = {
    show: true,
    lineStyle: {
      color: "#ddd",
    },
  };
  // if (typeof data == "undefined" || data.length == 0) {
  //   data.push([0, 0, 0]);
  // }
  let option = {
    backgroundColor: "white",
    animation: false,
    grid: {
      // 调整表格边距 和 大小
      height: "70%",
      top: "10%",
      left: "20%",
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
      },
      formatter: (p) => {
        try {
          return p.dataIndex + ": " + p.data[1].toFixed(4);
        } catch (error) {
          console.log(error);
        }
      },
    },
    xAxis: {
      // type: "category",
      type: "value",
      name: "x",
      minorTick: {
        show: true,
      },
      min: xlim[0],
      max: xlim[1],
      // splitNumber: 12,
      splitLine: splitLine,
      minorSplitLine: minorSplitLine,
      axisLabel: {
        interval: 9,
        showMaxLabel: true,
      },
      data: new Array(xlim[1])
        .toString()
        .split(",")
        .map((item, index) => index),
    },
    yAxis: {
      name: "y",
      min: ylim[0],
      max: ylim[1],
      minorTick: {
        show: true,
      },
      splitLine: splitLine,
      minorSplitLine: minorSplitLine,
    },
    series: [
      {
        name: "scatter",
        type: "scatter",
        emphasis: {
          label: {
            show: true,
            position: "left",
            color: "blue",
            fontSize: 40,
          },
        },
        symbolSize: 5,
        data: data,
      },
    ],
  };
  myChart.setOption(option);
  return myChart;
}

function pltWalkLine(elementId, data_list, new_data, y_lim, max_duration = 60) {
  walk_data(data_list, new_data);
  let x_left = data_list[0][0];
  let x_right = data_list[data_list.length - 1][0];
  x_right = x_right > max_duration ? x_right : max_duration;
  pltLineChart(elementId, data_list, [x_left, x_right], y_lim);
}

function pltArrayLine(elementId, data_array, y_lim = [0, 100]) {
  let _data = [];
  for (let i = 0; i < data_array.length; i++) {
    _data.push([i, data_array[i]]);
  }
  pltLineChart(elementId, _data, [0, data_array.length], y_lim);
}

function pltArrayScatter(elementId, data_array, y_lim) {
  let _data = [];
  for (let i = 0; i < data_array.length; i++) {
    _data.push([i, data_array[i]]);
  }
  pltScatterChart(elementId, _data, [0, data_array.length], y_lim);
}

function scatter3d(elementId, data, cmap) {
  let dom = document.getElementById(elementId);
  let myChart = echarts.init(dom);
  let option = {
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
      },
      formatter: (p) => {
        try {
          return p.data[2];
        } catch (error) {
          console.log(error);
        }
      },
    },
    visualMap: {
      type: "piecewise",
      inverse: true,
      pieces: cmap,
      borderColor: "#ccc",
      borderWidth: 2,
      show: false,
    },

    xAxis3D: {
      type: "value",

      axisLabel: {
        color: "rgba(0,0,0,1)",
        show: false,
      },
      nameTextStyle: {
        color: "rgba(0,0,0,0)",
      },
    },
    yAxis3D: {
      type: "value",
      axisLabel: {
        color: "rgba(0,0,0,1)",
        show: false,
      },
      nameTextStyle: {
        color: "rgba(0,0,0,0)",
      },
    },
    zAxis3D: {
      type: "value",
      axisLabel: {
        color: "rgba(0,0,0,0.5)",
      },
      nameTextStyle: {
        color: "rgba(0,0,0,0)",
      },
    },
    grid3D: {
      // show: false,
      axisLine: {
        lineStyle: { color: "rgba(0,0,0,0.01)" },
      },
      axisPointer: {
        lineStyle: { color: "rgba(0,0,0,0.01)" },
      },
      borderColor: "rgba(0,0,0,0.01)",
      viewControl: {
        autoRotate: true,
      },
    },
    series: [
      {
        type: "scatter3D",
        data: data,
      },
    ],
  };

  myChart.setOption(option, true);

  return myChart;
}

// draw line or point in a canvas
class Draw {
  constructor(
    canvas_id,
    pixel_width = 180,
    pixel_height = 180,
    show_width = 500,
    show_height = 500,
    background_color = "rgb(0,0,0)"
  ) {
    this.element_obj = document.getElementById(canvas_id);
    this.cobj = this.element_obj.getContext("2d");
    this.element_obj.width = show_width;
    this.element_obj.height = show_height;
    this.element_obj.style.backgroundColor = background_color;
    this.scale_width = show_width / pixel_width;
    this.scale_height = show_height / pixel_height;
    this.cobj.scale(this.scale_width, this.scale_height);
  }
  line(ox, oy, mx, my, color = "rgb(255,0,0)", width = 1) {
    this.cobj.strokeStyle = color;
    this.cobj.fillStyle = color;
    this.cobj.lineWidth = width;
    this.cobj.beginPath();
    this.cobj.moveTo(ox, oy);
    this.cobj.lineTo(mx, my);
    this.cobj.stroke();
  }
  point(x, y, color = "rgb(255,0,0)", width = 1) {
    this.cobj.strokeStyle = color;
    this.cobj.fillStyle = color;
    this.cobj.lineWidth = width;
    this.cobj.beginPath();
    this.cobj.moveTo(x, y);
    this.cobj.lineTo(x + 1, y + 1);
    this.cobj.stroke();
  }
}

export {
  pltLineChart,
  plt_heatmap,
  Draw,
  buildLineChart,
  pltHeatmap,
  buildLineChart2,
  pltWalkLine,
  pltArrayLine,
  pltScatterChart,
  pltArrayScatter,
  pltEffectScatter,
  scatter3d,
};
