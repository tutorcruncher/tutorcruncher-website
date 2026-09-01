"use client";

import { createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Action } from "@/components/ui/action";

import styles from "./contact-form.module.scss";
export const Form = () => {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    ["attributes-company_name"]: "",
    ["attributes-who_are_you_trying_to_reach"]: "",
    ["attributes-sign_up"]: "",
    terms_and_conditions: true,
  });
  const recaptchaRef = createRef();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setErrorMessage("");

    // @ts-expect-error -- TODO
    const recaptchaValue = recaptchaRef.current.getValue();
    const data = {
      client_name: formData.client_name,
      client_email: formData.client_email,
      client_phone: formData.client_phone,
      grecaptcha_response: recaptchaValue,
      attributes: {
        company_name: formData["attributes-company_name"],
        who_are_you_trying_to_reach:
          formData["attributes-who_are_you_trying_to_reach"],
        sign_up: formData["attributes-sign_up"],
      },
    };
    const url = "https://socket.tutorcruncher.com/f8d3735b347ad375b206/enquiry";

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsSubmitted(true);
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        ["attributes-company_name"]: "",
        ["attributes-who_are_you_trying_to_reach"]: "",
        ["attributes-sign_up"]: "",
        terms_and_conditions: true,
      });

      return data;
    } catch {
      setErrorMessage("Failed to submit the form. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.form}>
        <p>Form submitted successfully!</p>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit} method="POST">
        <input
          type="text"
          id="name"
          name="client_name"
          placeholder="Name (Required)"
          value={formData.client_name}
          onChange={handleChange}
          required
          maxLength={255}
        />
        <input
          type="email"
          id="email"
          required
          name="client_email"
          placeholder="Email"
          value={formData.client_email}
          onChange={handleChange}
          maxLength={255}
        />
        <input
          type="text"
          id="phone_number"
          name="client_phone"
          placeholder="Phone number"
          value={formData.client_phone}
          onChange={handleChange}
          maxLength={255}
        />
        <input
          type="text"
          id="company_name"
          name="attributes-company_name"
          placeholder="Company name"
          value={formData["attributes-company_name"]}
          onChange={handleChange}
          maxLength={255}
        />
        <select
          name="attributes-who_are_you_trying_to_reach"
          value={formData["attributes-who_are_you_trying_to_reach"]}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Who are you trying to reach
          </option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="attributes-sign_up"
          placeholder="Additional Information"
          value={formData["attributes-sign_up"]}
          onChange={handleChange}
          maxLength={2000}
          rows={6}
        />
        <label className="checkboxContainer">
          <input type="checkbox" required />
          <span className="checkmark" />
          <span>
            I have read and agree to the{" "}
            <a href="#" target="_blank" rel="noopener noreferrer">
              terms and conditions
            </a>
          </span>
        </label>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LdyXRgUAAAAADUNhMVKJDXiRr6DUN8TGOgllqbt"
        />
        <Action variant="outline" type="submit">
          Send message
        </Action>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};
