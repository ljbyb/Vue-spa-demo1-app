
<template>
    <v-app>
        <Header />
        <v-content>
            <v-container fluid>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </v-container>
        </v-content>
        <Footer />
  </v-app>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  // import UserLogin from "./components/UserLogin";

  export default {
    name: 'App',
    components: {
        Footer,
        Header,
        // UserLogin,
    },
  }
</script>
