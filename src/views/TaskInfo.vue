<template>
  <div class="task">
    <div class="clearfix thewrap tasktop">
      <div class="task-search-box">
        <div class="task-searchTitle task-quarter-search">按名称搜索：</div>
        <div class="task-searchByName task-quarter-search">
          <input
            type="text"
            id="searchByTaskName"
            class="task-inputBox"
            placeholder="请输入模型名称"
          />
        </div>
        <div class="task-searchTitle task-quarter-search">按类型搜索：</div>
        <div class="task-searchByType task-quarter-search">
          <input
            type="text"
            id="searchByTaskType"
            class="task-inputBox"
            placeholder="请输入类型名称"
          />
        </div>
        <div>
          <button
            class="task-searchBtn task-quarter-search" @click="searchTasks"
          >
            搜索
          </button>
        </div>
      </div>
    </div>

    <div class="clearfix thewrap taskmiddle">
      任务列表
      <hr/>
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
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="model_list.length == 0">
              <tr>
                <template v-for="i in 7">
                  <td  :key="i">-</td>
                </template>
              </tr>
            </template>
            <tr v-for="(item, index) in model_list" :key="index">
              <td >{{ item.name }}</td>
              <td >{{ item.id }}</td>
              <td >{{ item.board }}</td>
              <td >{{ item.ip }}</td>
              <td >{{ item.size }}</td>
              <td >{{ item.time }}</td>
              <td >
                <button @click="task_start(index)">启动</button>
                <button @click="task_stop(index)">终止</button>
                <button @click="task_reset(index)">重启</button>
                <button @click="goto_taskDetail($router, index)">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="clearfix thewrap taskbottom">
      <span>任务统计信息</span>
      <hr/>
    </div>
  </div>
</template>

<script>
import { vue_task } from "../js/pages/taskInfo";
import $ from "jquery";

$(function () {
  var bodyH = $(window).height();
  console.log(bodyH);
  $(".middle").height(bodyH - 600);
});

export default vue_task;
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
.tasktop {
  height: 100px;
}
.taskmiddle {
  min-height: 400px;
}
.taskbottom {
  height: 160px;
}
.table {
  margin: 0 auto;
}

.totalTasks {
  height: 30px;
  margin-left: 30px;
  text-align: left;
}

/* 下面是搜索框样式 */
.task-search-box {
  height: 60%;
  width: 100%;
  float: left;
  margin: 0 auto;
  margin-top: 20px;
  overflow: auto;
}

.task-quarter-search {
  height: 35px;
  width: 20%;
  box-sizing: border-box;
  float: left;
  overflow: auto;
}

.searchByTaskName,
.searchByTaskType {
  margin-right: 20px;
}
.task-searchTitle {
  margin-top: 7px;
  text-align: right;
}

.task-inputBox {
  height: 80%;
  float: left;
}

.task-searchBtn {
  width: 100px;
  height: 40px;
  border: none;
  float: center;
}

</style>
