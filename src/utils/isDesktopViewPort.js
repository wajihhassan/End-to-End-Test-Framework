export const isDesktopViewPort  = async (page) => {

    const viewport = await page.viewportSize();
    if (!viewport) {
        console.warn('Viewport size not available; defaulting to mobile behavior');
        return false; // assume mobile if we can't determine
    }
    return viewport.width >= 600;

}