import {type Page , type Locator , expect} from '@playwright/test';
export class LoginPage {
    // Locators
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    // variables
    private readonly url = 'https://www.saucedemo.com';
    private readonly emptyUsernameErrorMessage = 'Epic sadface: Username is required';
    private readonly emptyPasswordErrorMessage = 'Epic sadface: Password is required';
    private readonly invalidCredentialsErrorMessage = 'Epic sadface: Username and password do not match any user in this service';
    private readonly page: Page;

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
    }

    // Actions
    async navigateToLoginPage() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Assertions

    async assertEmptyUsernameError() {
        await expect(this.errorMessage).toHaveText(this.emptyUsernameErrorMessage);
    }

    async assertEmptyPasswordError() {
        await expect(this.errorMessage).toHaveText(this.emptyPasswordErrorMessage);
    }

    async assertInvalidCredentialsError() {
        await expect(this.errorMessage).toHaveText(this.invalidCredentialsErrorMessage);
    }

    async assertSuccessfulLogout() {
        await expect(this.usernameInput).toBeVisible();
    }

}