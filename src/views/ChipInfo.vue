<template>
  <div class="chip">
    <div class="clearfix thewrap">
      <div class="quarter-div matrix">
        <span>芯片{{$route.query.chipID }}上神经元状态示意图</span>
        <span id="nodeIDValue" style="display: none">
          {{ $route.query.nodeID }}
        </span>
        <span id="chipIDValue" style="display: none">
          {{ $route.query.chipID }}
        </span>
        <hr/>
        <div id="heatmap"></div>
      </div>

      <div class="quarter-div pie">
        <span>神经元使用占比</span>
        <hr />
        <div id="chipPie"></div>
      </div>
    </div>
    <div class="clearfix thewrap">
      <div class="quarter-div infor">
        <span> 芯片信息 </span>
        <hr/>
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th>芯片ID</th>
                <th>所在节点ID</th>
                <th>所在节点IP</th>
                <th>神经元簇数量</th>
                <th>芯片状态</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="board_ip ==''">
                <tr>
                  <template v-for="i in 5">
                    <td width="10%" :key="i">-</td>
                  </template>
                </tr>
              </template>
              <template v-else>
              <tr>
                <td width="10%">{{ chipID }}</td>
                <td width="10%">{{ nodeID }}</td>
                <td width="10%">{{ board_ip }}</td>
                <td width="10%">{{ neureNum }}</td>
                <template v-if="chipStatus == 1">
                  <td width="10%">健康</td>
                </template>
                <template v-else>
                  <td width="10%">异常</td>
                </template>
              </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <div class="quarter-div tasks">
        <span>任务列表</span>
        <hr/>
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th>模型ID</th>
                <th>模型名称</th>
                <th>节点ID</th>
                <th>节点IP</th>
                <th>模型大小</th>
                <th>运行时间</th>
              </tr>
              <tr>
                <template v-for="i in 6">
                  <td width="10%" :key="i">-</td>
                </template>
              </tr>
            </thead>
            <tbody>
              <template> </template>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { vue_chip } from "../js/pages/chipInfo";
import $ from "jquery";

$(function () {
  var bodyH = $(window).height();
  console.log(bodyH);
  var h = bodyH / 2 - 70;
  $(".quarter-div").height(h);
});

export default vue_chip;
</script>


<style scoped>

/*将页面分为4个部分*/
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
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
.quarter-div {
  width: 50%;
  box-sizing: border-box;
  float: left;
  overflow: auto;
  margin-bottom: 10px;
}
.matrix {
  min-height: 360px;
}
.pie {
  min-height: 360px;
}
.infor {
  min-height: 300px;
}
.tasks {
  min-height: 300px;
}
.table {
  margin-left: 20px;
  margin-right: 20px;
}
#heatmap {
  width: 100%;
  height: 80%;
  margin: 0 auto;
  min-height: 300px;
}
#chipPie {
  width: 100%;
  height: 80%;
  margin: 0 auto;
  min-height: 300px;
}
hr {
  width: 90%;
}
</style>