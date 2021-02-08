
import { get_slave_boards } from "../os/get_slave_boards.js";
import { drawNodeEchart } from "../echarts/get_node_echarts";

var vue_node = {
    name: "Node",
    data() {
        return {
            nodeID: -1,
            chipNum: 12,
            neureNum: 12 * 24 * 24,
            totalNodeNum: 0,
            nodeInfo: [], // 当前节点信息
            // runNodeInfo: [],  // 所有运行中节点数据
            modelFileList: [], // 节点上的模型文件
            taskFileList: [], // 节点上的任务列表
        };
    },
    mounted() {
        // 获取数据
        this.nodeID = document.getElementById("nodeIDValue").innerHTML;
        console.log("node id: ", this.nodeID);

        console.log("node has 12 chips: ", this.$router);
        drawNodeEchart(this.$router, this.nodeID);

        let _this = this;
        // 回调函数参数slave_boards是在线节点数组
        get_slave_boards(function (slave_boards) {
            let node = [];
            // console.log(slave_boards);
            for (let i = 0; i < slave_boards.length; i++) {
                // 获取节点信息
                let slave_board = slave_boards[i];
                if (slave_board["board_id"] == _this.nodeID) {
                    node = {
                        ip: slave_board["ip_address"].join("."),
                        id: slave_board["board_id"],
                        status: slave_board["board_status"],
                        chips: slave_board["chips"],
                        file_list: slave_board["file_list"],
                    };

                    // 获取模型文件列表
                    for (let j = 0; j < node.file_list.length; j++) {
                        let model_file = node.file_list[j];
                        // 模型文件状态值：0-ready, 1-已删除, 2-processing(下位机没使用), 3-running
                        if (model_file['model_status'] != 1 && model_file['model_size'] != 0) {
                            let model = {
                                id: model_file["model_id"],
                                name: model_file["model_name"],
                                nodeID: node.id,
                                nodeIP: node.ip,
                                size: model_file["model_size"],
                                status: model_file["model_status"],
                            }
                            _this.modelFileList.push(model);

                            // 获取任务列表
                            if(model.status == 3) {
                                _this.taskFileList.push(model);
                            }
                        }
                        
                    }

                    _this.nodeInfo = node;
                    console.log("call back: modelFilelist and nodeInfo ", _this.modelFileList,  _this.nodeInfo);
                    break;
                }
            }

            console.log("node page nodeInfo....:", _this.nodeInfo);
            console.log("call back: nodeID ", _this.nodeID);
        });




    },
    watch: {

    },
    methods: {

    }
};





export { vue_node };