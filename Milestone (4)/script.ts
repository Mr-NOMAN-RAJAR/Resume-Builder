
const infoForm = document.getElementById('info-form') as HTMLFormElement;
const profileImageInput = document.getElementById('profile-image-input') as HTMLInputElement;
const profileImage = document.getElementById('profile-image') as HTMLImageElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const summaryInput = document.getElementById('summary') as HTMLTextAreaElement;
const educationInput = document.getElementById('education') as HTMLInputElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;

// Display section elements
const userName = document.getElementById('user-name') as HTMLHeadingElement;
const userEmail = document.getElementById('user-email') as HTMLParagraphElement;
const userPhone = document.getElementById('user-phone') as HTMLParagraphElement;
const userSummary = document.getElementById('user-summary') as HTMLParagraphElement;
const userEducation = document.getElementById('user-education') as HTMLDivElement;
const userSkills = document.getElementById('user-skills') as HTMLUListElement;

// Element to control visibility of resume display section
const resumeDisplay = document.getElementById('resume-display-container') as HTMLDivElement;

// Handle image upload
profileImageInput.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
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
    
    // Make fields editable on click
    makeFieldsEditable();
});

// Function to make fields editable
function makeFieldsEditable() {
    userSummary.setAttribute('contenteditable', 'true');
    userEducation.setAttribute('contenteditable', 'true');
    userSkills.setAttribute('contenteditable', 'true');

    [userSummary, userEducation, userSkills].forEach(section => {
        section.addEventListener('blur', () => {
            // Update data when editing ends
            if (section === userSummary) {
                userSummary.textContent = section.textContent?.trim() || 'Your summary will appear here...';
            } else if (section === userEducation) {
                userEducation.innerHTML = `<p>${section.textContent?.trim() || 'Your education details will appear here...'}</p>`;
            } else if (section === userSkills) {
                userSkills.innerHTML = ''; // Clear previous skills
                const skills = section.textContent?.trim().split(',').map(skill => skill.trim()).filter(skill => skill);
                skills?.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    userSkills.appendChild(li); // Update skills list
                });
                if (skills?.length === 0) {
                    userSkills.innerHTML = '<li>Your skills will appear here...</li>';
                }
            }
        });
    });
}
