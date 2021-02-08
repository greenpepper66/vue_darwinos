<template>
  <div class="home">
    <div class="box">
      <div class="introduction">
        <div class="logo">
          <img
            src="../assets/img.jpeg"
            alt="darwin os"
            width="108"
            height="102"
          />
        </div>
        <br />
        <div class="sysInfo">
          <span>系统名称：达尔文类脑计算机</span>
        </div>
        <div class="sysInfo">
          <template v-if="systemStatus == 1">
            <span float="left">健康状态：</span>
            <div class="statusOkLogo"></div>
            <span> 健康</span>
          </template>
          <template v-else-if="systemStatus == 0">
            <span float="left">健康状态：</span>
            <div class="statusErrLogo"></div>
            <span> 系统异常</span>
          </template>
        </div>
        <div class="sysInfo">
          <span>版本号：v1</span>
        </div>
        <div class="sysInfo">
          <span>节点总数：</span>
          <span>{{ totalNodeNum }}</span>
        </div>
        <div class="sysInfo">
          <span>master节点数：</span>
          <span>{{ masterNodeNum }}</span>
        </div>
        <div class="sysInfo">
          <span>shadow节点数：</span>
          <span>{{ shadowNodeNum }}</span>
        </div>
        <div class="sysInfo">
          <span>slave节点数：</span>
          <span>{{ slaveNodeNum }}</span>
        </div>
        <div class="sysInfo">
          <span>运行中节点数：</span>
          <span>{{ runNodeNum }}</span>
        </div>
        <div class="sysInfo">
          <span>芯片总数：</span>
          <span>{{ totalChipNum }}</span>
        </div>
        <div class="sysInfo">
          <span>运行中芯片数：</span>
          <span>{{ runChipNum }}</span>
        </div>
        <div class="sysInfo">
          <span>神经元簇总数：</span>
          <span>{{ totalNeureNum }}</span>
        </div>
        <div class="sysInfo">
          <span>运行中神经元簇个数：</span>
          <span>{{ runNeureNum }}</span>
        </div>
      </div>
      <div class="topology">
        <div id="topologyEchart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { vue_controler } from "../js/pages/home";

import { Struct } from "../js/utils/jsStruct";

import $ from "jquery";

$(function () {
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
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  margin-top: 30px;
  min-height: 800px;
}

.box {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  min-height: 800px;
}
.introduction {
  width: 300px;
  float: right;
  min-height: 600px;
}
.topology {
  height: 600px;
  margin-right: 320px;
}
#topologyEchart {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.logo {
  margin-top: 60px;
}
.sysInfo {
  height: 30px;
  margin-left: 30px;
  text-align: left;
}
.statusOkLogo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  display: inline-block;
}
.statusErrLogo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  display: inline-block;
}
</style>

