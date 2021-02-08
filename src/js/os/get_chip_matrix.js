import { Struct } from "../utils/jsStruct";
import $ from "jquery";
import { get_output_neur } from "./get_output_neur"


function get_big_chip_matrix(ip_str, callback) {
  $.ajax({
    url: "http://" + ip_str + "/get_big_chip_matrix/",
    type: "POST",
    data: { type: "brain_electricity" },
    xhr: function () {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      return xhr;
    },
    success: function (blob_buf) {
      console.log("big    ", blob_buf);
      let reader = new FileReader();
      reader.readAsArrayBuffer(blob_buf);
      reader.onload = function () {
        let array_buffer = reader.result;
        let four_chip_matrix = Struct.create(
          Struct.array("one_chip_matrix", Struct.uint16(), 48 * 48)
          // 每个板子上有3组芯片，每组4个，2行2列排列，每个芯片有24*24个神经元簇，矩阵大小为48*48
        );
        let big_chip_matrix = Struct.create(
          Struct.array("four_chip_matrix", four_chip_matrix, 3) // 3组
        );

        let struct_length = 3 * 48 * 48 * 2; // 2是啥意思?
        let struct_num = Math.ceil(array_buffer.byteLength / struct_length);
        big_chip_matrix = big_chip_matrix.readStructs(
          array_buffer,
          0,
          struct_num
        );

        callback(big_chip_matrix);
      };
    },
    error: function (res) {
      console.log(res);
      // 错误时处理逻辑
    },
  });
}

// big_chip_matrix是整个12个芯片（3组），2*2排列
// chip_index: 0-11
function extract_one_chip_matrix(big_chip_matrix, chip_index) {
  let which_small_board = Math.floor(chip_index / 4); // 0-2编号
  let chip_x = Math.floor((chip_index % 4) / 2); // 0-1
  let chip_y = (chip_index % 4) % 2; // 0-1
  let npu_x_offset = chip_x * 24;
  let npu_y_offset = chip_y * 24;

  let data = [];
  let raw_data =
    big_chip_matrix[0].four_chip_matrix[which_small_board]
      .one_chip_matrix; /* shape: (48*48, ) */
  for (let i = 0; i < 24; i++) {
    data.push([]);
    for (let j = 0; j < 24; j++) {
      data[i].push(raw_data[i + npu_x_offset + (j + npu_y_offset) * 48]);
    }
  }
  return data;
}

// ip_str: 板子的ip地址，chip_index： 芯片编号
/**
 *  根据板子id获取整个板子上12个芯片的神经元状态图，然后根据芯片id绘图-画某单个芯片的图
 * @param {*} ip_str  板子的ip地址
 * @param {*} nodeID  板子的ID
 * @param {*} chip_index  芯片编号
 * @param {*} callback  回调函数
 */
function get_chip_matrix(ip_str, nodeID, chip_index, callback) {

  $.ajax({
    url: "http://192.168.1.254/get_big_chip_matrix/",
    type: "POST",
    data: {
      type: nodeID,
    },
    xhr: function () {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      return xhr;
    },
    success: function (blob_buf) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(blob_buf);
      reader.onload = function () {
        let array_buffer = reader.result;
        let four_chip_matrix = Struct.create(
          Struct.array("one_chip_matrix", Struct.uint16(), 48 * 48)
          // 每个板子上有3组芯片，每组4个，2行2列排列，每个芯片有24*24个神经元簇，矩阵大小为48*48
        );
        // big_chip_matrix 3组共12个芯片
        let big_chip_matrix = Struct.create(
          Struct.array("four_chip_matrix", four_chip_matrix, 3)
        );

        let struct_length = 3 * 48 * 48 * 2; // 2?
        let struct_num = Math.ceil(array_buffer.byteLength / struct_length);
        big_chip_matrix = big_chip_matrix.readStructs(
          array_buffer,
          0,
          struct_num
        );

        let which_small_board = Math.floor(chip_index / 4);
        let chip_x = Math.floor((chip_index % 4) / 2);
        let chip_y = (chip_index % 4) % 2;
        let npu_x_offset = chip_x * 24;
        let npu_y_offset = chip_y * 24;

        let data = [];
        // big_chip_matrix到底几个元素啊？定义是3，struct_length也是3？
        let raw_data = big_chip_matrix[0].four_chip_matrix[which_small_board].one_chip_matrix; /* shape: (48*48, ) */
        for (let i = 0; i < 24; i++) {
          for (let j = 0; j < 24; j++) {
            data.push([
              j,
              i,
              raw_data[i + npu_x_offset + (j + npu_y_offset) * 48],
            ]);
          }
        }
        console.log("big    ", big_chip_matrix[0]);

        // 获取输出神经元， 将data值置为-1，画图用红色表示。
        get_output_neur(ip_str, chip_index, function (output_neur_set) {

          for (let i = 0; i < data.length; i++) {
            let x = data[i][0];
            let y = data[i][1];
            if (output_neur_set.has(JSON.stringify([x, y]))) {
              data[i] = [x, y, -1];
            }
          }
          callback(data);
        });
      };
    },
    error: function (res) {
      console.log(res);
      // // 错误时处理逻辑
      // let data = [];
      // callback(data);
    },
  });
}

export { get_big_chip_matrix, extract_one_chip_matrix, get_chip_matrix };
