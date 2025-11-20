# Islamic E-Library

A modern, responsive React-based digital library platform for authentic Islamic books, built with a focus on accessibility, usability, and elegant design.

## 📖 Overview

The Islamic E-Library is a free, open-access digital platform that provides a curated collection of Islamic texts across multiple categories including Tafsir, Hadith, Fiqh, Aqeedah, Adhkaar, and History. The platform supports multiple languages (English, Arabic, Yoruba, Hausa) and offers advanced search and filtering capabilities.

**Live Features:**

- 📚 Browse and search Islamic books by keyword, category, or language
- 🎨 Modern, responsive UI with smooth animations and transitions
- 🔍 Advanced multi-language search with real-time filtering
- 📱 Mobile-friendly design for all screen sizes
- 👨‍💼 Admin panel for managing book inventory
- 🌍 Multi-language support (English, Arabic, Yoruba, Hausa)
- ⚡ Fast, optimized performance

---

## 🛠️ Tech Stack

- **Frontend:** React 18+, React Router v6
- **Styling:** CSS3 with responsive design
- **Build Tool:** Vite
- **Backend:** JSON Server (for development/demo)
- **File Storage:** Cloudinary (images), Supabase (PDFs)
- **State Management:** React Hooks (useState, useEffect, useRef)

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd e-library
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Start the JSON Server (separate terminal):**

   ```bash
   npm run server
   ```

5. **Open in browser:**
   Navigate to `http://localhost:5173` (Vite default)

---

## 🎯 Key Features Implemented

### 1. **Search and Filter System**

- **Multi-type Search:** Search by keyword (title, author, description), category, or language
- **Dynamic Suggestions:** Real-time filtering with instant feedback
- **Array/String Language Handling:** Seamlessly handles books with single language (string) or multiple languages (array)
- **Smart Filtering:**
  - Search suggestions only show languages that match the search term

### 2. **Language Selection (Multiple Options)**

- **CreateBook.jsx:** Checkboxes allow selecting multiple languages when creating a book
- **EditBook.jsx:** Checkboxes for editing existing books, supports both single-language and multi-language books
- Books can now have `language: ["English", "Arabic"]` for bilingual/multilingual resources

### 3. **Admin Panel**

- **Create Books:** Add new books with title, author, category, language(s), descriptions, cover image, and PDF file
- **Edit Books:** Modify existing book metadata and files
- **Delete Books:** Remove books from the library
- **Book Management Grid:** View all books in an organized grid layout with quick edit/delete access

### 4. **User Experience Enhancements**

- **Random Book Display:** Books are shuffled on Home and Library pages for varied experience
- **Smooth Animations:** Scroll reveal effects, hover transitions, and floating animations
- **Responsive Design:** Mobile-first approach with breakpoints at 768px and 640px
- **Optimized Spacing:** Reduced excessive margins and padding for better visual balance
- **Hero Section Overflow Fix:** Fixed horizontal overflow caused by animated gradient overlay

### 5. **Featured Books & Categories**

- **Homepage:** Displays 4 random featured books and 3 floating book images in hero section
- **Categories:** Browse books by category (Tafsir, Hadith, Fiqh, Aqeedah, Adhkaar, History)
- **Library Page:** Full catalog with search and filtering capabilities

---

## 🔧 Technical Improvements Made

### SearchBar.jsx Enhancements

- **Multi-format Language Support:** Detects and handles both string and array language formats
- **Smart Suggestion Filtering:** For books with array languages, only shows matching languages
- **Correct Filtering Logic:**
  - Uses `.includes()` for array languages to check if language is IN the array
  - Properly extracts unique languages from filtered results
- **Active Filter State:** Tracks selected filters to maintain results after clearing search input

### CreateBook.jsx Updates

- **Multiple Language Selection:** Changed from select dropdown to checkboxes
- **Array State Management:** Language state is now `["English"]` (array) instead of `"English"` (string)
- **Checkbox Logic:** Each language checkbox adds/removes values from the language array
- **Form Reset:** Properly resets language to `["English"]` after submission

### EditBook.jsx Updates

- **Smart Type Detection:** Checks `Array.isArray(book.language)` to determine current format
- **Flexible Checkbox Checking:** Works with both string and array language formats
- **Dynamic Handler:** `handleChange` method detects checkbox type and manages array logic accordingly

### Library.jsx & Home.jsx Randomization

- **Fisher-Yates Algorithm:** Implements proper shuffle algorithm for true randomization
- **Non-mutating:** Creates a new shuffled array without modifying original data
- **Consistent Experience:** Each page load shows different book arrangement

### CSS Optimizations

- **Reduced Excessive Spacing:**
  - Admin/BookDetails/EditBook top margins: `100px` → `40px`
  - Grid gaps: `30px-40px` → `20px`
  - Padding: `25-30px` → `20px`
- **Fixed Overflow Issues:** Hero section gradient overlay inset: `-20% -30%` → `-20% -10%`
- **Responsive Adjustments:** Mobile-friendly spacing that scales appropriately

---

## 📁 Project Structure

```
e-library/
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Homepage with featured books
│   │   ├── Library.jsx           # Main library page
│   │   ├── SearchBar.jsx         # Search & filter component
│   │   ├── CreateBook.jsx        # Add new book form
│   │   ├── EditBook.jsx          # Edit existing book
│   │   ├── AdminPanel.jsx        # Admin dashboard
│   │   ├── BookDetails.jsx       # Single book view
│   │   ├── Categories.jsx        # Category browsing
│   │   ├── book.jsx              # Book card component
│   │   ├── Contact.jsx           # Contact page
│   │   ├── About.jsx             # About page
│   │   ├── Nav.jsx               # Navigation
│   │   ├── Footer.jsx            # Footer
│   │   └── useFetch.jsx          # Custom fetch hook
│   ├── css/
│   │   ├── style.css             # Global styles
│   │   ├── home.css              # Homepage styles
│   │   ├── library.css           # Library page styles
│   │   ├── bookDetails.css       # Book details styles
│   │   ├── admin.css             # Admin panel styles
│   │   ├── book.css              # Book card styles
│   │   └── [other styles...]
│   ├── utiltities/
│   │   └── Uploader.jsx          # File upload handlers
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # React entry point
├── data/
│   └── books.json               # Book database
├── public/
│   ├── books/                   # Book cover images
│   └── img/                     # Other images
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Usage Guide

### Creating a Book

1. Go to Admin Panel → "Add New Book"
2. Fill in book details (title, author, category)
3. **Select Languages:** Check multiple language boxes if the book is available in multiple languages
4. Upload cover image and PDF file
5. Click "Upload Book"

### Searching Books

1. Go to Library page or use search bar
2. Choose search type: Keyword, Category, or Language
3. Type to see real-time suggestions
4. Click a suggestion to filter results

### Editing Books

1. Go to Admin Panel → Book List
2. Find the book and click "Edit"
3. Modify details, **change language selections** as needed
4. Click "Save Changes"

### Viewing Book Details

1. Click on any book card
2. View full description, author, category, and language(s)
3. Click "Read Online" or "Download" to access the PDF

---

## 🐛 Bug Fixes & Improvements

### Fixed Issues

- ✅ **Language Search Error:** `book.language.toLowerCase is not a function` - Fixed by handling array format
- ✅ **Multiple Languages in Suggestions:** Search showing both English and Arabic - Fixed by filtering individual languages
- ✅ **Search Term Not Clearing:** After selecting language/category - Fixed with `activeFilter` state
- ✅ **Excessive Page Spacing:** Too much margin/padding throughout - Reduced by 50%
- ✅ **Horizontal Overflow:** Hero section gradient overflow - Fixed inset values

### Features Added

- ✅ Multiple language selection (checkboxes instead of single select)
- ✅ Random book display shuffling on Home and Library
- ✅ Smart SearchBar that handles both array and string language formats
- ✅ Active filter indicator showing current search/filter
- ✅ Optimized responsive design with tighter spacing

---

## 📱 Responsive Design

- **Desktop (1024px+):** Full layout with side-by-side sections
- **Tablet (768px-1023px):** Adjusted columns and spacing
- **Mobile (< 640px):** Single column, optimized touch interactions

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 API Integration

### Endpoints Used

- `GET /books/` - Fetch all books
- `GET /books/:id` - Fetch single book
- `POST /books/` - Create new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### File Upload Services

- **Cloudinary:** Cover images
- **Supabase:** PDF files

---

## 🎨 Design Philosophy

- **Clean & Minimal:** Focus on content with elegant typography
- **Green Accent:** Primary color `#33b233` (Islamic green)
- **Smooth Animations:** Subtle transitions for professional feel
- **Accessibility:** Semantic HTML, proper color contrast, keyboard navigation
- **Performance:** Optimized animations, lazy loading, efficient state management

---

## 🔜 Future Enhancements

- [ ] User authentication and accounts
- [ ] Reading list/bookmarks feature
- [ ] PDF reader with annotations
- [ ] User reviews and ratings
- [ ] Advanced filtering (year, author, rating)
- [ ] Multi-language UI (Arabic, Yoruba interfaces)
- [ ] Download history and recommendations
- [ ] Dark mode theme

---

## 📄 License

This project is open-source and available for educational and non-commercial use.

---

## 👥 Credits

**Developed for:** Dawah Nigeria  
**Contact:** admin@dawahnigeria.com  
**Website:** https://dawahnigeria.com/  
**Location:** Ibadan, Oyo State, Nigeria

---

## 🤝 Contributing

Contributions are welcome! If you find bugs or have feature suggestions:

1. Test thoroughly on the current version
2. Document the issue or feature clearly
3. Submit changes with clear descriptions

---

**Last Updated:** November 20, 2025
