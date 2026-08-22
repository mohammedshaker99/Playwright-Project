import {type Page} from '@playwright/test';
import { LoginPage } from './Login';
import { HomePage, type ProductData } from './homePage';
import { CartPage } from './cartPage';
import { OrderSummaryPage } from './orderSummary';
import { CheckoutPage } from './checkout-Page';
import { orderCompletePage } from './orderComplete';

export class PageObjectManager {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly checkoutPage: CheckoutPage;
    private readonly orderCompletePage: orderCompletePage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderCompletePage = new orderCompletePage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getHomePage() {
        return this.homePage;
    }

    getCartPage(productData: ProductData) {
        return new CartPage(this.page, productData);
    }

    getOrderSummaryPage(productData: ProductData): OrderSummaryPage {
        return new OrderSummaryPage(this.page, productData);
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderCompletePage() {
        return this.orderCompletePage;
    }

}