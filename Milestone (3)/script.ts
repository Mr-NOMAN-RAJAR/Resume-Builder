const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById('workExperience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    
    const profilePicURL = URL.createObjectURL(profilePicInput.files![0]);

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
