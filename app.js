const videos = [
  { id: 1, title: "【4K】城市夜景延时摄影，治愈向", up: "镜头研究所", plays: 124.8, likes: 2.3, coins: 0.7, tag: "recommend", cover: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80" },
  { id: 2, title: "10分钟学会前端动画技巧", up: "代码工坊", plays: 88.4, likes: 1.5, coins: 0.4, tag: "knowledge", cover: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80" },
  { id: 3, title: "这个BOSS机制你真的会了吗？", up: "硬核玩家", plays: 201.2, likes: 4.4, coins: 1.3, tag: "gaming", cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80" },
  { id: 4, title: "热血动漫混剪：逆风翻盘", up: "番剧区扛把子", plays: 330.1, likes: 7.2, coins: 2.2, tag: "anime", cover: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=900&q=80" },
  { id: 5, title: "关注区UP主更新：手工复刻机甲", up: "手作老王", plays: 63.2, likes: 1.2, coins: 0.5, tag: "following", cover: "https://images.unsplash.com/photo-1581091870622-2b4f6b4f5a05?auto=format&fit=crop&w=900&q=80" },
  { id: 6, title: "年度热门纪录：海洋深处到底有什么", up: "科普档案馆", plays: 505.7, likes: 12.1, coins: 3.8, tag: "hot", cover: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80" },
  { id: 7, title: "排行榜TOP1：这首歌你一定听过", up: "音乐补给站", plays: 1002.9, likes: 23.0, coins: 8.1, tag: "rank", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80" },
  { id: 8, title: "3D建模从入门到放弃（误）", up: "CG小黑", plays: 144.2, likes: 2.8, coins: 1.0, tag: "recommend", cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80" }
];

const categories = ["推荐", "番剧", "国创", "动画", "音乐", "舞蹈", "游戏", "知识", "科技", "运动", "鬼畜", "娱乐"];
const hots = ["AI工具爆火", "毕业季vlog", "新番评分出炉", "夏季游戏节", "旅行摄影技巧", "剪辑神曲盘点"];
const lives = ["手游冲榜中", "深夜电台闲聊", "编程学习直播", "健身打卡第30天"];

let currentTab = "recommend";
let currentVideo = null;

const el = (id) => document.getElementById(id);
const videoGrid = el("videoGrid");
const danmakuLayer = el("danmakuLayer");

function renderCategories() {
  const list = el("categoryList");
  list.innerHTML = categories.map((name) => `<li><a href="#">${name}</a></li>`).join("");
}

function renderSideData() {
  el("hotList").innerHTML = hots.map((h) => `<li>${h}</li>`).join("");
  el("liveList").innerHTML = lives.map((name) => `<div class="live-item">🔴 ${name}</div>`).join("");
}

function getActiveVideos() {
  if (currentTab === "recommend") return videos;
  return videos.filter((v) => v.tag === currentTab);
}

function renderVideos(keyword = "") {
  const filtered = getActiveVideos().filter(
    (v) => v.title.includes(keyword) || v.up.includes(keyword)
  );

  videoGrid.innerHTML = filtered
    .map(
      (v) => `
    <article class="video-card" data-id="${v.id}">
      <img src="${v.cover}" alt="${v.title}" />
      <div class="video-body">
        <div class="video-title">${v.title}</div>
        <div class="video-meta"><span>UP: ${v.up}</span><span>${v.plays}万观看</span></div>
      </div>
    </article>`
    )
    .join("");
}

function openPlayer(video) {
  currentVideo = { ...video };
  el("playerTitle").textContent = video.title;
  el("playCount").textContent = `${video.plays.toFixed(1)}万 播放`;
  el("likeCount").textContent = `${video.likes.toFixed(1)}万 点赞`;
  el("coinCount").textContent = `${video.coins.toFixed(1)}万 投币`;
  el("playerModal").classList.remove("hidden");
}

function closePlayer() {
  el("playerModal").classList.add("hidden");
  el("videoPlayer").pause();
}

function addDanmaku(text) {
  if (!text) return;
  const item = document.createElement("div");
  item.className = "danmaku";
  item.style.top = `${Math.random() * 70}%`;
  item.textContent = text;
  danmakuLayer.appendChild(item);
  setTimeout(() => item.remove(), 6800);
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector(".tab.active")?.classList.remove("active");
      tab.classList.add("active");
      currentTab = tab.dataset.tab;
      renderVideos(el("searchInput").value.trim());
    });
  });

  videoGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".video-card");
    if (!card) return;
    const video = videos.find((v) => v.id === Number(card.dataset.id));
    if (video) openPlayer(video);
  });

  el("closePlayer").addEventListener("click", closePlayer);
  el("playerModal").addEventListener("click", (e) => {
    if (e.target.id === "playerModal") closePlayer();
  });

  el("searchBtn").addEventListener("click", () => {
    renderVideos(el("searchInput").value.trim());
  });

  el("playRandomBtn").addEventListener("click", () => {
    const random = videos[Math.floor(Math.random() * videos.length)];
    openPlayer(random);
  });

  el("likeBtn").addEventListener("click", () => {
    if (!currentVideo) return;
    currentVideo.likes += 0.1;
    el("likeCount").textContent = `${currentVideo.likes.toFixed(1)}万 点赞`;
  });

  el("coinBtn").addEventListener("click", () => {
    if (!currentVideo) return;
    currentVideo.coins += 0.1;
    el("coinCount").textContent = `${currentVideo.coins.toFixed(1)}万 投币`;
  });

  el("favBtn").addEventListener("click", () => addDanmaku("收藏成功！"));
  el("sendDanmaku").addEventListener("click", () => {
    const input = el("danmakuInput");
    addDanmaku(input.value.trim());
    input.value = "";
  });

  el("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  el("loginBtn").addEventListener("click", () => {
    const loggedIn = localStorage.getItem("mv_user") === "1";
    if (loggedIn) {
      localStorage.removeItem("mv_user");
      el("loginBtn").textContent = "登录";
      addDanmaku("已退出登录");
    } else {
      localStorage.setItem("mv_user", "1");
      el("loginBtn").textContent = "已登录";
      addDanmaku("欢迎回来！");
    }
  });

  if (localStorage.getItem("mv_user") === "1") {
    el("loginBtn").textContent = "已登录";
  }
}

function seedDanmaku() {
  ["前方高能", "泪目", "哈哈哈哈", "爷青回", "打卡"].forEach((text, i) => {
    setTimeout(() => addDanmaku(text), i * 900);
  });
}

renderCategories();
renderSideData();
renderVideos();
bindEvents();
seedDanmaku();
