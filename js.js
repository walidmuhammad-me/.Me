// Simple and clean JavaScript for bio link page
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the page
    initializePage();
});

function initializePage() {
    // Add click handlers to all link items
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach((item, index) => {
        // Add click event
        item.addEventListener('click', function () {
            const link = this.getAttribute('data-link');
            if (link) {
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Open link
                setTimeout(() => {
                    window.open(link, '_blank');
                }, 200);
            }
        });

        // Add hover effects
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        item.addEventListener('mouseleave', function () {
            if (!this.matches(':active')) {
                this.style.transform = 'translateY(0)';
            }
        });

        // Add keyboard support
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });

    // Add footer click handler
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.addEventListener('click', function () {
            window.open('https://www.instagram.com/cak_tech/?utm_source=ig_web_button_share_sheet', '_blank');
        });

        // Add keyboard support for footer
        footer.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make footer focusable
        footer.setAttribute('tabindex', '0');
        footer.setAttribute('role', 'button');
    }

    // Add profile image hover effect
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        profileImg.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Initialize candle chart
    initializeCandleChart();
}

// Simple utility functions
function showMessage(message) {
    console.log(message);
}

function handleError(error) {
    console.error('Error:', error);
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading state management
function showLoading() {
    document.body.style.opacity = '0.7';
}

function hideLoading() {
    document.body.style.opacity = '1';
}

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function (e) {
    const linkItems = document.querySelectorAll('.link-item');
    const currentIndex = Array.from(linkItems).indexOf(document.activeElement);

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < linkItems.length - 1) {
                linkItems[currentIndex + 1].focus();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
                linkItems[currentIndex - 1].focus();
            }
            break;
        case 'Home':
            e.preventDefault();
            linkItems[0].focus();
            break;
        case 'End':
            e.preventDefault();
            linkItems[linkItems.length - 1].focus();
            break;
    }
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add error handling for external links
function handleLinkError(link) {
    console.warn(`Failed to open link: ${link}`);
}

// Enhanced link click handler with error handling
document.addEventListener('click', function (e) {
    const linkItem = e.target.closest('.link-item');
    if (linkItem) {
        const link = linkItem.getAttribute('data-link');
        if (link) {
            try {
                console.log(`Opening link: ${link}`);
            } catch (error) {
                handleLinkError(link);
            }
        }
    }
});




// Candle Chart Effect
let candles = [];
let previousClose = 100;
const maxCandles = 30;
let chartContainer, chartWrapper;

// Initialize candle chart when DOM is loaded
function initializeCandleChart() {
    chartContainer = document.querySelector('.chart-container');
    chartWrapper = document.querySelector('.chart-wrapper');

    if (!chartContainer || !chartWrapper) {
        console.warn('Chart container elements not found');
        return;
    }

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
        updateChart(false); // Redraw without adding new candle
    });
    resizeObserver.observe(chartContainer);

    // Generate initial candles
    for (let i = 0; i < 15; i++) {
        updateChart();
    }

    // Add new candle every second
    setInterval(() => {
        updateChart();
    }, 1000);
}

function generateCandle() {
    const volatility = Math.random() * 20 + 5; // Increased minimum volatility
    const open = previousClose;
    const close = open + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;

    previousClose = close;

    return {
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2))
    };
}

function createCandleElement(candleData) {
    const candle = document.createElement('div');
    candle.className = 'candle';

    const wick = document.createElement('div');
    wick.className = 'wick';

    const body = document.createElement('div');
    body.className = 'candle-body';

    candle.appendChild(wick);
    candle.appendChild(body);

    return { element: candle, wick, body };
}

function updateChart(addNewCandle = true) {
    if (!chartContainer || !chartWrapper) return;

    if (addNewCandle) {
        chartContainer.style.direction = 'ltr';
        chartWrapper.style.direction = 'ltr';
        // Generate new candle
        const newCandleData = generateCandle();
        const { element: newCandle, wick, body } = createCandleElement(newCandleData);

        // Add new candle to wrapper
        chartWrapper.appendChild(newCandle);
        candles.push({ element: newCandle, wick, body, data: newCandleData });

        // Remove oldest candle if exceeding maximum
        if (candles.length > maxCandles) {
            const oldest = candles.shift();
            oldest.element.remove();
        }
    }

    if (candles.length === 0) return;

    const minLow = Math.min(...candles.map(c => c.data.low));
    const maxHigh = Math.max(...candles.map(c => c.data.high));
    const priceRange = maxHigh - minLow;
    const containerHeight = chartContainer.offsetHeight;
    const scale = containerHeight / (priceRange || 1);

    candles.forEach(candle => {
        const scaled = {
            open: (candle.data.open - minLow) * scale,
            high: (candle.data.high - minLow) * scale,
            low: (candle.data.low - minLow) * scale,
            close: (candle.data.close - minLow) * scale
        };

        candle.wick.style.top = `${containerHeight - scaled.high}px`;
        candle.wick.style.height = `${scaled.high - scaled.low}px`;

        const bodyTop = containerHeight - Math.max(scaled.open, scaled.close);
        const bodyHeight = Math.abs(scaled.close - scaled.open);
        candle.body.style.top = `${bodyTop}px`;
        candle.body.style.height = `${bodyHeight}px`;
        candle.body.style.backgroundColor = candle.data.close > candle.data.open ? '#356fe1' : '#f6f7f7';
    });

    // Auto-scroll to show latest candles
    const scrollPosition = chartWrapper.scrollWidth - chartContainer.offsetWidth;
    chartWrapper.style.transform = `translateX(${-scrollPosition}px)`;
}