import { get_slave_boards } from "../os/get_slave_boards.js";
import $ from "jquery";

var vue_data = {
    name: "App",
    data() {
        return {}
    },
    mounted() {
        let _this = this;
        // 回调函数参数slave_boards是在线节点数组
        get_slave_boards(function (slave_boards) {

            let nodes = [];

            for (let i = 0; i < slave_boards.length; i++) {
                let slave_board = slave_boards[i];
                let node = {
                    ip: slave_board["ip_address"].join("."),
                    id: slave_board["board_id"],
                    status: slave_board["board_status"],
                    chips: slave_board["chips"],
                    file_list: [],
                };

                let modelFiles = [];
                // 取有效的模型信息
                for (let j = 0; j < slave_board["file_list"].length; j++) {
                    let model_file = slave_board["file_list"][j];
                    if (model_file['model_status'] != 1 && model_file['model_size'] != 0) {
                        let model = {
                            id: model_file["model_id"],
                            name: model_file["model_name"],
                            nodeID: node.id,
                            nodeIP: node.ip,
                            size: model_file["model_size"],
                        }
                        modelFiles.push(model);
                    }
                }
                node.file_list = modelFiles;
                nodes.push(node);
            }
            let boardsInfoJson = {};
            for (let j = 0; j < nodes.length; j++) {
                boardsInfoJson[j] = nodes[j];
            }
            var jdata = JSON.stringify(boardsInfoJson);

            // var jsonFormat = _this.formatJson(jdata);
            // document.write(jsonFormat);
            $('#boardsData').html(jdata);
            // jdata实例： '{"0":{"ip":"192.168.1.254","id":1,"status":1,"chips":[0,0,0,0,0,0,0,0,0,0,0,0],"file_list":[]},"1":{"ip":"192.168.1.4","id":2,"status":1,"chips":[0,0,0,0,0,0,0,0,0,0,0,0],"file_list":[]},"2":{"ip":"192.168.1.5","id":3,"status":1,"chips":[0,0,0,0,0,0,0,0,0,0,0,0],"file_list":[{"id":930,"name":"config.b","nodeID":3,"nodeIP":"192.168.1.5","size":23600}]}}'
        });
    },

    methods: {
        formatJson: function (msg) {
            var rep = "~";
            var jsonStr = JSON.stringify(msg, null, rep)
            var str = "";
            for (var i = 0; i < jsonStr.length; i++) {
                var text2 = jsonStr.charAt(i)
                if (i > 1) {
                    var text = jsonStr.charAt(i - 1)
                    if (rep != text && rep == text2) {
                        str += "<br/>"
                    }
                }
                str += text2;
            }
            jsonStr = "";
            for (var i = 0; i < str.length; i++) {
                var text = str.charAt(i);
                if (rep == text)
                    jsonStr += "&nbsp;&nbsp;&nbsp;&nbsp;"
                else {
                    jsonStr += text;
                }
                if (i == str.length - 2)
                    jsonStr += "<br/>"
            }
            return jsonStr;
        }
    },
};

export { vue_data };