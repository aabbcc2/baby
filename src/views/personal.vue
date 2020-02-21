<template>
  <div>
      <div class="leftViews">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>借贷项目</span>
        </div>
        <ul>
          <li>
            <router-link to="/personal/tenderDetails">
              <el-button size="small" type="text">投标明细</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/tenderDetails">
              <el-button size="small" type="text">收款明细</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/repayment">
              <el-button size="small" type="text">借款项目</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/repayment">
              <el-button size="small" type="text">我的还款</el-button>
            </router-link>
          </li>
        </ul>
         </el-card>

                 <el-card class="box-card1">
        <div slot="header" class="clearfix">
          <span>我的账户</span>
        </div>
        <ul>
          <li>
            <router-link to="/personal/tenderDetails">
              <el-button size="small" type="text">个人资料</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/tenderDetails">
              <el-button size="small" type="text">绑定银行卡</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/repayment">
              <el-button size="small" type="text">登录记录</el-button>
            </router-link>
          </li>
        </ul>
         </el-card>


                 <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span>资产详情</span>
        </div>
        <ul>
          <li>
            <router-link to="/personal/tenderDetails">
              <el-button size="small" type="text">账户流水</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/tenderDetails">
              <el-button size="small" type="text">我要充值</el-button>
            </router-link>
          </li>
          <li>
            <router-link to="/personal/repayment">
              <el-button size="small" type="text">余额提现</el-button>
            </router-link>
          </li>
        </ul>
         </el-card>
      </div>
   
    <div class="rightViews">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.leftViews {
  position: absolute;
   left:120px;
}
/* 二级页面显示 */
.rightViews {
  /* 绝对定位 */
  position: absolute;
  right: 250px;
  top: 200px;
}
/* 左侧导航栏 */
.box-card,.box-card1,.box-card2 {
  width: 300px;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>