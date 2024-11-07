"use strict";
// Form and input elements
const infoForm = document.getElementById('info-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const summaryInput = document.getElementById('summary');
const educationInput = document.getElementById('education');
const skillsInput = document.getElementById('skills');
const profileImageInput = document.getElementById('profile-image-input');
// Display section elements
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userSummary = document.getElementById('user-summary');
const userEducation = document.getElementById('user-education');
const userSkills = document.getElementById('user-skills');
const resumeDisplay = document.getElementById('resume-display-container');
const profileImage = document.getElementById('profile-image');
// Handle profile image upload
profileImageInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) {
        profileImage.src = URL.createObjectURL(file);
        profileImage.onload = () => URL.revokeObjectURL(profileImage.src);
    }
});
// Generate a unique URL based on the username
function generateUniqueURL(username) {
    const uniqueURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
    alert(`Your shareable URL: ${uniqueURL}`);
    return uniqueURL;
}
// Retrieve the username from URL parameters
function getUsernameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
}
// Display resume based on user input
function displayResume() {
    userName.textContent = nameInput.value;
    userEmail.textContent = `Email: ${emailInput.value}`;
    userPhone.textContent = `Phone: ${phoneInput.value}`;
    userSummary.textContent = summaryInput.value;
    userEducation.innerHTML = `<p>${educationInput.value}</p>`;
    userSkills.innerHTML = skillsInput.value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    // Show the resume display section
    resumeDisplay.classList.remove('hide');
}
// Handle form submission
infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayResume();
    const uniqueURL = generateUniqueURL(nameInput.value);
    console.log(`Generated URL: ${uniqueURL}`);
});
// Load resume if a username is in the URL
document.addEventListener('DOMContentLoaded', () => {
    const username = getUsernameFromURL();
    if (username) {
        userName.textContent = username;
        userEmail.textContent = `Email: example@example.com`;
        userPhone.textContent = `Phone: 123-456-7890`;
        userSummary.textContent = `This is an example summary for ${username}.`;
        userEducation.innerHTML = `<p>Sample Education for ${username}</p>`;
        userSkills.innerHTML = `<li>JavaScript</li><li>HTML/CSS</li><li>TypeScript</li>`;
        profileImage.src = "path/to/placeholder-image.jpg";
        resumeDisplay.classList.remove('hide');
    }
});
// PDF Download Function
document.getElementById("downloadButton")?.addEventListener("click", () => {
    const options = {
        margin: 10,
        filename: `${userName.textContent}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, // Ensures CORS for images
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    // Generate PDF of the resume display container
    window.html2pdf().set(options).from(resumeDisplay).save()
        .then(() => console.log("PDF downloaded successfully"))
        .catch((err) => console.error("Error while downloading PDF:", err));
});
// Copy URL to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('URL copied to clipboard! You can now share it.');
    }).catch((err) => {
        console.error('Could not copy text: ', err);
    });
}
// Share button event listener
document.getElementById("shareButton")?.addEventListener("click", () => {
    const uniqueURL = generateUniqueURL(nameInput.value);
    copyToClipboard(uniqueURL);
});
