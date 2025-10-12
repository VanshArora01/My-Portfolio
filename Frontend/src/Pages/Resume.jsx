import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Resume = () => {
  const coreTechnologies = [
    'JavaScript', 'React', 'CSS-in-JS', 'TypeScript', 'Sass', 
     'Shadcn', 'NodeJS', 'MongoDB', 'Express', 'Shopify'
  ]

  const otherSkills = [
    'Design Systems', 'PWAs', 'Performance Optimization', 'Tailwind CSS', 
     'Progressive Enhancement','Build Automation', 'Responsive Web Design', 
    'UX Design/Strategy', 'Shopify Development'
  ]

  const experience = [
    {
      company: "KR Heat Treatment",
      role: "Full Stack Developer",
      period: "2024 - Present",
      description: "Building and deploying responsive business websites and admin dashboards. Implementing secure backend solutions and real-time features for improved business workflow.",
      achievements: [
        "Built and deployed a fully responsive business website using React.js and Tailwind CSS",
        "Integrated an admin dashboard to manage client inquiries and submissions efficiently",
        "Implemented secure backend using Node.js, Express, and MongoDB",
        "Enabled real-time form submission and client data sorting features for better business workflow"
      ]
    },
    {
      company: "Rangla Punjab Society",
      role: "Full Stack Developer",
      period: "2025 July",
      description: "Developed a fully responsive NGO website for Rangla Punjab Society using React.js and Tailwind CSS.",
      achievements: [
        "Developed a fully responsive NGO website for Rangla Punjab Society using React.js and Tailwind CSS",
        "Integrated a donation system for the NGO",
        "Implemented a volunteer system for the NGO",
        "Enabled real-time form submission and client data sorting features for better business workflow"
      ]
    },
    {
      company: "EduGenius- AI - Powered - Learning - Platfrom",
      role: "Full Stack Developer",
      period: "2024 July",
      description: "Developed a fully responsive AI Powered Learning Platfrom using React.js and Tailwind CSS.",
      achievements: [
        "Developed a fully responsive AI Powered Learning Platfrom using React.js and Tailwind CSS",
        "Integrated a AI Powered Learning Platfrom for Students",
        "Enabled Student and Teacher Dashboard for the Easy Management of the Platfrom"
      ]
    },
  ]

  const achievements = [
    {
      title: "1st Place Winner - Desh Bhagat University Hackathon",
      period: "2024",
      description: "Developed a comprehensive disaster management system that bridges the gap between authorities and citizens, enabling real-time disaster alerts and emergency response coordination.",
      highlights: [
        "Designed and implemented a real-time alert system for disaster notifications",
        "Integrated N8N automation workflows for streamlined emergency response processes",
        "Created a unified platform connecting citizens with local authorities for enhanced public safety",
        "Developed scalable architecture supporting real-time data processing and user notifications"
      ]
    },
    {
      title: "2nd Place Winner - PCTE Group Hackasphere Hackathon",
      period: "2024",
      description: "Built a real-time web application enabling citizens to report infrastructure issues (potholes, garbage) directly to authorities with automated resolution tracking.",
      highlights: [
        "Developed a citizen reporting system with photo upload and GPS location tagging",
        "Created an administrative dashboard for authorities to manage and track reported issues",
        "Implemented real-time status updates and resolution tracking for improved civic engagement",
        "Designed responsive web interface ensuring seamless user experience across all devices"
      ]
    }
  ]

  return (
    <div className="min-h-screen no-scrollbar" style={{ backgroundColor: '#F8F7FC' }}>
      <Navbar />
      
      {/* Resume Content */}
      <section className="pt-40 pb-30 px-8 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column */}
            <div className="space-y-8">
              
              {/* Contact Info */}
              <div>
                <div className="space-y-2 text-gray-700">
                  <div className="text-green-600">Vanshcodes01@gmail.com</div>
                  <div>Ludhiana, Punjab</div>
                </div>
              </div>    

              {/* Core Technologies */}
              <div>
                <h3 className="text-blue-600 font-semibold mb-4">Core Technologies:</h3>
                <ul className="space-y-1 text-gray-700">
                  {coreTechnologies.map((tech, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Others */}
              <div>
                <h3 className="text-purple-600 font-semibold mb-4">Others:</h3>
                <ul className="space-y-1 text-gray-700">
                  {otherSkills.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Top Right Buttons */}
              
              
              {/* Name and Title */}
              <div>
                <h1 className="text-4xl font-bold text-blue-600 mb-2">VANSH ARORA</h1>
                <p className="text-gray-700 text-lg mb-6">Full Stack Web Developer</p>
                <p className="text-gray-700 leading-relaxed">
                  Engineer valued for driving high-performance accessible web experiences. I develop quality, user-friendly and scalable products using MERN Stack.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-blue-600 font-semibold text-xl mb-4 border-b-2 border-green-500 pb-1">
                  Experience
                </h2>
                <p className="text-gray-700 mb-6">
                  I've worked on a handful of web projects over the years, some of which were for the following organizations:
                </p>
                
                {experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-purple-600 font-semibold">{exp.company}</span>
                        <span className="text-gray-700"> — {exp.role}</span>
                      </div>
                      <span className="text-gray-600 text-sm">{exp.period}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-blue-600 font-semibold text-xl mb-4 border-b-2 border-green-500 pb-1">
                  Achievements
                </h2>
                <p className="text-gray-700 mb-6">
                  Recognized for innovative solutions in competitive programming and hackathon events:
                </p>
                
                {achievements.map((achievement, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-purple-600 font-semibold">{achievement.title}</span>
                      </div>
                      <span className="text-gray-600 text-sm">{achievement.period}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{achievement.description}</p>
                    <ul className="space-y-1">
                      {achievement.highlights.map((highlight, hlIndex) => (
                        <li key={hlIndex} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Resume
