# Dark Mode Toggle Implementation

A professional and creative dark mode toggle implementation that follows best practices for accessibility, performance, and user experience.

## Features

### Professional Implementation
- **System Preference Detection**: Automatically detects and applies the user's system theme preference using `prefers-color-scheme` media query
- **Smooth Transitions**: CSS transitions for all theme changes with a 0.3-second duration
- **Accessibility Compliant**: 
  - ARIA attributes for screen readers (`role="switch"`, `aria-checked`, `aria-live`)
  - High contrast support with `prefers-contrast` media query
  - Keyboard navigation support
- **Performance Optimized**: Uses CSS variables for efficient theme switching without excessive repaints

### Creative Elements
- **Themed Animations**: Sun/moon animations when toggling between light and dark modes
- **Multiple Theme Options**: 
  - Light themes: Default, Sepia, Cool
  - Dark themes: Default, OLED (true black), Blue
- **Customizable Accent Colors**: Choose from 5 accent colors (blue, green, yellow, red, purple)
- **Interactive Feedback**: Notification system with undo functionality when changing themes

## Usage

Simply open `index.html` in a web browser to see the dark mode toggle in action.

### Theme Toggle
- Click the sun/moon toggle in the header to switch between light and dark modes
- The toggle respects your system preference by default

### Theme Customization
- Click the palette icon to open the theme options panel
- Select from different light/dark theme variants
- Choose an accent color to personalize the interface

## Technical Details

- **HTML5**: Semantic markup with proper ARIA attributes
- **CSS3**: 
  - CSS Variables for theming
  - Responsive design with media queries
  - Animations and transitions
- **JavaScript**: 
  - Local storage for theme persistence
  - System preference detection and monitoring
  - Keyboard accessibility

## Browser Compatibility

This implementation works in all modern browsers that support CSS Variables and the `prefers-color-scheme` media query (Chrome, Firefox, Safari, Edge).
