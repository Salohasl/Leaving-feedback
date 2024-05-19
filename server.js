import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
const port = 3000;

const app = express();

// Middleware для парсинга JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Определение опций CORS
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Разрешаем запросы с этого домена
    optionsSuccessStatus: 200 // Необходимо для некоторых браузеров
};

// Применяем CORS middleware
app.use(cors(corsOptions));

// Массив для хранения отзывов
let reviews = [];

// Настройка multer для обработки multipart/form-data
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/'); // Указываем директорию для сохранения файлов
    },
    filename: function(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Генерируем имя файла
    }
});
  
const upload = multer({ storage: storage });

// GET-запрос для получения всех отзывов
app.get('/reviews', cors(corsOptions), (req, res) => {
    res.status(200).json(reviews);
});

// POST-запрос для добавления нового отзыва
app.post('/reviews', cors(corsOptions), upload.single('image'), (req, res) => {
    const review = req.body;
    review.id = reviews.length + 1; // Добавляем уникальный ID
    reviews.push(review);
    res.status(201).json({ message: 'Отзыв успешно добавлен' });
});

// DELETE-запрос для удаления отзыва по ID
app.delete('/reviews/:id', cors(corsOptions), (req, res) => {
    const reviewId = req.params.id;
    const index = reviews.findIndex(review => review.id === Number(reviewId));
    if (index!== -1) {
        reviews.splice(index, 1);
        res.status(200).json({ message: 'Отзыв успешно удален' });
    } else {
        res.status(404).json({ message: 'Отзыв не найден' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
