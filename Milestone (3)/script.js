"use strict";
// Get references to the DOM elements
const infoForm = document.getElementById('info-form');
const profileImageInput = document.getElementById('profile-image-input');
const profileImage = document.getElementById('profile-image');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const summaryInput = document.getElementById('summary');
const educationInput = document.getElementById('education');
const skillsInput = document.getElementById('skills');
// Display section elements
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userSummary = document.getElementById('user-summary');
const userEducation = document.getElementById('user-education');
const userSkills = document.getElementById('user-skills');
// Element to control visibility of resume display section
const resumeDisplay = document.getElementById('resume-display-container');
// Handle image upload
profileImageInput.addEventListener('change', (event) => {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        profileImage.src = URL.createObjectURL(file);
    }
});
// Handle user information form submission
infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Store user inputs temporarily in variables
    const userNameValue = nameInput.value;
    const userEmailValue = emailInput.value;
    const userPhoneValue = phoneInput.value;
    const userSummaryValue = summaryInput.value;
    const userEducationValue = educationInput.value;
    const userSkillsValue = skillsInput.value.split(',').map(skill => skill.trim());
    // Clear the form after submission
    infoForm.reset();
    // Update resume display section
    userName.textContent = userNameValue;
    userEmail.textContent = `Email: ${userEmailValue}`;
    userPhone.textContent = `Phone: ${userPhoneValue}`;
    userSummary.textContent = userSummaryValue;
    // Update education
    userEducation.innerHTML = `<p>${userEducationValue}</p>`;
    // Update skills as a list
    userSkills.innerHTML = '';
    userSkillsValue.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        userSkills.appendChild(li);
    });
    // Show the resume display section
    resumeDisplay.classList.remove('hide');
});
