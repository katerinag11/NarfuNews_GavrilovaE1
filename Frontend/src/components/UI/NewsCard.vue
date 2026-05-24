<template>
<div class="news-card" :class="{ 'first-elem': firstElem }">
  <div class="news-image">
    <div class="image-placeholder small">
      <svg width="319" height="180" viewBox="0 0 319 180" fill="#D9D9D9">
        <rect width="319" height="180" fill="#D9D9D9"/>
      </svg>
    </div>
  </div>
  <div class="news-date">{{ formatDate(news.date) }}</div>
  <div class="news-title">{{ news.title }}</div>
</div>
</template>

<script>
export default {
name: 'NewsCard',
props: {
  news: {
    type: Object,
    required: true
  },
  firstElem: {
    type: Boolean,
    default: false
  }
},
methods: {
  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
}
</script>

<style scoped>
.news-card {
width: 100%;
max-width: 319px;
background: white;
border-radius: 4px;
overflow: hidden;
transition: box-shadow 0.3s;
cursor: pointer;
}

.news-card:hover {
box-shadow: 0px 0px 10px 0px #81c5db;
}

.news-image {
width: 100%;
height: 180px;
overflow: hidden;
}

.image-placeholder.small {
width: 100%;
height: 180px;
background: #d9d9d9;
display: flex;
align-items: center;
justify-content: center;
}

.news-date {
font-size: 12px;
color: #666;
padding: 12px 12px 0 12px;
}

.news-title {
padding: 8px 12px 12px 12px;
font-size: 14px;
font-weight: 600;
font-family: 'Arial', sans-serif;
color: #000;
text-decoration: none;
line-height: 1.4;
}

.first-elem {
margin-left: 20px;
}

@media (max-width: 600px) {
.first-elem {
  margin-left: 0;
}
}
</style>