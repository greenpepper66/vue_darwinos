import $ from "jquery";
import { blob_to_uint32, extract_data } from "../utils/utils";


// 
/**
 * 获取输出神经元，
 * @param {*} ip_str 单个板子的ip 
 * @param {*} chip_index  芯片的id
 * @param {*} callback  回调函数
 */
function get_output_neur(ip_str, chip_index, callback) {
  $.ajax({
    url: "http://" + ip_str + "/get_result/",
    type: "post",
    data: { placeholder: 99 },
    cache: false,
    xhr: function () {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      return xhr;
    },
    success: function (blob_buf) {
      let output_neru_set = new Set();
      try {
        blob_to_uint32(blob_buf, function (data) {
          let chip_x = Math.floor(chip_index / 2);
          let chip_y = chip_index % 2;
          let npu_x_offset = chip_x * 24;
          let npu_y_offset = chip_y * 24;

          let raw_data_list = extract_data(data);
          for (let i = 0; i < raw_data_list.length; i += 2) {
            let raw_data = raw_data_list[i];
            let _temp = raw_data.toString(16);
            let x = (raw_data >> 6) & 0x0000003f;
            let y = (raw_data >> 0) & 0x0000003f;
            output_neru_set.add(
              JSON.stringify([x - npu_x_offset, y - npu_y_offset])
            );
            break;
          }
          console.log("try get output neru set ok:", output_neru_set);
          // callback(output_neru_set);
        });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("finally", output_neru_set);
        callback(output_neru_set); // 不管能不能获取输出神经元，都要执行callback
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

export { get_output_neur };
