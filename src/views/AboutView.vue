<template>
  <div class="about">
    <section class="intro-section">
      <div class="intro-text">
        <h1 class="intro-title">
          About <span class="highlight">PhysioNepals</span>
        </h1>

        <p class="intro-description">
          We are a dedicated team of professionals committed to providing
          world-class physiotherapy equipment and rehabilitation solutions to
          clinics and healthcare facilities across Nepal.
        </p>

        <p class="intro-description">
          Since our establishment, we have helped over 500 clinics transform
          their rehabilitation services with quality equipment and professional
          support.
        </p>
      </div>

      <div class="intro-image"></div>
    </section>
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">Clinics Served</div>
        </div>

        <div class="stat-item">
          <div class="stat-number">2000+</div>
          <div class="stat-label">Equipment Installed</div>
        </div>

        <div class="stat-item">
          <div class="stat-number">15+</div>
          <div class="stat-label">Years Experience</div>
        </div>

        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Customer Support</div>
        </div>
      </div>
    </section>
    <section class="story-section">
      <h2 class="section-title">Our Story</h2>

      <div class="story-content">
        <div class="story-text">
          <h3 class="story-subtitle">From Passion to Purpose</h3>

          <p class="story-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>

          <p class="story-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>

          <p class="story-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>

        <div class="story-image"></div>
      </div>
    </section>
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

    <section class="mission-vision-section">
      <div class="mission-vision-container">
        <div class="mission-card">
          <h2 class="card-title">Our Mission</h2>

          <p class="card-text">
            To provide accessible, high-quality physiotherapy equipment and
            professional support services to healthcare facilities across Nepal,
            enabling them to deliver world-class rehabilitation care to their
            patients.
          </p>

          <p class="card-text">
            We are committed to being the trusted partner for all physiotherapy
            and rehabilitation equipment needs, supporting the growth and
            success of healthcare providers at every step.
          </p>
        </div>

        <div class="vision-card">
          <h2 class="card-title">Our Vision</h2>

          <p class="card-text">
            To transform physiotherapy and rehabilitation services in Nepal by
            making cutting-edge technology and equipment accessible to every
            clinic and healthcare facility.
          </p>

          <p class="card-text">
            We envision a future where advanced rehabilitation care is not a
            luxury but a standard service available across Nepal, improving the
            quality of life for thousands of patients.
          </p>
        </div>
      </div>
    </section>
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
          iconBorder: "3px solid var(--secondary-color)",
          iconRadius: "50%",
        },
        {
          title: "Customer Focused",
          description:
            "Your success is our success. We provide comprehensive support throughout your journey.",
          iconWidth: "22px",
          iconHeight: "14px",
          iconBorder: "2px solid var(--secondary-color)",
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
          iconBorder: "2px solid var(--secondary-color)",
          iconRadius: "4px",
        },
      ],
    };
  },
};
</script>
<style scoped>
/* Global Variables */
:root {
  --primary-color: #6fc6f5;
  --secondary-color: #7ed9b0;
  --light-background: #f9f9f9;
  --text-color: #555;
  --heading-color: #111;
  --white: #ffffff;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Intro Section */
.intro-section {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--light-background);
  padding: 60px;
  box-sizing: border-box;
  gap: 40px;
}

.intro-text {
  padding-right: 40px;
}

.intro-title {
  margin: 0 0 20px 0;
  font-size: 48px;
  font-weight: 700;
  color: var(--heading-color);
}

.highlight {
  color: var(--secondary-color);
}

.intro-description {
  margin: 0 0 20px 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-color);
}

.intro-image {
  background: #eee;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  transition: var(--transition);
}

.intro-image:hover {
  transform: scale(1.02);
}

/* Stats Section */
.stats-section {
  width: 100%;
  padding: 50px 80px;
  box-sizing: border-box;
  background: linear-gradient(
    120deg,
    #6fc6f5 0%,
    #6fc6f5 45%,
    #7ed9b0 55%,
    #086239 100%
  );
}

.stats-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 80px;
  box-sizing: border-box;
}

.stat-item {
  text-align: center;
  color: var(--white);
  flex: 1;
  transition: var(--transition);
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
}

.stat-label {
  font-size: 18px;
  color: white;
}

/* Story Section */
.story-section {
  width: 100%;
  padding: 80px;
  box-sizing: border-box;
}

.section-title {
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 60px 0;
  color: var(--heading-color);
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: flex-start;
}

.story-subtitle {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: var(--heading-color);
}

.story-paragraph {
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 20px 0;
  color: var(--text-color);
}

.story-image {
  background: #eee;
  border-radius: 24px;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.story-image:hover {
  transform: scale(1.02);
}

/* Mission Vision Section */
.mission-vision-section {
  background: #f6fbfa;
  padding: 80px 40px;
}

.mission-vision-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
}

.mission-card,
.vision-card {
  background: var(--white);
  padding: 40px;
  border-radius: 14px;
  box-shadow: var(--shadow);
  flex: 1;
  transition: var(--transition);
}

.mission-card:hover,
.vision-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-title {
  margin: 0 0 20px 0;
  font-size: 26px;
  color: var(--heading-color);
}

.card-text {
  margin: 0 0 20px 0;
  color: var(--text-color);
  line-height: 1.7;
}

/* Values Section */
.values-section {
  padding: 0 40px 40px 40px;
  font-family: Arial, Helvetica, sans-serif;
}

.value-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--heading-color);
  margin: 0 0 40px 0;
}

.values-grid {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.value-card {
  background: var(--white);
  width: 260px;
  padding: 28px 24px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  transition: var(--transition);
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

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

.icon-inner {
  display: block;
}

.value-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--heading-color);
}

.value-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
}

/* Team Section */
.section-container {
  margin: 0;
  padding: 0 40px 40px 40px;
  font-family: Arial, Helvetica, sans-serif;
}

.team-grid {
  display: flex;
  justify-content: space-around;
  gap: 24px;
  flex-wrap: wrap;
}

.team-card {
  width: 260px;
  background: var(--white);
  border-radius: 14px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: var(--transition);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.team-image {
  height: 180px;
  background: #f0f0f0;
}

.team-info {
  padding: 22px;
}

.team-name {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--heading-color);
}

.team-role {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
}

.team-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
}

/* Testimonials Section */
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
  color: var(--heading-color);
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.testimonial-card {
  background: var(--white);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: var(--transition);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.testimonial-rating {
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.gradient-text {
  background: linear-gradient(
    120deg,
    var(--primary-color),
    var(--secondary-color)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--primary-color);
}

.testimonial-text {
  color: var(--text-color);
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

/* Mission Section */
.mission-section {
  background: linear-gradient(
    120deg,
    #6fc6f5 0%,
    #6fc6f5 45%,
    #7ed9b0 55%,
    #7ed9b0 100%
  );
  padding: 90px 20px;
  text-align: center;
}

.mission-title {
  margin: 0 0 20px 0;
  color: var(--white);
  font-size: 38px;
  font-weight: 700;
}

.mission-text {
  margin: 0 auto 40px auto;
  max-width: 800px;
  color: #eaf5ee;
  font-size: 18px;
  line-height: 1.6;
}

.mission-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-primary:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.1);
}

.btn-outline {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-outline:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .intro-section {
    padding: 40px;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .intro-text {
    padding-right: 0;
  }

  .stats-section {
    padding: 35px 60px;
  }

  .stat-number {
    font-size: 36px;
  }

  .stat-label {
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

  .mission-vision-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .intro-section {
    padding: 30px 20px;
  }

  .intro-title {
    font-size: 40px;
  }

  .intro-description {
    font-size: 16px;
  }

  .stats-section {
    padding: 30px 40px;
    flex-direction: column;
    text-align: center;
  }

  .stat-number {
    font-size: 32px;
  }

  .stat-label {
    font-size: 14px;
  }

  .story-section {
    padding: 40px 20px;
  }

  .story-content {
    grid-template-columns: 1fr;
    gap: 30px;
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
  .intro-section {
    padding: 15px 15px;
  }

  .intro-title {
    font-size: 28px;
  }

  .intro-description {
    font-size: 14px;
  }

  .stats-section {
    padding: 25px 20px;
  }

  .stat-number {
    font-size: 24px;
  }

  .stat-label {
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

  .values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .testimonial-grid {
    gap: 15px;
  }

  .team-info,
  .testimonial-card
   {
    padding: 12px;
    min-height: 120px;
  }
  .value-section{
    max-width:100%;
  }
  .value-card{
    min-height:100px;
    width:200px;
    padding:8px;
  }

  .value-icon {
    width: 18px;
    height: 15px;
    margin-bottom: 4px;
  }

  .value-title {
    font-size: 12px;
  }

  .value-description {
    font-size: 8px;
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
    color:white;
  }

  .mission-text {
    font-size: 14px;
  }
.mission-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-primary:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.1);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.1);
}
  
}
</style>
