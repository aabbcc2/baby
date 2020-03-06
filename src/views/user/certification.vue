<template>
  <!-- 实名认证页面 -->
  <div class="bankcard">

    <el-card class="box-card" v-if="model.state == 1">
      <div slot="header" class="clearfix">
        <span class="formspan">实名认证</span>
      </div>
      <el-alert
        title="实名认证资料已经提交,等待业务员审核,请耐心等待:如果急需审核请联系容服！"
        type="info"
        close-text="知道了"
        show-icon>
      </el-alert>
      <!--<span style="color:#4e49f2"></span>-->
    </el-card>
    <el-card class="box-card" v-else-if="model.state == 2">
      <div slot="header" class="clearfix">
        <span class="formspan">实名认证</span>
      </div>
      <el-alert
        title="你已经成功通过实名认证！"
        type="success"
        close-text="知道了"
        show-icon>
      </el-alert>
      <br/>
      <el-form label-width="80px" :inline="true" :model="model" class="demo-form-inline" disabled="true">
        <el-form-item label="真实姓名:">
          <el-input v-model="model.realname" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别 : ">
          <el-select v-model="model.sex.toString()" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码:">
          <el-input v-model="model.idNumber" placeholder="请输入证件号码" clearable></el-input>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-input v-model="model.birthDate" placeholder="请输入证件号码" clearable></el-input>
        </el-form-item>
      </el-form>
      <!--<label style="color:green;text-align: right"></label>-->
    </el-card>
    <el-card class="box-card" v-else>
      <div slot="header" class="clearfix">
        <span class="formspan">实名认证</span>
      </div>
      <span style="color:red">为保护您账户安全，实名认证之后，不能自己修改，请认真填写！</span>
      <br/>

      <el-form label-width="80px" :inline="true" :model="model" class="demo-form-inline">
        <el-form-item label="用户名: ">
          <el-input v-model="model.username" clearable></el-input>
        </el-form-item>
        <br/>

        <el-form-item label="姓名:">
          <el-input v-model="model.realname" clearable></el-input>
        </el-form-item>
        <br/>

        <el-form-item label="性别 : ">
          <el-select v-model="model.sex.toString()" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br/>

        <el-form-item label="证件号码:">
          <el-input v-model="model.idNumber" placeholder="请输入证件号码" clearable></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="出生日期:">
          <el-input v-model="model.birthDate" placeholder="请输入证件号码" clearable></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="证件地址:">
          <el-input v-model="model.address" placeholder="请输入证件号码" clearable></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="身份证图片:" label-width="86px">
          <span style="color:blue">请点击选择图片，选择身份证正反面图片。</span>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :file-list="fileList"
            :multiple="isMultiple"
            :on-preview="handlePictureCardPreview"
            :on-success="showResult"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-error="imgUploadError"
            style="padding-right: 78px;">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submint">提交认证</el-button>
    </el-card>
  </div>
</template>

<script>
  import {save} from '../../api/baseManager.js'
  import {getUserRealauth} from '../../api/realauth/realauth.js'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        isMultiple: false,
        realname: "",
        value: "",
        model: {
          id: '1',
          userId: '',
          realname: '',
          username: '',
          sex: '',
          idNumber: '',
          birthDate: '',
          address: '',
        },
        fileList: []
      };
    },
    created() {
        this.getUserRealauth()
    },
    methods: {
      getUserRealauth() {
        getUserRealauth(1).then(res => {
          this.model = res.data.result
          this.fileList.push({url:this.model.image1},{url:this.model.image2})
        })
      },
      submint() {
        // 提交实名认证信息
        let params = {
          id:this.model.id,
          applierId: this.model.applierId,
          realname: this.model.realname,
          sex: this.model.sex,
          idNumber: this.model.idNumber,
          birthDate: this.model.birthDate,
          address: this.model.address,
          state: this.model.state,
          image1: this.fileList[0].url,
          image2: this.fileList[1].url
        }
        debugger
        let url = 'http://localhost:21001/work/user/realauth/submitRealauth'
        save(params, url).then(response => {
          let result = response.data.result
          let success = response.data.success
          console.log('model' + result)
          if (success) {
            this.$message.success("提交成功！")
            this.$router.go(0)//新增结束，直接页面刷新
            //v-if判断是否绑定，如果未绑定则新增，绑定则查询
          } else {
            let message = response.message
            this.$message.error('保存失败,' + message)
          }
        })
      },
      handleExceed(files, fileList) {//图片上传超过数量限制
        this.$message.error('上传图片不能超过8张，请先删除再进行上传!');
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      imgUploadError(err, file, fileList) {//图片上传失败调用
        console.log(err)
        this.$message.error('上传图片失败!');
      },
      showResult(res, file) {
        uploadImg({imageUrl: res.result}).then(response => {
          console.log(response)
        })
      },
      handleRemove(file) {
        debugger
        this.removeId = file.id
        deleteRecordHome({
          recordId: this.removeId
        }).then(response => {
          const {
            message
          } = response
          console.log(message)
        })
      },
    }
  };
</script>

<style scoped>
  /* Card卡片 */
  .box-card {
    width: 850px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix {
    font-size: 18px;
    text-align: left;
  }
</style>>
