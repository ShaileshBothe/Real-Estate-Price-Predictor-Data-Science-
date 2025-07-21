// Utility functions (keeping original logic)
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

// Enhanced click handler with loading states and animations
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    // Get form elements
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var predictBtn = document.querySelector('.predict-btn');
    var resultSection = document.getElementById('resultSection');
    
    // Validation
    if (!sqft.value || sqft.value <= 0) {
        showNotification('Please enter a valid area', 'error');
        return;
    }
    
    if (bhk === -1) {
        showNotification('Please select number of bedrooms', 'error');
        return;
    }
    
    if (bathrooms === -1) {
        showNotification('Please select number of bathrooms', 'error');
        return;
    }
    
    if (!location.value) {
        showNotification('Please select a location', 'error');
        return;
    }
    
    // Show loading state
    predictBtn.classList.add('loading');
    resultSection.classList.remove('show');
    
    // Add loading animation to result card
    const priceAmount = estPrice.querySelector('.price-amount');
    priceAmount.textContent = 'Calculating...';
    
    var url = "https://real-estate-price-predictor-data-science.onrender.com"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function (data, status) {
        console.log(data.estimated_price);
        
        // Remove loading state
        predictBtn.classList.remove('loading');
        
        // Update price display with animation
        setTimeout(() => {
            priceAmount.textContent = data.estimated_price.toString();
            resultSection.classList.add('show');
            
            // Add success animation
            const resultCard = estPrice.closest('.result-card');
            resultCard.classList.add('success');
            
            // Remove success class after animation
            setTimeout(() => {
                resultCard.classList.remove('success');
            }, 600);
            
            // Show success notification
            showNotification('Price calculated successfully!', 'success');
        }, 300);
        
        console.log(status);
    }).fail(function(xhr, status, error) {
        // Handle error
        predictBtn.classList.remove('loading');
        priceAmount.textContent = 'Error';
        showNotification('Failed to calculate price. Please try again.', 'error');
        console.error('Error:', error);
    });
}

// Enhanced page load with smooth animations
function onPageLoad() {
    console.log("document loaded");
    
    // Add entrance animations
    addEntranceAnimations();
    
    // Load locations
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    
    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            
            // Add default option
            var defaultOpt = new Option("Choose a Location", "");
            defaultOpt.disabled = true;
            defaultOpt.selected = true;
            $('#uiLocations').append(defaultOpt);
            
            // Add location options with delay for smooth appearance
            locations.forEach((location, index) => {
                setTimeout(() => {
                    var opt = new Option(location);
                    $('#uiLocations').append(opt);
                }, index * 50);
            });
        }
    }).fail(function(xhr, status, error) {
        console.error('Error loading locations:', error);
        showNotification('Failed to load locations. Please refresh the page.', 'error');
    });
    
    // Add form interactions
    addFormInteractions();
}

// Add entrance animations
function addEntranceAnimations() {
    const elements = document.querySelectorAll('.prediction-card, .feature-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add form interactions
function addFormInteractions() {
    // Input focus effects
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Radio button animations
    const radioLabels = document.querySelectorAll('.radio-label');
    radioLabels.forEach(label => {
        label.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Form validation on input
    const sqftInput = document.getElementById('uiSqft');
    sqftInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (value > 10000) {
            this.setCustomValidity('Area cannot exceed 10,000 sq ft');
        } else if (value < 100) {
            this.setCustomValidity('Area must be at least 100 sq ft');
        } else {
            this.setCustomValidity('');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Add CSS for notifications
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 350px;
    border-left: 4px solid #2563eb;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: #10b981;
}

.notification-error {
    border-left-color: #ef4444;
}

.notification-warning {
    border-left-color: #f59e0b;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
}

.notification-content i {
    font-size: 1.1rem;
}

.notification-success .notification-content i {
    color: #10b981;
}

.notification-error .notification-content i {
    color: #ef4444;
}

.notification-warning .notification-content i {
    color: #f59e0b;
}

.notification-close {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.notification-close:hover {
    background: #f3f4f6;
    color: #374151;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.form-group.focused label {
    color: #2563eb;
}

.form-group.focused label i {
    color: #2563eb;
}
</style>
`;

// Inject notification styles
document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Initialize on page load
window.onload = onPageLoad;