# FIREPath — Financial Independence Calculator

FIREPath is a full-stack retirement planning application that helps users estimate their financial independence goals based on their current savings, annual expenses, contributions, and expected investment returns.

Built using the **MVC architecture**, the application demonstrates financial calculations, form validation, and database-driven CRUD operations.

## Project Preview

![FIREPath Application Screenshot](screenshot/firepathcalc.png)


## Features

- Calculate financial independence targets using the 25× rule.
- Estimate retirement goals based on user-provided financial information.
- Create, view, update, and delete saved retirement scenarios.
- Validate financial inputs and handle invalid submissions.
- Responsive, server-rendered interface using EJS.

## Tech Stack

**Frontend:** HTML, CSS, EJS

**Backend:** Node.js, Express.js

**Database:** MongoDB Atlas, Mongoose

**Architecture:** MVC (Model-View-Controller)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AnwarAlshohatee/firepath.git
cd firepath
npm install
```

Create a `.env` file with your MongoDB connection string:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Future Improvements

- User authentication and personalized dashboards
- Interactive financial charts
- Advanced retirement projections and scenario comparisons

## Author

**Anwar Alshohatee** — Software Engineer

[GitHub](https://github.com/AnwarAlshohatee)
