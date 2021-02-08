import { Struct } from "./jsStruct";

function arrayBufferToBuffer(arrayBuffer) {
  var buf = new Buffer(arrayBuffer.byteLength);
  var view = new Uint8Array(arrayBuffer);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

function extract_data(raw_data) {
  var p = 0;
  var ret = [];
  var slice_len = 0;
  while (p < raw_data.length) {
    slice_len = Number(raw_data[p]);
    ret = ret.concat(raw_data.slice(p + 1, p + 1 + slice_len));
    p += slice_len + 1;
  }
  return ret;
}

/********************************************************
 * description: caculate sum of number array
 * parameters:
 *   array_: number array
 * return:
 *   sum: sum of number array
 * author: happy
 * date: 20200713
 *********************************************************/
function array_sum(array_) {
  var sum = 0;
  for (var i = 0; i < array_.length; i++) {
    sum += array_[i];
  }
  return sum;
}

/********************************************************
 * description: if two array have same element, return true
 * parameters:
 *   array1: number array
 *   array2: number array
 * return:
 *   is_same: true/false
 * author: happy
 * date: 20200713
 *********************************************************/
function array_equal(array1, array2) {
  if (array1.length != array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
}

/********************************************************
 * description: insert x to data(array), if the length of data
 *           is too long, the first item of data will be removed
 * parameters:
 *   input:
 *     x: number
 *   output:
 *     data: number array
 * author: happy
 * date: 20200713
 *********************************************************/
function walk_data(data, x, data_length = 60) {
  if (data.length == 0) {
    data.push([0, x]);
  } else {
    data.push([data[data.length - 1][0] + 1, x]);
  }

  if (data.length > data_length - 1) {
    data.shift();
  }
}

function array_mean(array_) {
  var avg = 0;
  for (var i = 0; i < array_.length; i++) {
    avg = (avg * i + array_[i]) / (i + 1);
  }
  return avg;
}

function blob_to_uint32(blob_buf, callback) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(blob_buf);
  reader.onload = function (e) {
    let array_buffer = reader.result;
    var struct_length = 4;
    var struct_num = Math.ceil(array_buffer.byteLength / struct_length);
    var _uint32_array = Struct.create(
      Struct.array("uint32_array", Struct.uint32(), struct_num)
    );
    _uint32_array = _uint32_array.readStructs(array_buffer, 0, 1);
    _uint32_array = _uint32_array[0].uint32_array;
    var uint32_array = [];
    for (var i = 0; i < _uint32_array.length; i++) {
      uint32_array.push(Number(_uint32_array[i]));
    }
    callback(uint32_array);
  };
}

function trancat(array, min, max) {
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.min(Math.max(array[i], min), max)
  }
}

export {
  extract_data,
  array_sum,
  array_equal,
  walk_data,
  array_mean,
  blob_to_uint32,
  arrayBufferToBuffer,
  trancat
};
