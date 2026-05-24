<template>
  <nav class="sidebar">
    <div class="sidebar-icons">
        <v-icon>$logaIcon</v-icon>
      <div class="sidebar-icon-item">
        <v-icon>$port</v-icon>
      </div>
      <div class="sidebar-icon-item">
        <v-icon>$doc</v-icon>
      </div>
      <div class="sidebar-icon-item">
        <v-icon>$cale</v-icon>
      </div>
      <div class="sidebar-icon-item">
        <v-icon>$baza</v-icon>
      </div>
      <div class="sidebar-icon-item">
        <v-icon>$archive</v-icon>
      </div>
      <div class="sidebar-icon-item">
        <v-icon>$sotr</v-icon>
      </div>
      <div class="sidebar-icon-item">
        <v-icon>$serv</v-icon>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.sidebar-icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 4px;
  transition: background-color 0.3s;
  text-decoration: none;
}

.sidebar-icon-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-icon-item.active {
  background-color: rgba(255, 255, 255, 0.3);
}

.sidebar-icon-item :deep(svg) {
  width: 32px;
  height: 40px;
  color: white;
}

.icon {
  width: 32px;
  height: 32px;
  color: white;
}
</style>
