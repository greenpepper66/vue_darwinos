<template>
  <div class="model">
    <div class="clearfix thewrap top">
      <div class="search-box">
        <div class="searchTitle quarter-search">按名称搜索：</div>
        <div class="searchByName quarter-search">
          <input
            type="text"
            id="searchByName"
            class="inputBox"
            placeholder="请输入模型名称"
          />
        </div>
        <div class="searchTitle quarter-search">按类型搜索：</div>
        <div class="searchByType quarter-search">
          <input
            type="text"
            id="searchByType"
            class="inputBox"
            placeholder="请输入类型名称"
          />
        </div>
        <div>
          <button class="searchBtn quarter-search" @click="searchModles">
            搜索
          </button>
        </div>
      </div>

      <div class="upload-box">
        <button
          type="button"
          @click="goUploadModelPage($router)"
          class="upload-button"
        >
          上传模型文件
        </button>
      </div>
    </div>

    <div class="clearfix thewrap middle">
      模型列表
      <hr />
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th>模型ID</th>
              <th>模型名称</th>
              <th>节点ID</th>
              <th>节点IP</th>
              <th>模型大小</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="modelFilesShowed.length == 0">
              <tr>
                <template v-for="j in 6">
                  <td width="10%" :key="j">-</td>
                </template>
              </tr>
            </template>
            <tr v-for="(model, index) in modelFilesShowed" :key="model.id">
              <td width="10%">{{ model.id }}</td>
              <td width="10%">{{ model.name }}</td>
              <td width="10%">{{ model.nodeID }}</td>
              <td width="10%">{{ model.nodeIP }}</td>
              <td width="10%">{{ model.size }}</td>
              <td width="25%">
                <button
                  :id="'task_deploy_' + index"
                  @click="task_deploy(model.nodeIP, model.id)"
                >
                  部署
                </button>

                <button @click="task_delete(model.nodeIP, model.id)">
                  删除
                </button>
                <button @click="alert('test：模型详细信息')">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix thewrap bottom">
      <span>模型资源统计信息</span>
      <hr />
      <div class="totalModels">
        <span>模型文件总数：</span>
        <span>{{ modelFilesShowed.length }}</span>
      </div>
    </div>

    <div>
      <!-- <p>示例弹出层：<button @click="showDeployResult()">请点这里</button></p> -->
      <div id="deployResult" class="alert-box">
        <p align="center">部署结果：{{ modelDeployResult }}</p>
        <a href="javascript:void(0)" @click="closeDeployResult()" style="float: right"
          >关闭</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { vue_model } from "../js/pages/modelInfo";
import $ from "jquery";

$(function () {
  var bodyH = $(window).height();
  console.log(bodyH);
  $(".middle").height(bodyH - 600);
});

export default vue_model;
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
.top {
  height: 100px;
}
.middle {
  min-height: 400px;
}
.bottom {
  height: 160px;
}
.table {
  margin: 0 auto;
}

.upload-box {
  width: 20%;
  height: 60%;
  float: right;
  margin: 0 auto;
  display: inline;
  margin-top: 20px;
}
.upload-button {
  width: 200px;
  height: 40px;
  display: block;
  margin: 0 auto;
  border-width: 0;
}

.totalModels {
  height: 30px;
  margin-left: 30px;
  text-align: left;
}

/* 下面是搜索框样式 */
.search-box {
  height: 60%;
  width: 80%;
  float: left;
  margin: 0 auto;
  margin-top: 20px;
  overflow: auto;
}

.quarter-search {
  height: 35px;
  width: 18%;
  box-sizing: border-box;
  float: left;
  overflow: auto;
}

.searchByName,
.searchByType {
  margin-right: 20px;
}
.searchTitle {
  margin-top: 7px;
  text-align: right;
}

.inputBox {
  height: 80%;
  width: 80%;
  float: left;
}

.searchBtn {
  width: 100px;
  height: 40px;
  border: none;
  float: center;
}
</style>
