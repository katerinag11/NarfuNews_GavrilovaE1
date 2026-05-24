<template>
  <div class="navbar">
    <button class="hamburger" @click.stop="$emit('toggle-sidebar')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <div class="navbar-icons logo">
      <v-icon>$logaIcon</v-icon>
      <div class="text-logo">Новости</div>
    </div>

    <div class="nav-block">
      <div class="search-wrapper">
        <v-icon class="search-icon">$SearchIcon</v-icon>
        <input class="search" placeholder="Поиск документа" />
      </div>

      <!-- Кнопка Войти для неавторизованных -->
      <button v-if="!isLoggedIn" class="login-button" @click="openLoginDialog">
        Войти
      </button>

      <!-- Меню для авторизованного пользователя -->
      <div v-else class="user-menu" @click.stop="toggleMenu" ref="userMenu">
        <div class="text-logo">{{ userName }}</div>
        <v-icon>$down</v-icon>
        <div v-if="menuOpen" class="dropdown-menu" @click.stop>
          <div class="settings-item" @click="goToSettings">
            <v-icon>$SettingsIcon</v-icon>
            Настройки
          </div>
          <div class="exit-item" @click="logout">
            <v-icon>$ExitIcon</v-icon>
            Выйти
          </div>
        </div>
      </div>
    </div>

    <!-- Диалог авторизации -->
    <LoginDialog ref="loginDialog" @login-success="onLoginSuccess" />
  </div>
</template>

<script>
import LoginDialog from './LoginDialog.vue';

export default {
  name: 'Navbar',
  components: { LoginDialog },
  inject: ['userService'],
  emits: ['toggle-sidebar'],
  data() {
    return {
      menuOpen: false,
      isLoggedIn: false,
      userName: 'Гаврилова Е.Ю.',
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu(e) {
      if (this.$refs.userMenu && !this.$refs.userMenu.contains(e.target)) {
        this.menuOpen = false;
      }
    },
    openLoginDialog() {
      this.$refs.loginDialog.open();
    },
    onLoginSuccess(userData) {
      this.isLoggedIn = true;
      this.userName = userData.userName || 'Гаврилова Е.Ю.';
      console.log('Успешный вход, userName:', this.userName);
    },
    goToSettings() {
      this.$router.push('/control-news');
      this.menuOpen = false;
    },
    logout() {
      sessionStorage.removeItem('userRecordId');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('currentUser');
      this.isLoggedIn = false;
      this.userName = 'Гаврилова Е.Ю.';
      this.menuOpen = false;
      console.log('Выход выполнен');
    },
    async checkAuth() {
      const recordId = sessionStorage.getItem('userRecordId');
      console.log('Проверка авторизации, recordId:', recordId);
      
      if (recordId) {
        const storedName = sessionStorage.getItem('userName');
        if (storedName) {
          this.isLoggedIn = true;
          this.userName = storedName;
          console.log('Загружено из sessionStorage:', this.userName);
        } else {
          try {
            const userData = await this.userService.getCurrentUser(recordId);
            console.log('Данные пользователя из API:', userData);
            const fields = userData.fields;
            const fullName = `${fields.Surname || ''} ${fields.Name || ''} ${fields.Patronymic || ''}`.trim();
            sessionStorage.setItem('userName', fullName);
            this.userName = fullName || 'Гаврилова Е.Ю.';
            this.isLoggedIn = true;
            console.log('Загружено из API:', this.userName);
          } catch (err) {
            console.error('Ошибка загрузки пользователя:', err);
            sessionStorage.removeItem('userRecordId');
          }
        }
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeMenu);
    this.checkAuth();
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

.login-button {
  background: white;
  color: #01579b;
  border: none;
  padding: 5px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
}

.login-button:hover {
  background: #e0e0e0;
}

.user-menu {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
}

.user-menu:hover {
  background: rgba(255, 255, 255, 0.1);
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