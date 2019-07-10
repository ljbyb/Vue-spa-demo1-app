<template>
    <v-footer dark fixed app>
        <v-bottom-nav
                :active.sync="bottomNav"
                :color="this.$store.state.mycolor"
                :value="true"
                absolute
                dark
        >
            <v-btn v-on:click="goToHome" dark>
                <span>首页</span>
                <v-icon>home</v-icon>
            </v-btn>

            <v-btn v-on:click="goToRecord" dark>
                <span>记录</span>
                <v-icon>queue_music</v-icon>
            </v-btn>

            <v-btn v-on:click="goToSport" dark>
                <span>运动</span>
                <v-icon>directions_walk</v-icon>
            </v-btn>

            <v-btn v-on:click="goToTodo" dark>
                <span>待办</span>
                <v-icon>event_note</v-icon>
            </v-btn>

            <v-btn v-on:click="goToUser" dark>
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
                // mycolor:'#2196f3',
            }
        },
        // computed: {
        //     color () {
        //         switch (this.bottomNav) {
        //             case 0: this.$router.replace({path: '/'});
        //                 // return 'deep-orange darken-2';
        //                 return '#2196f3';
        //             case 1: this.$router.replace({path: '/record'});
        //                 // return 'primary';
        //                 return '#00bcd4';
        //             case 2: this.$router.replace({path: '/sport'});
        //                 // return 'blue';
        //                 return '#4caf50';
        //             case 3: this.$router.replace({path: '/note/all'});
        //                 // return 'purple';
        //                 return '#ff9800';
        //             case 4: this.$router.replace({path: '/user'});
        //                 // return 'purple';
        //                 return '#ff5722'
        //             default: return '#2196f3';
        //         }
        //     }
        // },

        methods: {
            goToHome: function () {
                this.$router.replace({path: '/'});
            },
            goToRecord: function () {
                if (this.$store.state.user === null) {
                    // TODO：考虑使用组件方式显示
                    alert("请先在首页点击右上角进行用户登录！");
                } else {
                    this.$router.replace({path: '/record'});
                }
            },
            goToSport: function () {
                if (this.$store.state.user === null) {
                    // TODO：考虑使用组件方式显示
                    alert("请先在首页点击右上角进行用户登录！");
                } else {
                    this.$router.replace({path: '/sport'});
                }
            },
            goToTodo: function () {
                if (this.$store.state.user === null) {
                    // TODO：考虑使用组件方式显示
                    alert("请先在首页点击右上角进行用户登录！");
                } else {
                    this.$router.replace({path: '/note/all'});
                }
            },
            goToUser: function () {
                if (this.$store.state.user === null) {
                    // TODO：考虑使用组件方式显示
                    alert("请先在首页点击右上角进行用户登录！");
                } else {
                    this.$router.replace({path: '/user'});
                }
            }
        },

        watch: {
            '$route'(to, from) {
                if (to.path === "/") {
                    this.$store.dispatch('setColor', '#2196f3');
                } else if (to.path === "/record") {
                    this.$store.dispatch('setColor', '#00bcd4');
                }else if (to.path === "/sport") {
                    this.$store.dispatch('setColor', '#4caf50');
                }else if (to.path === "/note/all") {
                    this.$store.dispatch('setColor', '#ff9800');
                }else if (to.path === "/user") {
                    this.$store.dispatch('setColor', '#ff5722');
                }
            }
        }
    }
</script>

<style scoped>

</style>