import { extract_data } from "../utils/utils";
import $ from "jquery";
import { Struct } from "../utils/jsStruct";
import { app_name } from "../conf/config"

function get_membrane_voltage(
  ip_str,
  chip_index,
  neur_x,
  neur_y,
  neur_index,
  callback
) {
  var daughter_board_id = chip_index % 3;
  var npu_x_offset = Math.floor(chip_index / 2) * 24;
  var npu_y_offset = (chip_index % 2) * 24;

  $.post(
    "http://" + ip_str + "/choosed_npu/",
    {
      daughter_board_id: daughter_board_id,
      npu_x: neur_x + npu_x_offset,
      npu_y: neur_y + npu_y_offset,
      neuron_x: neur_index,
    },
    function (ret) {
      console.log("choosed_npu " + ret);

      /* membrane_voltage */
      $.ajax({
        url: "http://" + ip_str + "/get_result/",
        type: "post",
        data: { placeholder: 98 },
        cache: false,
        xhr: function () {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          return xhr;
        },
        success: function (blob_buf) {
          _get_membrane_voltage(blob_buf, callback);
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  );
}

function _extract_membrane_voltage(result) {
  // for (let i = 0; i < result.length; i++) {
  //   console.log(result[i].toString(16));
  // }
  var vth = [];
  let x = 0;
  for (var i = 0; i + 1 < result.length; i += 2) {
    let num = Number(result[i + 1]);
    // var num = Number(result[i]);
    if ((num >> 19) % 2 == 1) {
      x = (num % (1 << 19)) - (1 << 19);
    } else {
      x = num % (1 << 20);
    }
    if (!isNaN(x)) {
      vth.push(x);
    } else {
      console.log([num, x]);
    }
  }
  return vth;
}

function _get_membrane_voltage(blob_buf, callback) {
  var array_buffer;
  var reader = new FileReader();
  reader.onload = function () {
    array_buffer = reader.result;

    var struct_length = 4;
    var data_num = Math.ceil(array_buffer.byteLength / struct_length);
    var _c_struct = Struct.create(
      Struct.array("membrane_voltage", Struct.uint32(), data_num)
    );
    var _instantaneous_result = _c_struct.readStructs(array_buffer, 0, 1);
    _instantaneous_result = _instantaneous_result[0].membrane_voltage;
    _instantaneous_result = extract_data(_instantaneous_result);
    console.log(app_name);
    if (app_name == "liuqianhui") {
      /* for app_nao_dian */
      let _temp = [];
      for (let i = 0; i + 1 < _instantaneous_result.length / 2; i += 80) {
        let x = _instantaneous_result[i];
        if (!isNaN(x)) {
          _temp.push(_instantaneous_result[i]);
          _temp.push(_instantaneous_result[i + 1]);
        } else {
          console.log(x);
        }
      }
      _instantaneous_result = _temp;
    }
    _instantaneous_result = _extract_membrane_voltage(_instantaneous_result);
    callback(_instantaneous_result);
  };
  reader.readAsArrayBuffer(blob_buf);
}

export { get_membrane_voltage };
