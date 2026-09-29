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