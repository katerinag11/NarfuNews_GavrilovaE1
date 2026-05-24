<template>
<div class="main">
  <div class="textzag">
    <h2>Последние новости</h2>
  </div>

  <MainPage 
    v-if="mainNews" 
    :news="mainNews"
    style="margin-bottom: 30px; gap: 0; display: flex" 
  />

  <div class="newscontainer">
    <a
      v-for="(news, index) in otherNews"
      :key="news.id"
      :class="['news-podblock', { 'firstelem': index % 4 === 0 }]"
      href="#"
    >
      <div class="textdate">{{ news.date }}</div>
      <a
        style="display: flex; flex-wrap: wrap; width: 270px"
        href="#"
        class="textopis"
        v-html="news.title"
      ></a>
    </a>
  </div>
</div>
</template>

<script>
import MainPage from '@/components/UI/MainPage.vue';
import newsData from '../../NarfuNewsData.json';

export default {
components: {
  MainPage,
},
data() {
  return {
    allNews: []
  };
},
computed: {
  mainNews() {
    return this.allNews.find(news => news.isMain === true);
  },
  otherNews() {
    return this.allNews.filter(news => news.isMain !== true);
  }
},
created() {
  this.allNews = newsData.news || [];
}
};
</script>

<style scoped>
.textzag {
text-align: left;
margin-left: 20px;
font-family: 'Arial';
color: black;
}

.main {
background: #f6f6f6;
width: 100%;
max-width: 1611px;
min-height: 100vh;
}

.textdate {
font-size: 12px;
color: gray;
text-align: left;
}

.textopis {
margin-bottom: 15px;
font-weight: 600;
font-size: 14px;
font-family: 'Arial';
text-align: left;
text-decoration: none;
color: black;
}

.news-img {
width: 319px;
height: 180px;
}

.newscontainer {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 30px 30px;
margin-top: 20px;
text-decoration: none;
}

.news-podblock {
width: 319px;
height: 265px;
}

.news-podblock:hover {
box-shadow: 0px 0px 10px 0px #81c5db;
}

.firstelem {
margin-left: 20px;
}
</style>