<template>
  <v-dialog v-model="dialog" max-width="450" persistent>
    <v-card>
      <v-tabs v-model="activeTab" color="primary" density="compact" centered>
        <v-tab value="login">Войти</v-tab>
        <v-tab value="register">Зарегистрироваться</v-tab>
      </v-tabs>

      <v-card-text class="mt-4">
        <div v-if="activeTab === 'login'">
          <v-text-field
            v-model="loginEmail"
            label="Email"
            type="email"
            variant="outlined"
            hide-details="auto"
            class="mb-3"
          />
          <v-text-field
            v-model="loginPassword"
            label="Пароль"
            type="password"
            variant="outlined"
            hide-details="auto"
          />
        </div>
        <div v-if="activeTab === 'register'">
          <v-text-field v-model="registerEmail" label="Email" type="email" variant="outlined" class="mb-3" />
          <v-text-field v-model="registerPassword" label="Пароль" type="password" variant="outlined" class="mb-3" />
          <v-text-field v-model="confirmPassword" label="Подтвердите пароль" type="password" variant="outlined" class="mb-3" />
          <v-text-field v-model="userName" label="Имя" variant="outlined" class="mb-3" />
          <v-text-field v-model="userLastName" label="Фамилия" variant="outlined" class="mb-3" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">Отмена</v-btn>
        <v-btn color="primary" variant="flat" @click="submit" :loading="loading">
          {{ activeTab === 'login' ? 'Войти' : 'Зарегистрироваться' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoginDialog',
  inject: ['loginService', 'userService'],
  data() {
    return {
      dialog: false,
      activeTab: 'login',
      loading: false,
      loginEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
      userName: '',
      userLastName: '',
    };
  },
  methods: {
    open() { this.dialog = true; this.resetForms(); },
    close() { this.dialog = false; this.resetForms(); },
    resetForms() {
      this.activeTab = 'login';
      this.loginEmail = '';
      this.loginPassword = '';
      this.registerEmail = '';
      this.registerPassword = '';
      this.confirmPassword = '';
      this.userName = '';
      this.userLastName = '';
    },
    async submit() {
      if (this.activeTab === 'login') await this.handleLogin();
      else await this.handleRegister();
    },
    async handleLogin() {
      if (!this.loginEmail || !this.loginPassword) {
        alert('Заполните email и пароль');
        return;
      }
      this.loading = true;
      try {
        const authRes = await this.loginService.authorizationUser(this.loginEmail, this.loginPassword);
        sessionStorage.setItem('userRecordId', authRes.userId);
        const userData = await this.userService.getCurrentUser(authRes.userId);
        const fields = userData.fields;
        const fullName = `${fields.Surname || ''} ${fields.Name || ''} ${fields.Patronymic || ''}`.trim();
        sessionStorage.setItem('userName', fullName);
        this.$emit('login-success', { userName: fullName });
        this.close();
      } catch (error) {
        alert('Неверный email или пароль');
      } finally {
        this.loading = false;
      }
    },
    async handleRegister() {
      if (!this.registerEmail || !this.registerPassword || !this.userName || !this.userLastName) {
        alert('Заполните все поля');
        return;
      }
      if (this.registerPassword !== this.confirmPassword) {
        alert('Пароли не совпадают');
        return;
      }
      this.loading = true;
      try {
        await this.loginService.registerUser({
          email: this.registerEmail, password: this.registerPassword,
          name: this.userName, lastName: this.userLastName, secondName: ''
        });
        alert('Регистрация успешна! Теперь войдите.');
        this.activeTab = 'login';
        this.resetForms();
      } catch (error) {
        alert('Ошибка регистрации');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>