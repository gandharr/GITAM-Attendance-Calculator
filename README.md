# GITAM Attendance Calculator

A modern, responsive web application designed to help GITAM University students track and calculate their attendance with ease. Built with Next.js, React, and Tailwind CSS with support for both light and dark modes.

## Features

- **Simple Calculator**: Quick attendance percentage calculation with flexible input options
  - Classes Attended (required)
  - Classes Absent (optional)
  - Total Classes (optional)
  - Color-coded results based on GITAM's 75% requirement

- **Advanced Calculator**: Track attendance for multiple subjects simultaneously
  - Add unlimited subjects dynamically
  - Individual attendance tracking per subject
  - Overall attendance calculation
  - Subject-wise breakdown and analysis
  - Flexible input validation with smart error handling

- **GITAM Compliance**: Built specifically for GITAM University standards
  - 75% overall attendance requirement
  - Clear policy information and guidelines
  - Medical leave considerations
  - Warning indicators for low attendance

- **Professional Design**:
  - Neon border effects with gradient styling
  - Full dark mode support with smooth transitions
  - Responsive mobile-first design
  - GITAM branding integration
  - Smooth animations and hover effects

- **Easy Navigation**: Seamless routing between Home, Simple Calculator, and Advanced Calculator pages

## Pages

### Home Page (`/`)
- Overview of the application
- GITAM Attendance Policy information
- Quick access to both calculator types
- Direct link to GITAM Web Login
- Professional branding and design

### Simple Calculator (`/simple-calculator`)
- Single-page attendance calculator
- Real-time percentage calculation
- Visual feedback with color-coding
- Input validation and error handling

### Advanced Calculator (`/advanced-calculator`)
- Multi-subject attendance tracking
- Add/remove subjects dynamically
- Individual and overall attendance calculation
- Detailed subject-wise breakdown
- Comprehensive results display

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme Management**: Custom theme provider with localStorage
- **Language**: TypeScript
- **Responsive Design**: Mobile-first approach

## Installation & Setup

### Option 1: Using shadcn CLI (Recommended)

\`\`\`bash
npx shadcn-cli@latest init -d
# Select options for your project setup

# Then clone or download this project and run:
npm install
npm run dev
\`\`\`

### Option 2: Manual Setup

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd gitam-attendance-calculator

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Using Vercel CLI
npm install -g vercel
vercel
\`\`\`

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gitam-attendance-calculator)

### Deploy to Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## How to Use

### Simple Calculator

1. Navigate to the Simple Calculator page
2. Enter the number of classes attended
3. Enter either classes absent or total classes (one is optional)
4. Click "Calculate Attendance"
5. View your attendance percentage and compliance status

### Advanced Calculator

1. Navigate to the Advanced Calculator page
2. Click "Add Subject" to add subjects
3. For each subject, enter:
   - Subject name
   - Classes attended
   - Classes absent or total classes
4. Add more subjects as needed
5. Click "Calculate Overall Attendance"
6. View overall and subject-wise attendance breakdown

## Dark Mode

The application includes a built-in dark mode toggle in the header. Your preference is automatically saved to local storage.

## GITAM Attendance Policy

- **Minimum Requirement**: Overall 75% attendance
- **Consequences**: Students below 75% are not allowed to appear for Mid-Term and Semester examinations
- **Medical Leave**: May be considered with proper documentation
- **Regular Monitoring**: Students are advised to monitor attendance regularly

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Development

- Student profile integration with GITAM Web Login
- Attendance history tracking
- Predictive analysis for meeting attendance requirements
- Export attendance reports to PDF
- Subject-wise attendance trends

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**Built by Gandhar Dhore**

For GITAM University Students

## Support

For issues, bugs, or feature requests, please open an issue on the GitHub repository.

## Disclaimer

This calculator is a utility tool designed to help students estimate their attendance. The official attendance records maintained by GITAM University are the authoritative source. Always verify with your academic department for accurate attendance information.

---

Made with ❤️ for GITAM University Students
