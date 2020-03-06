<template>
  <!-- 个人中心我的还款页面 -->
  <div class="file-container">
    <!-- 条件查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账户流水">
        <el-date-picker
          v-model="formInline.Time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="MHSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <!-- 还款分页 根据借款id查询还款信息-->
      <div class="page">
        <div>
          <span class="formspan" style="float:left;">收款明细</span>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="remark" label="流水说明" width="400"></el-table-column>
          <el-table-column prop="availableAmount" label="可用金额"></el-table-column>
          <el-table-column prop="freezeAmount" label="冻结金额"></el-table-column>
          <el-table-column prop="createTime" label="时间" width="160px"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryList.nowPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="queryList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryList.totalNum"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getAccountFlow} from '../../api/user/accountFlow.js'

  export default {
    name: "accountFlow",
    data() {
      return {
        //分页查询数据
        tableData: [],
        formInline: {},
        queryList: {
          totalNum: 0,
          nowPage: 1,
          pageSize: 5
        },
      };
    },
    created() {
      //创建初始加载钩子函数
      this.getAccountFlow()
    },
    methods: {
      getAccountFlow() {
        //还款信息分页查询
        const data = this.setCondition()
        getAccountFlow(data).then(response => {
          const {result} = response.data
          this.tableData = result.datalist
          this.queryList.totalNum = result.allCount

        })
      },
      setCondition () {
        let data = {}, times = {}
        if (this.formInline && this.formInline.Time) {
          times = {
            StartTime: this.formInline && this.formInline.Time[0],
            EndTime: this.formInline && this.formInline.Time[1]
          }
        }
        data = {...times, ...this.queryList}
        return data
      },
      // 查询条件提交
      MHSubmit() {
        this.getAccountFlow()
      },
      handleSizeChange (val) {
        this.queryList.pageSize = val
        this.getAccountFlow()
      },
      handleCurrentChange (val) {
        this.queryList.nowPage = val
        this.getAccountFlow()
      },
    }
  };
</script>

<style scoped>
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
