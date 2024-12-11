document.addEventListener('DOMContentLoaded', () => {
    // وظيفة لإظهار أو إخفاء الديف عند الضغط على الزر
    function toggleDiv(divId) {
        // إخفاء جميع الديفات أولاً
        const allBoxes = document.querySelectorAll('.box');
        allBoxes.forEach((div) => {
            div.style.display = 'none';  // إخفاء الديفات
            div.style.opacity = 0;       // تعيين الشفافية للصفر
            div.style.transform = 'translateX(-0%) translateY(-20px)';  // تعيين الوضع الابتدائي
        });

        // إظهار الديف المحدد فقط مع تأثير
        const div = document.getElementById(divId);

        // إعادة تعيين التأثير لتمكين إعادة العرض
        div.style.display = 'none'; // إعادة تعيين العرض
        clearTimeout(div.dataset.timeoutId); // إلغاء أي توقيت سابق

        const timeoutId = setTimeout(() => {
            div.style.display = 'block';
            setTimeout(() => {
                div.style.opacity = 1;  // تعيين الشفافية إلى 1 لجعل الديف مرئيًا
                div.style.transform = 'translateX(-0%) translateY(0)';  // تعيين التحويل لجعل الديف يظهر في مكانه
            }, 10); // تأخير بسيط لضمان بدء الانتقال
        }, 10); // تأخير بسيط لإعادة ضبط الحالة

        div.dataset.timeoutId = timeoutId; // تخزين التايمر في البيانات
    }

    // ربط الأزرار مع وظيفة التبديل
    document.getElementById('toggleBtn1').addEventListener('click', () => toggleDiv('box1'));
    document.getElementById('toggleBtn2').addEventListener('click', () => toggleDiv('box2'));
    document.getElementById('toggleBtn3').addEventListener('click', () => toggleDiv('box3'));
    document.getElementById('toggleBtn4').addEventListener('click', () => toggleDiv('box4'));
    document.getElementById('toggleBtn5').addEventListener('click', () => toggleDiv('box5'));
    document.getElementById('acuont').addEventListener('click', () => toggleDiv('acuonts'));

    // إخفاء الديف إذا تم النقر في مكان آخر
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.box') && !event.target.closest('button')) {
            document.querySelectorAll('.box').forEach((div) => {
                div.style.display = 'none';
                div.style.opacity = 0;
                div.style.transform = 'translateX(-0%) translateY(-20px)';
            });
        }
    });
});






