<template>
  <router-view/>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

.__flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.__flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.__flex-row {
  flex-direction: row;
}
.__line {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
</style>
