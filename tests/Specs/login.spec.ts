import {test} from '@playwright/test';
import { PageObjectManager } from '../Pages/pageObjectManager';
import data from '../test-data/data.json';

let pom : PageObjectManager;

test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.getLoginPage().navigateToLoginPage();
});

test('Login with empty username', async () => {
    await pom.getLoginPage().login('', data.validCredentials.password);
    await pom.getLoginPage().assertEmptyUsernameError();
})

test('Login with empty password', async () => {
    await pom.getLoginPage().login(data.validCredentials.username, '');
    await pom.getLoginPage().assertEmptyPasswordError();
})

test('Login with invalid credentials', async () => {
    await pom.getLoginPage().login(data.invalidCredentials.username, data.invalidCredentials.password);
    await pom.getLoginPage().assertInvalidCredentialsError();
})

test('Login with valid credentials', async () => {
    await pom.getLoginPage().login(data.validCredentials.username, data.validCredentials.password);
    await pom.getHomePage().assertSuccessfulLogin();
});

test('Logout from the application', async () => {
    await pom.getLoginPage().login(data.validCredentials.username, data.validCredentials.password);
    await pom.getHomePage().logout();
    await pom.getLoginPage().assertSuccessfulLogout();
});

