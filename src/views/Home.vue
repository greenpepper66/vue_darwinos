<template>
  <div class="home_page">
    <div>
      <div class="home_introduction">
        <div class="home_logo_box">
          <img
            src="../images/类脑计算机.png"
            alt="darwin os"
            class="home_os_logo"
          />
        </div>
        <br />

        <table class="home_hovertable">
          <tr>
            <td>系统名称</td>
            <td>达尔文类脑计算机系统</td>
          </tr>
          <tr>
            <td>健康状态</td>
            <td>
              <template v-if="systemStatus == 1">
                <div class="home_statusOkLogo"></div>
                <span> 健康</span>
              </template>
              <template v-else-if="systemStatus == 0">
                <div class="home_statusErrLogo"></div>
                <span> 系统异常</span>
              </template>
            </td>
          </tr>
          <tr>
            <td>版本号</td>
            <td>V1</td>
          </tr>
          <tr>
            <td>节点总数</td>
            <td>{{ totalNodeNum }}</td>
          </tr>
          <tr>
            <td>Master节点数</td>
            <td>{{ masterNodeNum }}</td>
          </tr>
          <tr>
            <td>Shadow节点数</td>
            <td>{{ shadowNodeNum }}</td>
          </tr>
          <tr>
            <td>Slave节点数</td>
            <td>{{ slaveNodeNum }}</td>
          </tr>
          <tr>
            <td>运行中节点数</td>
            <td>{{ runNodeNum }}</td>
          </tr>
          <tr>
            <td>芯片总数</td>
            <td>{{ totalChipNum }}</td>
          </tr>
          <tr>
            <td>运行中芯片数</td>
            <td>{{ runChipNum }}</td>
          </tr>
          <tr>
            <td>神经元簇总数</td>
            <td>{{ totalNeureNum }}</td>
          </tr>
          <tr>
            <td>运行中神经元簇个数</td>
            <td>{{ runNeureNum }}</td>
          </tr>
        </table>
      </div>

      <div class="home_topology">
        <div id="topologyEchart"></div>

        <div class="home_node_logoBox">
          <div class="home_coommonNodeLogo masterNodeLogo"></div>
          <span class="home_logoDesc"> master节点</span>
          <div class="home_coommonNodeLogo shadowNodeLogo"></div>
          <span class="home_logoDesc"> shadow节点</span>
          <div class="home_coommonNodeLogo slaveNodeLogo"></div>
          <span class="home_logoDesc"> slave节点</span>
          <div class="home_coommonNodeLogo outlineNodeLogo"></div>
          <span class="home_logoDesc"> 不在线节点</span>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import { vue_controler } from "../js/pages/home";

import { Struct } from "../js/utils/jsStruct";

import $ from "jquery";

$(function() {
  var bodyH = $(window).height();
  console.log("***", bodyH);
  var h = bodyH - 150;
  $(".home").height(h);
  $(".box").height(h);
});

window.Struct = Struct;

export default vue_controler;
</script>

<style>


#topologyEchart {
  width: 100%;
  height: 96%;
  margin: 0 auto;
}
</style>
