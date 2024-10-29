"use strict";

const form = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const profilePicInput = document.getElementById('profile-pic');
    const education = document.getElementById('education').value;
    const workExperience = document.getElementById('workExperience').value;
    const skills = document.getElementById('skills').value;
    // Create a URL for the uploaded image
    const profilePicURL = URL.createObjectURL(profilePicInput.files[0]);
    const resume = `
        <div class="resume-section">
            <img src="${profilePicURL}" alt="${name}" />
            <h1>${name}</h1>
            <p><strong>Email:</strong> ${email}</p>
            <h2>Education</h2>
            <p>${education}</p>
            <h2>Work Experience</h2>
            <p>${workExperience}</p>
            <h2>Skills</h2>
            <p>${skills}</p>
        </div>
    `;
    resumeOutput.innerHTML = resume;
});
