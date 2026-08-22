import {test} from '@playwright/test';
import { PageObjectManager } from '../Pages/pageObjectManager';
import data from '../test-data/data.json';

let pom : PageObjectManager;

test.beforeEach(async ({ page }) => { 
    pom = new PageObjectManager(page);
    await pom.getLoginPage().navigateToLoginPage();
    await pom.getLoginPage().login(data.validCredentials.username, data.validCredentials.password);
    await pom.getHomePage().assertSuccessfulLogin();
});

test('Verify that the user can complete the checkout process successfully', async ({}, testInfo) => {
    await pom.getHomePage().addItemToCart();
    await pom.getHomePage().assertCartBadge();
    const productData = pom.getHomePage().getAddedItemData();
    await pom.getHomePage().navigateToCartPage();
    await pom.getCartPage(productData).assertProductData();
    await pom.getCartPage(productData).proceedToCheckout();
    await pom.getCheckoutPage().assertCheckoutPage();
    await pom.getCheckoutPage().fillCheckoutForm(data.checkoutData.firstName, data.checkoutData.lastName, data.checkoutData.zipCode);
    await pom.getCheckoutPage().clickContinueButton();
    await pom.getOrderSummaryPage(productData).assertNavigationToSummaryPage();
    await pom.getOrderSummaryPage(productData).assertOrderSummary();
    await pom.getOrderSummaryPage(productData).clickFinishButton();
    await pom.getOrderCompletePage().assertOrderCompletePage();
    const download = await pom.getOrderCompletePage().downloadPDF();
    await pom.getOrderCompletePage().assertPDFDownloaded(
        download,
        testInfo.outputPath('generated-order.pdf')
    );
});

test('Verify that the user can navigate back to the home page from the order complete page', async () => {
    await pom.getHomePage().addItemToCart();
    const productData = pom.getHomePage().getAddedItemData();
    await pom.getHomePage().navigateToCartPage();
    await pom.getCartPage(productData).proceedToCheckout();
    await pom.getCheckoutPage().fillCheckoutForm(data.checkoutData.firstName, data.checkoutData.lastName, data.checkoutData.zipCode);
    await pom.getCheckoutPage().clickContinueButton();
    await pom.getOrderSummaryPage(productData).clickFinishButton();
    await pom.getOrderCompletePage().clickBackHomeButton();
    await pom.getHomePage().assertSuccessfulLogin();
});

test('Verify that the user can not complete checkout with empty personal information', async () => {
    await pom.getHomePage().addItemToCart();
    const productData = pom.getHomePage().getAddedItemData();
    await pom.getHomePage().navigateToCartPage();
    await pom.getCartPage(productData).proceedToCheckout();
    await pom.getCheckoutPage().fillCheckoutForm('', data.checkoutData.lastName, data.checkoutData.zipCode);
    await pom.getCheckoutPage().clickContinueButton();
    await pom.getCheckoutPage().assertFirstNameError();

});

test('Verify that the user can cancel the checkout process and return to the cart page', async () => {
    await pom.getHomePage().addItemToCart();
    const productData = pom.getHomePage().getAddedItemData();
    await pom.getHomePage().navigateToCartPage();
    await pom.getCartPage(productData).proceedToCheckout();
    await pom.getCheckoutPage().clickCancelButton();
    await pom.getCartPage(productData).assertCartPage();
});

test('Verify that the user can navigate back to the home page from the cart page', async () => {
    await pom.getHomePage().navigateToCartPage();
    await pom.getCartPage({ name: '', description: '', price: '' }).assertCartPage();
    await pom.getCartPage({ name: '', description: '', price: '' }).navigateBackToHomePage();
    await pom.getHomePage().assertSuccessfulLogin();
});

test('Verify that an item can be removed from the cart', async () => {
    await pom.getHomePage().addItemToCart();
    const productData = pom.getHomePage().getAddedItemData();
    await pom.getHomePage().navigateToCartPage();
    await pom.getCartPage(productData).assertCartPage();
    await pom.getCartPage(productData).assertProductData();
    await pom.getCartPage(productData).removeItemFromCart();
    await pom.getCartPage(productData).assertEmptyCart();
});


