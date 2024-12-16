document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    function toggleDiv(divId) {
        const allBoxes = document.querySelectorAll('.box');
        allBoxes.forEach((div) => {
            div.style.display = 'none';
            div.style.opacity = 0;
            div.style.transform = 'translateX(-0%) translateY(-20px)';
        });

        const div = document.getElementById(divId);
        div.style.display = 'none';
        clearTimeout(div.dataset.timeoutId);

        const timeoutId = setTimeout(() => {
            div.style.display = 'block';
            overlay.style.display = 'block'; // إظهار الطبقة
            setTimeout(() => {
                div.style.opacity = 1;
                div.style.transform = '';
            }, 10);
        }, 10);

        div.dataset.timeoutId = timeoutId;
    }

    document.getElementById('toggleBtn1').addEventListener('click', () => toggleDiv('box1'));
    document.getElementById('toggleBtn2').addEventListener('click', () => toggleDiv('box2'));
    document.getElementById('toggleBtn3').addEventListener('click', () => toggleDiv('box3'));
    document.getElementById('toggleBtn4').addEventListener('click', () => toggleDiv('box4'));
    document.getElementById('toggleBtn5').addEventListener('click', () => toggleDiv('box5'));
    document.getElementById('acuont').addEventListener('click', () => toggleDiv('acuonts'));

    overlay.addEventListener('click', () => {
        document.querySelectorAll('.box').forEach((div) => {
            div.style.display = 'none';
            div.style.opacity = 0;
            div.style.transform = 'translateX(-0%) translateY(-20px)';
        });
        overlay.style.display = 'none'; // إخفاء الطبقة
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.box') && !event.target.closest('button')) {
            document.querySelectorAll('.box').forEach((div) => {
                div.style.display = 'none';
                div.style.opacity = 0;
                div.style.transform = 'translateX(-0%) translateY(-20px)';
            });
            overlay.style.display = 'none'; // إخفاء الطبقة
        }
    });
});





function showContent(contentNumber) {
  // إخفاء جميع العناصر
  var contents = document.querySelectorAll('.content');
  contents.forEach(function(content) {
    content.style.display = 'none';
  });

  // إعادة لون جميع الأزرار إلى لونها الأصلي
  var buttons = document.querySelectorAll('.show-button');
  buttons.forEach(function(button) {
    button.classList.remove('xxx'); // إزالة الفئة xxx من جميع الأزرار
  });

  // إظهار العنصر المحدد
  var selectedContent = document.getElementById('content' + contentNumber);
  selectedContent.style.display = 'block';

  // تغيير لون الزر الذي تم الضغط عليه
  var activeButton = document.querySelector(`#container${contentNumber} .show-button`);
  if (activeButton) {
    activeButton.classList.add('xxx'); // إضافة الفئة xxx للزر النشط
  }
}

function closeDiv(contentNumber) {
  // إخفاء المحتوى المحدد
  var selectedContent = document.getElementById('content' + contentNumber);
  selectedContent.style.display = 'none';

  // إخفاء الأزرار (إغلاق وإظهار) الخاصة بالديف
  var showButton = document.querySelector(`#container${contentNumber} .show-button`);
  var closeButton = document.querySelector(`#container${contentNumber} .close-button`);

  if (showButton) {
    showButton.style.display = 'none'; // إخفاء زر "إظهار"
  }
  if (closeButton) {
    closeButton.style.display = 'none'; // إخفاء زر "إغلاق"
  }

  // إزالة الفئة "xxx" من الزر النشط
  if (showButton) {
    showButton.classList.remove('xxx');
  }
}

function toggleShowButton(contentNumber) {
  // العثور على الحاوية
  var container = document.getElementById(`container${contentNumber}`);
  
  if (container) {
    // العثور على الأزرار
    var showButton = container.querySelector('.show-button');
    var closeButton = container.querySelector('.close-button');
    
    if (showButton && closeButton) {
      // عرض الأزرار
      showButton.style.display = 'flex';
      closeButton.style.display = 'flex';
    } else {
      console.error("Buttons not found in container", contentNumber);
    }
  } else {
    console.error("Container not found", contentNumber);
  }
}


  



document.addEventListener("DOMContentLoaded", () => {
  const showAkolBtn = document.getElementById("showAkolBtn");
  const closeAkolBtn = document.getElementById("closeAkolBtn");
  const akolOverlay = document.getElementById("akol-overlay");
  const akolPopup = document.getElementById("akol-popup");

  // إظهار المربع عند الضغط على الزر
  showAkolBtn.addEventListener("click", () => {
      akolOverlay.classList.add("active");
  });

  // إغلاق المربع عند الضغط على زر الإغلاق
  closeAkolBtn.addEventListener("click", () => {
      akolOverlay.classList.remove("active");
  });

  // إغلاق المربع عند الضغط خارج الـ div الخاص به
  akolOverlay.addEventListener("click", (event) => {
      if (!akolPopup.contains(event.target)) {
          akolOverlay.classList.remove("active");
      }
  });
});
