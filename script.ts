// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

const generateResumeHTML = (resumeData: any) => `
<h2>Editable Resume</h2>
<h3>Personal Information</h3>
<p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
<p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
<p><b>Phone:</b> <span contenteditable="true">${resumeData.phone}</span></p>
<h3>Education</h3>
<p contenteditable="true">${resumeData.education}</p>
<h3>Experience</h3>
<p contenteditable="true">${resumeData.experience}</p>
<h3>Skills</h3>
<p contenteditable="true">${resumeData.skills}</p>
`;

const handleFormSubmission = (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = { name, email, phone, education, experience, skills };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

    // Generate and display resume content
    const resumeHTML = generateResumeHTML(resumeData);
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
};

const handlePDFDownload = () => {
    // Use jsPDF or other libraries to generate PDF
    // Example using jsPDF (https://github.com/parallax/jsPDF):
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // doc.html(resumeDisplayElement, { callback: () => doc.save('resume.pdf') });
    // For now, open print dialog
    window.print();
};

const prefillForm = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
};

// Event listeners
form.addEventListener('submit', handleFormSubmission);
downloadPdfButton.addEventListener('click', handlePDFDownload);
window.addEventListener('DOMContentLoaded', prefillForm);