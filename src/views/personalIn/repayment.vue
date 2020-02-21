<template>
  <!-- 个人中心我的还款页面 -->
  <div class="file-container">
    <!-- 条件查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="还款期限">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <!-- 还款分页 根据借款id查询还款信息-->
      <div class="page">
        <div>
          <span class="formspan">还款明细</span>
          <!-- 点击按钮,跳转到充值界面 -->
          <el-button style="float:right" type="primary" @click="chongzhi">账户充值</el-button>
        </div>
        <el-table :data="tableData" :cell-style="setCellStyle" style="width: 100%">
          <el-table-column prop="borrowTitle" label="借款标题" width="150"></el-table-column>
          <el-table-column prop="totalAmount" label="还款金额" width="120"></el-table-column>
          <el-table-column prop="principal" label="本金" width="120"></el-table-column>
          <el-table-column prop="interest" label="利息" width="120"></el-table-column>
          <el-table-column prop="period" label="期数" width="100"></el-table-column>
          <el-table-column prop="repaymentTime" label="还款期限" width="100"></el-table-column>
          <el-table-column prop="state" label="状态" width="100">
            <template slot-scope="{row}">
              <!-- 还款状态:  1、逾期，2、待还，3、已还，4、逾期已还 -->
              <el-button v-if="row.state==1" type="text" @click="viewClick(row)" size="small">逾期</el-button>
              <el-button v-if="row.state==2" type="text" @click="viewClick(row)" size="small">立即还款</el-button>
              <span v-if="row.state==3" type="text">已还</span>
              <span v-if="row.state==4" type="text">逾期已还</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="10"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'repayment',
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          borrowTitle: '开荒物资购买',
          totalAmount: 10000,
          principal: 50,
          interest: 30,
          period: 3,
          repaymentTime: '2020-02-12',
          state: 1
        },
        {
          borrowTitle: '开荒物资购买',
          totalAmount: 10000,
          principal: 50,
          interest: 30,
          period: 3,
          repaymentTime: '2020-02-12',
          state: 2
        },
        {
          borrowTitle: '开荒物资购买',
          totalAmount: 10000,
          principal: 50,
          interest: 30,
          period: 3,
          repaymentTime: '2020-02-12',
          state: 3
        },
        {
          borrowTitle: '开荒物资购买',
          totalAmount: 10000,
          principal: 50,
          interest: 30,
          period: 3,
          repaymentTime: '2020-02-12',
          state: 4
        }
      ],
      qry: [],
      options: [
        {
          value: '1',
          label: '全部'
        },
        {
          value: '2',
          label: '逾期'
        },
        {
          value: '3',
          label: '代还'
        },
        {
          value: '4',
          label: '已还'
        },
        {
          value: '5',
          label: '逾期已还'
        }
      ],
      value: '',
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    // 查询条件提交
    onSubmit () {
      console.log('条件查询!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    chongzhi () {
      // 充值
    },
    viewClick () {}
  }
}
</script>

<style scoped>
.file-container{
   position: absolute;
   right: -200px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 850px;
}
</style>
