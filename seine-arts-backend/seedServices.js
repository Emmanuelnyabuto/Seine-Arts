require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_connection_string';

const services = [
  {
    name: "Photography",
    description: "Professional photography services.",
    price: 100,
    subServices: ["Event Photography", "Portrait Photography", "Product Photography", "Wedding Photography"],
  },
  {
    name: "Videography",
    description: "High-quality videography for events and promotions.",
    price: 200,
    subServices: ["Corporate Videography", "Event Coverage", "Promotional Videos", "Documentaries"],
  },
  {
    name: "Sound Engineering",
    description: "Expert sound engineering for audio projects.",
    price: 150,
    subServices: ["Music Mixing", "Podcast Recording", "Film Sound Design", "Voiceover Recording"],
  },
  {
    name: "Graphic Design",
    description: "Creative graphic design solutions.",
    price: 120,
    subServices: ["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics"],
  },
  {
    name: "Software Engineering",
    description: "Custom software solutions.",
    price: 300,
    subServices: ["App Development", "System Integration", "Data Analysis", "Automation Solutions"],
  },
  {
    name: "Web Development",
    description: "End-to-end web development services.",
    price: 250,
    subServices: ["Front-End Development", "Back-End Development", "eCommerce Solutions", "Website Maintenance"],
  }
];

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB Connected');
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log('Database seeded with services');
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });
