export default class LoginValidation {
  private static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  private static validatePassword(password: string): boolean {
    const passwordRegex = /^\d+$/;
    return passwordRegex.test(password);
  }

  public static validateUser(email: string, password: string): boolean {
    return (
      this.validateEmail(email)
            || this.validatePassword(password)
    );
  }
}

// Referência: lecture/9.5
