# Mobile App - React Native with Expo

A React Native mobile application built with Expo for managing a book library system. Users can login, view available books, and borrow them.

## Features

- **Authentication**: Login with email/password using JWT tokens
- **Book Management**: View available books with author and copy information
- **Borrowing System**: Borrow books with real-time availability updates
- **Persistent Login**: JWT tokens stored in AsyncStorage for session persistence
- **Clean UI**: Minimal, modern design using React Native built-in components
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

- **React Native**: 0.72.6
- **Expo**: ~49.0.0
- **React Navigation**: Stack navigation between screens
- **Axios**: HTTP client for API calls
- **Context API**: State management for authentication
- **AsyncStorage**: Local storage for JWT tokens

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on device/simulator**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Project Structure

```
├── App.js                 # Main app component with navigation
├── src/
│   ├── contexts/
│   │   └── AuthContext.js    # Authentication context and state management
│   ├── screens/
│   │   ├── LoginScreen.js    # Login screen with form validation
│   │   └── DashboardScreen.js # Dashboard with book list and borrow functionality
│   └── services/
│       └── api.js            # API service with Axios configuration
├── package.json
├── app.json
└── babel.config.js
```

## Configuration

### API Endpoints

Update the `API_BASE_URL` in `src/services/api.js` to point to your backend:

```javascript
const API_BASE_URL = 'https://your-actual-api-url.com';
```

### Required API Endpoints

The app expects the following API endpoints:

- `POST /auth/login` - User authentication
- `GET /books` - Fetch available books
- `POST /borrow` - Borrow a book

## Usage

### Login Screen
- Enter email and password
- Tap "Sign In" button
- Loading spinner shows during authentication
- Error messages display for failed login attempts

### Dashboard Screen
- Displays list of available books
- Each book shows title, author, and available copies
- "Borrow" button for each book (disabled if no copies available)
- Pull-to-refresh functionality
- Logout button at the bottom

## API Response Format

### Login Response
```json
{
  "token": "jwt_token_here"
}
```

### Books Response
```json
{
  "books": [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name",
      "availableCopies": 3
    }
  ]
}
```

### Borrow Response
```json
{
  "success": true,
  "message": "Book borrowed successfully"
}
```

## Development

### Adding New Screens

1. Create a new screen component in `src/screens/`
2. Add the screen to the navigation stack in `App.js`
3. Import and use the screen in your navigation

### Styling

The app uses React Native's StyleSheet API with a consistent design system:
- Primary color: `#007AFF` (iOS blue)
- Background: `#f8f9fa` (light gray)
- Text colors: `#1a1a1a` (dark), `#666` (medium), `#999` (light)
- Border radius: 8px for buttons, 12px for cards

### State Management

- **Authentication**: Managed through Context API with AsyncStorage persistence
- **Local State**: Component-level state for UI interactions
- **API State**: Loading states and error handling per component

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Dependency conflicts**: Delete `node_modules` and `package-lock.json`, then reinstall
3. **iOS build errors**: Ensure Xcode and iOS Simulator are properly configured
4. **Android build errors**: Check Android Studio and SDK configuration

### Debug Mode

Enable debug mode in Expo Go app or use React Native Debugger for enhanced debugging capabilities.

## Building for Production

1. **Configure app.json** with your app details
2. **Build standalone app**:
   ```bash
   npx expo build:android  # For Android
   npx expo build:ios      # For iOS
   ```

## Contributing

1. Follow the existing code style and structure
2. Add proper error handling for new features
3. Test on both iOS and Android platforms
4. Update documentation for new features

## License

This project is open source and available under the MIT License.
