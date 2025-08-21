import { Page } from "@playwright/test";
import fs from "fs";
import path from "path";

export async function tirarPrint(page: Page, nomeArquivo: string, pasta: string = 'screenshots') {
    const pastaCompleta = path.resolve(pasta);

    // Cria a pasta se não existir
    if (!fs.existsSync(pastaCompleta)) {
        fs.mkdirSync(pastaCompleta, { recursive: true });
    }

    const caminho = path.join(pastaCompleta, `${nomeArquivo}-${Date.now()}.png`);
    await page.screenshot({ path: caminho, fullPage: true });
}
