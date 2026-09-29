const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// تقديم ملفات الموقع (HTML, CSS, JS) من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// عند اتصال أي جهاز بالموقع
io.on('connection', (socket) => {
    console.log('جهاز جديد اتصل بالموقع!');

    // استلام رسالة من جهاز وبثها للجميع
    socket.on('chatMessage', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('أنقطع اتصال أحد الأجهزة');
    });
});

// تشغيل الخادم على المنفذ 3000
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// 1. استقبال الرسائل من السيرفر وعرضها للجميع
socket.on('message', (msg) => {
    appendMessage(msg); // أو استدعِ الدالة التي تضيف الرسالة للواجهة لديك
});

// 2. إرسال الرسالة عند الضغط على زر الإرسال أو Enter
const chatForm = document.getElementById('chatForm'); // تأكد من ID نموذج الإرسال لديك
const messageInput = document.getElementById('messageInput'); // تأكد من ID خانة النص

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msgText = messageInput.value.trim();
        if (msgText) {
            // إرسال الرسالة إلى السيرفر
            socket.emit('chatMessage', msgText);
            messageInput.value = ''; // مسح خانة الكتابة
        }
    });
}
