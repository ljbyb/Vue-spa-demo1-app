<template>
    <v-footer>
        <v-bottom-nav
                :active.sync="bottomNav"
                :color="color"
                :value="true"
                absolute
                dark
                shift
        >
            <v-btn dark>
                <span>Home</span>
                <v-icon @click="goToHome">home</v-icon>
            </v-btn>

            <v-btn dark>
                <span>Sport</span>
                <v-icon @click="goToSport">directions_walk</v-icon>
            </v-btn>

            <v-btn dark>
                <span>Shopping</span>
                <v-icon @click="goToShopping">local_grocery_store</v-icon>
            </v-btn>

            <v-btn dark>
                <span>User</span>
                <v-icon @click="goToUser">person</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-footer>
</template>

<script>
  export default {
      data () {
          return {
              bottomNav: 0
          }
      },

      computed: {
          color () {
              this.$store.commit('set',this.bottomNav);
              switch (this.bottomNav) {
                  case 0: return 'deep-orange darken-2';
                  case 1: return 'primary';
                  case 2: return 'blue';
                  case 3: return 'purple';
              }
          }
      },

      methods: {
          goToHome: function () {
              this.$router.replace({path: '/'});
          },
          goToSport: function () {
              this.$router.replace({path: '/sport'});
          },
          goToShopping: function () {
              this.$router.replace({path: '/shopping'});
          },
          goToUser: function () {
              this.$router.replace({path: '/user'});
          }
      }
  }
</script>