# Lotto Generator Blueprint

## Overview
A modern, interactive, and responsive Lotto number generator. It generates 6 unique numbers (1-45) with vibrant animations and a visual style inspired by real lotto balls.

## Project Details
- **Architecture:** Framework-less (Vanilla JS, HTML, CSS).
- **Components:** Web Components for `lotto-ball` and `lotto-generator`.
- **Styling:** Modern CSS (Baseline) with container queries, OKLCH color spaces, and interactive effects.
- **Interactivity:** Smooth transitions, number generation animations, and history tracking.

## Current Plan (Lotto Generator)
1. **HTML Structure:** Minimal `index.html` with a `<lotto-app>` custom element.
2. **Visual Design:**
   - Soft noise background texture.
   - Vibrant gradients for the lotto balls.
   - Responsive layout for mobile and desktop.
3. **Core Features:**
   - **Generate Button:** Triggers the number pick with a "spinning" animation effect.
   - **Number Balls:** Displayed in sorted order.
   - **History List:** Saves previous results in `localStorage`.
   - **Modern UI:** Glassmorphism and deep shadows.
4. **Implementation Steps:**
   - Update `style.css` with global variables and base styles.
   - Implement `lotto-ball` component in `main.js`.
   - Implement `lotto-generator` component in `main.js`.
   - Update `index.html` to include the app.
