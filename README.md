# Leafy - Plant Identification App 🌿

A modern web application that helps users identify plants through image recognition using Google's Generative AI.

## Features 🌟<img width="1468" alt="Screenshot 2025-02-25 at 20 33 26" src="https://github.com/user-attachments/assets/49e2a5d3-e12f-4ca5-8e37-f21cdf446341" />

<img width="1470" alt="Screenshot 2025-02-25 at 20 33 56" src="https://github.com/user-attachments/assets/17e9138d-f561-4000-a968-57c236d07c57" />



- Plant identification through image upload
- Camera capture support for mobile devices
- Real-time analysis of plant images
- Dark/Light theme support
- History tracking of identified plants
- Responsive design for all devices

## Tech Stack 💻

- React.js (v17.0.2)
- Bootstrap 5
- Google Generative AI
- Local Storage for history management
- Webcam integration for photo capture

## Prerequisites 📋

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google API Key for Generative AI

- 
## Features in Detail 🔍
### Image Upload
- Supports drag and drop
- File size validation
- Preview before analysis
### Camera Integration
- Mobile device camera access
- Desktop webcam support
- Real-time capture
### Plant Analysis
- Species identification
- Detailed plant information
- Health assessment
### Theme Support
- Light/Dark mode toggle
- Persistent theme preference
- Smooth transitions
## Contributing 🤝
1. Fork the repository
2. Create your feature branch ( git checkout -b feature/AmazingFeature )
3. Commit your changes ( git commit -m 'Add some AmazingFeature' )
4. Push to the branch ( git push origin feature/AmazingFeature )
5. Open a Pull Request
## License 📄
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏
- Google Generative AI for plant identification
- React.js community
- Bootstrap team

## Installation 🚀

1. Clone the repository:
```bash
git clone <repository-url>
cd react-project
npm install
REACT_APP_GOOGLE_API_KEY=your_api_key_here
npm start



react-project/
├── public/
├── src/
│   ├── Components/
│   │   ├── FileUpload.js    # Image upload and analysis
│   │   ├── Header.js        # Navigation header
│   │   ├── Home.js          # Landing page
│   │   └── RecentIdentifications.js # History component
│   ├── Images/            
 # Static images
│   ├── context/            
│   │   └── ThemeContext.js  # Theme management
│   ├── utils/
│   │   └── storage.js       # Local storage utilities
│   └── App.js              # Main application component


