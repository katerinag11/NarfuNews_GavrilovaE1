<template>
<v-app>
  <div class="app-layout">
    <Sidebar class="sidebar" />
    <div class="center-col">
      <Navbar class="navbar" @toggle-sidebar="toggleSidebarNews" />
      <div class="below-navbar">
        <Sidebar2 class="news-sidebar" v-if="showSidebarNews" />
        <div class="main-content">
          <router-view class="px-0" style ="width: 100%"/>
        </div>
      </div>
    </div>
  </div>
</v-app>
</template>

<script>
import Navbar from './src/components/UI/Navbar.vue';
import Sidebar from './src/components/UI/Sidebar.vue';
import Sidebar2 from './src/components/UI/Sidebar2.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Sidebar2,
  },
  data() {
    return {
      showSidebarNews: false,
    };
  },
  methods: {
    toggleSidebarNews() {
      this.showSidebarNews = !this.showSidebarNews;
      localStorage.setItem('sidebarOpen', this.showSidebarNews);
    },
  },
  mounted() {
    const saved = localStorage.getItem('sidebarOpen');
    if (saved === 'true') {
      this.showSidebarNews = true;
    }
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 63px;
  background: #02265c;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.center-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.navbar {
  height: 40px;
  background: #01579b;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.below-navbar {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.news-sidebar {
  width: 280px;
  flex-shrink: 0;
  box-shadow: 15px 0 30px -3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.main-content {
  flex: 1;
  padding: 20px;
  min-width: 0;
  overflow-y: auto;
}
</style>
