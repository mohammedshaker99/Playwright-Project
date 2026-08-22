import {type Page , type Locator , type Download , expect} from '@playwright/test';

export class orderCompletePage {
    // Locators
    private readonly orderCompleteMessage: Locator;
    private readonly backHomeButton: Locator;
    private readonly generatePDFButton: Locator;

    // variables
    private readonly page: Page;
    private readonly orderCompleteMessageText = 'Thank you for your order!';

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.orderCompleteMessage = page.getByTestId('complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');
        this.generatePDFButton = page.getByTestId('generate-pdf-order');
    }

    // Actions
    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }

    async downloadPDF(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.generatePDFButton.click();
        return downloadPromise;
    }

    // Assertions
    async assertOrderCompletePage() {
        await expect(this.orderCompleteMessage).toHaveText(this.orderCompleteMessageText);
    }

    async assertPDFDownloaded(download: Download, savePath: string) {
        expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
        await download.saveAs(savePath);

        const fileStream = await download.createReadStream();
        expect(fileStream).not.toBeNull();

        if (!fileStream) {
            throw new Error('The PDF download did not produce a readable stream');
        }

        let fileSize = 0;
        let fileHeader = '';
        for await (const chunk of fileStream) {
            const chunkText = chunk.toString('ascii');
            fileHeader += chunkText;
            fileSize += chunk.length;
            if (fileHeader.length >= 5) {
                break;
            }
        }

        expect(fileSize).toBeGreaterThan(0);
        expect(fileHeader.slice(0, 5)).toBe('%PDF-');
    }

}