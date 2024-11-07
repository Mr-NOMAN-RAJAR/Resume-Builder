// Form and input elements
const infoForm = document.getElementById('info-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const summaryInput = document.getElementById('summary') as HTMLTextAreaElement;
const educationInput = document.getElementById('education') as HTMLInputElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;
const profileImageInput = document.getElementById('profile-image-input') as HTMLInputElement;

// Display section elements
const userName = document.getElementById('user-name') as HTMLHeadingElement;
const userEmail = document.getElementById('user-email') as HTMLParagraphElement;
const userPhone = document.getElementById('user-phone') as HTMLParagraphElement;
const userSummary = document.getElementById('user-summary') as HTMLParagraphElement;
const userEducation = document.getElementById('user-education') as HTMLDivElement;
const userSkills = document.getElementById('user-skills') as HTMLUListElement;
const resumeDisplay = document.getElementById('resume-display-container') as HTMLDivElement;
const profileImage = document.getElementById('profile-image') as HTMLImageElement;

// Handle profile image upload
profileImageInput.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        profileImage.src = URL.createObjectURL(file);
        profileImage.onload = () => URL.revokeObjectURL(profileImage.src);
    }
});

// Generate a unique URL based on the username
function generateUniqueURL(username: string) {
    const uniqueURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
    alert(`Your shareable URL: ${uniqueURL}`);
    return uniqueURL;
}

// Retrieve the username from URL parameters
function getUsernameFromURL(): string | null {
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
    (window as any).html2pdf().set(options).from(resumeDisplay).save()
        .then(() => console.log("PDF downloaded successfully"))
        .catch((err: unknown) => console.error("Error while downloading PDF:", err));
});

// Copy URL to clipboard
function copyToClipboard(text: string) {
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
