/**
 * LottoBall Web Component
 * Displays a single lotto ball with color based on its number.
 */
class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['number'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  getBallColor(num) {
    if (num <= 10) return 'var(--ball-1-10)';
    if (num <= 20) return 'var(--ball-11-20)';
    if (num <= 30) return 'var(--ball-21-30)';
    if (num <= 40) return 'var(--ball-31-40)';
    return 'var(--ball-41-45)';
  }

  render() {
    const num = parseInt(this.getAttribute('number')) || 0;
    const color = this.getBallColor(num);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 50px;
          height: 50px;
          perspective: 1000px;
        }
        .ball {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, white 0%, transparent 40%), ${color};
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 
            inset -5px -5px 15px rgba(0,0,0,0.3),
            0 10px 20px rgba(0,0,0,0.2);
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform: scale(0);
        }
        @keyframes popIn {
          to { transform: scale(1); }
        }
      </style>
      <div class="ball">${num || '?'}</div>
    `;
  }
}

customElements.define('lotto-ball', LottoBall);

/**
 * LottoGenerator Web Component
 * Main app logic for generating and storing lotto numbers.
 */
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.history = JSON.parse(localStorage.getItem('lottoHistory')) || [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.updateHistoryUI();
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  async handleGenerate() {
    const display = this.querySelector('.balls-display');
    const btn = this.querySelector('.generate-btn');
    
    btn.disabled = true;
    display.innerHTML = '';

    const newNumbers = this.generateNumbers();
    
    // Animation effect: Add balls one by one
    for (const num of newNumbers) {
      const ball = document.createElement('lotto-ball');
      ball.setAttribute('number', num);
      display.appendChild(ball);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    this.history.unshift({
      numbers: newNumbers,
      date: new Date().toLocaleString()
    });
    this.history = this.history.slice(0, 10); // Keep last 10
    localStorage.setItem('lottoHistory', JSON.stringify(this.history));
    
    this.updateHistoryUI();
    btn.disabled = false;
  }

  updateHistoryUI() {
    const historyList = this.querySelector('.history-list');
    if (!historyList) return;

    historyList.innerHTML = this.history.map(item => `
      <div class="history-item">
        <span style="color: #888; font-size: 0.7rem; width: 120px;">${item.date}</span>
        <div style="display: flex; gap: 4px;">
          ${item.numbers.map(n => `<span style="font-weight: 700;">${n}</span>`).join(', ')}
        </div>
      </div>
    `).join('');
  }

  setupEventListeners() {
    this.querySelector('.generate-btn').addEventListener('click', () => this.handleGenerate());
  }

  render() {
    this.innerHTML = `
      <div class="app-container">
        <h1>LOTTO 6/45</h1>
        <div class="balls-display">
          <!-- Lotto balls will appear here -->
          <p style="color: #888; width: 100%;">Press the button to generate numbers!</p>
        </div>
        <button class="generate-btn">GENERATE NUMBERS</button>
        
        <div class="history-container">
          <h2>Recent History</h2>
          <div class="history-list">
            <!-- History items will appear here -->
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('lotto-generator', LottoGenerator);
