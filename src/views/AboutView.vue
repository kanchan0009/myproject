<template>
  <div class="about">
    <section
      style="
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: #eef7f6;
        padding: 60px;
        box-sizing: border-box;
      "
    >
      <div style="padding-right: 40px">
        <h1
          style="
            margin: 0 0 20px 0;
            font-size: 48px;
            font-weight: 700;
            color: #000;
          "
        >
          About <span style="color: #7ed9b0">PhysioNepals</span>
        </h1>

        <p
          style="
            margin: 0 0 20px 0;
            font-size: 18px;
            line-height: 1.6;
            color: #555;
          "
        >
          We are a dedicated team of professionals committed to providing
          world-class physiotherapy equipment and rehabilitation solutions to
          clinics and healthcare facilities across Nepal.
        </p>

        <p style="margin: 0; font-size: 18px; line-height: 1.6; color: #555">
          Since our establishment, we have helped over 500 clinics transform
          their rehabilitation services with quality equipment and professional
          support.
        </p>
      </div>

      <div
        style="
          background: #eee;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        "
      ></div>
    </section>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(
          120deg,
          #6fc6f5 0%,
          #6fc6f5 45%,
          #7ed9b0 55%,
          #7ed9b0 100%
        );
        padding: 50px 80px;
        box-sizing: border-box;
      "
    >
      <div style="text-align: center; color: #fff; flex: 1">
        <div style="font-size: 48px; font-weight: 700">500+</div>
        <div style="font-size: 18px">Clinics Served</div>
      </div>

      <div style="text-align: center; color: #fff; flex: 1">
        <div style="font-size: 48px; font-weight: 700">2000+</div>
        <div style="font-size: 18px">Equipment Installed</div>
      </div>

      <div style="text-align: center; color: #fff; flex: 1">
        <div style="font-size: 48px; font-weight: 700">15+</div>
        <div style="font-size: 18px">Years Experience</div>
      </div>

      <div style="text-align: center; color: #fff; flex: 1">
        <div style="font-size: 48px; font-weight: 700">24/7</div>
        <div style="font-size: 18px">Customer Support</div>
      </div>
    </div>
    <div style="width: 100%; padding: 80px; box-sizing: border-box">
      <h2
        style="
          text-align: center;
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 60px 0;
        "
      >
        Our Story
      </h2>

      <div
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-start;
        "
      >
        <div>
          <h3 style="font-size: 28px; font-weight: 700; margin: 0 0 20px 0">
            From Passion to Purpose
          </h3>

          <p
            style="
              font-size: 16px;
              line-height: 1.7;
              margin: 0 0 20px 0;
              color: #555;
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p
            style="
              font-size: 16px;
              line-height: 1.7;
              margin: 0 0 20px 0;
              color: #555;
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #555">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div
          style="
            background: #eee;
            border-radius: 24px;
            min-height: 420px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        ></div>
      </div>
    </div>
    <div class="values-section">
      <!-- Section Title -->
      <h2 class="value-title">Our Values</h2>

      <!-- Values Grid -->
      <div class="values-grid">
        <div class="value-card" v-for="(value, index) in values" :key="index">
          <div class="value-icon">
            <div
              class="icon-inner"
              :style="{
                width: value.iconWidth,
                height: value.iconHeight,
                border: value.iconBorder,
                borderRadius: value.iconRadius,
              }"
            ></div>
          </div>

          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-description">{{ value.description }}</p>
        </div>
      </div>
    </div>
    <div class="section-container">
      <!-- Section Title -->
      <h2 class="section-title">Meet Our Team</h2>

      <!-- Team Grid -->
      <div class="team-grid">
        <div
          class="team-card"
          v-for="(member, index) in teamMembers"
          :key="index"
        >
          <div class="team-image"></div>
          <div class="team-info">
            <h3 class="team-name">{{ member.name }}</h3>
            <div class="team-role">{{ member.role }}</div>
            <p class="team-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sec-container">
      <!-- Section Title -->
      <h2 class="sec-title">What Our Clients Say</h2>

      <!-- Testimonials Grid -->
      <div class="testimonial-grid">
        <div
          class="testimonial-card"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <div
            class="testimonial-rating"
            :class="{ 'gradient-text': testimonial.gradient }"
            :style="{ color: testimonial.color }"
          >
            {{ testimonial.rating }}
          </div>

          <p class="testimonial-text">{{ testimonial.text }}</p>

          <div class="testimonial-user">
            <div class="testimonial-avatar"></div>
            <div>
              <div class="testimonial-name">{{ testimonial.name }}</div>
              <div class="testimonial-clinic">{{ testimonial.clinic }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="background: #f6fbfa; padding: 80px 40px">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 40px">
        <div
          style="
            background: #ffffff;
            padding: 40px;
            border-radius: 14px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            flex: 1;
          "
        >
          <h2 style="margin: 0 0 20px 0; font-size: 26px; color: #000">
            Our Mission
          </h2>

          <p style="margin: 0 0 20px 0; color: #555; line-height: 1.7">
            To provide accessible, high-quality physiotherapy equipment and
            professional support services to healthcare facilities across Nepal,
            enabling them to deliver world-class rehabilitation care to their
            patients.
          </p>

          <p style="margin: 0; color: #555; line-height: 1.7">
            We are committed to being the trusted partner for all physiotherapy
            and rehabilitation equipment needs, supporting the growth and
            success of healthcare providers at every step.
          </p>
        </div>

        <div
          style="
            background: #ffffff;
            padding: 40px;
            border-radius: 14px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            flex: 1;
          "
        >
          <h2 style="margin: 0 0 20px 0; font-size: 26px; color: #000">
            Our Vision
          </h2>

          <p style="margin: 0 0 20px 0; color: #555; line-height: 1.7">
            To transform physiotherapy and rehabilitation services in Nepal by
            making cutting-edge technology and equipment accessible to every
            clinic and healthcare facility.
          </p>

          <p style="margin: 0; color: #555; line-height: 1.7">
            We envision a future where advanced rehabilitation care is not a
            luxury but a standard service available across Nepal, improving the
            quality of life for thousands of patients.
          </p>
        </div>
      </div>
    </div>
    <div class="mission-section">
      <h1 class="mission-title">Join Us in Our Mission</h1>
      <p class="mission-text">
        Partner with PhysioNepals and elevate your rehabilitation services with
        world-class equipment and professional support.
      </p>

      <div class="mission-buttons">
        <a href="#" class="btn btn-primary" @click.prevent="contact"
          >Get in Touch</a
        >
        <a href="#" class="btn btn-outline" @click.prevent="products"
          >Explore Products</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const products = () => {
      window.location.href = "/products";
    };
    const contact = () => {
      window.location.href = "/contact";
    };
    return {
      products,
      contact,
    };
  },
  data() {
    return {
      teamMembers: [
        {
          name: "Dr. Rajesh Sharma",
          role: "Founder & CEO",
          description:
            "Physical Therapist with 15+ years of clinical experience",
        },
        {
          name: "Priya Poudel",
          role: "Operations Manager",
          description: "Expert in equipment distribution and logistics",
        },
        {
          name: "Amit Tamang",
          role: "Technical Lead",
          description: "Specialist in medical device maintenance and support",
        },
        {
          name: "Nisha Rai",
          role: "Sales Director",
          description:
            "Building relationships with clinics and rehabilitation centers",
        },
      ],
      testimonials: [
        {
          rating: "★★★★★",
          gradient: true,
          color: "",
          text: "PhysioNepals provided us with high-quality equipment at competitive prices. Their installation and training service was exceptional. Highly recommended!",
          name: "Dr. Sunil Gurung",
          clinic: "Central Rehabilitation Clinic, Kathmandu",
        },
        {
          rating: "★★★★★",
          gradient: true,
          color: "",
          text: "Excellent customer service and reliable products. The 24/7 support team has been incredibly helpful. We are very satisfied with our purchase.",
          name: "Arjun Kharel",
          clinic: "Sports Physiotherapy Center, Pokhara",
        },
        {
          rating: "★★★★★",
          gradient: true,
          color: "",
          text: "We have been working with PhysioNepals for 3 years now. Their commitment to quality and customer satisfaction is unmatched in the industry.",
          name: "Ramesh Thapa",
          clinic: "Rehab Care Clinic, Lalitpur",
        },
        {
          rating: "★★★★★",
          gradient: true,
          color: "",
          text: "Best investment for our clinic. The equipment is durable, efficient and the after-sales service is phenomenal.",
          name: "Manisha Shrestha",
          clinic: "Wellness Physiotherapy, Bhaktapur",
        },
      ],
      values: [
        {
          title: "Quality First",
          description:
            "We prioritize quality in every product, ensuring international standards and durability.",
          iconWidth: "18px",
          iconHeight: "18px",
          iconBorder: "3px solid #7ed9b0",
          iconRadius: "50%",
        },
        {
          title: "Customer Focused",
          description:
            "Your success is our success. We provide comprehensive support throughout your journey.",
          iconWidth: "22px",
          iconHeight: "14px",
          iconBorder: "2px solid #7ed9b0",
          iconRadius: "8px",
        },
        {
          title: "Innovation",
          description:
            "We stay updated with the latest technologies to provide cutting-edge solutions.",
          iconWidth: "14px",
          iconHeight: "20px",
          iconBorder: "2px solid #7ed9b0",
          iconRadius: "7px 7px 10px 10px",
        },
        {
          title: "Excellence",
          description:
            "We are committed to delivering excellence in products, service, and support.",
          iconWidth: "14px",
          iconHeight: "18px",
          iconBorder: "2px solid #7ed9b0",
          iconRadius: "4px",
        },
      ],
    };
  },
};
</script>
<style>
/* Section container */
.section-container {
  margin: 0;
  padding: 0 40px 40px 40px;
  font-family: Arial, Helvetica, sans-serif;
}

/* Section title */
.section-title {
  margin: 0 0 40px 0;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111;
}

/* Team grid */
.team-grid {
  display: flex;
  justify-content: space-around;
  gap: 24px;
  flex-wrap: wrap;
}

/* Team card */
.team-card {
  width: 260px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* Team image placeholder */
.team-image {
  height: 180px;
  background: #f0f0f0;
}

/* Team info */
.team-info {
  padding: 22px;
}

.team-name {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111;
}

.team-role {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: #6fc6f5;
}

.team-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #555;
}

.sec-container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px 40px 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.sec-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
  color: #111;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.testimonial-card {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.testimonial-rating {
  font-size: 20px;
  margin-bottom: 15px;
  color: #6fc6f5;
}

.gradient-text {
  background: linear-gradient(120deg, #6fc6f5, #7ed9b0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.testimonial-text {
  color: #555;
  line-height: 1.6;
  margin-bottom: 25px;
}

.testimonial-user {
  display: flex;
  align-items: center;
  gap: 15px;
}

.testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e5e5e5;
}

.testimonial-name {
  font-weight: bold;
}

.testimonial-clinic {
  font-size: 14px;
  color: #777;
}
.values-section {
  padding: 0 40px 40px 40px;
  font-family: Arial, Helvetica, sans-serif;
}

/* Section title */
.value-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111;
  margin: 0 0 40px 0;
}

/* Values grid */
.values-grid {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

/* Individual value card */
.value-card {
  background: #ffffff;
  width: 260px;
  padding: 28px 24px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px; /* spacing for smaller screens */
}

/* Icon wrapper */
.value-icon {
  width: 44px;
  height: 44px;
  background: #e7f6ec;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

/* Inner icon (dynamic size & border) */
.icon-inner {
  display: block;
}

/* Value title */
.value-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111;
}

/* Value description */
.value-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #555;
}
/* Hero Section Container with Gradient Background */
.mission-section {
  --bg-gradient: linear-gradient(
    120deg,
    #6fc6f5 0%,
    #6fc6f5 45%,
    #7ed9b0 55%,
    #7ed9b0 100%
  );
  background: var(--bg-gradient);
  padding: 90px 20px;
  text-align: center;
}

/* Title */
.mission-title {
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 38px;
  font-weight: 700;
}

/* Description Text */
.mission-text {
  margin: 0 auto 40px auto;
  max-width: 800px;
  color: #eaf5ee;
  font-size: 18px;
  line-height: 1.6;
}

/* Buttons Container */
.mission-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Shared Button Styles */
.btn {
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: 0.3s all ease;
}

.btn-primary {
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.btn-primary:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in;
  text-decoration: none;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.btn-outline:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in;
  text-decoration: none;
  color: white;
}
/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .about > section {
    padding: 40px;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about > section > div {
    padding-right: 0;
  }

  .about > div {
    padding: 35px 60px;
  }

  .about > div > div {
    font-size: 36px;
  }

  .about > div > div:nth-child(2) {
    font-size: 16px;
  }

  .about > div > div:nth-child(3) {
    font-size: 16px;
  }

  .values-section,
  .section-container,
  .sec-container {
    padding: 0 20px 20px 20px;
  }

  .values-grid,
  .team-grid,
  .testimonial-grid {
    gap: 20px;
  }

  .value-card,
  .team-card,
  .testimonial-card {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .about > section {
    padding: 30px 20px;
  }

  h1 {
    font-size: 40px;
  }

  p {
    font-size: 16px;
  }

  .about > div {
    padding: 30px 40px;
    flex-direction: column;
    text-align: center;
  }

  .about > div > div {
    font-size: 32px;
  }

  .about > div > div:nth-child(2),
  .about > div > div:nth-child(3) {
    font-size: 14px;
  }

  .about > div > div:nth-child(4) {
    font-size: 14px;
  }

  .about > div > div:nth-child(5) {
    font-size: 14px;
  }

  .about > div > div:nth-child(6) {
    font-size: 14px;
  }

  .section-container,
  .sec-container {
    padding: 0 15px 15px 15px;
  }

  .section-title,
  .sec-title,
  .value-title {
    font-size: 24px;
  }

  .values-grid,
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonial-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    justify-content: center;
  }

  .team-card {
    width: 280px;
  }

  .value-card {
    width: 280px;
  }

  .testimonial-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .mission-section {
    padding: 60px 20px;
  }

  .mission-title {
    font-size: 32px;
  }

  .mission-text {
    font-size: 16px;
  }

  .mission-buttons {
    gap: 12px;
  }

  .btn {
    padding: 12px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .about > section {
    padding: 20px 15px;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 14px;
  }

  .about > div {
    padding: 25px 20px;
  }

  .about > div > div {
    font-size: 24px;
  }

  .about > div > div:nth-child(2),
  .about > div > div:nth-child(3),
  .about > div > div:nth-child(4),
  .about > div > div:nth-child(5),
  .about > div > div:nth-child(6) {
    font-size: 12px;
  }

  .section-container,
  .sec-container {
    padding: 0 10px 10px 10px;
  }

  .section-title,
  .sec-title,
  .value-title {
    font-size: 20px;
  }

  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .testimonial-grid {
    gap: 15px;
  }

  .team-info,
  .testimonial-card,
  .value-card {
    padding: 16px;
  }

  .value-icon {
    width: 36px;
    height: 36px;
    margin-bottom: 16px;
  }

  .team-image {
    height: 160px;
  }

  .team-name {
    font-size: 16px;
  }

  .team-role {
    font-size: 13px;
  }

  .team-description {
    font-size: 13px;
  }

  .testimonial-rating {
    font-size: 18px;
  }

  .testimonial-text {
    font-size: 14px;
  }

  .testimonial-name {
    font-size: 14px;
  }

  .testimonial-clinic {
    font-size: 12px;
  }

  .mission-section {
    padding: 40px 15px;
  }

  .mission-title {
    font-size: 22px;
  }

  .mission-text {
    font-size: 14px;
  }

  .mission-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    padding: 10px 18px;
    font-size: 13px;
  }
}
</style>
