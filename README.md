# MeetMate Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/cacc80b9-c575-409d-a6a2-a8422deb2304/deploy-status)](https://app.netlify.com/sites/ipk-frontend/deploys)
[![CI](https://github.com/Informatik-Projekt-Kurs/frontend/actions/workflows/main.yml/badge.svg?branch=dev)](https://github.com/Informatik-Projekt-Kurs/frontend/actions/workflows/main.yml)

## Overview

MeetMate is an innovative platform dedicated to small brands wanting to improve their content and appointment management. Our frontend repository focuses on delivering stunning, engaging, and high-conversion websites with a keen emphasis on search engine optimization, user experience design, and performance.

## Technologies

- **HTML/CSS**: For structuring and styling webpages.
- **REACT**: A JavaScript library for building user interfaces.
- **NextJS**: A React framework for production.
- **Tailwind**: A utility-first CSS framework.
- **ShadCN**: A Component library for react
- **Redux**: A react state management library
- **ThreeJS**: A library to create and display 3d art and scenes

## Getting Started

### Prerequisites

- Node.js
- NPM/Yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Informatik-Projekt-Kurs/frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Add a .env file
   ```dotenv
    JWT_SECRET="mysecretvalue"
    JWT_EXPIRATION_MS=60000
    JWT_REFRESH_EXPIRATION_MS=1209600000
    REFRESH_DOMAIN="/refresh"
    FRONTEND_DOMAIN="http://localhost:3000" // for production use real domain
    BACKEND_DOMAIN="https://meetmate.bencodes.de"
    GRAPHQL_URL="http://localhost:8080/graphql"
    NEXT_PUBLIC_SYNCFUSION_LICENSE="mysecretvalue"
   ```

### Running the Application

- To run the application in development mode:
  ```
  npm start
  ```
  or
  ```
  yarn start
  ```

## License

See `LICENSE` for more information.

## Contact

- Project Link: [https://github.com/Informatik-Projekt-Kurs/frontend](https://github.com/Informatik-Projekt-Kurs/frontend)
- Company Website: [MeetMate](https://www.meetmate.dev)
- Contact Us: [boeckmann@gmail.com](mailto:boeckmannben@gmail.com)

---

MeetMate 2024 - All Rights Reserved
