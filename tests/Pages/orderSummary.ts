import {type Page, type Locator, expect} from '@playwright/test';
import {type ProductData} from './homePage';

export class OrderSummaryPage {
    // Locators
    private readonly cartList: Locator;
    private readonly itemName: Locator;
    private readonly itemdescription: Locator;
    private readonly itemPrice: Locator;
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;
    private readonly orderSummaryTitle: Locator;
    private readonly orderTotal: Locator;
    private readonly tax: Locator;

    // variables
    private readonly page: Page;
    private readonly orderSummaryTitleText = 'Checkout: Overview';  
    private readonly productData: ProductData;

    // constructor
    constructor(page: Page, productData: ProductData) {
        this.page = page;
        this.productData = productData;
        this.finishButton = page.getByTestId('finish');
        this.cancelButton = page.getByTestId('cancel');
        this.orderSummaryTitle = page.getByTestId('title');
        this.cartList = page.getByTestId('cart-list');
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemdescription = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.tax = page.getByTestId('tax-label');
        this.orderTotal = page.getByTestId('total-label');
    }

    // Actions
    async clickFinishButton() {
        await this.finishButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    // Assertions
    async assertNavigationToSummaryPage() {
        await expect(this.orderSummaryTitle).toHaveText(this.orderSummaryTitleText);
    }

    async assertOrderSummary() {
        await expect(this.itemName).toHaveText(this.productData.name);
        await expect(this.itemdescription).toHaveText(this.productData.description);
        await expect(this.itemPrice).toHaveText(this.productData.price);
        const itemPriceNumber = parseFloat(this.productData.price.replace('$', ''));
        const taxText = await this.tax.textContent();
        const taxNumber = parseFloat(taxText?.replace('Tax: $', '') ?? '0');
        const expectedTotal = (itemPriceNumber + taxNumber).toFixed(2);
        await expect(this.orderTotal).toHaveText(`Total: $${expectedTotal}`);
    
    }
}