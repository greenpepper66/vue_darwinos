
import { get_slave_boards } from "../os/get_slave_boards.js";
import { extract_model_list } from "../os/extract_model_list";
import { get_task_time } from "../os/get_task_time";
import $ from "jquery";
import { format } from "echarts";

var vue_task = {
    name: "Task",
    data() {
        return {
            model_list: [],

            // 搜索框功能
            searchByName: "",  //模型名称
            tasksShowed: [], // 根据用户搜索条件匹配到的要显示的模型文件列表，默认是全部
        };
    },
    mounted() {
        let _this = this;

        let p = -1;
        // 不断更新任务列表
        _this.update_task_list();  // 获取任务列表
        let main_interval = setInterval(function () {

            if (p < 0) {
                p += 1;
            } else if (p < _this.model_list.length) {
                let item = _this.model_list[p];
                let ip_str = item["ip"];
                // 一个板子上只有一个模型，一个模型对应一个任务，
                // 也就是说一个板子上只有一个任务在运行，根据ip可以获取
                get_task_time(ip_str, function (time) {  // 获取任务运行时间
                    item["time"] = time.toFixed(3) + "ms";
                });

                p += 1;
            } else {
                p = -1;
            }
        }, 100);



    },
    watch: {},
    methods: {

        /* 搜索框实现 */
        searchTasks() {
            // 获取用户输入的模型名称
            let searchNameVal = document.getElementById("searchByTaskName").value;
            let searchTypeVal = document.getElementById("searchByTaskType").value;   // 按类别搜索暂时没有实现
            this.searchByName = searchNameVal.replace(/^\s*|\s*$/g, "");  //去除空格
            console.log("查询任务名字", this.searchByName);

            if (this.searchByName == "") {
                this.tasksShowed = this.model_list;
            }
            if (this.searchByName != "" && this.searchByName != undefined) {
                this.tasksShowed = [];
                for (let i = 0; i < this.model_list.length; i++) {
                    // 模糊匹配名字
                    if (this.model_list[i].name.includes(this.searchByName)) {
                        this.tasksShowed.push(this.model_list[i]);
                    }
                }
                // test
                // let model = { id: 1, name: 1, nodeID: 1, nodeIP: 1, size: 1, }
            }
        },

        /* 跳转到任务详情界面 */
        goto_taskDetail(router, index) {
            let board = this.model_list[index].board;
            let model_id = this.model_list[index].id;
            console.log("goto_taskDetail: ", board, model_id);
            router.push({
                path: "/taskDetail",
                query: {
                    nodeID: board,
                    modelID: model_id,
                },
            });
        },

        /* start task */
        task_start(index) {

            let ip = this.model_list[index].ip;
            let model_id = this.model_list[index].id;
            console.log("start a task: ", ip, model_id);
            $.post(
                "http://" + ip + "/choosed_input/",
                {
                    model_id: model_id,
                },
                function (ret) {
                    console.log(ret);
                    alert(ret);
                }
            );
        },

        /* stop task */
        task_stop(index) {
            let ip = this.model_list[index].ip;
            let model_id = this.model_list[index].id;
            console.log("stop a task: ", ip, model_id);
            $.post(
                "http://" + ip + "/terminate_input/",
                {
                    model_id: model_id,
                },
                function (ret) {
                    console.log(ret);
                    alert(ret);
                }
            );
        },

        task_delete(index) {
            let ip = this.model_list[index].ip;
            let model_id = this.model_list[index].id;
            $.post(
                "http://" + ip + "/delete_file/",
                {
                    model_id: model_id,
                },
                function (ret) {
                    console.log(ret);
                    alert(ret);
                }
            );
        },

        // 任务重启
        task_reset(index) {
            let ip = this.model_list[index].ip;
            let model_id = this.model_list[index].id;
            console.log("reset a task: ", ip, model_id);
            $.post(
                "http://" + ip + "/asic_reset/",
                {
                    model_id: model_id,
                },
                function (ret) {
                    console.log(ret);
                    alert(ret);
                }
            );
        },

        // 更新任务列表
        update_task_list() {
            console.log("update task list fun.. ");
            get_slave_boards((slave_boards) => {
                // 按照模型状态区分，3-运行
                let _model_list = extract_model_list(slave_boards, [0, 1, 2]);
                this.model_list = _model_list;

                // if (this.model_list.length != 0) {
                //     for (let i = 0; i < this.model_list.length; i++) {
                //         let item = this.model_list[i];
                //         let ip_str = item["ip"];
                //         // 一个板子上只有一个模型，一个模型对应一个任务，
                //         // 也就是说一个板子上只有一个任务在运行，根据ip可以获取
                //         get_task_time(ip_str, function (time) {  // 获取任务运行时间
                //             console.log(time.toFixed(3) + "ms")
                //             item["time"] = time.toFixed(3) + "ms";
                //         });
                //     }
                // }
            });
        },
    },
}

export { vue_task };