document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.nav-link[data-content]');
  
  // 為每個鏈接添加點擊事件監聽器
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
      });

      // 顯示點擊的內容區塊
      const contentId = this.getAttribute('data-content');
      document.getElementById(contentId).style.display = 'block';
    });
  });
  
  // 預設顯示第一個內容區塊
  document.getElementById('accounts').style.display = 'block';
});


// link active 設置 
document.addEventListener("DOMContentLoaded", function () {
const navLinks = document.querySelectorAll('.nav-link[data-content]');

// 為每個鏈接添加點擊事件監聽器
navLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    // 移除所有 nav-link 的 active class
    navLinks.forEach(nav => nav.classList.remove('active'));
    // 將當前點擊的 nav-link 加上 active class
    this.classList.add('active');

    document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
    });

    // 顯示點擊的內容區塊
    const contentId = this.getAttribute('data-content');
    document.getElementById(contentId).style.display = 'block';
  });
});

// 預設選擇第一個 nav-link 並顯示第一個內容區塊
navLinks[0].classList.add('active');
document.getElementById('accounts').style.display = 'block';
});

// 跑迴圈取 account 創業項目權限 data
const startup = [
  { name: '林媽媽中式餐館' },
  { name: '尚品生活股份有限公司' }
];
const tbody = document.getElementById('startup-tbody');

startup.forEach((startup, index) => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${startup.name}</td>
    <td class="d-flex">
      <div class="me-5">
        <input type="checkbox" id="cooperate-${index}" name="options" value="option1" disabled>
        <label for="cooperate-${index}" class="checkbox-label">合作聯繫</label>
      </div>
      <div>
        <input type="checkbox" id="contentEnabled-${index}" name="options" value="option2" checked disabled>
        <label for="contentEnabled-${index}" class="checkbox-label">內容解鎖</label>
      </div>
    </td>
  `;

  tbody.appendChild(row);
});

// 跑迴圈取 account 投資人權限 data
const investor = [
  { name: 'Michael Smith' },
  { name: 'James Brown' }
];
const investorSection = document.getElementById('investor-tbody');

investor.forEach((investor, index) => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${investor.name}</td>
    <td class="d-flex">
      <div class="me-5">
        <input type="checkbox" id="cooperate-${index}" name="options" value="option1" checked disabled>
        <label for="cooperate-${index}" class="checkbox-label">合作聯繫</label>
      </div>
      <div>
        <input type="checkbox" id="contentEnabled-${index}" name="options" value="option2" disabled>
        <label for="contentEnabled-${index}" class="checkbox-label">內容解鎖</label>
      </div>
    </td>
  `;

  investorSection.appendChild(row);
});