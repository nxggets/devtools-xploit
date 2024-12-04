const MAX_ATTEMPTS = 8;
const NAV_DELAY = 500; // Delay between navigation attempts in milliseconds
const SUMMARY_BUTTON_SELECTOR = "button"; // Adjust this selector if needed
const EXTRA_BUTTON_SELECTOR = "#sbsNext"; // Selector for extra buttons
 
function modifySummarySection(sections) {
    let summarySection = Array.from(sections.children).find(child => {
        let textContent = child.textContent.trim();
        console.log("Found section with text:", textContent);
        return textContent === "Summary";
    });
 
    if (!summarySection) {
        console.log("[Edementum Skip Tutorials]: 'Summary' section not found.");
        return;
    }
 
    let button = summarySection.querySelector(SUMMARY_BUTTON_SELECTOR);
    if (button) {
        console.log("[Edementum Skip Tutorials]: Found 'Summary' button.");
        button.addEventListener('click', () => {
            console.log("[Edementum Skip Tutorials]: 'Summary' button clicked.");
            handleExtraButtons(() => {
                checkAndNavigateToLastPage();
            });
        });
 
        if (button.className.includes("toc-disabled")) {
            button.className = button.className.replace("toc-disabled", "toc-current");
            button.removeAttribute("disabled");
            console.log("[Edementum Skip Tutorials]: 'Summary' section modified.");
        } else {
            console.log("[Edementum Skip Tutorials]: 'Summary' section button is already enabled.");
        }
 
        button.click();
        console.log("[Edementum Skip Tutorials]: Automatically clicked 'Summary' button.");
    } else {
        console.log("[Edementum Skip Tutorials]: 'Summary' section does not contain a button.");
    }
}
 
function handleExtraButtons(callback) {
    function clickExtraButtons() {
        const extraButtons = document.querySelectorAll(EXTRA_BUTTON_SELECTOR);
 
        if (extraButtons.length > 0) {
            extraButtons.forEach(button => {
                if (button.style.display !== 'none') {
                    console.log("[Edementum Skip Tutorials]: Clicking extra button.");
                    button.click();
                }
            });
            setTimeout(() => clickExtraButtons(), NAV_DELAY);
        } else {
            console.log("[Edementum Skip Tutorials]: No more extra buttons.");
            if (callback) callback();
        }
    }
 
    clickExtraButtons();
}
 
function checkAndNavigateToLastPage() {
    function goToNextPage() {
        const nextPageButton = document.querySelector(".tutorial-nav-next");
        if (nextPageButton) {
            console.log("[Edementum Skip Tutorials]: Clicking 'Next Page' button.");
            nextPageButton.click();
 
            setTimeout(() => {
                const updatedCurrentPageElement = document.querySelector(".tutorial-nav-progress-current");
                const updatedCurrentPage = parseInt(updatedCurrentPageElement.textContent.trim());
 
                if (updatedCurrentPage < totalPages) {
                    goToNextPage();
                } else {
                    console.log("[Edementum Skip Tutorials]: Reached the last page.");
                }
            }, NAV_DELAY);
        } else {
            console.log("[Edementum Skip Tutorials]: 'Next Page' button not found.");
        }
    }
 
    const currentPageElement = document.querySelector(".tutorial-nav-progress-current");
    const totalPagesElement = document.querySelector(".tutorial-nav-progress-total");
 
    if (!currentPageElement || !totalPagesElement) {
        console.log("[Edementum Skip Tutorials]: Current page or total pages element not found.");
        return;
    }
 
    const currentPage = parseInt(currentPageElement.textContent.trim());
    const totalPages = parseInt(totalPagesElement.textContent.trim());
 
    if (isNaN(currentPage) || isNaN(totalPages)) {
        console.log("[Edementum Skip Tutorials]: Unable to parse current page or total pages.");
        return;
    }
 
    console.log(`[Edementum Skip Tutorials]: Navigating from page ${currentPage} to page ${totalPages}.`);
    goToNextPage();
}
 
function findSections() {
    const observer = new MutationObserver(() => {
        const sections = document.querySelector(".tutorial-toc-sections");
        if (sections) {
            observer.disconnect();
            console.log("[Edementum Skip Tutorials]: '.tutorial-toc-sections' found.");
            modifySummarySection(sections);
        }
    });
 
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
 
findSections();
