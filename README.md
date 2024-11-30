# SharedNest - Household Expense Management App

SharedNest is a household expense management application designed to help families manage their expenses. The app allows the head of the family to create a "nest," invite members, track household expenses, and monitor individual contributions. With a simple, user-friendly interface, SharedNest makes managing finances easier and more collaborative.

## Features

- **Create and Manage Nests**: The head of the family can create a "nest" (household) and invite members to join.
- **Track Household Expenses**: Members can add their expenses, and the app tracks cumulative household expenses.
- **Monitor Individual Contributions**: Each member can see their own contributions and how they affect the household budget.
- **Real-time Expense Updates**: View and manage expenses in real-time.
- **User Authentication**: Registration and login system to manage user data securely.

## Demo

[Live Demo Link](#) _(Replace with live demo URL if available)_

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - Axios for API calls
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for storing user data, nests, and expenses
- **Authentication**:
  - JWT (JSON Web Tokens) for user authentication and session management

## Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/sharednest.git
```

Frontend Installation:
Navigate to the frontend directory:

```bash
Copy code
cd sharednest/frontend
Install dependencies:
```

```bash
Copy code
npm install
Start the development server:
```

```bash
Copy code
npm start
Open the app in your browser at http://localhost:3000.
```

Backend Installation:
Navigate to the backend directory:

```bash
Copy code
cd sharednest/backend
Install dependencies:
```

```bash
Copy code
npm install
Start the backend server:
```

```bash
Copy code
npm start
The backend will run on http://localhost:5000.
```

Setting Up MongoDB:
Ensure MongoDB is running locally or use a cloud instance (like MongoDB Atlas).
Create a .env file in the backend directory with the following:
bash
Copy code
MONGODB_URI=mongodb://your-mongodb-uri
JWT_SECRET=your-jwt-secret
Usage
Registration and Login: Users can register and log in through the app. After login, they will be redirected to their dashboard.
Creating a Nest: The head of the family can create a nest and invite members via email.
Adding Expenses: Members can add expenses to the nest, and these will be tracked in real-time.
Viewing Expenses: Users can view their personal contributions and the overall household expenses.
Logout: Users can log out from their accounts securely.
Screenshots
Add relevant screenshots of your app here to showcase the user interface, like the dashboard, expense tracker, or login page.

Contributing
Fork the repository.
Create a new branch for your changes:
bash
Copy code
git checkout -b feature/your-feature
Commit your changes:
bash
Copy code
git commit -m "Add feature/describe what you added"
Push your changes:
bash
Copy code
git push origin feature/your-feature
Create a pull request to the main branch.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or suggestions, please open an issue or contact me at [your-email@example.com].
