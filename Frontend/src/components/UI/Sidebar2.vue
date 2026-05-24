<template>
<div class="sidebar-news">
  <router-link  to="/" class="news-item" active-class="active" > <v-icon class="nav-icon">$HomeIcon</v-icon>  Последние новости </router-link>
  <router-link to="/trending" class="news-item" active-class="active">
    <v-icon class="nav-icon">$FireIcon</v-icon> 
    Самые просматриваемые
  </router-link>
</div>
</template>

<style scoped>
.sidebar-news {
background: white;
padding: 20px 0;
}

.news-item {

display: flex;        
align-items: center;   
width: 100%;           
padding: 12px 20px;  

font-size: 15px;
color: grey;
text-decoration: none; 
transition: 0.2s;
}

.nav-icon {
margin-right: 12px;
}


.news-item.active {
background-color: #e3f2fd; 
color: #1976D2;         
}


.news-item:hover {
background-color: #f5f5f5;
}
</style>
