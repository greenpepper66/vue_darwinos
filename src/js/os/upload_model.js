import $ from "jquery";

// 弹出框
function showUploadResult(msg) {
  console.log("into func showUploadResult: ");
  document.getElementById("modelUploadResult").innerHTML = msg;
  document.getElementById('uploadResult').style.display = 'block';
}


function upload_file_to_ip(file, ip) {
  var formdata = new FormData(); //生成一个FormData对象
  formdata.append("upload_file", file); //放文件

  $.ajax({
    url: "http://" + ip + "/upload/",
    type: "post", //请求类型
    async: false,
    processData: false, //不预处理数据  因为FormData 已经做了
    contentType: false, //我不指定编码了 因为FormData 已经做了
    data: formdata,

    success: function (data) {
      console.log(data);
      // alert(data);
      showUploadResult("上传结果：" + data);
    },
  });
}

function upload_file(fileElementId, ip_specified = "AUTO") {
  var $ = require("jquery");
  var md5 = require("../utils/md5.js").md5;
  var arrayBufferToBuffer = require("../utils/utils.js").arrayBufferToBuffer;
  let master_ip_str = "192.168.1.254";

  var file = $("#" + fileElementId)[0].files[0]; //拿到上传文件
  if (file == undefined) {
    // alert("没有选中文件");
    showUploadResult("提示：没有选中文件");
    return;
  }
  var md5_hash = 0;
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {
    let arraybuffer = reader.result;
    let buffer = arrayBufferToBuffer(arraybuffer);
    md5_hash = md5(buffer);
    console.log([file.name, md5_hash].join(" "));

    $.ajax({
      url: "http://" + master_ip_str + "/upload_request_ip/",
      type: "post", //请求类型
      data: {
        stage: 0,
        file_name: file.name,
        md5_hash: md5_hash,
      },
      success: function (ret) {
        console.log("upload ret: ", ret)
        if (ret.code == -1) {
          // alert("the same file is already exists");
          showUploadResult("提示：文件已存在");
          return;
        }
        let upload_ip = 0;

        if (ip_specified != "AUTO") {
          upload_ip = ip_specified;
        } else {
          upload_ip = ret.slave_ip;
        }
        $.ajax({
          url: "http://" + upload_ip + "/upload_request_ip/",
          type: "post", //请求类型
          data: {
            stage: 1,
            file_name: file.name,
            md5_hash: md5_hash,
            file_id: ret.file_id,
          },
          success: function (data) {
            if (data.code != 0) {
              // alert("the same file is already exists");
              return;
            }

            console.log("upload to " + upload_ip);
            upload_file_to_ip(file, upload_ip);
          },
        });
      },
      error: function (res) {
        console.log(res);
        // 错误时处理逻辑
      },
    });
  };
}

export { upload_file };