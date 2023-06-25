import puppeteer from "puppeteer";

export const saveScreenshot = async (
  url: string,
  width: number,
  height: number
) => {
  // Launch a headless browser
  const browser = await puppeteer.launch({ headless: "new" });

  // Create a new page
  const page = await browser.newPage();
  await page.setViewport({ width, height });

  try {
    console.log(`Loading ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    console.log(`Waiting for ${url} to load`);
    const screenshot = await page.screenshot();
    console.log(`Screenshot taken of ${url}`);
    return screenshot;
  } catch (error) {
    console.error(`Error rendering page ${url}:`, error);
  } finally {
    await browser.close();
  }
};
