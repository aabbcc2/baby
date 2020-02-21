<template>
  <div>
    <!-- 欢迎页上面的顶端，包含 首页、登陆、账户充值、注销按钮 -->
    <div class="headerTop indexHeaderCol">
      <div class="header">
        <div class="left">
          <em>
            <a href="#">欢迎来到宝贝投平台！</a>
          </em>
        </div>
        <div class="right">
          <span>
            <ins>
              <a href="#">首页</a>
            </ins>
          </span>
          <span>
            <ins>
              <a href="#">登陆</a>
            </ins>
          </span>
          <span>
            <ins>
              <a href="#">账号充值</a>
            </ins>
          </span>
          <span>
            <ins>
              <a href="#">注销</a>
            </ins>
          </span>
        </div>
      </div>
    </div>
    <!-- 欢迎页上面的顶端，包含 首页、登陆、账户充值、注销按钮结束 -->

    <!-- 项目logo、首页、我要投资、我要借款、个人中心按钮 -->
    <div class="nav clearfix1">
      <ul>
        <router-link to="/" tag="li">首页</router-link>
        <li class="active">
          <router-link to="/invest" tag="li">我要投资</router-link>
        </li>
        <li class="active">
          <router-link to="/borrow" tag="li">我要借款</router-link>
        </li>
        <li class="active">
          <router-link to="/personal" tag="li">个人中心</router-link>
        </li>
      </ul>
    </div>
    <!-- 项目logo、首页、我要投资、我要借款、个人中心按钮结束 -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>