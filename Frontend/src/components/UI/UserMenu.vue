<template>
<div class="ml-auto">
  <v-btn
    v-if="unRegisteredUser"
    text="Войти"
    variant="text"
    @click="authorizationUserDialog = true"
    class="popular-button"
  />
  <v-dialog v-model="authorizationUserDialog" width="500">
    <v-card>
      <v-card-title> Авторизация </v-card-title>
      <v-card-subtitle>
        <v-tabs v-model="selectedTab" color="primary">
          <v-tab
            v-for="(item, index) in tabItems"
            :key="index"
            :text="item.title"
            :value="item.value"
            class="uppercase-disabled font-weight-black"
          />
        </v-tabs>
      </v-card-subtitle>
      <v-card-text style="gap: 8px; display: grid">
        <div v-if="selectedTab === 2" style="gap: 8px; display: grid">
          <v-text-field
            v-model="lastName"
            :rules="[(value) => !!value || 'Поле обязательно для заполнения']"
            hide-details="auto"
            label="Фамилия"
            variant="solo-filled"
          />
          <v-text-field
            v-model="name"
            :rules="[(value) => !!value || 'Поле обязательно для заполнения']"
            hide-details="auto"
            label="Имя"
            variant="solo-filled"
          />
          <v-text-field
            v-model="secondName"
            hide-details="auto"
            label="Отчество"
            variant="solo-filled"
          />
        </div>
        <v-text-field
        v-model="login"
        :rules="[(value) => !!value || 'Поле обязательно для заполнения']"
        hide-details="auto"
        label="Логин (Email)"
        variant="solo-filled"
      />
      <v-text-field
        v-model="password"
        :rules="[(value) => !!value || 'Поле обязательно для заполнения']"
        hide-details="auto"
        label="Пароль"
        type="password"
        variant="solo-filled"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :text="selectedTab === 1 ? 'Войти' : 'Зарегистрироваться'"
        variant="flat"
        @click="onAuthorization"
      />
      <v-btn
        color="primary"
        text="Отмена"
        variant="text"
        @click="onCloseDialog"
      />
    </v-card-actions>
  </v-card>
</v-dialog>
<v-menu v-if="!unRegisteredUser">
  <template #activator="{ props }">
    <v-btn
      v-bind="props"
      variant="text"
      :text="userDisplayName"
      style="color: white !important"
    />
  </template>
  <v-list>
    <v-list-item
      v-for="(menu, index) in menuList"
      :key="index"
      @click="menu.action"
    >
      {{ menu.title }}
    </v-list-item>
  </v-list>
</v-menu>
</div>
</template>

<script>
export default {
name: 'UserMenu',
inject: ['loginService', 'userService'],
data() {
  return {
    unRegisteredUser: true,
    authorizationUserDialog: false,
    login: '',
    password: '',
    selectedTab: 1,
    secondName: '',
    lastName: '',
    name: '',
    loading: false,
  };
},
computed: {
  userDisplayName() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const fullName = `${user.Surname || ''} ${user.Name || ''} ${user.Patronymic || ''}`.trim();
    return fullName || 'Пользователь';
  },
  menuList() {
    return [
      {
        title: 'Настройки',
        action: () => {
          this.$router.push('/control-news');
        },
      },
      {
        title: 'Выход',
        action: () => {
          this.logout();
        },
      },
    ];
  },
  tabItems() {
    return [
      { value: 1, title: 'Войти' },
      { value: 2, title: 'Регистрация' },
    ];
  },
},
mounted() {
  this.checkAuth();
},
watch: {
  currentUser: {
    handler() {
      this.checkAuth();
    },
    immediate: true,
  },
},
methods: {
  checkAuth() {
    const recordId = sessionStorage.getItem('userRecordId');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (recordId && currentUser) {
      this.unRegisteredUser = false;
    } else {
      this.unRegisteredUser = true;
    }
  },
  
  async onAuthorization() {
    this.loading = true;
    
    try {
      if (this.selectedTab === 1) {
        // Вход
        if (!this.login || !this.password) {
          alert('Заполните все обязательные поля');
          return;
        }
        
        const result = await this.loginService.authorizationUser(this.login, this.password);
        
        if (result.userId) {
          sessionStorage.setItem('userRecordId', result.userId);
          sessionStorage.setItem('currentUser', JSON.stringify(result.user));
          this.unRegisteredUser = false;
          this.authorizationUserDialog = false;
          this.login = '';
          this.password = '';
          alert('Вход выполнен успешно!');
          this.$emit('login-success');
        }
      } else {
        // Регистрация
        if (!this.login || !this.password || !this.name || !this.lastName) {
          alert('Заполните все обязательные поля');
          return;
        }
        
        const result = await this.loginService.registerUser({
          email: this.login,
          password: this.password,
          name: this.name,
          lastName: this.lastName,
          secondName: this.secondName
        });
        
        if (result.success) {
          alert('Регистрация успешна! Теперь войдите в систему.');
          this.selectedTab = 1;
          this.login = '';
          this.password = '';
          this.name = '';
          this.lastName = '';
          this.secondName = '';
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      this.loading = false;
    }
  },
  
  logout() {
    sessionStorage.removeItem('userRecordId');
    sessionStorage.removeItem('currentUser');
    this.unRegisteredUser = true;
    this.$router.push('/');
  },
  
  onCloseDialog() {
    this.login = '';
    this.password = '';
    this.name = '';
    this.lastName = '';
    this.secondName = '';
    this.authorizationUserDialog = false;
  },
},
};
</script>

<style scoped>
.popular-button {
  display: inline-flex;
  align-items: center;
  gap: 0px;
  padding: 8px 16px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  border: none;
  width: 100%;
  text-align: left;
}

.popular-button:hover {
  background-color: #81c5db;
}

.popular-button img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>