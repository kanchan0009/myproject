<template>
  <div class="contact">
    <div
      style="
        width: 100%;
        padding: 70px 60px;
        background: linear-gradient(135deg, #f4fbf8, #ffffff);
      "
    >
      <h1
        style="
          margin: 0;
          font-size: 56px;
          font-weight: 800;
          color: #111111;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        Get in Touch
      </h1>

      <p
        style="
          margin-top: 20px;
          font-size: 20px;
          color: #6b6b6b;
          max-width: 900px;
          line-height: 1.6;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        Have questions? We're here to help and answer any question you might
        have
      </p>
    </div>
    <div class="contact-container">
      <div class="contact-grid">
        <div class="contact-card">
          <div class="icon">📞</div>
          <div class="content">
            <h3>Phone</h3>
            <p class="bold">+977-1-234567</p>
            <p>Mon-Fri from 9am to 6pm</p>
          </div>
        </div>

        <div class="contact-card">
          <div class="icon">✉️</div>
          <div class="content">
            <h3>Email</h3>
            <p class="bold">
              <a href="#" style="text-decoration: none; color: black"
                >info@physionepals.com</a
              >
            </p>
            <p>We'll respond within 24 hours</p>
          </div>
        </div>

        <div class="contact-card">
          <div class="icon">📍</div>
          <div class="content">
            <h3>Address</h3>
            <p class="bold">Kathmandu, Nepal</p>
            <p>Visit our showroom</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="grid">
        <!-- LEFT: CONTACT FORM (MERGED ROWS) -->
        <div class="card form-card">
          <h2>Send us a Message</h2>

          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                v-model.trim="form.fullName"
                placeholder="John Doe"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  v-model.trim="form.email"
                  placeholder="john@example.com"
                />
              </div>

              <div class="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  v-model.trim="form.phone"
                  placeholder="+977-1-234567"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Subject *</label>
              <select v-model="form.subject">
                <option value="">Select a subject</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Feedback</option>
              </select>
            </div>

            <div class="form-group">
              <label>Message *</label>
              <textarea
                v-model.trim="form.message"
                placeholder="Tell us more about your inquiry..."
              >
              </textarea>
            </div>

            <button type="submit"> Send Message</button>
          </form>
        </div>

        <!-- TOP RIGHT: BUSINESS HOURS -->
        <div class="card business-card">
          <h3>🕒 Business Hours</h3>

          <div class="hours">
            <div>
              <p>Monday - Friday</p>
              <p>Saturday</p>
              <p>Sunday</p>
            </div>
            <div class="time">
              <p>9:00 AM - 6:00 PM</p>
              <p>10:00 AM - 4:00 PM</p>
              <p>Closed</p>
            </div>
          </div>

          <hr />

          <p class="emergency">Emergency Support Available:</p>
          <p class="hotline">24/7 Technical Hotline</p>
        </div>

        <!-- BOTTOM RIGHT: MAP -->
        <div class="card map-card">
          <div class="map-placeholder">
            📍
            <p><strong>Our Location:</strong> Kathmandu, Nepal</p>
            <span>Interactive map component</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background: #f5f6f8;
  padding: 30px;
}

.container {
  max-width: 100%;
  margin: 10px;
  padding:30px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}

/* MERGE LEFT COLUMN ROWS */
.form-card {
  grid-row: 1 / span 2;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* FORM STYLING */
.form-card h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

textarea {
  min-height: 120px;
  resize: none;
}

button {
  width: 100%;
  padding: 14px;
  background: #1e9b3b;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background: #178232;
}

/* BUSINESS HOURS */
.business-card h3 {
  margin-bottom: 15px;
}

.hours {
  display: flex;
  justify-content: space-between;
  line-height: 1.8;
}

.time {
  font-weight: bold;
}

hr {
  margin: 15px 0;
  border: none;
  border-top: 1px solid #eee;
}

.emergency {
  color: #555;
}

.hotline {
  color: #1e9b3b;
  font-weight: bold;
}

/* MAP */
.map-card {
  background: #dbe7e2;
}

.map-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;
  text-align: center;
}

.map-placeholder p {
  margin-top: 10px;
}

.map-placeholder span {
  font-size: 13px;
  opacity: 0.8;
}
.contact-container {
  min-height: 300px;
  display: flex;
  align-items: center; /* vertical center */
  justify-content: center; /* horizontal center */
}

/* GRID */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  padding: 0 30px; /* side spacing only */
}

/* CARD */
.contact-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ICON */
.icon {
  width: 56px;
  height: 56px;
  background: #e6f4ea;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* TEXT */
.content h3 {
  font-size: 18px;
  margin-bottom: 6px;
}

.content p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.bold {
  font-weight: bold;
  color: #111;
}
</style>
<script setup>
import { reactive } from "vue";

const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const handleSubmit = () => {
  // Required field validation
  if (
    !form.fullName ||
    !form.email ||
    !form.phone ||
    !form.subject ||
    !form.message
  ) {
    alert("❌ Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  // Success
  alert("✅ Your message has been sent successfully!");

  // Reset form
  form.fullName = "";
  form.email = "";
  form.phone = "";
  form.subject = "";
  form.message = "";
};
</script>
