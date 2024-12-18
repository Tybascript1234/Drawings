document.addEventListener('DOMContentLoaded', () => {
  function toggleDiv(divId) {
      const div = document.getElementById(divId);

      // التبديل بين إظهار وإخفاء الصندوق عند الضغط على الزر
      if (div.style.display === 'none' || div.style.display === '') {
          // إذا كان مخفيًا أو لم يتم تحديده بعد، إظهاره
          div.style.display = 'block';

          // إخفاء جميع الصناديق الأخرى
          document.querySelectorAll('.box').forEach((otherDiv) => {
              if (otherDiv !== div) {
                  otherDiv.style.display = 'none';
              }
          });
      } else {
          // إذا كان ظاهرًا، أخفه
          div.style.display = 'none';
      }
  }

  // إضافة الأحداث للأزرار
  document.getElementById('toggleBtn1').addEventListener('click', () => toggleDiv('box1'));
  document.getElementById('toggleBtn2').addEventListener('click', () => toggleDiv('box2'));
  document.getElementById('toggleBtn3').addEventListener('click', () => toggleDiv('box3'));
  document.getElementById('toggleBtn4').addEventListener('click', () => toggleDiv('box4'));
  document.getElementById('toggleBtn5').addEventListener('click', () => toggleDiv('box5'));
  document.getElementById('toggleBtn6').addEventListener('click', () => toggleDiv('box6'));
  document.getElementById('acuont').addEventListener('click', () => toggleDiv('acuonts'));

  // إخفاء الصناديق عند النقر خارجها
  document.addEventListener('click', (event) => {
      // تأكد من أن النقر خارج أي صناديق أو أزرار
      if (!event.target.closest('.box') && !event.target.closest('button')) {
          document.querySelectorAll('.box').forEach((div) => {
              div.style.display = 'none';
          });
      }
  });

  // منع إخفاء الصندوق عند النقر داخله
  document.querySelectorAll('.box').forEach((div) => {
      div.addEventListener('click', (event) => {
          // منع الحدث من الانتشار لكي لا يتسبب في إخفاء الصندوق عند النقر داخل الديف
          event.stopPropagation();
      });
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
  if (selectedContent) {
    selectedContent.style.display = 'block';
  }

  // تغيير لون الزر الذي تم الضغط عليه
  var activeButton = document.querySelector(`#container${contentNumber} .show-button`);
  if (activeButton) {
    activeButton.classList.add('xxx'); // إضافة الفئة xxx للزر النشط
  }
}

function closeDiv(contentNumber) {
  // إخفاء المحتوى المحدد
  var selectedContent = document.getElementById('content' + contentNumber);
  if (selectedContent) {
    selectedContent.style.display = 'none';
  }

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

  // التحقق إذا تم إغلاق جميع الديفات
  var contents = document.querySelectorAll('.content');
  var allClosed = Array.from(contents).every(function(content) {
    return content.style.display === 'none';
  });

  if (allClosed) {
    console.log("All content divs are closed.");
    // هنا يمكنك إضافة أي منطق إضافي إذا كنت ترغب في تنفيذ شيء عند إغلاق جميع المحتويات.
  } else {
    // عرض المحتوى الخاص بالديف التالي
    var totalContents = contents.length;
    var nextContentNumber = (contentNumber % totalContents) + 1; // تحديد الديف التالي (مع إعادة التدوير إلى الأول إذا كان الأخير)
    showContent(nextContentNumber);
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

      // عرض المحتوى عند الضغط
      showContent(contentNumber);
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





document.addEventListener("DOMContentLoaded", () => {
  const texts = [
      '👋 كيف حالك', 
      'سيكون هناك تحديثات جديدة قريبا', 
      'وتخفيضات تصل الى %50', 
      'ولا تنسى ان تتابعنا على حساباتنا', 
      'ساهم معنا', 
      'ولا تنسى ان تدعو لإخواننا'
  ];

  const images = [
      ['', ''], // صور للنص الأول
      ['', ''], // صور للنص الثاني
      ['', ''], // صور للنص الثالث
      ['', ''], // صور للنص الرابع
      ['', ''], // صور للنص الخامس
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/280px-Flag_of_Palestine.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Flag_of_the_Syrian_revolution.svg/280px-Flag_of_the_Syrian_revolution.svg.png'] // صور للنص السادس
  ];

  let index = 0;
  
  setInterval(() => {
      index = (index + 1) % texts.length;
      document.getElementById('changing-text').textContent = texts[index];

      // تغيير الصور بناءً على النص الحالي
      const imageElements = document.querySelectorAll('#image-container img');
      const currentImages = images[index];
      imageElements.forEach((img, i) => {
          img.src = currentImages[i];
      });
  }, 4000);  // تغيير النص والصور كل 3 ثوانٍ
});
