<template>
  <div id="app">
    <div id="nav">
      <!-- router-link定义页面中点击触发部分 -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/node?nodeID=0">Node</router-link> |
      <router-link to="/chip?nodeID=0&chipID=3">Chip</router-link> |
      <router-link to="/model">Model</router-link> |
      <router-link to="/uploadModel">UploadModel</router-link> | 
      <router-link to="/task">Task</router-link> |
      <router-link to="/taskDetail?nodeID=0&modelID=7">TaskDetail</router-link>
      |
      <router-link to="/AppDetail?nodeID=0&modelID=7">AppDetail</router-link>
      |
      <router-link to="/boardsData">BoardsData</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <!-- router-view定义页面中显示部分 -->
    <router-view />
  </div>
</template>


<script>
import $ from "jquery";
import { get_slave_boards } from "./js/os/get_slave_boards.js";
import { get_chip_matrix } from "./js/os/get_chip_matrix";

$(function () {
  var bodyH = $(window).height();
  console.log(bodyH);
  var h = bodyH;
  $("#app").height(h);
});

function updateTreeView(){
 
let JSONdata={
  nodes:[],
  models:[],
  tasks:[],
  };

//测试用
/*  let node = {
        ip: "192.0.0.0",
        id: 1,
        chips: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        usedNeureNums:[120,120,120,120,120,120,120,120,120,120,120,120],
        role: 1,  //节点角色，1-master, 2-shadow,3-slave
      };
      JSONdata.nodes.push(node);

node = {
        ip: "192.0.0.1",
        id: 4,
        chips: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        usedNeureNums:[120,120,120,120,120,120,120,120,120,120,120,120],
        role: 3,  //节点角色，1-master, 2-shadow,3-slave
      };
      JSONdata.nodes.push(node);
let model = {
              id: 2,
              name: "zxc",
              nodeID: 1,
              nodeIP: "192.0.0.0"              
          }
JSONdata.models.push(model)
let task = {
              id: 4,
              name: "qwe",
              nodeID: 1,
              nodeIP: "192.0.0.0"              
          }
          JSONdata.tasks.push(task)  */


 get_slave_boards(function (slave_boards) {
   
  for (let i = 0; i < slave_boards.length; i++) {
    let slave_board = slave_boards[i];
    if (slave_board["board_status"]==1){
      let node = {
        ip: slave_board["ip_address"].join("."),
        id: slave_board["board_id"],
        chips: slave_board["chips"],
        usedNeureNums: [],
        role: slave_board["board_role"],  //节点角色，1-master, 2-shadow,3-slave
      };
      JSONdata.nodes.push(node);
      
      let file_list=slave_board["file_list"];
      for (let j = 0; j < file_list.length; j++){
        let model_file=file_list[j];
        //要显示在模型视图里面
        if (model_file['model_status'] != 1 && model_file['model_size'] != 0){
          let model = {
              id: model_file["model_id"],
              name: model_file["model_name"],
              nodeID: node.id,
              nodeIP: node.ip              
          }
          JSONdata.models.push(model)
        }
        //要显示在任务视图里面
        if (model_file['model_status'] ==3) {
          let task = {
              id: model_file["model_id"],
              name: model_file["model_name"],
              nodeID: node.id,
              nodeIP: node.ip              
          }
          JSONdata.tasks.push(task)
        }
      }
    }
  }

  for (let i = 0; i < nodes.length; i++){
    let node = nodes[i];
    let board_ip=node.ip;
    let board_id=node.id;
    for (let j=0;j<node.chips.length;j++){
      let chipID=j;
      usedNeureNum=0
      get_chip_matrix(board_ip, board_id, chipID, function (
                chip_matrix
            ) {
                for (let i = 0; i < chip_matrix.length; i++) {
                    if (chip_matrix[i][2] != 0) {
                        usedNeureNum++;
                    }
                }                
            });
      node.usedNeureNums.push(usedNeureNum)
    }
  }
  
  
});  



$.ajax({
  url:"http://localhost:5002/post",
  method:"post",
  data:JSON.stringify(JSONdata ),
  dataType:"json",
  success:function(response){
    console.log(response,"success");
  },
  error:function(error){
    console.error(error,"error");
  }
});

}



setInterval(updateTreeView, 3000);



export default {};
</script>

<style>
/** 入口统一颜色配置 */
/** 风格1： 黑底白字 */
/* @import './css/dark.css'; */
/** 风格2： 白底黑字 */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 1000px;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
