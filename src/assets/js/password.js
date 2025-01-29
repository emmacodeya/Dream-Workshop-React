document.addEventListener('DOMContentLoaded', () => {
    const steps = ['step-1', 'step-2', 'step-3'];
    let currentStep = 0;
  
    const showStep = (stepIndex) => {
      steps.forEach((step, index) => {
        const stepDiv = document.getElementById(step);
        if (index === stepIndex) {
          stepDiv.classList.add('active');
        } else {
          stepDiv.classList.remove('active');
        }
      });
    };
  
    // 下一步：從步驟 1 到步驟 2
    const next1 = document.getElementById('next-1');
    next1.addEventListener('click', () => {
      currentStep = 1;
      showStep(currentStep);
    });
  
    // 上一步：從步驟 2 到步驟 1
    const prev2 = document.getElementById('prev-2');
    prev2.addEventListener('click', () => {
      currentStep = 0;
      showStep(currentStep);
    });
  
    // 下一步：從步驟 2 到步驟 3
    const next2 = document.getElementById('next-2');
    next2.addEventListener('click', () => {
      currentStep = 2;
      showStep(currentStep);
    });
  
    // 上一步：從步驟 3 到步驟 2
    const prev3 = document.getElementById('prev-3');
    prev3.addEventListener('click', () => {
      currentStep = 1;
      showStep(currentStep);
    });
  
    // 表單提交事件（這裡僅防止實際提交）
    const formStep3 = document.getElementById('form-step-3');
    formStep3.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('帳號創建完成！');
      // 這裡你可以添加實際的提交邏輯
    });
  });

  