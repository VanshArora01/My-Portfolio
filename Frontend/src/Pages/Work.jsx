import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Work = () => {
  const projects = [
    {
      id: 1,
      title: "KR Heat Treatment",
      url: "kr-heat-treatment.vercel.app",
      logo: "KR"
    },
    {
      id: 2,
      title: "Rangla Punjab Society NGO Website",
      url: "rangla-punjab-society-front.onrender.com/",
      logo: "RP"
    },
    
    {
      id: 3,
      title: "EduGenius- AI - Powered - Learning - Platfrom",
      url: "sahilkhurana01.github.io/EduGenius-AI-Powered-Learning-Platfrom/",
      logo: "EG"
    },
    
  ]

  return (
    <div className="min-h-screen no-scrollbar" style={{ backgroundColor: '#F8F7FC' }}>
      <Navbar />
      
      {/* Work Content */}
      <section className="pt-50 pb-45 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              /work.
            </h1>
            <p className="text-lg text-gray-600">
              Selected work I've taken on in the past.
            </p>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Logo */}
                <div className="mb-6">
                  <div className="w-16 h-16  text-black rounded-lg flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                    {project.logo}
                  </div>
                </div>
                
                {/* Project Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {project.title}
                </h3>
                
                {/* URL */}
                <a 
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
                >
                  {project.url}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Work