<template>
  <div class="home-container">
    <header class="home-header">
      <div class="logo">若林轻小说</div>
      <nav class="nav">
        <a href="#novels" class="nav-link">热门小说</a>
        <a href="#categories" class="nav-link">分类浏览</a>
        <a href="#ranking" class="nav-link">排行榜</a>
        <a href="#new" class="nav-link">新书速递</a>
      </nav>
      <div class="header-actions">
        <router-link to="/login" class="btn-login">登录</router-link>
      </div>
    </header>
    
    <main class="home-main">
      <section class="hero-section">
        <div class="hero-content">
          <h1>欢迎来到若林轻小说</h1>
          <p>海量轻小说资源，随时随地阅读</p>
          <router-link to="#novels" class="btn-explore">开始探索</router-link>
        </div>
      </section>
      
      <section id="novels" class="featured-novels">
        <h2>热门推荐</h2>
        <div class="novels-grid">
          <!-- 小说卡片示例 -->
          <div class="novel-card" v-for="i in 6" :key="i">
            <div class="novel-cover">
              <img src="https://via.placeholder.com/200x280?text=小说封面" alt="小说封面">
            </div>
            <div class="novel-info">
              <h3>小说标题 {{i}}</h3>
              <p>作者：轻小说家</p>
              <div class="novel-stats">
                <span>人气：{{i * 10000}}</span>
                <span>连载中</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="categories" class="categories-section">
        <h2>分类浏览</h2>
        <div class="categories-grid">
          <a href="#" class="category-item">玄幻</a>
          <a href="#" class="category-item">修真</a>
          <a href="#" class="category-item">都市</a>
          <a href="#" class="category-item">历史</a>
          <a href="#" class="category-item">科幻</a>
          <a href="#" class="category-item">游戏</a>
          <a href="#" class="category-item">言情</a>
          <a href="#" class="category-item">悬疑</a>
        </div>
      </section>
    </main>
    
    <footer class="home-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>若林轻小说</h3>
          <p>提供优质的轻小说阅读体验</p>
        </div>
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">联系我们</a>
          <a href="#" class="footer-link">用户协议</a>
          <a href="#" class="footer-link">隐私政策</a>
        </div>
      </div>
      <div class="copyright">
        © 2023 若林轻小说 版权所有
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.home-header {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 40px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #4ac0ff;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4ac0ff;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.btn-login {
  padding: 8px 20px;
  border: 1px solid #4ac0ff;
  color: #4ac0ff;
  background-color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-login:hover {
  background-color: #4ac0ff;
  color: white;
}

.home-main {
  flex: 1;
}

.hero-section {
  background: linear-gradient(135deg, #4ac0ff, #8d5fff);
  color: white;
  padding: 100px 40px;
  text-align: center;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn-explore {
  display: inline-block;
  padding: 12px 30px;
  background-color: white;
  color: #4ac0ff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: transform 0.3s;
}

.btn-explore:hover {
  transform: translateY(-2px);
}

.featured-novels,
.categories-section {
  padding: 60px 40px;
  background-color: white;
  margin: 20px;
  border-radius: 8px;
}

.featured-novels h2,
.categories-section h2 {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.novels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.novel-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.novel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.novel-cover {
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.novel-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.novel-info {
  padding: 15px;
}

.novel-info h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.novel-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.novel-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #f8f9fa;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s;
}

.category-item:hover {
  background-color: #4ac0ff;
  color: white;
}

.home-footer {
  background-color: #333;
  color: white;
  padding: 40px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.footer-info p {
  color: #999;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-link {
  color: #999;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: white;
}

.copyright {
  text-align: center;
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .home-header {
    padding: 0 20px;
    flex-wrap: wrap;
  }
  
  .nav {
    display: none;
  }
  
  .hero-content h1 {
    font-size: 32px;
  }
  
  .hero-content p {
    font-size: 16px;
  }
  
  .featured-novels,
  .categories-section {
    padding: 40px 20px;
    margin: 10px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 30px;
  }
}
</style>