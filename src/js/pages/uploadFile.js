import { upload_file } from "../os/upload_model";
import { get_slave_boards } from "../os/get_slave_boards.js";

var vue_uploadModel = {
  name: "Node",
  data() {
    console.log("tets");
    return {

      dropdown_menu_options: [],  // 上传模型文件的下拉框选项
      selected_dropdown_value: "AUTO",  // 上传模式 默认值
    };
  },

  mounted() {
    let _this = this;
    _this.dropdown_menu_options = [
      {
        value: "AUTO",
        label: "AUTO",
      },
    ];

    get_slave_boards(function (slave_boards) {
      // console.log(slave_boards);
      /* _node_list */
      let board_ip_list = [];
      for (let i = 0; i < slave_boards.length; i++) {
        board_ip_list.push(slave_boards[i]["ip_address"].join("."));
      }
      console.log("call back: board_ip_list ", board_ip_list);

      for (let ip of board_ip_list) {
        _this.dropdown_menu_options.push({ value: ip, label: ip });
      }
      //_this.dropdown_menu_options = dropdown_menu_options;
      _this.selected_dropdown_value = "AUTO";
    });

  },

  watch: {

  },

  methods: {
    closeUploadResult() {
      document.getElementById('uploadResult').style.display = 'none';
    },

    upload_file,
  }
};


export { vue_uploadModel };
