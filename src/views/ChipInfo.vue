<template>
  <div class="chip">
    <div class="clearfix thewrap">
      <div class="chip_quarter-div chip_matrix">
        <div class="chip_title">
          芯片{{ $route.query.chipID }}上神经元状态示意图
        </div>
        <span id="nodeIDValue" style="display: none">
          {{ $route.query.nodeID }}
        </span>
        <span id="chipIDValue" style="display: none">
          {{ $route.query.chipID }}
        </span>
        <div id="heatmap"></div>
      </div>

      <div class="chip_quarter-div chip_pie">
        <div class="chip_title">神经元使用占比</div>
        <div id="chipPie"></div>
      </div>
    </div>
    <div class="clearfix thewrap">
      <div class="chip_quarter-div chip_infor">
        <div class="chip_title">芯片信息</div>
        <div class="row">
          <table class="node_page_table">
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
              <template v-if="board_ip == ''">
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

      <div class="chip_quarter-div chip_tasks">
        <div class="chip_title">任务列表</div>
        <div class="row">
          <table class="node_page_table">
            <thead>
              <tr>
                <th>模型ID</th>
                <th>模型名称</th>
                <th>节点ID</th>
                <th>节点IP</th>
                <th>模型大小</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colspan="5" class="chip_nodata_box">
                  <img
                    src="../images/暂无数据.png"
                    alt="no data"
                    class="chip_nodata_logo"
                  />
                  <div>暂无数据</div>
                </td>
              </tr>
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
</style>