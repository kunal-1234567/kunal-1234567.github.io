"use strict";
(function () {
	const MIN_AGE = 16;

	document.addEventListener("DOMContentLoaded", function onReady() {
		const formElement = document.getElementById("registerForm");
		const submitButton = document.getElementById("registerSubmit");
		const announcementElement = document.getElementById("message");

		if (!formElement) {
			return;
		}

		formElement.addEventListener("submit", function handleSubmit(event) {
			event.preventDefault();
			clearAllErrors();

			const nameValue = getTrimmedValue("name");
			const emailValue = getTrimmedValue("email");
			const passwordValue = getValue("password");
			const confirmPasswordValue = getValue("confirmPassword");
			const dobRawValue = getTrimmedValue("ageInput");

			const validationErrors = [];

			if (!nameValue) {
				validationErrors.push({ fieldId: "name", message: "Name is required." });
			}

			if (!emailValue || !isValidEmail(emailValue)) {
				validationErrors.push({ fieldId: "email", message: "Enter a valid email address." });
			}

			if (!passwordValue || passwordValue.length < 6) {
				validationErrors.push({ fieldId: "password", message: "Password must be at least 6 characters." });
			}

			if (passwordValue !== confirmPasswordValue) {
				validationErrors.push({ fieldId: "confirmPassword", message: "Passwords do not match." });
			}

			const dobParts = parseISODateParts(dobRawValue);
			if (!dobParts) {
				validationErrors.push({ fieldId: "ageInput", message: "Enter a valid date of birth." });
			} else {
				const ageValue = calculateAgeFromParts(dobParts);
				if (ageValue < MIN_AGE) {
					validationErrors.push({ fieldId: "ageInput", message: `You must be at least ${MIN_AGE} years old.` });
				}
			}

			if (validationErrors.length > 0) {
				validationErrors.forEach(function (error) { setFieldError(error.fieldId, error.message); });
				announce(announcementElement, `Please correct ${validationErrors.length} field${validationErrors.length > 1 ? "s" : ""}.`, "error");
				return;
			}

			if (submitButton) {
				submitButton.setAttribute("disabled", "true");
			}
			announce(announcementElement, "Account created successfully. Redirecting...", "success");
			window.location.assign("/index.html");
		});
	});

	function getValue(elementId) {
		var element = document.getElementById(elementId);
		return element && "value" in element ? element.value : "";
	}

	function getTrimmedValue(elementId) {
		return getValue(elementId).trim();
	}

	function setFieldError(elementId, errorMessage) {
		var input = document.getElementById(elementId);
		if (!input) return;

		input.setAttribute("aria-invalid", "true");
		var errorElementId = elementId + "-error";
		var errorElement = document.getElementById(errorElementId);
		if (!errorElement) {
			errorElement = document.createElement("div");
			errorElement.id = errorElementId;
			errorElement.className = "field-error";
			input.insertAdjacentElement("afterend", errorElement);
		}
		errorElement.textContent = errorMessage;
	}

	function clearAllErrors() {
		var errorElements = document.querySelectorAll(".field-error");
		errorElements.forEach(function (el) { el.remove(); });
		var invalidElements = document.querySelectorAll('[aria-invalid="true"]');
		invalidElements.forEach(function (el) { el.removeAttribute("aria-invalid"); });
	}

	function isValidEmail(email) {
		return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
	}

	function announce(element, message, type) {
		if (!element) return;
		element.textContent = message;
		if (type === "error") {
			element.classList.remove("success");
			element.classList.add("status-message", "error");
		} else if (type === "success") {
			element.classList.remove("error");
			element.classList.add("status-message", "success");
		}
	}

	function parseISODateParts(value) {
		var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
		if (!match) return null;
		var year = parseInt(match[1], 10);
		var month = parseInt(match[2], 10);
		var day = parseInt(match[3], 10);
		if (month < 1 || month > 12 || day < 1 || day > 31) return null;
		return { year: year, month: month, day: day };
	}

	function calculateAgeFromParts(parts) {
		var today = new Date();
		var age = today.getFullYear() - parts.year;
		var monthDiff = (today.getMonth() + 1) - parts.month;
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parts.day)) {
			age--;
		}
		return age;
	}
})();
