const COMMON_PASSWORDS = [
  'password', 'password123', 'qwerty', 'qwerty123', '12345678', 
  '123456789', 'abc123', 'password1', 'admin', 'letmein',
  'welcome', 'monkey', '1234567890', 'password!', 'Pass123!'
];
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}
export function validatePassword(
  password: string, 
  email?: string, 
  oldPassword?: string
): PasswordValidationResult {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (password.length > 32) {
    errors.push('Password must not exceed 32 characters');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter (a-z)');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter (A-Z)');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number (0-9)');
  }
  if (!/[!@#$%^&*_\-+]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*_-+)');
  }
  if (password !== password.trim()) {
    errors.push('Password cannot have spaces at the start or end');
  }
  if (/^\d+$/.test(password)) {
    errors.push('Password cannot be only numbers');
  }
  if (email) {
    const emailPrefix = email.split('@')[0].toLowerCase();
    if (password.toLowerCase() === emailPrefix) {
      errors.push('Password cannot be the same as your email username');
    }
  }
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push('This password is too common. Please choose a stronger password');
  }
  if (oldPassword && password === oldPassword) {
    errors.push('New password cannot be the same as your old password');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
export function getPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong';
  score: number;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*_\-+]/.test(password)) score++;
  if (password.length >= 16) score++;
  if (score <= 3) return { strength: 'weak', score };
  if (score <= 5) return { strength: 'medium', score };
  return { strength: 'strong', score };
}