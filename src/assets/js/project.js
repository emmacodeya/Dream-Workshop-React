document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.nav-link[data-content]');
  const pageTitleElement = document.getElementById('current-page-title');

  // 為每個鏈接添加點擊事件監聽器
  navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault();

          // 清除之前的 active-link 樣式
          navLinks.forEach(l => {
              l.classList.remove('active-link');
              l.style.color = ''; // 清除顏色樣式
          });

          // 將當前點擊的鏈接設置為 active-link
          this.classList.add('active-link');
          this.style.color = '#43E1BF'; // 設置當前鏈接的顏色

          // 隱藏所有內容區塊
          document.querySelectorAll('.content-section').forEach(section => {
              section.style.display = 'none';
          });

          // 獲取內容區域 ID 並顯示對應的內容
          const contentId = this.getAttribute('data-content');
          const contentSection = document.getElementById(contentId);
          if (contentSection) {
              contentSection.style.display = 'block'; // 顯示對應的內容區域
          }

          // 更新頁籤的標題
          if (pageTitleElement) {
              pageTitleElement.querySelector('a').textContent = this.getAttribute('data-title');
          }
      });
  });

  // 預設顯示第一個內容區塊
  const defaultSection = document.getElementById('project-introduction');
  if (defaultSection) {
      defaultSection.style.display = 'block';
  }

  // 設置初始激活樣式
  if (navLinks.length > 0) {
      navLinks[0].classList.add('active-link');
      navLinks[0].style.color = '#43E1BF'; // 設置初始顏色
      if (pageTitleElement) {
          pageTitleElement.querySelector('a').textContent = navLinks[0].getAttribute('data-title');
      }
  }
});