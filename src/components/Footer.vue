<template>
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
                <span>记录</span>
                <v-icon>queue_music</v-icon>
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
</template>

<script>
    export default {
        name: "Footer",
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
                    case 1: this.$router.replace({path: '/record'});
                        return 'primary';
                    case 2: this.$router.replace({path: '/sport'});
                        return 'blue';
                    case 3: this.$router.replace({path: '/note/all'});
                        return 'purple';
                    case 4: this.$router.replace({path: '/user'});
                        return 'purple';
                    default: return 'deep-orange darken-2';
                }
            }
        }
    }
</script>

<style scoped>

</style>