document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cryptocurrency price data (static values)
    const cryptoPrices = {
        'BTC': 10058000, // ₹63,00,000
        'ETH': 368000,  // ₹3,20,000
        'USDT': 87.50,  // ₹83.50
        'DOGE': 18.94,  // ₹11.32  
    };
    
    // Crypto symbols for display
    const cryptoSymbols = {
        'BTC': 'BTC',
        'ETH': 'ETH',
        'USDT': 'USDT',
        'DOGE': 'DOGE',
        'USD': 'USD'
    };
    
    // Format INR amount with commas
    function formatINR(amount) {
        // Convert to string and split by decimal point
        const parts = amount.toFixed(2).toString().split('.');
        
        // Format the integer part with commas for Indian numbering system
        // (e.g., 10,00,000 instead of 1,000,000)
        let integerPart = parts[0];
        let formattedInteger = '';
        
        // Handle the first few digits differently based on length
        const length = integerPart.length;
        
        if (length <= 3) {
            formattedInteger = integerPart;
        } else {
            // First group of 3 from right
            formattedInteger = integerPart.substring(length - 3);
            integerPart = integerPart.substring(0, length - 3);
            
            // Rest in groups of 2
            while (integerPart.length > 0) {
                const chunk = integerPart.substring(Math.max(0, integerPart.length - 2));
                formattedInteger = chunk + ',' + formattedInteger;
                integerPart = integerPart.substring(0, integerPart.length - 2);
            }
        }
        
        // Return formatted number with decimal part
        return '₹' + formattedInteger + '.' + parts[1];
    }
    
    // Format USD amount
    function formatUSD(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Format crypto amount
    function formatCrypto(amount, symbol) {
        return amount.toFixed(8) + ' ' + symbol;
    }
    
    // Crypto to INR calculator
    const cryptoSelect = document.getElementById('crypto-select');
    const cryptoAmount = document.getElementById('crypto-amount');
    const inrResult = document.getElementById('inr-result');
    
    function calculateCryptoToINR() {
        const selectedCrypto = cryptoSelect.value;
        const amount = parseFloat(cryptoAmount.value) || 0;
        const price = cryptoPrices[selectedCrypto];
        const inrValue = amount * price;
        
        inrResult.textContent = formatINR(inrValue);
    }
    
    cryptoSelect.addEventListener('change', calculateCryptoToINR);
    cryptoAmount.addEventListener('input', calculateCryptoToINR);
    
    // INR to Crypto calculator
    const inrAmount = document.getElementById('inr-amount');
    const cryptoSelectReverse = document.getElementById('crypto-select-reverse');
    const cryptoResult = document.getElementById('crypto-result');
    
    function calculateINRToCrypto() {
        const selectedCrypto = cryptoSelectReverse.value;
        const amount = parseFloat(inrAmount.value) || 0;
        const price = cryptoPrices[selectedCrypto];
        const cryptoValue = amount / price;
        
        cryptoResult.textContent = formatCrypto(cryptoValue, cryptoSymbols[selectedCrypto]);
    }
    
    inrAmount.addEventListener('input', calculateINRToCrypto);
    cryptoSelectReverse.addEventListener('change', calculateINRToCrypto);
    calculateCryptoToINR();
    calculateINRToCrypto();
    
    // Add animation effects for calculator results
    const resultElements = document.querySelectorAll('.calculator-result');
    resultElements.forEach(element => {
        element.addEventListener('update', function() {
            element.classList.add('result-updated');
            setTimeout(() => {
                element.classList.remove('result-updated');
            }, 500);
        });
    });
    
    // Add hover effects for cards
    const cards = document.querySelectorAll('.crypto-card, .calculator-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'rgba(74, 222, 128, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.borderColor = '';
        });
    });
});