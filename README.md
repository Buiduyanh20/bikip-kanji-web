# 🈶 Bí Kíp Kanji Web

## Người Việt học Kanji dễ hơn bằng âm Hán Việt và mẹo ghi nhớ

---

# 1. Giới thiệu

**Bí Kíp Kanji** là một web application hỗ trợ người Việt học tiếng Nhật thông qua việc luyện tập:

- Kanji (chữ Hán Nhật)
- Từ vựng tiếng Nhật

Ứng dụng tập trung vào phương pháp:

- Âm Hán Việt
- Nhập đáp án trực tiếp
- Luyện tập dạng câu hỏi
- Ghi nhớ bằng mẹo liên tưởng

Thay vì chỉ xem danh sách Kanji:

```
母 = はは = Mẹ
```

người học sẽ chủ động ghi nhớ:

```
Hiển thị Kanji

        ↓

Người học suy nghĩ

        ↓

Nhập câu trả lời

        ↓

Kiểm tra đáp án

        ↓

Hiển thị giải thích

        ↓

Ôn lại nội dung chưa nhớ
```

---

# 2. Mục tiêu sản phẩm

## 2.1 Mục tiêu chính

Giúp người Việt:

- Dễ tiếp cận Kanji hơn thông qua âm Hán Việt
- Ghi nhớ Kanji lâu hơn bằng mẹo liên tưởng
- Học từ vựng tiếng Nhật theo cấp độ
- Tự luyện tập mỗi ngày

---

## 2.2 Phương pháp học

### Kanji

Ví dụ:

```
母
```

Người học nhập:

```
mẫu
```

Kết quả:

```
母

Âm Hán Việt:
Mẫu

Nghĩa:
Mẹ

Cách đọc:
はは
```

---

### Từ vựng

Hiển thị:

```
母
```

Người học nhập:

```
haha
```

hoặc:

```
はは
```

Kết quả:

```
母

Đọc:
はは

Nghĩa:
Mẹ
```

---

# 3. Phạm vi Version 1.0.0

## Có

✅ Học Kanji theo cấp độ  
✅ Học từ vựng theo cấp độ  
✅ Quiz nhập câu trả lời  
✅ Kiểm tra đáp án  
✅ Lưu danh sách sai  
✅ Ôn tập lại nội dung chưa nhớ  
✅ Responsive cho mobile browser  
✅ Lưu tiến độ local trên trình duyệt  


## Không có

❌ Đăng nhập  
❌ User account  
❌ Backend  
❌ Database server  
❌ Cloud Sync  
❌ Ranking  
❌ Community  

---

# 4. Đối tượng sử dụng

Bí Kíp Kanji hướng tới:

- Người Việt học tiếng Nhật
- Người học JLPT nhiều cấp độ
- Người muốn cải thiện khả năng nhớ Kanji và từ vựng


Người dùng có thể chọn:

- Nội dung học
- Cấp độ
- Số lượng bài học

Ví dụ:

```
N5

├── Kanji
└── Vocabulary


N4

├── Kanji
└── Vocabulary


N3

├── Kanji
└── Vocabulary
```

---

# 5. User Flow

```
Mở Web

↓

Home

↓

Chọn nội dung

↓

Chọn cấp độ

↓

Chọn phương pháp học

↓

Chọn số lượng

↓

Quiz

↓

Kết quả

↓

Ôn tập lỗi sai
```

---

# 6. Routing

```
/
Home


/kanji

Chọn level Kanji


/kanji/[level]

Setup học Kanji


/kanji/[level]/quiz

Quiz Kanji


/vocabulary

Chọn level từ vựng


/vocabulary/[level]

Setup học từ vựng


/vocabulary/[level]/quiz

Quiz từ vựng


/review

Danh sách lỗi sai + ôn tập


/progress

Tiến độ học


/settings

Cài đặt
```

---

# 7. Component Architecture

```
components

├── ui
│   └── shadcn components
│
├── layout
│   ├── AppShell
│   ├── PageHeader
│   ├── BottomNav
│   └── PageContainer
│
├── home
│   ├── HomeHero
│   └── ModeCard
│
├── level
│   ├── LevelGrid
│   └── LevelCard
│
├── setup
│   ├── SetupForm
│   ├── MethodSelector
│   └── CountSelector
│
├── quiz
│   ├── QuizScreen
│   ├── QuizProgressBar
│   ├── QuestionCard
│   ├── AnswerInput
│   ├── ResultPanel
│   └── QuizSummary
│
├── review
│   ├── MistakeList
│   └── MistakeItem
│
├── progress
│   ├── ProgressSummary
│   └── LevelProgressCard
│
└── settings
    ├── NameForm
    └── ResetDataDialog
```

---

# 8. State Management

Sử dụng:

- Zustand
- LocalStorage
- SessionStorage


## progressStore

Lưu tiến độ học:

- Số lần đúng
- Số lần sai
- Lần học cuối
- Trạng thái ghi nhớ


Trạng thái:

```
Mới

↓

Cần cải thiện

↓

Đã nhớ
```


## sessionStore

Lưu phiên học hiện tại:

- Danh sách câu hỏi
- Vị trí hiện tại
- Câu trả lời
- Kết quả


## settingsStore

Lưu:

- Tên người dùng

---

# 9. Data Structure

## Kanji

```json
{
  "id": "kanji_001",
  "char": "母",
  "level": "N5",
  "hanViet": [
    "Mẫu"
  ],
  "meanings": [
    "Mẹ"
  ],
  "onyomi": [
    "ボ"
  ],
  "kunyomi": [
    "はは"
  ],
  "hint": "",
  "story": "",
  "examples": []
}
```

---

## Vocabulary

```json
{
  "id": "vocab_001",
  "word": "母",
  "reading": "はは",
  "meanings": [
    "Mẹ"
  ],
  "level": "N5",
  "kanjiIds": [
    "kanji_001"
  ]
}
```

---

# 10. Answer Checker

Xử lý riêng:

```
utils/answer-checker
```

## Hán Việt

Chấp nhận:

```
mẫu

Mẫu

mau
```


## Reading

Chấp nhận:

```
haha

はは
```

Có thể sử dụng:

```
wanakana
```

để chuyển đổi romaji → hiragana.

---

# 11. Progress Logic

Theo dõi theo từng phương pháp.

Ví dụ:

```
母


Hán Việt:

Đã nhớ


Reading:

Cần cải thiện


Meaning:

Đang học
```

Không đánh giá toàn bộ Kanji chỉ bằng một trạng thái.

---

# 12. Quiz Logic

Luồng:

```
Quiz Builder

↓

Lấy dữ liệu từ Repository

↓

Random + ưu tiên chữ yếu

↓

Tạo Quiz Session

↓

User trả lời

↓

Check Answer

↓

Update Progress

↓

Hiển thị Result

↓

Câu tiếp theo
```

---

# 13. UI Design

## Style

- Japanese minimal
- Modern education platform
- Friendly
- Memory game


## Color

Primary:

```
#4F46E5
```


Secondary:

```
#F472B6
```


Background:

```
#FAFAF9
```


Card:

```
#FFFFFF
```


Success:

```
#22C55E
```


Error:

```
#EF4444
```


## Font

- Inter
- Noto Sans JP
- Noto Sans Vietnamese


Kanji hiển thị lớn:

```
font-size: 96px
```

---

# 14. Technology Stack

## Frontend

```
Next.js 16

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion
```


## State

```
Zustand
```


## Storage

```
LocalStorage

SessionStorage
```


## Data

```
JSON
```


## Deploy

```
Vercel
```

---

# 15. Project Structure

```
.

├── app/

├── components/

│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── level/
│   ├── setup/
│   ├── quiz/
│   ├── review/
│   ├── progress/
│   └── settings/

├── lib/

├── public/

├── package.json

├── components.json

└── next.config.ts
```

---

# 16. Version Roadmap

## Version 1.0.0

Mục tiêu:

Web học Kanji cá nhân.


Có:

- Kanji learning
- Vocabulary learning
- Quiz
- Review mistakes
- Local progress


---

## Version 2.0.0

Định hướng tương lai:


Thêm:

- User Account
- Backend API
- Database
- Cloud Sync
- Đồng bộ Web/App


Kiến trúc:

```
Web/App

↓

API Server

↓

Database

↓

User Account
```

---

# 17. Product Vision

Bí Kíp Kanji không chỉ là công cụ tra cứu Kanji.

Mục tiêu:

```
Hiểu Kanji

↓

Nhớ bằng âm Hán Việt

↓

Ghi nhớ bằng mẹo

↓

Luyện tập qua thử thách

↓

Phát hiện điểm yếu

↓

Ôn tập

↓

Ghi nhớ lâu dài
```

---

# 🈶 Bí Kíp Kanji

**Người Việt học Kanji dễ hơn bằng âm Hán Việt và mẹo ghi nhớ**