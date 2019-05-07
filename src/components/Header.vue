<template>
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
</template>

<script>
    import UserLogin from "./UserLogin";
    export default {
        name: "Header",
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
                return 'deep-orange darken-2';
            }
        }
    }
</script>

<style scoped>

</style>