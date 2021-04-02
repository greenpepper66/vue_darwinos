<template>
  <div class="taskDetail_page">
    <div class="clearfix thewrap taskDetail_top">
      <div class="row">
        <div class="taskDetail_info_title">任务基本信息</div>
      </div>

      <span id="nodeIDValue" style="display: none">
        {{ $route.query.nodeID }}
      </span>
      <span id="modelIDValue" style="display: none">
        {{ $route.query.modelID }}
      </span>

      <div class="row">
        <table class="taskDetail_table">
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
                  <td :key="i">-</td>
                </template>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td>{{ taskBaseInfo.name }}</td>
                <td>{{ taskBaseInfo.id }}</td>
                <td>{{ taskBaseInfo.nodeID }}</td>
                <td>{{ nodeBaseInfo.ip }}</td>
                <td>{{ taskBaseInfo.size }}</td>
                <td>{{ taskBaseInfo.time }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix thewrap taskDetail_middle">
      <div class="row">
        <div class="taskDetail_draw_title">任务运行图示</div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="taskDetail_echart_title">
            神经元状态图 - 节点IP:{{ nodeBaseInfo.ip }} , 芯片ID:
            <input
              type="text"
              v-model="chipID"
              class="taskDetail_echart_input"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="taskDetail_echart_title">识别时间</div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 taskDetail_echart_box">
          <div id="taskChipEchart" class="taskDetail_chipEchart"></div>

          <div class="chip_neure_logoBox" id="taskDetail_chip_neure_logoBox" style="display: none;">
            <div class="chip_coommonNeureLogo freeNeureLogo"></div>
            <span class="chip_logoDesc"> 空闲状态</span>
            <div class="chip_coommonNeureLogo runNeureLogo"></div>
            <span class="chip_logoDesc"> 运行状态</span>
            <div class="chip_coommonNeureLogo outputNeureLogo"></div>
            <span class="chip_logoDesc"> 输出神经元 </span>
          </div>
        </div>

        <div class="col-md-6 taskDetail_echart_box">
          <div id="taskTimeEchart"></div>
        </div>
      </div>
    </div>

    <div class="clearfix thewrap taskDetail_middle">
      <div class="row">
        <div class="col-md-6">
          <div class="taskDetail_echart_title">
            膜电位曲线图 - 神经元坐标：(
            <span id="neur_x1">{{ selected_neur_x }}</span
            >, <span id="neur_y1">{{ selected_neur_y }}</span> )， 编号:
            <input
              type="text"
              v-model="neurIndex"
              class="taskDetail_echart_input"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="taskDetail_echart_title">
            膜电位趋势图 - 神经元坐标：(
            <span id="neur_x2">{{ selected_neur_x }}</span
            >,
            <span id="neur_y2">{{ selected_neur_y }}</span>
            )， 编号:{{ neurIndex }}
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 taskDetail_echart_box">
          <div id="MembraneVoltageEchart"></div>
        </div>

        <div class="col-md-6 taskDetail_echart_box">
          <div id="MembraneVoltageLineEchart"></div>
        </div>
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

$(function() {
  var bodyH = $(window).height();
  console.log(bodyH);
  $(".middle").height(bodyH - 600);
});

export default vue_taskDetail;
</script>

<style>
@import "../lib/bootstrap-3.3.1/css/bootstrap.min.css";

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
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: auto;
}

#taskChipEchart,
#taskTimeEchart,
#MembraneVoltageEchart,
#MembraneVoltageLineEchart {
  height: 380px;
  margin: 0 auto;
  width: 100%;
}
</style>
