import { pltEffectScatter, } from "../echarts/plot";
import { get_chip_matrix } from "../os/get_chip_matrix";
import { drawChipEchart } from "../echarts/get_chips_echarts";
import { get_slave_boards } from "../os/get_slave_boards.js";

var vue_chip = {
    name: "Chip",
    data() {
        return {
            // 芯片详情div显示数据
            chipID: -1,  // 芯片的ID，从路由获取
            nodeID: -1,   // 芯片所在节点ID，从路由获取
            neureNum: 24 * 24,
            chipStatus: 1,
            usedNeureNum: 0,

            board_ip: "",  // 板子的ip
            heatmap_0_id: "heatmap",  // 散点图所在div的id
            selected_neur_x: 0, // 散点图上选中的神经元坐标
            selected_neur_y: 0,
        };
    },
    mounted() {
        // 获取url传参数据
        let nodeIDVal = document.getElementById("nodeIDValue").innerHTML;
        this.nodeID = nodeIDVal.replace(/\s*/g, "");
        let chipIDVal = document.getElementById("chipIDValue").innerHTML;
        this.chipID = chipIDVal.replace(/\s*/g, "");
        console.log("node & chip id: ", this.nodeID, this.chipID);

        let _this = this;
        // 根据url中的节点ID获取芯片所在节点IP
        get_slave_boards(function (slave_boards) {
            for (let i = 0; i < slave_boards.length; i++) {
                if (_this.nodeID == slave_boards[i]["board_id"]) {
                    _this.board_ip = slave_boards[i]["ip_address"].join(".");
                    console.log("_get board ip by id: ", _this.board_ip);
                    break;
                }
            }
            // 画散点图
            _this.update_heatmap();

            // 画饼图
            _this.updatePieEchart();

        });

        // // test 画图
        // let data = [];
        // for (let i = 0; i < 24; i++) {
        //     for (let j = 0; j < 24; j++) {
        //         data.push([j, i, 0]);
        //     }
        // }
        // pltEffectScatter("heatmap", 24, 24, data, 8);
        // drawChipEchart(0, _this.chipID);


        // 持续连接用的？
        let websocket_server_ip = "";
        websocket_server_ip = "192.168.1.200";

    },
    watch: {
    },
    methods: {

        updatePieEchart() {
            let _this = this;
            console.log("func - update_pie: ", _this.board_ip, _this.chipID)
            get_chip_matrix(_this.board_ip, _this.nodeID, _this.chipID, function (
                chip_matrix
            ) {
                for (let i = 0; i < chip_matrix.length; i++) {
                    if (chip_matrix[i][2] != 0) {
                        _this.usedNeureNum++;
                    }
                }
                // 画饼图, 参数为神经元使用比例 芯片ID
                console.log("使用了：", _this.usedNeureNum);
                drawChipEchart(Math.ceil(_this.usedNeureNum / (24 * 24) * 100), 0);

            });
        },

        update_heatmap() {
            let _this = this;
            let once_task_list = [
                (ip_str) => {
                    /* heatmap_0 */
                    console.log("func - update_heatmap: ", ip_str, _this.chipID)
                    get_chip_matrix(ip_str, _this.nodeID, _this.chipID, function (
                        chip_matrix
                    ) {
                        let echart_obj = pltEffectScatter(
                            _this.heatmap_0_id,
                            24,
                            24,
                            chip_matrix,
                            7
                        );
                        // 单击某个神经元，可以获取神经元的位置坐标
                        echart_obj.on("click", function (e) {
                            let coordinate = e.data.value;
                            console.log("event: ", e.data.value); // eg. [0,2]
                            _this.selected_neur_x = Math.floor(coordinate[0]);
                            _this.selected_neur_y = Math.floor(coordinate[1]);
                        });
                    });
                },

            ];

            let masterIp = "192.168.1.254";
            let ip_str = _this.board_ip;
            once_task_list[0](ip_str);

            // let once_task_count = 0;
            // let once_time_interval = setInterval(function () { // 定时器
            //     
            //     if (once_task_count >= once_task_list.length) {
            //         clearInterval(once_time_interval);
            //         return;
            //     }
            //     once_task_list[once_task_count](ip_str);  // 这里才执行函数
            //     once_task_count += 1;
            // }, 100);
        },
    }
};



export { vue_chip };