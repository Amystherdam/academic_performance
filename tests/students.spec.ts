import { test, expect } from '@playwright/test';

test.describe("/students", () => {
  test("should navigate and verify student details", async ({ page }) => {
    await page.goto("http://localhost:3001/students");

    await expect(page.locator("text=Students")).toBeVisible();
    await expect(page.locator("text=Ranking")).toBeVisible();

    await expect(page.locator("text=Loading...")).toBeVisible();
    await expect(page.locator("text=Loading...")).toBeHidden(); // Aguarda o carregamento sumir

    const historyGradesLink = page.locator("text=History Grades").first();
    await expect(historyGradesLink).toBeVisible();
    await historyGradesLink.click();

    await expect(page.locator("text=Subject Name")).toBeVisible();
    await expect(page.locator("text=Obtained")).toBeVisible();

    const studentsLink = page.locator("text=Students").first();
    await expect(studentsLink).toBeVisible();
    await studentsLink.click();

    await expect(page.locator("text=History Grades").first()).toBeVisible();

    const averageBySubjectsLink = page.locator("text=Average by Subjects").first();
    await expect(averageBySubjectsLink).toBeVisible();
    await averageBySubjectsLink.click();

    await expect(page.locator("text=Subject Name")).toBeVisible();
    await expect(page.locator("text=Obtained")).toBeVisible();

    const rankingLink = page.locator("text=Ranking");
    await expect(rankingLink).toBeVisible();
    await rankingLink.click();

    await expect(page.locator("text=Obtained")).toBeVisible();

    const trs = await page.locator("tr").count();

    const pagination50 = page.locator("text=50").first();
    await expect(pagination50).toBeVisible();
    await pagination50.click();

    await page.waitForTimeout(2000);

    const newTrCount = await page.locator("tr").count();

    expect(newTrCount).toBeGreaterThan(trs);
  });
});

