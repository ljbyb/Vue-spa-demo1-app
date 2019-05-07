<template>
    <v-dialog v-model="dialog" persistent max-width="300px">
        <template v-slot:activator="{ on }">
            <!--            <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>-->
            <v-btn flat icon >
                <v-icon v-on="on">account_circle</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">用户登录</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field prepend-icon="person" name="login" label="用户名" type="text" v-model="userName"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="密码" id="password" type="password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">取消</v-btn>
                <v-btn color="blue darken-1" flat @click="userLogin">确定</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "UserLogin",
        data () {
            return {
                bottomNav: 0,
                userName: '',
                dialog: false
            }
        },

        methods: {
            userLogin: function () {
                this.dialog = false;
                this.GLOBAL.userName = this.userName;
            }
        }
    }
</script>

<style scoped>

</style>