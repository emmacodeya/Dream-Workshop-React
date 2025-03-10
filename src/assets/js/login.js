
document.addEventListener("DOMContentLoaded", function () {
  const stepLinks = document.querySelectorAll('.step-link[data-content]');

  stepLinks.forEach(link => {
    link.addEventListener('click',function (event) {
      event.preventDefault();

      document.querySelectorAll('.register-form').forEach(section => {
        section.style.display = 'none';
    });
    // 顯示點擊的內容區塊
    const contentId = this.getAttribute('data-content');
    document.getElementById(contentId).style.display = 'block';

  });
 });
 document.getElementById('create-account').style.display = 'block';
});