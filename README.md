# 🧮 React Calculator

A simple React-based calculator that supports basic arithmetic operations (`+`, `-`, `x`, `/`) and displays the current formula and result dynamically.

🌟 **Live Demo**  
🔗 **Check it out here**: [Calculator](https://calc-9869.netlify.app/)

---


## 🚀 Installation

1️⃣ **Clone the repository**:  
```
  git clone --branch calc https://github.com/JurgenHonest/Frontend-Projects.git
  cd Frontend-Projects

```
2️⃣ Install dependencies:
```
  npm install
```
3️⃣ Start the development server:
```
npm run dev
```
---


## 🚀 Features

- ➕ Perform basic arithmetic calculations.
- 📝 Display the formula and result dynamically.
- 🔄 Reset the calculator using the "**AC**" button.
- 🔢 Handle decimal inputs.
- 🚫 Prevent invalid input sequences (e.g., multiple decimals).

---


## 📂 Project Structure
```
Frontend-Projects/
│── 📁 **public/**  
│   ├── 🖼️ **favicon-32x32.png**  
│── 📁 **sound/**  
│── 📁 **src/**   
│   ├── 📁 **styles/**  
│   │   ├── 📄 **App.css**  
│   │   ├── 📄 **index.css**  
│   ├── 📄 **App.jsx**
│   ├── 📄 **Calculator.jsx**
│   ├── 📄 **main.jsx**
│── 📄 **.gitignore**
│── 📄 **README.md**
│── 📄 **index.html**
│── 📄 **eslint.config.js** 
│── 📄 **package-lock.json**
│── 📄 **package.json**
│── 📄 **vite.config.js**

```

### Main Component: `Calculator`
The `Calculator` component is a stateful React class component. It handles:
- **State management**: Tracks `currentValue`, `formula`, and evaluation status.
- **User input handling**: Updates the state based on button clicks (numbers, operators, decimal, or `=`).

### 🧑‍💻 State Variables
1. `currentValue`: The number or result currently displayed.
2. `formula`: The full mathematical expression being calculated.
3. `evaluated`: Tracks whether the result has been evaluated.

### 🛠️ Methods
- `clear`: Resets the calculator state.
- `handleNumbers`: Adds numbers to the current value and formula.
- `handleOperators`: Adds operators to the formula, ensuring valid syntax.
- `handleDecimal`: Adds a decimal point to the current number.
- `handleEvaluate`: Evaluates the mathematical expression and displays the result.
---

## 🛠️ Technologies Used
- React: For building the user interface and handling logic.
- JSX: For rendering UI elements.
- CSS Grid: For layout structure.
- Tailwind CSS: For styling the components.
