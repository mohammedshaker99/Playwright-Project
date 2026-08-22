import {type Page , type Locator , expect} from '@playwright/test';

export type ProductData = {
    name: string;
    description: string;
    price: string;
};

export class HomePage {
    // Locators
    private readonly title: Locator;
    private readonly menuButton: Locator;
    private readonly logoutButton: Locator;
    private readonly itemcard: Locator;
    private readonly addToCartButton: Locator;
    private readonly itemName: Locator;
    private readonly itemDescription: Locator;
    private readonly itemPrice: Locator;
    private readonly removeFromCartButton: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;
    private addedItemData?: ProductData;

    // variables
    private readonly page: Page;
    private readonly titleText = 'Products';


    // constructor
    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.getByTestId('logout-sidebar-link');
        this.itemcard = page.getByTestId('inventory-item').first();
        this.itemName = this.itemcard.getByTestId('inventory-item-name');
        this.itemDescription = this.itemcard.getByTestId('inventory-item-desc');
        this.itemPrice = this.itemcard.getByTestId('inventory-item-price');
        this.addToCartButton = this.itemcard.getByRole('button', { name: 'Add to cart' });
        this.removeFromCartButton = this.itemcard.getByRole('button', { name: 'Remove' });
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
    }

    // Actions
    async logout() {
        await this.menuButton.click();
        await this.logoutButton.waitFor({ state: 'visible' });
        await this.logoutButton.click();
    }

    async addItemToCart(): Promise<ProductData> {
        this.addedItemData = {
            name: (await this.itemName.textContent())?.trim() ?? '',
            description: (await this.itemDescription.textContent())?.trim() ?? '',
            price: (await this.itemPrice.textContent())?.trim() ?? '',
        };
        await this.addToCartButton.click();
        return this.addedItemData;
    }

    getAddedItemData(): ProductData {
        if (!this.addedItemData) {
            throw new Error('No item has been added to the cart');
        }

        return this.addedItemData;

    }

    async navigateToCartPage() {
        await this.cartLink.click();
    }

    // Assertions
    async assertSuccessfulLogin() {
        await expect(this.title).toHaveText(this.titleText);
    }

    async assertCartBadge() {
        await expect(this.cartBadge).toHaveText('1');
        await expect(this.removeFromCartButton).toHaveText('Remove');
    }
}
