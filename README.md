# EduTrack

A comprehensive mobile application for tracking student information.

## Features

- **Student Management**

  - Add and remove student profiles
  - Store comprehensive student information
  - Search and filter capabilities

- **User-Friendly Interface**
  - Intuitive mobile design
  - Quick access to frequently used features
  - Responsive layout for different device sizes

## Setup Instructions

### Prerequisites

- Node.js (v16.0.0 or later)
- npm (v8.0.0 or later)
- React Native environment setup (follow [official documentation](https://reactnative.dev/docs/environment-setup))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/edutrack.git
   cd edutrack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit the .env file with your configuration
   ```

4. **Run the application**

   ```bash
   # For iOS
   npm run ios

   # For Android
   npm run android
   ```

### Testing

This project uses Jest for testing. To run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
edutrack/
├── __test__/             # Test files
├── .expo/                # Expo configuration
├── .vscode/              # VS Code settings
├── android/              # Android platform files
├── app/                  # Main application code
├── assets/               # Images, fonts, and other static assets
├── components/           # Reusable React components
├── constants/            # Application constants and configuration
├── data/                 # Data models and sample data
├── hooks/                # Custom React hooks
├── node_modules/         # Dependencies
├── storage/              # Data storage utilities
├── types/                # TypeScript type definitions
├── utilities/            # Helper functions and utilities
├── .gitignore            # Git ignore configuration
├── app.json              # Expo app configuration
├── eslint.config.js      # ESLint configuration
├── expo-env.d.ts         # Expo environment type definitions
├── package-lock.json     # Lock file for dependencies
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

## Development Guidelines

### Component Creation

- Use functional components with hooks
- Create TypeScript interfaces for all props
- Follow the container/presentation pattern when appropriate

### State Management

The application uses a combination of:

- Local component state for UI-specific state
- AsyncStorage for persistent data

## Known Issues and Limitations

- **Large Datasets**: Performance may degrade with extremely large student datasets (500+ records)
- **Media Attachments**: Currently limited to 10MB per attachment

## Troubleshooting

### Common Issues

1. **Jest Test Failures**

   - Ensure you have the latest version of Jest and ts-jest
   - Check that path aliases in tsconfig.json match those in jest.config.js

2. **Build Errors**

   - Clear the cache with `npm run clean`
   - Ensure all dependencies are correctly installed

3. **Import Errors**
   - Verify that path aliases are correctly set up in both TypeScript and Jest configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Cyzygy Digital & Media Co.
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
