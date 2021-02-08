function extract_model_list(slave_boards, exclude_model_status_list = [0]) {
  let app_file_list = [];
  let exclude_model_status_dict = {};  // 不包含的模型状态
  for (let i = 0; i < exclude_model_status_list.length; i++) {
    let value = exclude_model_status_list[i];
    exclude_model_status_dict[value] = value;
  }
  for (let i = 0; i < slave_boards.length; i++) {
    let board_info = slave_boards[i];
    if (board_info["board_status"] != 1) {
      continue;
    }
    for (var j = 0; j < board_info["file_list"].length; j++) {
      let file = board_info["file_list"][j];
      if (file["model_status"] in exclude_model_status_dict) {
        continue;
      }
      let _file = {};
      _file["name"] = file["model_name"];
      _file["id"] = file["model_id"];
      _file["board"] = board_info["board_id"];
      _file["ip"] = board_info["ip_address"].join(".");
      _file["size"] = file["model_size"];
      _file["time"] = 0;
      app_file_list.push(_file);
    }
  }
  return app_file_list;
  // this.file_list = app_file_list;
}

export { extract_model_list };
