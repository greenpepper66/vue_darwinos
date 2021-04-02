
import { get_chip_matrix } from "../os/get_chip_matrix";
import { get_slave_boards } from "../os/get_slave_boards.js";
import { get_task_time } from "../os/get_task_time";
import { pltEffectScatter, pltWalkLine, pltArrayScatter } from "../echarts/plot";
import { get_membrane_voltage } from "../os/get_membrane_voltage";
import { array_mean, trancat, array_equal } from "../utils/utils";
import $ from "jquery";

var vue_taskDetail = {
    name: "Task",
    data() {
        return {
            // 任务基本信息 显示的数据
            nodeID: -1,  // 任务所在节点的id，通过路由获取
            modelID: -1, // 模型id

            nodeBaseInfo: [],  // 节点基本信息
            taskBaseInfo: [],  // 模型基本信息
            // echartsDivID: ["taskChipEchart",], // 四个图的div id

            chipID: 3, // 芯片id
            neurIndex: 0, // 神经元簇上神经元编号

            selected_neur_x: 20, // 散点图上选中的神经元坐标
            selected_neur_y: 20,

            line_task_time_id: "line_task_time", // 识别时间图的id
            line_task_time_data: [], // 识别时间数据


            line_trend_data: [], // 膜电压趋势图数据
        };
    },
    mounted() {
        // 获取数据
        this.nodeID = document.getElementById("nodeIDValue").innerHTML;
        this.modelID = document.getElementById("modelIDValue").innerHTML;
        console.log("node and model id: ", this.nodeID, this.modelID);


        let _this = this;
        // 获取模型信息
        _this.get_taskInfo();
        // 获取任务运行时间
        let p = 0;
        let main_interval = setInterval(function () {
            if (p < 1) {
                get_task_time(_this.nodeBaseInfo.ip, function (time) {  // 获取任务运行时间
                    _this.taskBaseInfo.time = time.toFixed(3) + "ms";
                });
                p += 1;
            } else if (p < 10) {
                p += 1;
            } else {
                p = -1;
            }
        }, 1000);

        // 等待get_taskInfo里的回调函数执行完毕
        setTimeout(function () {
            console.log("get ip ok: ", _this.nodeBaseInfo.ip, _this.chipID);
            if (_this.nodeBaseInfo.ip != undefined) {
                // 画散点图：
                _this.get_heatmapEchart(_this.nodeBaseInfo.ip, _this.nodeID, _this.chipID);
            }
        }, 3000);



        this.main_interval = setInterval(() => {
            console.log("main_interval_count");
            // 画时间图：
            _this.get_taskTimeEchart(_this.nodeBaseInfo.ip, _this.line_task_time_data);


            // 画膜电压曲线图：
            _this.get_membraneVoltageEchart(
                _this.nodeBaseInfo.ip,
                _this.chipID,
                _this.selected_neur_x,
                _this.selected_neur_y,
                _this.neurIndex,
                _this.line_trend_data
            );

        }, 6000);


        // // test 画图
        // let data = [];
        // for (let i = 0; i < 24; i++) {
        //     for (let j = 0; j < 24; j++) {
        //         data.push([j, i, 0]);
        //     }
        // }
        // pltEffectScatter("taskChipEchart", 24, 24, data, 8);
        // document.getElementById("taskDetail_chip_neure_logoBox").style.display = 'block';
        // pltWalkLine("taskTimeEchart", [], 0, undefined, 60, "图像", "时间/ms");
        // pltArrayScatter( "MembraneVoltageEchart",  [], undefined, "x", "y/mv" );
        // pltWalkLine( "MembraneVoltageLineEchart", [], array_mean([]), undefined, 60, "采样", "电压/mv" );
    },

    watch: {
        // 当用户输入chipID变化时，重新绘制神经元状态散点图
        chipID(val, old_val) {
            if ((val != "") && (val >= 0 && val <= 12) && val != undefined && val % 1 === 0 && val != old_val) {
                console.log("task detail page chipID change: ", val, old_val);
                this.get_heatmapEchart(this.nodeBaseInfo.ip, this.nodeBaseInfo.id, val);
            }
        },

        // 当用户输入神经元编号变化时，更新膜电压图
        neurIndex(val, old_val) {
            console.log("变了变了", val, old_val);
            if ((val != "" && old_val != "") && (val >= 0 && val <= 255) && val != undefined && val % 1 === 0 && val != old_val) {
                this.neurIndex = val;
                console.log("task detail page neurIndex change: ", val, old_val);
                this.get_membraneVoltageEchart(
                    this.nodeBaseInfo.ip,
                    this.chipID,
                    this.selected_neur_x,
                    this.selected_neur_y,
                    this.neurIndex,
                    this.line_trend_data
                );
            }
        },

        selected_neur_x(val, old_val) {
            alert("tt");
            document.getElementById("neur_x").innerHTML;

        },
        selected_neur_y(val, old_val) {

        },

    },

    methods: {
        // 1. 获取模型信息和运行时间   
        get_taskInfo() {
            let _this = this;
            get_slave_boards(function (slave_boards) {
                console.log("&**************&", slave_boards);
                // 获取节点信息
                for (let i = 0; i < slave_boards.length; i++) {
                    if (slave_boards[i]["board_id"] == _this.nodeID) {
                        let node = {
                            ip: slave_boards[i]["ip_address"].join("."),
                            id: slave_boards[i]["board_id"],
                            status: slave_boards[i]["board_status"],
                            chips: slave_boards[i]["chips"],
                            file_list: slave_boards[i]["file_list"],
                        };
                        _this.nodeBaseInfo = node;
                        break;
                    }
                }
                console.log("TaskDetail Page: nodeBaseInfo ", _this.nodeBaseInfo);

                // 获取模型信息
                for (let j = 0; j < _this.nodeBaseInfo.file_list.length; j++) {
                    let model_file = _this.nodeBaseInfo.file_list[j];
                    if (model_file['model_id'] == _this.modelID && model_file["model_status"] == 3) {
                        let model = {
                            id: model_file["model_id"],
                            name: model_file["model_name"],
                            nodeID: _this.nodeBaseInfo.id,
                            nodeIP: _this.nodeBaseInfo.ip,
                            size: model_file["model_size"],
                            time: 0,
                        };
                        _this.taskBaseInfo = model;
                        break;
                    }
                }
                console.log("TaskDetail Page: taskBaseInfo ", _this.taskBaseInfo);
            });

        },

        // 2. 画芯片的散点图
        get_heatmapEchart(ip, nodeID, chipID) {
            console.log("task detail page draw heatmap echarts: ", ip, chipID)
            get_chip_matrix(ip, nodeID, chipID, function (
                chip_matrix
            ) {
                let echart_obj = pltEffectScatter(
                    "taskChipEchart",
                    24,
                    24,
                    chip_matrix,
                    7
                );
                // 单击某个神经元，可以获取神经元的位置坐标
                echart_obj.on("click", function (e) {
                    let coordinate = e.data.value;
                    console.log("event: ", e.data.value); // eg. [0,2]
                    this.selected_neur_x = Math.floor(coordinate[0]);
                    this.selected_neur_y = Math.floor(coordinate[1]);
                    console.log("选中了神经元，位置：", this.selected_neur_x, this.selected_neur_y);

                    // 页面元素赋值
                    document.getElementById("neur_x1").innerHTML = this.selected_neur_x;
                    document.getElementById("neur_y1").innerHTML = this.selected_neur_y;
                    document.getElementById("neur_x2").innerHTML = this.selected_neur_x;
                    document.getElementById("neur_y2").innerHTML = this.selected_neur_y;
                    //todo 重新绘图 莫电压

                });
                document.getElementById("taskDetail_chip_neure_logoBox").style.display = 'block';
            });
        },

        // 3. 画识别时间图
        get_taskTimeEchart(ip, data) {
            /* line_task_time */
            get_task_time(ip, function (time) {
                pltWalkLine(
                    "taskTimeEchart",
                    data,
                    time,
                    undefined,
                    60,
                    "x",
                    "y/ms", 
                    "图像", 
                    "时间/ms"
                );
            });
        },

        // 4. 画膜电压曲线图和趋势图
        get_membraneVoltageEchart(ip, chipID, neur_x, neur_y, neur_index, line_trend_data) {
            /* membrane_voltage_line */
            get_membrane_voltage(ip, chipID, neur_x, neur_y, neur_index, function (data) {

                trancat(data, -300, 300);
                if (array_equal(data, new Array(data.length).fill(0))) {
                    return;
                }
                console.log("**********", data);
                pltArrayScatter(
                    "MembraneVoltageEchart",
                    data,
                    undefined,
                    "x",
                    "y/mv"
                );

                pltWalkLine(
                    "MembraneVoltageLineEchart",
                    line_trend_data,
                    array_mean(data),
                    undefined,
                    60,
                    "采样", 
                    "电压/mv"
                );
            }
            );

        }


    },


}


export { vue_taskDetail };