using System;
using System.Security.Cryptography;
using System.Text;

namespace backend.Helpers
{
    public static class PasswordHelper
    {
        /// <summary>
        /// Hashes a plain-text password using SHA256.
        /// (Perfect for a college project - simple, secure, and has no external package dependency!)
        /// </summary>
        public static string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
                return string.Empty;

            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                
                // Convert byte array to a string
                var builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2")); // Hexadecimal representation
                }
                return builder.ToString();
            }
        }

        /// <summary>
        /// Compares a plain text password with a hashed password.
        /// </summary>
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            var hashedInput = HashPassword(password);
            return string.Equals(hashedInput, hashedPassword, StringComparison.OrdinalIgnoreCase);
        }
    }
}
