<template>
  <div class="uploadModel_page">
    <div class="clearfix thewrap uploadModel_top">
      <div class="row">
        <table class="uploadModel_page_table">
          <tbody>
            <tr>
              <td>
                <div class="uploadModel_input">
                  <button
                    type="button"
                    class="uploadModel_select_file_btn"
                    id="uploadModel_select_file"
                    onclick="upload_file_input.click();"
                  >
                    选择文件
                  </button>
                  <input
                    type="file"
                    id="upload_file_input"
                    style="display: none;"
                    @change="getUploadModelFile()"
                  />
                  <input
                    type="text"
                    class="uploadModel_select_file_txt"
                    id="uploadModel_select_file_ret"
                    readonly="readonly"
                    onclick="upload_file_input.click(); "
                    placeholder="未选择任何文件"
                  />
                </div>
              </td>
              <td>
                <div class="model_search_title">选择上传节点：</div>
              </td>
              <td>
                <div> 
                  <el-select
                    v-model="selected_dropdown_value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in dropdown_menu_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </td>
              <td>
                <div>
                  <button class="uploadModel_upload_btn"
                    type="button"
                    @click="
                      upload_file('upload_file_input', selected_dropdown_value)
                    "
                  >
                    提交文件
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div class="select-box">
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
      </div> -->
    </div>

    <div>
      <div id="uploadResult" class="alert-box">
        <p align="center" id="modelUploadResult"></p>
        <a
          href="javascript:void(0)"
          @click="closeUploadResult()"
          style="float: right"
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

