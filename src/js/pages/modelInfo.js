import $ from "jquery";
import { get_slave_boards } from "../os/get_slave_boards.js";

var vue_model = {
    name: "Model",
    data() {
        return {
            runNodeInfo: [],  // 所有运行中节点数据
            modelFileList: [], // 所有运行节点上的模型文件

            // 搜索框功能
            searchByName: "",  //模型名称
            modelFilesShowed: [], // 根据用户搜索条件匹配到的要显示的模型文件列表，默认是全部

            // 弹出框结果展示
            modelDeployResult: 999,  // 部署模型后 后端返回值
            modelDeleteResult: 999,  // 模型删除结果
        };
    },
    mounted() {
        let _this = this;

        // 回调函数参数slave_boards是在线节点数组
        get_slave_boards(function (slave_boards) {
            // console.log(slave_boards);
            /* _node_list */
            let _node_list = [];
            let _model_list = [];
            for (let i = 0; i < slave_boards.length; i++) {
                let slave_board = slave_boards[i];
                let node = {
                    ip: slave_board["ip_address"].join("."),
                    id: slave_board["board_id"],
                    status: slave_board["board_status"],
                    chips: slave_board["chips"],
                    file_list: slave_board["file_list"],
                };
                _node_list.push(node);

                // console.log("ModelInfo Page: update_model_list func", node.id, node.file_list)

                // 统计所有在线节点的模型文件
                for (let j = 0; j < node.file_list.length; j++) {
                    let model_file = node.file_list[j];
                    // 模型文件状态值：0-ready, 1-已删除, 2-processing(下位机没使用), 3-running
                    if (model_file['model_status'] != 1) {
                        let model = {
                            id: model_file["model_id"],
                            name: model_file["model_name"],
                            nodeID: node.id,
                            nodeIP: node.ip,
                            size: model_file["model_size"],
                        }
                        _model_list.push(model);
                    }
                }

            }
            _this.runNodeInfo = _node_list;
            _this.modelFileList = _model_list;
            _this.modelFilesShowed = _this.modelFileList;
            console.log("runNodeInfo,,,:", _node_list);
            console.log("modelFilesShowed,,,:", _this.modelFilesShowed);
        });

        console.log("model page modelFilesShowed: ", this.modelFilesShowed)
    },
    watch: {

    },
    methods: {

        // 显示模型部署结果
        showDeployResult: function () {
            console.log("into func showDeployResult: ", this.modelDeployResult);
            document.getElementById('deployResult').style.display = 'block';
            // document.getElementById('app').style.display = 'block';
        },
        closeDeployResult: function () {
            document.getElementById('deployResult').style.display = 'none';
            // document.getElementById('app').style.display = 'none';
        },

        /* 搜索框实现 */
        searchModles() {
            // 获取用户输入的模型名称
            let searchNameVal = document.getElementById("searchByName").value;
            let searchTypeVal = document.getElementById("searchByType").value;   // 按类别分类暂时没有实现
            this.searchByName = searchNameVal.replace(/^\s*|\s*$/g, "");  //去除空格
            console.log("查询模型名字", this.searchByName);

            if (this.searchByName == "") {
                this.modelFilesShowed = this.modelFileList;
            }
            if (this.searchByName != "" && this.searchByName != undefined) {
                this.modelFilesShowed = [];
                for (let i = 0; i < this.modelFileList.length; i++) {
                    // 模糊匹配名字
                    if (this.modelFileList[i].name.includes(this.searchByName)) {
                        this.modelFilesShowed.push(this.modelFileList[i]);
                    }
                }
                // test
                // let model = { id: 1, name: 1, nodeID: 1, nodeIP: 1, size: 1, }
            }
        },

        /* 跳转到上传模型页面 */
        goUploadModelPage(router) {
            console.log("click upload model ")
            router.push({
                path: "/uploadModel",
            });
        },

        /* 部署模型，发送给模型所在节点的ip */
        // 部署后模型的status置为3-running
        task_deploy(key_ip, model_id) {
            let _this = this;
            console.log("start deploy the model", this.modelDeployResult);
            $.post(
                "http://" + key_ip + "/choosed_config/",
                {
                    model_id: model_id,
                },
                function (ret) {
                    console.log("choosed_config api:", ret);
                }
            );

            _this.sleep(5000);

            var task_deploy_interval_cnt = 0;
            var interval = setInterval(function () {
                task_deploy_interval_cnt++;

                if (task_deploy_interval_cnt > 5) {
                    _this.modelDeployResult = "task_deploy time out";
                    _this.showDeployResult();
                    clearInterval(interval);
                }

                $.post(
                    "http://" + key_ip + "/get_result/",
                    {
                        temp: 0,
                    },
                    function (ret) {
                        console.log("get_result api: ", ret);
                        if (ret == "task_deploy fails") {
                            console.log("deploy failed, ret: ", ret);
                        } else {
                            clearInterval(interval);
                            _this.modelDeployResult = ret.code;
                            _this.showDeployResult();
                            console.log("deploy ok, ret: ", ret);
                        }
                    }
                );
            }, 3000);
        },

        /* 删除模型文件 */
        // todo: 删除前加弹窗 确认+取消
        task_delete(ip, model_id) {
            $.post(
                "http://" + ip + "/delete_file/",
                {
                    model_id: model_id,
                },
                function (ret) {
                    console.log("model delete ret:", ret);
                }
            );
            // 删除任务后要更新模型文件列表。
            this.$router.go(0); // 会有短暂的闪烁现象
        },

        sleep(numberMillis) {
            var now = new Date();
            var exitTime = now.getTime() + numberMillis;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime)
                    return;
            }
        },
    }
};





export { vue_model };