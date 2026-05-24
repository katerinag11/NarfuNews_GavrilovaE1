<template>
<div class="newsblock">
  <div class="news-podblock">
    <div class="textdate">{{ news.date }}</div>
    <div class="textnazv" v-html="news.title"></div>
    <div class="textopis" v-html="news.description"></div>
    <button class="btn">
      <span>Читать далее</span>
    </button>
  </div>
</div>
</template>

<script>
export default {
name: 'MainPage',
props: {
  news: {
    type: Object,
    required: true
  }
}
};
</script>

<style scoped>
.newsblock {
width: 1565px;
height: 353px;
margin: 20px 0 0 20px;
display: flex;
flex-wrap: wrap;
}

.newsblock:hover {
box-shadow: 0px 0px 10px 0px #81c5db;
}

.news-podblock {
padding-left: 20px;
}

.textdate {
font-size: 12px;
color: gray;
top: 1px;
margin-bottom: 25px;
text-align: left;
}

.textnazv {
margin-bottom: 20px;
font-weight: 600;
font-size: 20px;
font-family: 'Arial';
text-align: left;
color: black;
}

.textopis {
margin-bottom: 50px;
font-family: 'Arial';
font-weight: 400;
font-size: 14px;
text-align: left;
color: black;
}

.btn {
background: #1976d2;
text-decoration: none;
padding: 10px 15px;
border-radius: 4px;
color: white;
transition-duration: 0.3s;
float: left;
border: none;
cursor: pointer;
}

.btn:hover {
background: #0d5ba3;
}
</style>