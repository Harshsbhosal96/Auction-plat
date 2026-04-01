/**
 * Email validation utility
 * Uses HTML5 email validation standard
 */
export const isValidEmail = (email) => {
  // Simple email validation using regex (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation utility
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password is valid (min 6 chars)
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Phone validation utility
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone is 10 digits
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Form validation helper
 * @param {object} data - Form data to validate
 * @param {array} fields - Required fields to check
 * @returns {object} - Errors object or empty if valid
 */
export const validateForm = (data, fields) => {
  const errors = {};

  fields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors[field] = `${field} is required`;
    }
  });

  if (data.email && !isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.password && !isValidPassword(data.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Phone must be 10 digits";
  }

  return errors;
};