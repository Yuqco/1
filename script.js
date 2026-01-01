const deck = [
  { name: 'The Fool', keywords: ['开始', '自由', '未知'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Magician', keywords: ['创造', '显化', '掌控'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The High Priestess', keywords: ['直觉', '潜意识', '神秘'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Empress', keywords: ['丰盛', '滋养', '创造力'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Emperor', keywords: ['结构', '权威', '责任'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Hierophant', keywords: ['智慧', '传统', '导师'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Lovers', keywords: ['选择', '连接', '契合'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Chariot', keywords: ['推进', '决心', '胜利'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'Strength', keywords: ['勇气', '耐心', '温柔力量'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Hermit', keywords: ['洞察', '独处', '指引'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'Wheel of Fortune', keywords: ['转机', '周期', '命运'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'Justice', keywords: ['平衡', '真相', '公正'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Hanged Man', keywords: ['转换', '视角', '暂停'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'Death', keywords: ['结束', '重生', '蜕变'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Temperance', keywords: ['调和', '节制', '中庸'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Devil', keywords: ['执着', '诱惑', '枷锁'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Tower', keywords: ['突变', '觉醒', '拆解'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Star', keywords: ['希望', '疗愈', '灵感'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Moon', keywords: ['潜流', '梦境', '直觉'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Sun', keywords: ['光明', '喜悦', '成功'], image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'Judgement', keywords: ['召唤', '觉察', '复苏'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'The World', keywords: ['完成', '整合', '圆满'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' }
];

const spreadEl = document.getElementById('spread');
const summaryTitle = document.querySelector('.summary-title');
const summaryText = document.querySelector('.summary-text');
const gridEl = document.getElementById('cardGrid');
const modeButtons = document.querySelectorAll('.mode-btn');
let mode = 'daily';

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createCard(card, positionLabel) {
  const cardEl = document.createElement('article');
  cardEl.className = 'card';
  cardEl.innerHTML = `
    <img src="${card.image}" alt="${card.name}">
    <div>
      <div class="card-title">${positionLabel ? `${positionLabel} · ` : ''}${card.name}</div>
      <div class="card-keywords">${card.keywords.map(k => `<span class="tag">${k}</span>`).join('')}</div>
    </div>
  `;
  return cardEl;
}

function renderGrid() {
  gridEl.innerHTML = '';
  deck.forEach(card => {
    const cell = document.createElement('div');
    cell.className = 'card mini';
    cell.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <div class="card-title">${card.name}</div>
      <div class="card-keywords">${card.keywords.map(k => `<span class="tag">${k}</span>`).join('')}</div>
    `;
    gridEl.appendChild(cell);
  });
}

function draw() {
  const shuffled = shuffle(deck);
  const selected = mode === 'daily' ? shuffled.slice(0, 1) : shuffled.slice(0, 3);
  const labels = mode === 'daily' ? ['当下指引'] : ['过去', '现在', '未来'];

  spreadEl.innerHTML = '';
  selected.forEach((card, idx) => {
    spreadEl.appendChild(createCard(card, labels[idx]));
  });

  summaryTitle.textContent = mode === 'daily' ? '今日之牌' : '三牌牌阵';
  summaryText.textContent = mode === 'daily'
    ? '聚焦当下的能量与提醒。观察牌面的意象，倾听直觉。'
    : '三重时间线：回看过去的根源，觉察现在的课题，预见未来的走向。';
}

function reset() {
  spreadEl.innerHTML = '';
  summaryTitle.textContent = '等待抽牌...';
  summaryText.textContent = '点击「立即抽牌」开始。你可以在单牌与三牌模式间切换，重置后重新洗牌。';
}

document.getElementById('drawButton').addEventListener('click', draw);
document.getElementById('resetButton').addEventListener('click', reset);

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    mode = btn.dataset.mode;
    modeButtons.forEach(b => b.classList.toggle('active', b === btn));
  });
});

renderGrid();
