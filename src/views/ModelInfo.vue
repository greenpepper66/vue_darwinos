<template>
  <div class="model_page">
    <div class="clearfix thewrap model_top">
      <div class="row">
        <table class="model_page_table-search">
          <tbody>
            <tr>
              <td>
                <div class="model_search_title">按名称搜索：</div>
              </td>
              <td>
                <div class="">
                  <input
                    type="text"
                    id="searchByName"
                    class="model_inputBox"
                    placeholder="请输入模型名称"
                  />
                </div>
              </td>
              <td>
                <div class="model_search_title">按类型搜索：</div>
              </td>
              <td>
                <div>
                  <input
                    type="text"
                    id="searchByType"
                    class="model_inputBox"
                    placeholder="请输入类型名称"
                  />
                </div>
              </td>
              <td>
                <div>
                  <button class="model_search_btn" @click="searchModles">
                    搜索
                  </button>
                </div>
              </td>
              <td colspan="2">
                <div>
                  <button
                    type="button"
                    @click="goUploadModelPage($router)"
                    class="model_upload_btn"
                  >
                    上传模型文件
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix thewrap model_middle">
      <div class="model_title">模型列表</div>

      <div class="row">
        <table class="model_page_table-list" id="modelListTable">
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
                  <td :key="j">-</td>
                </template>
              </tr>
            </template>
            <tr v-for="(model, index) in modelFilesShowed" :key="model.id">
              <td>{{ model.id }}</td>
              <td>{{ model.name }}</td>
              <td>{{ model.nodeID }}</td>
              <td>{{ model.nodeIP }}</td>
              <td>{{ model.size }}</td>
              <td>
                <button
                  class="model_deploy_btn"
                  :id="'task_deploy_' + index"
                  @click="task_deploy(model.nodeIP, model.id)"
                >
                  部署
                </button>

                <button
                  class="model_delete_btn"
                  @click="task_delete(model.nodeIP, model.id)"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix thewrap model_bottom">
      <div class="model_title">模型资源统计信息</div>

      <div class="row">
        <table class="model_page_table-total">
          <tbody>
            <tr>
              <td>模型文件总数：</td>
              <td>{{ modelFilesShowed.length }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <!-- <p>示例弹出层：<button @click="showDeployResult()">请点这里</button></p> -->
      <div id="deployResult" class="model_deploy_alert-box">
        <p align="center" class="model_deploy_alert-txt">
          部署结果：{{ modelDeployResult }}
        </p>
        <button class="model_deploy_alert-btn" @click="closeDeployResult()">
          关闭
        </button>
      </div>

    <div id="modelDeleteResult" class="model_deploy_alert-box">
        <p align="center" class="model_deploy_alert-txt">
          删除失败，请重试。
        </p>
        <button class="model_deploy_alert-btn" @click="closeDeleteResult()">
          关闭
        </button>
      </div>
      

    </div>
  </div>
</template>

<script>
import { vue_model } from "../js/pages/modelInfo";
import $ from "jquery";

$(function() {
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
</style>
