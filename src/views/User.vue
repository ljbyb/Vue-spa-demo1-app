<template>
    <v-card color='#F5F5F5'>
        <v-container fill-height>
            <v-layout
                    align-center
                    column
                    justify-center
            >
                <h1 className="display-1 font-weight-thin mb-3">累了，就休息一下 ：）</h1>
                <SaoLei/>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import SaoLei from '../components/SaoLei.vue';

    export default {
        name: 'user',
        components: {
            SaoLei,
        },
        data() {
            return {}
        }
    }
</script>


<style lang="stylus">
    .logo {
        width: 50px;
        float: left;
        margin-right: 15px;
    }

    .form-group {
        max-width: 500px;
    }

    .actions {
        padding: 10px 0;
    }

    .glyphicon-euro {
        font-size: 12px;
    }
</style>