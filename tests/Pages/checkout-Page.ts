import {type Page , type Locator , expect} from '@playwright/test';

export class CheckoutPage {
    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCode: Locator;
    private readonly continueButton: Locator;
    private readonly cancelButton: Locator;
    private readonly checkoutTitle: Locator;
    private readonly errorMessage: Locator;

    // variables
    private readonly page: Page;
    private readonly checkoutTitleText = 'Checkout: Your Information';
    private readonly firstNameErrorMessage = 'Error: First Name is required';
    private readonly lastNameErrorMessage = 'Error: Last Name is required';
    private readonly zipCodeErrorMessage = 'Error: Postal Code is required';

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.zipCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.checkoutTitle = page.getByTestId('title');
        this.errorMessage = page.getByTestId('error');
    }

    // Actions
    async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCode.fill(zipCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    // Assertions
    async assertCheckoutPage() {
        await expect(this.checkoutTitle).toHaveText(this.checkoutTitleText);
    }   

    async assertFirstNameError() {
        await expect(this.errorMessage).toHaveText(this.firstNameErrorMessage);
    }

    async assertLastNameError() {
        await expect(this.errorMessage).toHaveText(this.lastNameErrorMessage);
    }

    async assertZipCodeError() {
        await expect(this.errorMessage).toHaveText(this.zipCodeErrorMessage);
    }

}

