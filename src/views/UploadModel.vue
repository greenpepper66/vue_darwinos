<template>
  <div class="uploadModel">
    <div class="clearfix thewrap top">
      <div class="select-box">
        <input type="file" id="file_upload" />
        <el-select v-model="selected_dropdown_value" placeholder="请选择">
          <el-option
            v-for="item in dropdown_menu_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="upload-box">
        <button
          type="button"
          @click="upload_file('file_upload', selected_dropdown_value)"
          class="upload-button"
        >
          提交文件
        </button>
      </div>
    </div>


    <div>
      <div id="uploadResult" class="alert-box">
        <p align="center" id="modelUploadResult"></p>
        <a href="javascript:void(0)" @click="closeUploadResult()" style="float: right"
          >关闭</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { vue_uploadModel } from "../js/pages/uploadFile";
export default vue_uploadModel;
</script>


<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.thewrap {
  margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: auto;
}
.top {
  height: 100px;
  overflow: auto;
}
.select-box {
  height: 60%;
  width: 70%;
  float: left;
  margin: 0 auto;
  display: inline;
  margin-top: 20px;
}
.upload-box {
  width: 30%;
  height: 60%;
  float: right;
  margin: 0 auto;
  display: inline;
  margin-top: 20px;
}
.upload-button {
  width: 80%;
  height: 80%;
  display: block;
  margin: 0 auto;
  border-width: 0;
}

#file_upload {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  margin-right: 20px;
}
#file_upload input {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
