<template>
  <div>
    <div class="toubiaoxinxi">
      <h3 class="text-info" style="margin-top: 20px;">
        <span>{{borrow.title}}</span>
        <small>
          <label class="label label-primary">信</label>
        </small>
      </h3>
      <div>
        <table width="100%" height="250px">
          <tbody>
            <tr>
              <!-- absolute -->
              <td class="muted">借款人</td>
              <td
                class="text-info"
                style=" position:absolute;padding-left:50px;padding-top:13px"
                colspan="3"
              >
                <span>{{borrow.borrowUsername}}</span>
              </td>
            </tr>
            <tr>
              <td class="muted" with="80px">借款金额</td>
              <td class="text-info" width="120px" style="padding-left: 10px;">
                <span>{{borrow.borrowAmount}}</span>
              </td>
              <td class="muted" width="80px">年化利率</td>
              <td class="text-info" style="padding-left: 10px;">
                <span id="yearRate">{{borrow.yearRate}}%</span>
              </td>
            </tr>
            <tr>
              <td class="muted">借款期限</td>
              <td class="text-info" style="padding-left: 10px;">
                <span id="repaymentMonth">{{borrow.repaymentMonth}}期</span>
              </td>
              <td class="muted">总利息</td>
              <td class="text-info" style="padding-left: 10px;">
                <span>{{borrow.totalInterest}}元</span>
              </td>
            </tr>
            <tr>
              <td class="muted">还款方式</td>
              <td class="text-info" style="padding-left: 10px;">
                <span>{{ borrow.repaymentType==1?'等额本息':'先息后本' }}</span>
              </td>
              <td class="muted">最小投标</td>
              <td class="text-info" style="padding-left: 10px;">50元</td>
            </tr>
            <tr>
              <td class="muted">剩余时间</td>
              <td class="text-info" style="padding-left: 10px;" colspan="3">
                <div id="bidDeadline"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="toubiaoinforight">
      <table style="height:110px; width:230px;">
        <tbody>
          <tr>
            <td class="muted">投标总数</td>
            <td class="text-info" style="padding-left: 10px;">
              <span>{{borrow.bidNum}}</span>
            </td>
          </tr>
          <tr>
            <td class="muted">还需金额</td>
            <td class="text-info" style="padding-left: 10px;">
              <span id="lastAmount">{{borrow.borrowAmount-borrow.currentBidAmount}}元</span>
            </td>
          </tr>
          <tr>
            <td class="muted">投标进度</td>
            <td class="text-info" style="padding-left: 10px;">
              <span id="bidPercent">100%</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 投资面板 Begin -->
      <form
        id="editForm"
        action="http://49.232.162.73:8080/finance/bid/add"
        method="post"
        style="display: none;"
      >
        <div class="form-group">
          <input
            class="form-control input-sm"
            id="showBidAmount"
            name="showBidAmount"
            autocomplete="off"
            placeholder="请输入投标金额"
          />
        </div>
        <div class="form-group">
          <input type="hidden" id="bidUserId" name="bidUserId" value />
          <input type="hidden" id="bidUsername" name="bidUsername" value />
          <input type="hidden" id="borrowId" name="borrowId" value />
          <input type="hidden" id="bidAmount" name="bidAmount" value />
          <button id="bidBtn" class="btn btn-danger btn-block">马上投标</button>
        </div>
      </form>
      <!-- 投资面板 End -->

      <!-- 借款人信息 -->
      <div class="panel panel-default myborrowtop">
        <div class="panel-heading">借款人信息</div>
        <div class="panel-body">
          <table>
            <tbody>
              <tr>
                <td class="muted text-right" width="140px;">真实姓名</td>
                <td width="150px;" style="padding-left: 10px;" class="text-info">
                  <span id="realname">{{userInfo.realname}}</span>
                </td>
                <td class="muted text-right" width="140px;">身份证号码</td>
                <td width="150px;" style="padding-left: 10px;" class="text-info">
                  <span id="idCardNumber">{{userInfo.idCardNumber}}</span>
                </td>
                <td class="muted text-right" width="140px;">注册时间</td>
                <td width="150px;" style="padding-left: 10px;" class="text-info">
                  <span id="createTime">{{userInfo.createTime}}</span>
                </td>
              </tr>
              <tr>
                <td class="muted text-right" width="140px;">文化程度</td>
                <td width="150px;" style="padding-left: 10px;" class="text-info">
                  <span id="eduBackgroundId">{{userInfo.eduBackgroundId}}</span>
                </td>
                <td class="muted text-right" width="140px;">住房条件</td>
                <td width="150px;" style="padding-left: 10px;" class="text-info">
                  <span id="houseConditionId">{{userInfo.houseConditionId}}</span>
                </td>
                <td class="muted text-right">年收入</td>
                <td style="padding-left: 10px;" class="text-info">
                  <span id="incomingLevelId">{{userInfo.incomeLevelId}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 收款人信息end -->
      <!-- 还款记录面板 -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <div style="font-size: 16px;">还款记录</div>
        </div>
        <div class="panel-body">
          <table id="tblRepayment" class="table table-striped">
            <thead>
              <tr>
                <th class="huankuanren">还款时间</th>
                <th class="huankuanren">还款期数</th>
                <th class="huankuanren">还款金额</th>
                <th class="huankuanren">还款状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tRepaymentDetail" :key=item.id>
                <td class="huankuanren2">
                  <p>{{item.createTime}}</p>
                </td>
                <td style="padding-right: 230px;">
                  <p>{{item.period}}</p>
                </td> 
                <td style="padding-right: 228px;">
                  <p>{{item.totalAmount}}</p>
                </td>
                <td style="padding-right: 228px;">
                  <p>{{item.satae}}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 还款记录面板end -->
      <!-- 投标记录 -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <div style="font-size: 16px;">投标记录</div>
        </div>
        <div class="panel-body">
          <table id="tblBid" class="table table-striped">
            <thead>
              <tr>
                <th class="toubiaoren">投标人</th>
                <th class="toubiaoren">投标金额</th>
                <th class="toubiaoren">投标时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tBid" :key=item.id>
                <td class="huankuanren2">{{item.bidUsername}}</td>
                <td style="padding-right: 228px;">{{item.bidAmount}}元</td>
                <td style="padding-right: 228px;">{{item.createTime}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 投标记录end -->
    </div>
  </div>
</template>

<script>
import {getAllBorrow} from "../api/borrow"
import {getUserInfo} from "../api/userInfo"
import {findDetailByBorrowId} from "../api/tRepaymentDetail"
import {findTBidByborrowId} from "../api/tBid"
export default {
  name: "chakan",
  data() {
    return {
      //投标项目信息
      borrow: {
        borrowUserId: 0, //借款人id
        borrowUsername: "", //借款人用户名
        title: "", //借款标题
        description: "", //借款描述
        borrowType: "", //借款类型
        borrowState: "", //借款状态
        borrowAmount: "", //借款总金额(单位：分)
        yearRate: "", //..年化率
        repaymentMonth: "", //还款期数
        bidNum: "", //已投标数量
        totalInterest: "", //总回报金额
        currentBidAmount: "", //当前已投标金额(单位：分)
        currentBidInterest: "", //当前已投标利息(单位：分)
        bidDeadline: "", //招标截止日期
        bidDays: "", //招标天数
        applyTime: "" //申请时间
      },
      //借款人消息
      userInfo:{
        realname:'',//真实姓名
        idCardNumber:'',//身份证号码
        incomeLevelId:'',//收入
        marriageId:'',//婚姻状况
        eduBackgroundId:'',//教育背景id
        houseConditionId:'',  //住房情况id
        createTime:'' //创建时间
      },
      //还款记录
      tRepaymentDetail:[],
      //投标记录
      tBid:[]
    };
  },
  created() {
      this.getAllBorrow()
      this.findDetailByBorrowId()
      this.findTBidByborrowId()
  },
  methods: {
      getAllBorrow(){
           getAllBorrow({id: this.$route.params.id})
      .then(response=>{
          this.borrow = response.data.result.datalist
          console.log(this.borrow.borrowUserId)
          //查询借款人信息
          this.getUserInfo2(this.borrow.borrowUserId)
       })
      },
      //查询借款人信息
      getUserInfo2(borrowUserId){
        getUserInfo({borrowUserId: borrowUserId})
      .then(response=>{
          this.userInfo = response.data.result.model
        })
      },
      //查询还款记录
      findDetailByBorrowId(){
        findDetailByBorrowId({id:this.$route.params.id})
        .then(response=>{
          this.tRepaymentDetail = response.data.result.model
        })
      },
      //查询投标记录
      findTBidByborrowId(){
        findTBidByborrowId({id:this.$route.params.id})
       .then(response=>{
         this.tBid = response.data.result.model
          console.log(response.data.result.model)
      })
      }
  }
};
</script>

<style>
/* 投标信息右边的样式 */
.toubiaoinforight {
  position: absolute;
  margin-top: 65px;
  margin-left:900px;
}
/* 借款人信息头部magrin样式 */
.myborrowtop {
  margin-top: 200px;
}
/* 投标信息样式 */
.toubiaoxinxi {
  width: 50%;
  float: left;
  /* position: relative; */
  min-height: 1px;
  padding-right: 20px;
  padding-left: 150px;
}
h3 {
  font-size: 24px;
}
.text-info {
  color: #09d;
}

.label {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
}

.label-primary {
  background-color: #337ab7;
}
.muted {
  color: #999;
}
td,
th {
  padding: 0;
}
td {
  display: table-cell;
  vertical-align: inherit;
}
.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
}
.panel-body {
  padding: 15px;
}
.form-group {
  margin-bottom: 15px;
}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-default {
  width:1150px;
  position:relative ;
  margin-right:1000px;
  margin-left:-800px;
  border-color: #ddd;
}
.huankuanren{
padding-right:200px;
}
.huankuanren2{
padding-right:100px;
float:left;
}
.toubiaoren{
  padding-right:210px;
}
</style>