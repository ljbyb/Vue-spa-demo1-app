
<template>
    <v-app>
        <v-toolbar
              dark
              :color="mycolor"
              fixed app
        >
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">
            {{ this.GLOBAL.userName.length > 0 ? 'Hi,'+ this.GLOBAL.userName +'!': 'Hi!'}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <UserLogin/>
        </v-toolbar>

        <v-content>
            <v-container fluid>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
<!--                <router-view></router-view>-->
            </v-container>
        </v-content>

        <v-footer dark fixed app>
            <v-bottom-nav
                  :active.sync="bottomNav"
                  :color="mycolor"
                  :value="true"
                  absolute
                  dark
            >
                <v-btn dark>
                  <span>首页</span>
                  <v-icon>home</v-icon>
                </v-btn>

                <v-btn dark>
                  <span>运动</span>
                  <v-icon>directions_walk</v-icon>
                </v-btn>

                <v-btn dark>
                  <span>待办</span>
                  <v-icon>event_note</v-icon>
                </v-btn>

                <v-btn dark>
                  <span>我的</span>
                  <v-icon>person</v-icon>
                </v-btn>
            </v-bottom-nav>
        </v-footer>
  </v-app>
</template>

<script>
  import UserLogin from './components/UserLogin.vue';

  export default {
    name: 'App',
    components: {
      UserLogin,
    },
    data () {
      return {
          bottomNav: 0,
      }
    },
    computed: {
      mycolor () {
      switch (this.bottomNav) {
      case 0: this.$router.replace({path: '/'});
          return 'deep-orange darken-2';
      case 1: this.$router.replace({path: '/sport'});
          return 'primary';
      case 2: this.$router.replace({path: '/note/all'});
          return 'blue';
      case 3: this.$router.replace({path: '/user'});
          return 'purple';
      default: return 'deep-orange darken-2';
          }
      }
    }
  }
</script>
