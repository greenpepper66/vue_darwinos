<template>
  <div class="task">
    <div class="clearfix thewrap top">
      <span>任务基本信息</span>
      <span id="nodeIDValue" style="display: none">
        {{ $route.query.nodeID }}
      </span>
      <span id="modelIDValue" style="display: none">
        {{ $route.query.modelID }}
      </span>
      <hr />
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th>模型名称</th>
              <th>模型ID</th>
              <th>板子ID</th>
              <th>板子IP</th>
              <th>模型大小</th>
              <th>运行时间</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="taskBaseInfo.length == 0">
              <tr>
                <template v-for="i in 6">
                  <td width="10%" :key="i">-</td>
                </template>
              </tr>
            </template>
            <tr>
              <td width="10%">{{ taskBaseInfo.name }}</td>
              <td width="10%">{{ taskBaseInfo.id }}</td>
              <td width="10%">{{ taskBaseInfo.nodeID }}</td>
              <td width="10%">{{ nodeBaseInfo.ip }}</td>
              <td width="10%">{{ taskBaseInfo.size }}</td>
              <td width="10%">{{ taskBaseInfo.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix thewrap middle1">
      <p>任务运行图示</p>
      <div class="quarter-div echart">
        神经元状态图 - 节点IP:{{ nodeBaseInfo.ip }} , 芯片ID:
        <input type="text" v-model="chipID" style="width: 6%" />
        <hr />
        <div id="taskChipEchart"></div>
      </div>

      <div class="quarter-div echart">
        <span>识别时间</span>
        <hr />
        <div id="taskTimeEchart"></div>
      </div>
    </div>

    <div class="clearfix thewrap middle2">
      <div class="quarter-div echart">
        膜电位曲线图 - 神经元坐标：(
          <span id="neur_x1">{{ selected_neur_x }}</span>,
          <span id="neur_y1">{{ selected_neur_y }}</span>
          )， 编号: <input type="text" v-model="neurIndex" style="width: 6%" />
        <hr />
        <div id="MembraneVoltageEchart"></div>
      </div>

      <div class="quarter-div echart">
        膜电位趋势图 - 神经元坐标：(
          <span id="neur_x2">{{ selected_neur_x }}</span>,
          <span id="neur_y2">{{ selected_neur_y }}</span>
          )， 编号:{{ neurIndex }}
        <hr />
        <div id="MembraneVoltageLineEchart"></div>
      </div>
    </div>

    <!-- <div class="clearfix thewrap bottom">
      <span>任务统计信息</span>
      <hr />
    </div> -->
  </div>
</template>

<script>
import { vue_taskDetail } from "../js/pages/taskDetail";
import $ from "jquery";

$(function () {
  var bodyH = $(window).height();
  console.log(bodyH);
  $(".middle").height(bodyH - 600);
});

export default vue_taskDetail;
</script>


<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.thewrap {
  margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: auto;
}
.quarter-div {
  width: 50%;
  box-sizing: border-box;
  float: left;
  overflow: auto;
}
.top {
  height: 200px;
  overflow: auto;
}
.middle1 {
  min-height: 350px;
}
.middle2 {
  min-height: 350px;
}
.bottom {
  height: 100px;
}
.table {
  margin: 0 auto;
}
.taskInfo-box {
  height: 60%;
  width: 100%;
  float: left;
  margin: 0 auto;
  display: inline;
  margin-top: 20px;
}
.echart {
  min-height: 320px;
}
.totalTasks {
  height: 30px;
  margin-left: 30px;
  text-align: left;
}
#taskChipEchart,
#taskTimeEchart,
#MembraneVoltageEchart,
#MembraneVoltageLineEchart {
  height: 300px;
  margin: 0 auto;
  width: 300px;
}
hr {
  width: 90%;
}
</style>
