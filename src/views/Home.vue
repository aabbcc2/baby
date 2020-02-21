<template>
  <div>
    <!-- 图片轮播 -->
    <Carousel></Carousel>
    <!-- 图片轮播结束 -->
    <!-- 项目三大特色 -->
    <div style="padding-left: 20%">
      <el-card class="box-card">
        <div class="text item">
          <el-image
            style="width: 100px; height: 85px"
            src="https://kt-los.oss-cn-beijing.aliyuncs.com/cover/01.png"
            
          ></el-image>
          <h2 style="font-size:20px">简单便捷</h2>
          <p>
            100元即可出借
            <br />直接出借更便捷
          </p>
        </div>
      </el-card>
      <el-card class="box-card box-card2">
        <div class="text item">
          <el-image
            style="width: 100px; height: 85px"
            src="https://kt-los.oss-cn-beijing.aliyuncs.com/cover/02.png"
            
          ></el-image>
          <h2>资金存管</h2>
          <p>
            隔离客户资金
            <br />行业安全第一
          </p>
        </div>
      </el-card>
      <el-card class="box-card box-card3">
        <div class="text item">
          <el-image
            style="width: 100px; height: 85px"
            src="https://kt-los.oss-cn-beijing.aliyuncs.com/cover/03.png"
          ></el-image>
          <h2>省心无忧</h2>
          <p>
            多维智能匹配
            <br />资金小额分散
          </p>
        </div>
      </el-card>
    </div>
    <!-- 项目三大特色结束 -->

    <!-- 展示进行中投标数据 -->
    <h4 class="jxz">
      <u>进行中</u>
    </h4>
    <a href="/invest" class="liebiao">进入投资列表</a>
    <el-table class="toubiao" :data="tableData" style="width: 100%" max-height="2500">
      <el-table-column fixed prop="borrowUsername" label="借款人" width="150"></el-table-column>
      <el-table-column prop="title" label="借款标题" width="150"></el-table-column>
      <el-table-column label="年利率" width="120">
        <template slot-scope="{row}">
           <span>{{ row.yearRate}}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="borrowAmount" label="借款金额" width="120"></el-table-column>
      <el-table-column prop="id" label="借款id" v-show="false"></el-table-column>
      <el-table-column  label="还款方式" width="300">
        <template slot-scope="{row}">
           <span>{{ row.repaymentType==1?'等额本息':'先息后本' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="进度" width="220">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <!--  @click.native.prevent="deleteRow(scope.$index, tableData)"  slot-scope="scope"-->
        <template slot-scope={row}>
          <el-button type="text" size="small">
            <router-link :to="'/chakan/'+row.id">查看</router-link>
            <!-- <router-link to="/chakan">查看</router-link> -->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    <!-- 展示进行中投标数据结束 -->
  </div>
</template>


<script>
import {getAllBorrow} from "../api/borrow"
import Carousel from "@/components/Carousel";
export default {
  name: "Home",
  components: {
    Carousel
  },
  data() {
    return {
      id:0,
      tableData: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  created(){
    this.getAllBorrow();
  },
  methods: {
    getAllBorrow(){
      getAllBorrow({pageSize: this.pageSize, nowPage: this.currentPage})
      .then(response=>{
        const result = response.data.result
        this.totalNum = result.allCount
        this.tableData = result.datalist
      })  
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getyxJidiData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getyxJidiData()
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 200px;
}
.box-card2 {
  position: relative;
  margin: -229.5px 0px 0px 300px;
  /* padding: 10px; */
}
.box-card3 {
  position: relative;
  margin: -229px 0px 0px 600px;
  /* padding: 10px; */
}
/* 展示投标数据样式 */
.toubiao {
  margin: 100px 260px auto 50px;
}

/* 进行中字体样式 */
.jxz {
  font-weight: bold;
  font-size: 24px;
  color: #2e8ece;
  line-height: 1.42857143;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: absolute;
  margin: 50px -50px 100px 110px;
}

/* 进入投资列表 */
.liebiao {
  box-shadow: none;
  color: #337ab7;
  position: absolute;
  margin: 70px -50px 100px 460px;
}
/* 鼠标经过链接时出现下划线的标记代码 */
a:hover {
  text-decoration: underline;
  color: #337ab7;
}
 .page{
      margin-top: 20px;
      text-align: center;
    }
</style>