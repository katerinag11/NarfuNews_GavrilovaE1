<template>
  <div class="home-page">
    <div class="page-header">
      <h1 class="page-title">Новостной портал</h1>
    </div>
    <div v-if="mainNews" class="featured-news">
      <div class="featured-image">
        <div class="image-placeholder large">
          <svg width="627" height="353" viewBox="0 0 627 353" fill="#D9D9D9">
            <rect width="627" height="353" fill="#D9D9D9" />
          </svg>
        </div>
      </div>
      <div class="featured-content">
        <div class="news-date">{{ formatDate(mainNews.date) }}</div>
        <h2 class="featured-title">{{ mainNews.title }}</h2>
        <p class="featured-description">{{ mainNews.description }}</p>
        <button class="read-more-btn blue-btn">
          <span>Читать далее</span>
        </button>
      </div>
    </div>
    <div class="news-grid">
      <NewsCard
        v-for="(item, index) in otherNews"
        :key="item.id"
        :news="item"
        :class="{ 'first-elem': index % 4 === 0 }"
      />
    </div>
  </div>
</template>

<script>
import NewsCard from '../components/UI/NewsCard.vue';
import newsData from '../../../NarfuNewsData.json';

export default {
  name: 'HomePage',
  components: {
    NewsCard,
  },
  data() {
    return {
      allNews: [],
    };
  },
  computed: {
    mainNews() {
      return this.allNews.find((news) => news.isMain === true);
    },
    otherNews() {
      return this.allNews.filter((news) => news.isMain !== true);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  created() {
    this.allNews = newsData.news || [];
  },
};
</script>

<style scoped>
.home-page {
  max-width: 1611px;
  margin: 0 auto;
  background: #f6f6f6;
  min-height: 100vh;
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-left: 10px;
}
.featured-news {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 40px;
  width: 100%;
  transition: box-shadow 0.3s;
}

.featured-news:hover {
  box-shadow: 0px 0px 10px 0px #81c5db;
}

.featured-image {
  flex-shrink: 0;
}

.image-placeholder.large {
  width: 627px;
  height: 353px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-content {
  padding: 20px;
  flex: 1;
}

.news-date {
  font-size: 12px;
  color: #666;
  margin-bottom: 25px;
}

.featured-title {
  font-size: 20px;
  font-weight: 600;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
  color: #000;
}

.featured-description {
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 50px;
  line-height: 1.5;
}

.blue-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.blue-btn:hover {
  background: #1565c0;
}

.section-header {
  margin-left: 20px;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  color: #000;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .featured-news {
    flex-direction: column;
  }

  .featured-image .image-placeholder.large {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
