
import { get_slave_boards } from "../os/get_slave_boards.js";
import { drawTopologyEchart, refreshEchart } from "../echarts/get_topology_echarts.js"

var vue_controler = {
    name: "App",
    data() {
        return {
            input_board_id: -1,
            nodeList: [],  // 60个节点大小

            // 首页：系统信息介绍部分使用的数据
            totalNodeNum: 60,
            notMasterNodeNum: 59,  // 非master节点个数

            masterNodeNum: 0,
            shadowNodeNum: 0,  // shadow节点个数
            slaveNodeNum: 0,

            runNodeNum: 0, // 包含master节点
            systemStatus: 0,  // 1表示健康，0表示异常
            totalChipNum: 60 * 12,
            runChipNum: 0,
            totalNeureNum: 60 * 12 * 24 * 24,
            runNeureNum: 0,
            runNodeIDList: [], // 存放运行中节点的id列表,不含master节点
            masterNodeID: 1, // master节点默认id，系统运行后不一定是多少，只有ip固定

            shadowNodeID: -1, // shadow节点id

            // 节点详情页面使用的数据
            runNodeInfo: [], // 运行中节点信息
        };
    },
    mounted() {
        let _this = this;
        // 回调函数参数slave_boards是在线节点数组
        get_slave_boards(function (slave_boards) {
            /* _node_list */
            let _node_list = [];
            for (let i = 0; i < slave_boards.length; i++) {
                let slave_board = slave_boards[i];
                let node = {
                    ip: slave_board["ip_address"].join("."),
                    id: slave_board["board_id"],
                    status: slave_board["board_status"],
                    chips: slave_board["chips"],
                    file_list: slave_board["file_list"],
                    rule: slave_board["board_role"],  //节点角色，1-master, 2-shadow,3-slave
                };
                _node_list.push(node);
                // master节点信息
                if (node.ip == "192.168.1.254") {
                    _this.masterNodeID = node.id;
                    _this.masterNodeNum++;
                } else {
                    _this.runNodeIDList.push(slave_board["board_id"]);
                }
                // shadow节点信息
                if (node.rule == 2) {
                    _this.shadowNodeID = node.id;
                    _this.shadowNodeNum++;
                }
            }

            // begin init nodeList， 初始化大小为60节点
            let empty_node_matrix_data = new Array(72).fill(new Array(96).fill(0));
            // 每个节点上12个芯片，每个芯片有24*24个神经元簇，神经元矩阵图按照3行4列展示，所以共72*96个神经元簇
            for (let i = 0; i < 60; i++) {
                // 总共60个节点（大板子）-1个master 59个slave
                let empty_node = {
                    ip: ((i) => {
                        if (i == 0) {
                            return "192.168.1.254"; // master节点
                        } else {
                            return "192.168.1." + (i + 1);
                        }
                    })(i),
                    id: i + 1,
                    status: 1,
                    chips: new Array(12).fill(0),
                    node_matrix_data: empty_node_matrix_data,
                };
                _this.nodeList.push(empty_node);
            }
            // end init nodeList

            // start update system info
            _this.systemStatus = 1;

            _this.runNodeNum = slave_boards.length;
            _this.runChipNum = _this.runNodeNum * 12;
            _this.runNeureNum = _this.runChipNum * 24 * 24;

            _this.slaveNodeNum = _this.runNodeNum - _this.masterNodeNum - _this.shadowNodeNum;
            _this.runNodeInfo = _this._node_list;
            // end update system info

            // todo：更新拓扑图：节点颜色
            // 获取运行中节点的id数组
            // console.log("************", _this.masterNodeID,  _this.runNodeIDList);

            refreshEchart(_this.masterNodeID, _this.shadowNodeID, _this.notMasterNodeNum, _this.runNodeIDList, _this.$router);

        });

        // test
        _this.runNodeIDList.push(0)
        _this.runNodeIDList.push(4)
        drawTopologyEchart(11, 4, this.notMasterNodeNum, [4, 6], this.$router)
        // 导入系统结构拓扑图
        // drawTopologyEchart(_this.masterNodeID, _this.shadowNodeID, this.notMasterNodeNum, this.runNodeIDList, this.$router);

    },
    // 解决 echart 图像在路由跳转后不显示问题
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.name == "Home" && (from.name != null && from.name != "Home")) {
                console.log("reload home page")
                window.location.reload()
            }
        });
    },
    watch: {

    },
    methods: {

    },
};



export { vue_controler };
