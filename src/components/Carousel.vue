<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in superurl" :key="item.url">
      <h3><img :src="item.img"/></h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
        data() {
            return {
                  superurl: [
                {
                    url: '',
                    img: 'http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658',
                },
                {
                    url: '1',
                    img: 'http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658',
                },
                {
                    url: '2',
                    img: 'http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658',
                },
                {
                    url: '3',
                    img: 'http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658',
                },
                {
                    url: '4',
                    img: 'http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658',
                },
                {
                    url: '5',
                    img: 'http://pic.netbian.com/uploads/allimg/190902/204822-156742850260f4.jpg',
                },
            ],
            calleft:0
            }
        },
        created() {
        this.move()
    },
    methods: {
        //移动
        move() {
            this.timer = setInterval(this.starmove, 2500)
        },
        //开始移动
        starmove() {
            this.calleft -= 340;
            if (this.calleft < -1200) {
                this.calleft = 0
            }
        },
        //鼠标悬停时停止移动
        stopmove() {
            clearInterval(this.timer)
        },
        //点击按钮左移
        zuohua() {
            this.calleft -= 340;
            if (this.calleft < -1200) {
                this.calleft = 0
            }
        },
        //点击按钮右移
        youhua() {
            this.calleft += 340;
            if (this.calleft > 0) {
                this.calleft = -1020
            }
        },
    },
    }
</script>

<style scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

#divAdd {
    background-color: #ededed;
    /*width: 100%;*/
    /*min-width: 1200px;*/
    width: 1000px;
    margin: 0px auto;
}
 
.divAdd-con {
    margin: 0px auto;
    width: 1000px;
    overflow: auto;
    padding: 30px 0px;
}
 
.divAdd-con img {
    float: left;
}
 
.indexrt {
    margin: 0px 40px;
}
 
.divAddleft img {
    float: left;
    margin-bottom: 7px;
}
 
.divAddleft {
    float: left;
    display: inline;
    width: 370px;
}
 
.divAddrt {
    float: right;
    display: inline;
    margin-top: 7px;
}
 
.back_add {
    background-color: #ededed;
}
 
.divAdd-con img {
    border: none;
}
 
 
a:focus,
a:hover {
    color: #23527c;
}
 
 
.threeImg {
    height: 158px;
    background: #ededed;
    border-bottom: 3px solid #4679B2;
    min-width: 1000px;
}
 
.threeImg .Containt ul {
    margin: 0 auto;
    width: 2400px;
    position: absolute;
    left: 0px;
    cursor: pointer;
    height: 100%
}
 
.threeImg .Containt ul li {
    width: 300px;
    margin-right: 40px;
    margin-top: 10px;
    float: left;
}
 
.threeImg .Containt ul li img {
    height: 128px;
    width: 100%;
}
 
.Containt {
    position: relative;
    width: 1000px;
    height: 130px;
    overflow: hidden;
    margin: 0 auto;
}
 
.iconleft {
    position: absolute;
    width: 20px;
    height: 80px;
    top: 10px;
    z-index: 99999;
    padding-top: 48px;
    background-color: #ddd;
    vertical-align: middle;
}
 
.iconright {
    position: relative;
    left: 978px;
    top: 70px;
    background-color: #ddd;
    /*position: absolute;*/
    width: 20px;
    height: 80px;
    top: 10px;
    z-index: 99999;
    padding-top: 48px;
    background-color: #ddd;
    vertical-align: middle;
}
</style>