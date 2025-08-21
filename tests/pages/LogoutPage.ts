import { Page } from "@playwright/test";
import { tirarPrint } from "../utils/utils";


export class LogoutPage{
    constructor(private readonly page: Page) {}

    async clickLogoutButton() {
        await this.page.locator('#btn-sair').click();
    }

    async validateLogoutSucess() {
        await this.page.locator('button.btn-r').isVisible();
        await tirarPrint(this.page, 'logout-sucesso', 'screenshots');
    }

 
}