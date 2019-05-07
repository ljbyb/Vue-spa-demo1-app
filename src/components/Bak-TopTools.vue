<template>
    <v-toolbar
        dark
        :color="color"
    >
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Hi, YuanYuan!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="goMessage">
            <v-icon>info</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "TopTools",
        data () {
            return {
                bottomNav: this.$store.state.bottomNav
            }
        },
        computed: {
            color () {
                switch (this.$store.state.bottomNav) {
                    case 0: return 'deep-orange darken-2';
                    case 1: return 'primary';
                    case 2: return 'blue';
                    case 3: return 'purple';
                }
            }
        },

        methods: {
            goMessage: function () {
                this.$router.push({path: '/message'});
            }
        }
    }
</script>

<style scoped>


</style>