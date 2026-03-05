![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-teal)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet)

# YourMealPlan

Plan meals. Eat better. Save time.

AI-powered weekly meal planner that generates personalized meal plans based on dietary preferences, cooking time, and pantry ingredients.

![YourMealPlan Dashboard](step4-weekly-meal-plan.png)

## 🌐 Demo

This project demonstrates a personalized weekly meal planner that generates meal plans based on user preferences.

Users can:
- Select dietary preferences
- Choose cooking time
- Add pantry ingredients
- Generate a weekly meal plan
- View detailed recipes

## 🚀 Key Features

- Personalized weekly meal plans
- Dietary preference filtering (Vegetarian, Vegan, Keto, etc.)
- Cooking-time based recipe suggestions
- Pantry ingredient based recommendations
- Detailed recipes with ingredients and instructions
- Stripe subscription integration (test mode)

## 🛠 Tech Stack

- React
- Vite
- Tailwind CSS
- Supabase (Authentication & Database)
- Stripe (Subscription Payments)
- Lovable (AI-assisted development)

## ⚙️ Installation

1. Clone the repository
git clone https://github.com/saqibmojeeb/planyourplate.git

2. Install dependencies
npm install

3. Start the development server
npm run dev

## 📖 How It Works

1. Users sign up or log in to the platform.
2. Select dietary preferences (Vegetarian, Vegan, Keto, etc.).
3. Choose how much time they want to spend cooking.
4. Add pantry ingredients they already have.
5. The system generates a personalized weekly meal plan.
6. Users can view detailed recipes with ingredients and cooking instructions.

## 💳 Pricing (Test Mode)

- Weekly Plan – ₹9/week  
- Monthly Plan – ₹14/month  
- 3 Month Plan – ₹29  
- Yearly Plan – ₹89

## 📸 Product Walkthrough
Step 1 — Select Dietary Preferences

Users begin by choosing their dietary preferences.
The system supports multiple diet types such as Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, and Mediterranean.
![Dietary Preferences](step1-dietary-preferences.png)

Step 2 — Choose Cooking Time

Users select how much time they want to spend cooking.
The app then suggests recipes that match the selected cooking time.

Options include:
15 minutes – quick meals
30 minutes – balanced cooking time
45 minutes – more variety
60 minutes – weekend cooking
![Cooking Time](step2-cooking-time.png)

Step 3 — Add Pantry Ingredients

Users can add ingredients they already have at home.
The planner prioritizes recipes that use these ingredients to reduce food waste and simplify grocery planning.
![Pantry Ingredients](step3-pantry-ingredients.png)

Step 4 — Weekly Meal Plan Generation

Based on the user's preferences, available time, and pantry ingredients, the system generates a balanced weekly meal plan including:

Breakfast
Lunch
Dinner
Each meal includes cooking time and calorie estimates.
![Weekly Meal Plan](step4-weekly-meal-plan.png)

Step 5 — Recipe Details

Each meal can be opened to view detailed information including:

Ingredients list
Cooking instructions
Preparation time
Calorie information
Serving size
![Recipe Details NonVeg](step5-recipe-details-nonveg.png)
![Recipe Details Veg](step5-recipe-details-veg.png)

The planner supports veg and non-vegetarian meal plans with balanced nutrition and step-by-step cooking instructions.

## 🚧 Future Improvements

- AI-powered recipe generation
- Grocery list automation
- Mobile responsive improvements
- Nutrition tracking
- Meal plan sharing

## Project Status

This project is a **portfolio prototype** built for learning and demonstration purposes.

All payments are running in **Stripe Test Mode**.

## 👤 Author

**Saqib Mojeeb**

Product & Operations | Customer Experience | Fintech Enthusiast

GitHub: https://github.com/saqibmojeeb
