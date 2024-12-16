document.addEventListener('DOMContentLoaded', () => {
  let originalImageSrc = ''; // لتخزين الصورة الأصلية
  let lastEditedSrc = ''; // لتخزين آخر تعديل

  // إعداد لعرض الصور التي تم اختيارها
  document.getElementById('imageInput').addEventListener('change', (event) => {
    const files = event.target.files;
    const selectedImagesContainer = document.getElementById('selectedImagesContainer');
    selectedImagesContainer.innerHTML = ''; // تنظيف الحاوية قبل عرض الصور الجديدة

    // عرض الصور المختارة قبل معالجة الخلفية
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('image-wrapper');
      
      const imgElement = document.createElement('img');
      imgElement.src = URL.createObjectURL(file);
      imgElement.alt = 'Selected image';
      
      imageWrapper.appendChild(imgElement);
      selectedImagesContainer.appendChild(imageWrapper);
    }
  });

  document.getElementById('removeBgBtn').addEventListener('click', async () => {
    const inputFiles = document.getElementById('imageInput').files;
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // تنظيف الحاوية قبل إضافة الصور الجديدة

    if (inputFiles.length === 0) {
      alert('يرجى اختيار صور أولاً!');
      return;
    }

    // معالجة الصور
    for (let i = 0; i < inputFiles.length; i++) {
      const inputFile = inputFiles[i];

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('image-wrapper');
      
      const imgElement = document.createElement('img');
      imgElement.src = URL.createObjectURL(inputFile); // عرض الصورة المبدئية
      imageWrapper.appendChild(imgElement);

      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('buttons-container');
      imageWrapper.appendChild(buttonsContainer);

      resultContainer.appendChild(imageWrapper);

      const formData = new FormData();
      formData.append("image_file", inputFile);
      formData.append("size", "auto");

      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': 'wxnosjnzMLCpMN1cAYYzxFkR', // ضع مفتاح API الخاص بك هنا
          },
          body: formData,
        });

        if (response.ok) {
          const resultBlob = await response.blob();
          const resultUrl = URL.createObjectURL(resultBlob);

          originalImageSrc = resultUrl; // حفظ الصورة الأصلية
          imgElement.src = resultUrl;

          const editButton = document.createElement('button');
          editButton.textContent = 'تعديل الصورة';
          editButton.onclick = () => openEditor(imgElement);

          const downloadButton = document.createElement('button');
          downloadButton.textContent = 'تنزيل الصورة';
          downloadButton.onclick = () => {
            const link = document.createElement('a');
            link.href = resultUrl;
            link.download = `image_without_bg_${i + 1}.png`;
            link.click();
          };

          buttonsContainer.appendChild(editButton);
          buttonsContainer.appendChild(downloadButton);
        }
      } catch (error) {
        console.error('حدث خطأ أثناء إزالة الخلفية:', error);
      }
    }
  });

  // فتح محرر الصورة
  function openEditor(imgElement) {
    const editor = document.createElement('div');
    editor.classList.add('editor');

    const editorImage = document.createElement('img');
    editorImage.src = imgElement.src;
    editor.appendChild(editorImage);

    lastEditedSrc = imgElement.src; // حفظ آخر تعديل

    const tools = [
      { label: 'زيادة الحجم', action: 'increase-size' },
      { label: 'تقليل الحجم', action: 'decrease-size' },
      { label: 'العودة للتحديث القديم', action: 'restore-last' },
      { label: 'العودة للصورة الأصلية', action: 'restore-original' },
      ...editTools, // إضافة الأدوات الجديدة من القائمة
    ];

    tools.forEach((tool) => {
      const toolButton = document.createElement('button');
      toolButton.textContent = tool.label;
      toolButton.onclick = () => {
        applyTool(tool.action, editorImage);
      };
      editor.appendChild(toolButton);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'إغلاق';
    closeButton.onclick = () => {
      editor.remove();
    };
    editor.appendChild(closeButton);

    document.body.appendChild(editor);
  }

  // تطبيق الأدوات
  function applyTool(action, imgElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = imgElement.src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      switch (action) {
        case 'increase-size':
          canvas.width = img.width * 1.2;
          canvas.height = img.height * 1.2;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          break;
        case 'decrease-size':
          canvas.width = img.width * 0.8;
          canvas.height = img.height * 0.8;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          break;
        case 'restore-last':
          imgElement.src = lastEditedSrc;
          return;
        case 'restore-original':
          imgElement.src = originalImageSrc;
          return;
        case 'resize':
          canvas.width = img.width * 0.5;
          canvas.height = img.height * 0.5;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          break;
        case 'rotate':
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(45 * Math.PI / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          break;
        case 'contrast':
          ctx.filter = 'contrast(150%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'decrease-contrast':
          ctx.filter = 'contrast(50%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'brightness':
          ctx.filter = 'brightness(150%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'decrease-brightness':
          ctx.filter = 'brightness(50%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'darken':
          ctx.filter = 'brightness(50%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'saturation':
          ctx.filter = 'saturate(150%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'decrease-saturation':
          ctx.filter = 'saturate(50%)';
          ctx.drawImage(img, 0, 0);
          break;
        case 'hue':
          ctx.filter = 'hue-rotate(90deg)';
          ctx.drawImage(img, 0, 0);
          break;
        default:
          break;
      }

      lastEditedSrc = canvas.toDataURL(); // تحديث آخر تعديل
      imgElement.src = lastEditedSrc;
    };
  }

  // قائمة الأدوات الإضافية
  const editTools = [
    { label: 'تغيير الحجم', action: 'resize' },
    { label: 'تدوير الصورة', action: 'rotate' },
    { label: 'زيادة التباين', action: 'contrast' },
    { label: 'تخفيف التباين', action: 'decrease-contrast' },
    { label: 'زيادة السطوع', action: 'brightness' },
    { label: 'تخفيف السطوع', action: 'decrease-brightness' },
    { label: 'زيادة التعتيم', action: 'darken' },
    { label: 'زيادة التشبع', action: 'saturation' },
    { label: 'تخفيف التشبع', action: 'decrease-saturation' },
    { label: 'تغيير اللون', action: 'hue' },
  ];
});
