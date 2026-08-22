import {type Page , type Locator , expect} from '@playwright/test';
import {type ProductData} from './homePage';

export class CartPage {
    // Locators
    private readonly cartItem: Locator;
    private readonly itemName: Locator;
    private readonly itemDescription: Locator;
    private readonly itemPrice: Locator;
    private readonly checkoutButton: Locator;
    private readonly removeButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartTitle: Locator;

    // variables
    private readonly page: Page;
    private readonly cartTitleText = 'Your Cart';
    private readonly productData: ProductData;

    // constructor
    constructor(page: Page, productData: ProductData) {
        this.page = page;
        this.productData = productData;
        this.cartItem = page.getByTestId('inventory-item');
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDescription = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.checkoutButton = page.getByTestId('checkout');
        this.removeButton = page.getByTestId(`remove-${productData.name.toLowerCase().replace(/\s+/g, '-')}`);
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.cartTitle = page.getByTestId('title');
    }

    // Actions
    async navigateBackToHomePage() {
        await this.continueShoppingButton.click();
    }

    async removeItemFromCart() {
        await this.removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    // Assertions

    async assertCartPage() {
        await expect(this.cartTitle).toHaveText(this.cartTitleText);
    }
    async assertProductData() {
        await expect(this.itemName).toHaveText(this.productData.name);
        await expect(this.itemDescription).toHaveText(this.productData.description);
        await expect(this.itemPrice).toHaveText(this.productData.price);
    }

    async assertEmptyCart() {
        await expect(this.cartItem).toHaveCount(0);
        await expect(this.checkoutButton).not.toBeVisible();
    }
}