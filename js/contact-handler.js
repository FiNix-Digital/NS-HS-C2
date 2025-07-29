// Contact Form Handler with Email and WhatsApp Integration

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const firstName = formData.get("firstName") || "";
      const lastName = formData.get("lastName") || "";
      const email = formData.get("email") || "";
      const courseInterested = formData.get("courseInterested") || "";
      const currentClass = formData.get("currentClass") || "";
      const message = formData.get("message") || "";
      const contactMethod = formData.get("contactMethod") || "email";
      const newsletter = formData.get("newsletter") ? "Yes" : "No";

      // Validate required fields
      if (!firstName || !lastName || !email || !courseInterested || !message) {
        // showAlert("error", "Please fill in all required fields.");
        return;
      }

      // Create message content
      const fullName = `${firstName} ${lastName}`;
      const messageContent = createMessageContent({
        fullName,
        email,
        courseInterested,
        currentClass,
        message,
        newsletter,
      });

      // Handle based on selected contact method
      if (contactMethod === "whatsapp") {
        sendToWhatsApp(messageContent);
      } else {
        sendToEmail(email, fullName, courseInterested, messageContent);
      }

      // Show success message
      showAlert(
        "success",
        `Message sent successfully via ${
          contactMethod === "whatsapp" ? "WhatsApp" : "Email"
        }!`
      );

      // Reset form
      contactForm.reset();
    });
  }
});

function createMessageContent(data) {
  return `
🎓 *New Inquiry - Elite Academy*

👤 *Student Details:*
Name: ${data.fullName}
Email: ${data.email}
Course Interested: ${data.courseInterested}
${data.currentClass ? `Current Class: ${data.currentClass}` : ""}

📝 *Message:*
${data.message}

📧 *Newsletter Subscription:* ${data.newsletter}

⏰ *Inquiry Time:* ${new Date().toLocaleString()}
    `.trim();
}

function sendToWhatsApp(message) {
  const phoneNumber = "918688118031";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");
}

function sendToEmail(userEmail, userName, course, message) {
  const subject = `Elite Academy - Course Inquiry - ${course} - ${userName}`;
  const body = encodeURIComponent(message);
  const mailtoUrl = `mailto:finix.digital.solution@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${body}&cc=${userEmail}`;

  // Open email client
  window.location.href = mailtoUrl;
}

function showAlert(type, message) {
  // Remove existing alerts
  document.querySelectorAll(".custom-alert").forEach((alert) => alert.remove());

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${
    type === "success" ? "success" : "danger"
  } custom-alert`;
  alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: none;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

  alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            } me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

  document.body.appendChild(alertDiv);

  // Trigger animation
  setTimeout(() => {
    alertDiv.style.opacity = "1";
    alertDiv.style.transform = "translateX(0)";
  }, 100);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Enhanced form validation for contact method selection
document.addEventListener("DOMContentLoaded", function () {
  const contactMethodRadios = document.querySelectorAll(
    'input[name="contactMethod"]'
  );
  const submitButton = document.querySelector(
    '#contactForm button[type="submit"]'
  );

  contactMethodRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      updateSubmitButtonText();
    });
  });

  function updateSubmitButtonText() {
    const selectedMethod = document.querySelector(
      'input[name="contactMethod"]:checked'
    );
    if (selectedMethod && submitButton) {
      const icon =
        selectedMethod.value === "whatsapp"
          ? "fab fa-whatsapp"
          : "fas fa-paper-plane";
      const text =
        selectedMethod.value === "whatsapp"
          ? "Send via WhatsApp"
          : "Send via Email";
      submitButton.innerHTML = `<i class="${icon} me-2"></i>${text}`;
    }
  }

  // Initialize button text
  updateSubmitButtonText();
});

// Demo form handler
document.addEventListener("DOMContentLoaded", function () {
  const demoForm = document.getElementById("demoForm");

  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(demoForm);
      const studentName = formData.get("demoStudentName") || "";
      const parentName = formData.get("demoParentName") || "";
      const email = formData.get("demoEmail") || "";
      const course = formData.get("demoCourse") || "";
      const date = formData.get("demoDate") || "";
      const time = formData.get("demoTime") || "";

      if (!studentName || !parentName || !email || !course || !date || !time) {
        showAlert("error", "Please fill in all required fields.");
        return;
      }

      const demoMessage = `
🎓 *Demo Class Booking - Elite Academy*

👤 *Student Details:*
Student Name: ${studentName}
Parent Name: ${parentName}
Email: ${email}
Course: ${course}

📅 *Preferred Schedule:*
Date: ${date}
Time: ${time}

⏰ *Booking Time:* ${new Date().toLocaleString()}
            `.trim();

      // Send to WhatsApp
      sendToWhatsApp(demoMessage);

      showAlert(
        "success",
        "Demo class booking sent successfully via WhatsApp!"
      );

      // Close modal and reset form
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("demoModal")
      );
      if (modal) {
        modal.hide();
      }
      demoForm.reset();
    });
  }
});

// Apply form handler
document.addEventListener("DOMContentLoaded", function () {
  const applyForm = document.getElementById("applyForm");

  if (applyForm) {
    applyForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(applyForm);
      const studentName = formData.get("studentName") || "";
      const studentEmail = formData.get("studentEmail") || "";
      const studentPhone = formData.get("studentPhone") || "";
      const courseInterest = formData.get("courseInterest") || "";

      if (!studentName || !studentEmail || !studentPhone || !courseInterest) {
        showAlert("error", "Please fill in all required fields.");
        return;
      }

      const applicationMessage = `
🎓 *New Application - Elite Academy*

👤 *Student Details:*
Name: ${studentName}
Email: ${studentEmail}
Phone: ${studentPhone}
Course: ${courseInterest}

⏰ *Application Time:* ${new Date().toLocaleString()}
            `.trim();

      // Send to WhatsApp
      sendToWhatsApp(applicationMessage);

      showAlert("success", "Application submitted successfully via WhatsApp!");

      // Close modal and reset form
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("applyModal")
      );
      if (modal) {
        modal.hide();
      }
      applyForm.reset();
    });
  }
});

// Course application form handler
document.addEventListener("DOMContentLoaded", function () {
  const courseApplicationForm = document.getElementById(
    "courseApplicationForm"
  );

  if (courseApplicationForm) {
    courseApplicationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(courseApplicationForm);
      const courseName = formData.get("courseName") || "";
      const studentName = formData.get("studentNameCourse") || "";
      const email = formData.get("studentEmailCourse") || "";
      const phone = formData.get("studentPhoneCourse") || "";
      const currentClass = formData.get("currentClass") || "";
      const preferredBatch = formData.get("preferredBatch") || "";
      const previousMarks = formData.get("previousMarks") || "";
      const additionalInfo = formData.get("additionalInfo") || "";

      if (
        !courseName ||
        !studentName ||
        !email ||
        !phone ||
        !currentClass ||
        !preferredBatch
      ) {
        showAlert("error", "Please fill in all required fields.");
        return;
      }

      const courseApplicationMessage = `
🎓 *Course Application - Elite Academy*

📚 *Course Details:*
Course: ${courseName}
Preferred Batch: ${preferredBatch}

👤 *Student Details:*
Name: ${studentName}
Email: ${email}
Phone: ${phone}
Current Class: ${currentClass}
${previousMarks ? `Previous Marks: ${previousMarks}%` : ""}

${additionalInfo ? `📝 *Additional Information:*\n${additionalInfo}` : ""}

⏰ *Application Time:* ${new Date().toLocaleString()}
            `.trim();

      // Send to WhatsApp
      sendToWhatsApp(courseApplicationMessage);

      showAlert(
        "success",
        "Course application submitted successfully via WhatsApp!"
      );

      // Close modal and reset form
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("courseModal")
      );
      if (modal) {
        modal.hide();
      }
      courseApplicationForm.reset();
    });
  }
});
