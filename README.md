# Financial Portfolio Manager - Angular Application

This is a web-based Angular application for managing financial portfolios. It allows users to input their investment details, review them before submission, and track their investments with form validation and feedback.

---

## Features

- Input investment details: Asset Type, Quantity, Purchase Price, Purchase Date
- Form validation with Angular Reactive Forms
- Currency formatting on Purchase Price input
- Date picker with maximum date restriction (cannot select future dates)
- Review dialog to confirm inputs before submission
- Form reset after successful submission
- Snackbar notification on successful submission
- Responsive and clean UI with Angular Material components
- Mock service simulates backend save operation
- Custom HTTP Interceptor to simulate backend API, log requests/responses, and display global error handling via Snackbar

---

## Tech Stack

- Angular 16+
- Angular Material
- Reactive Forms
- TypeScript

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or later recommended)
- Angular CLI (v16+)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd your-repo-folder

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Run the development server:

   ```bash
   ng serve

   ```

4. Open your browser and navigate to http://localhost:4200/
