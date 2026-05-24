<template>
  <div class="navbar">
    <button class="hamburger" @click.stop="$emit('toggle-sidebar')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <div class="navbar-icons logo">
    <v-icon >$logaIcon</v-icon>
      <div class="text-logo">Новости</div>
    </div>

    <div class="nav-block">
      <div class="search-wrapper">
        <v-icon class="search-icon">$SearchIcon</v-icon>
        <input class="search" placeholder="Поиск документа" />
      </div>

      <div class="user-menu" @click.stop="tMenu" ref="userMenu">
        <div class="text-logo">Гаврилова Е.Ю.</div>
        <v-icon >$down</v-icon>
        <div v-if="MenuOpen" class="dropdown-menu" @click.stop>
          <div class="settings-item">
            <v-icon >$SettingsIcon</v-icon>
            Настройки
          </div>
          <div class="exit-item">
            <v-icon >$ExitIcon</v-icon>
            Выйти
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

  data() {
    return {
      MenuOpen: false,
    };
  },
  methods: {
    tMenu() {
      this.MenuOpen = !this.MenuOpen;
    },
    closeMenu(e) {
      if (this.$refs.userMenu && !this.$refs.userMenu.contains(e.target)) {
        this.MenuOpen = false;
      }
    },
  },
  emits: ['toggle-sidebar'],
  mounted() {
    document.addEventListener('click', this.closeMenu);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu);
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 40px;
  background: #01579b;
  padding: 0 10px;
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}

.text-logo {
  color: white;
  font-size: 14px;
}

.nav-block {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 20px;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: white;
  opacity: 0.7;
  pointer-events: none;
}

.search {
  background: #2f75ad;
  width: 250px;
  height: 32px;
  border-radius: 5px;
  border: 2px solid white;
  opacity: 0.4;
  transition: opacity 0.5s ease;
  color: white;
  padding-left: 38px;
}

.search:focus {
  opacity: 1;
  outline: none;
}

.search::placeholder {
  color: white;
}

.user-menu {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}

.menu-icon {
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.menu-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 5px;
  background: white;
  border-radius: 4px;
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  box-shadow: 3px 3px 2px 2px rgba(0, 0, 0, 0.3);
}

.settings-item,
.exit-item {
  padding: 10px 16px;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.settings-item:hover,
.exit-item:hover {
  background: #ddeaf8;
  color: #1976d2;
}

</style>
