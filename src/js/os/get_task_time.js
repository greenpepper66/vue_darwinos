import { array_mean, extract_data } from "../utils/utils";
import $ from "jquery";
import { Struct } from "../utils/jsStruct";

/* line_task_time */
function get_task_time(ip_str, callback) {
  $.ajax({
    url: "http://" + ip_str + "/get_result/",
    type: "post",
    data: { op: 97 },
    xhr: function () {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      return xhr;
    },
    success: function (blob_buf) {
      // console.log("task time: ", blob_buf);
      let time = 0;
      try {
        let reader = new FileReader();
        reader.readAsArrayBuffer(blob_buf);
        reader.onload = function () {
          let array_buffer = reader.result;
          let struct_length = 4;
          let struct_num = Math.ceil(array_buffer.byteLength / struct_length);
          let raw_data_struct = Struct.create(
            Struct.array("raw_data", Struct.uint32(), struct_num)
          );
          let raw_data_0 = raw_data_struct.readStructs(array_buffer, 0, 1)[0]["raw_data"];
          let raw_data = extract_data(raw_data_0);

          let time_list = [];
          for (let i = 0; i < raw_data.length; i += 2) {
            let x = raw_data[i + 1] / raw_data[i];
            if (!isNaN(x)) {
              time_list.push(x);
            }
          }

          time = array_mean(time_list) / 1000;
          callback(time);
        };
      } catch (err) {
        console.log("get runtime err: ", err);
      } finally {
        //console.log("get task time ok: ", time);
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
}

export { get_task_time };
