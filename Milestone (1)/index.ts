const skillsSection = document.getElementById('skills');
const toggleButton = document.getElementById('toggle-skills-btn');

if (toggleButton && skillsSection) { // Yeh check karega ke dono elements maujood hain
    toggleButton.addEventListener('click', () => {
        if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
            skillsSection.style.display = 'block';
            toggleButton.textContent = 'Hide Skills'; // Button ka text badalna
        } else {
            skillsSection.style.display = 'none';
            toggleButton.textContent = 'Show Skills'; // Button ka text badalna
        }
    });
}
