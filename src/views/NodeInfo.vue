<template>
  <div class="nodeInfo_page">
    <div class="clearfix thewrap">
      <div class="node_quarter-div node_chips">
        <div class="node_title">节点芯片图</div>
        <span id="nodeIDValue" style="display: none">
          {{ $route.query.nodeID }}
        </span>
        <div id="nodeChipsEchart"></div>
      </div>

      <div class="node_quarter-div node_models">
        <div class="node_title">模型列表</div>
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
              <template v-if="modelFileList.length == 0">
                <tr>
                  <template v-for="j in 5">
                    <td :key="j">-</td>
                  </template>
                </tr>
              </template>
              <tr v-for="model in modelFileList">
                <td>{{ model.id }}</td>
                <td>{{ model.name }}</td>
                <td>{{ model.nodeID }}</td>
                <td>{{ model.nodeIP }}</td>
                <td>{{ model.size }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="clearfix thewrap">
      <div class="node_quarter-div node_infor">
        <div class="node_title">节点信息</div>
        <div class="row">
          <table class="node_page_table">
            <thead>
              <tr>
                <th>节点ID</th>
                <th>节点IP</th>
                <th>芯片数量</th>
                <th>神经元簇数量</th>
                <th>节点状态</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="nodeInfo.length == 0">
                <tr>
                  <template v-for="i in 5">
                    <td  :key="i">-</td>
                  </template>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td >{{ nodeInfo.id }}</td>
                  <td >{{ nodeInfo.ip }}</td>
                  <td >{{ chipNum }}</td>
                  <td >{{ neureNum }}</td>
                  <template v-if="nodeInfo.status == 1">
                    <td >健康</td>
                  </template>
                  <template v-else>
                    <td >异常</td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="node_quarter-div node_tasks">
        <div class="node_title">任务列表</div>
        <div class="row">
          <table class="node_page_table">
            <thead>
              <tr>
                <th >模型ID</th>
                <th >模型名称</th>
                <th >节点ID</th>
                <th >节点IP</th>
                <th >模型大小</th>
                <!-- <th>运行时间</th> -->
              </tr>
            </thead>
            <tbody>
              <template v-if="taskFileList.length == 0">
                <tr>
                  <td colspan="5" class="node_nodata_box">
                    <img
                      src="../images/暂无数据.png"
                      alt="no data"
                      class="node_nodata_logo"
                    />
                    <div>暂无数据</div>
                  </td>
                </tr>
              </template>
              <tr v-for="task in taskFileList">
                <td >{{ task.id }}</td>
                <td >{{ task.name }}</td>
                <td >{{ task.nodeID }}</td>
                <td >{{ task.nodeIP }}</td>
                <td >{{ task.size }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from "jquery";
import { vue_node } from "../js/pages/nodeInfo";

$(function () {
  var bodyH = $(window).height();
  console.log(bodyH);
  var h = bodyH / 2 - 70;
  $(".quarter-div").height(h);
});

// vue_node 外面加上大括号就不行！
export default vue_node;
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
  width: 100%;
}

#nodeChipsEchart {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>