<template>
  <v-card color='deep-orange darken-2' min-height="400px">
    <v-container fill-height>
      <v-layout
              align-center
              column
              justify-center
      >
        <h1 class="white--text display-2 font-weight-medium my-3">欢迎</h1>
        <h4 className="subheading">&copy;{{new Date().getFullYear()}} — <strong>ABO</strong> for YuanYuan</h4>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>


