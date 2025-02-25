// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
var generateResumeHTML = function (resumeData) { return "\n<h2>Editable Resume</h2>\n<h3>Personal Information</h3>\n<p><b>Name:</b> <span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n<p><b>Email:</b> <span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n<p><b>Phone:</b> <span contenteditable=\"true\">").concat(resumeData.phone, "</span></p>\n<h3>Education</h3>\n<p contenteditable=\"true\">").concat(resumeData.education, "</p>\n<h3>Experience</h3>\n<p contenteditable=\"true\">").concat(resumeData.experience, "</p>\n<h3>Skills</h3>\n<p contenteditable=\"true\">").concat(resumeData.skills, "</p>\n"); };
var handleFormSubmission = function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = { name: name, email: email, phone: phone, education: education, experience: experience, skills: skills };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate and display resume content
    var resumeHTML = generateResumeHTML(resumeData);
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
};
var handlePDFDownload = function () {
    // Use jsPDF or other libraries to generate PDF
    // Example using jsPDF (https://github.com/parallax/jsPDF):
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // doc.html(resumeDisplayElement, { callback: () => doc.save('resume.pdf') });
    // For now, open print dialog
    window.print();
};
var prefillForm = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
};
// Event listeners
form.addEventListener('submit', handleFormSubmission);
downloadPdfButton.addEventListener('click', handlePDFDownload);
window.addEventListener('DOMContentLoaded', prefillForm);
