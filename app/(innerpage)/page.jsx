"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import {
  Eye,
  Globe,
  BookOpen,
  TrendingUp,
  MapPin,
  Star,
  Users,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Newspaper,
  Search,
  Filter,
  Bookmark,
  Share2,
  ChevronDown,
  Check,
  Sparkles,
  Brain,
  Target,
  Lightbulb,
  Zap,
  Shield,
  Layers,
  Clock,
  ChevronRight,
  Award,
  Heart,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const [currentPerspective, setCurrentPerspective] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Enhanced mock data with real images
  const perspectives = [
    {
      viewpoint: "Environmental",
      title: "Climate Summit Reaches Historic Agreement on Carbon Reduction",
      color: "from-emerald-500 to-green-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description:
        "Environmental groups celebrate breakthrough policies that could reshape global climate action...",
      image:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      tag: "Environment",
    },
    {
      viewpoint: "Economic",
      title: "Climate Summit Agreement May Impact Global Trade Dynamics",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      description:
        "Economic analysts examine potential market effects and new opportunities in green technology sectors...",
      image:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      tag: "Economics",
    },
    {
      viewpoint: "Political",
      title: "World Leaders Navigate Complex Negotiations at Climate Summit",
      color: "from-purple-500 to-violet-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      description:
        "Behind-the-scenes diplomatic efforts reveal the intricate balance of international cooperation...",
      image:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      tag: "Politics",
    },
    {
      viewpoint: "Social",
      title: "Communities Rally Behind Climate Summit Outcomes",
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      description:
        "Local communities and activists share their hopes and concerns about the summit's impact...",
      image:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      tag: "Social",
    },
  ];

  // Auto-rotate perspectives
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentPerspective((prev) => (prev + 1) % perspectives.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, perspectives.length]);

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const features = [
    {
      icon: Eye,
      title: "Multiple Perspectives",
      description:
        "Master current affairs for UPSC with environmental, political, economic, and social viewpoints. Essential for competitive exam's preparation.",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      image:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    },
    {
      icon: Globe,
      title: "Global Affairs Map",
      description:
        "Visualize international relations and geopolitical events crucial for IFS and CDS. Perfect for understanding global dynamics.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      image:
        "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    },
    {
      icon: Bookmark,
      title: "Smart Study Notes",
      description:
        "Create organized study materials with custom folders and notes. Build your knowledge base for competetive exam's preparation.",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      image:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    },
    {
      icon: TrendingUp,
      title: "Exam-Focused Insights",
      description:
        "Get AI-powered analysis of trending topics and important events. Stay ahead with content curated for competitive exam's success.",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      image:
        "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Daily Updates",
      icon: Newspaper,
      color: "from-red-500 to-pink-500",
    },
    {
      number: "500+",
      label: "Topics Covered",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "4",
      label: "Perspectives",
      icon: Eye,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "5K+",
      label: "UPSC Aspirants",
      icon: Users,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "UPSC CSE 2023 Rank 45",
      content:
        "Doutya's multiple perspectives helped me understand complex current affairs deeply. Essential for UPSC preparation!",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Arjun Patel",
      role: "IFS Officer 2023",
      content:
        "The perspective breakdown is incredible for understanding international relations and environmental policies.",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Sneha Reddy",
      role: "CDS Qualified 2023",
      content:
        "Perfect for staying updated with defense and strategic affairs. Saved me hours of research every week.",
      avatar:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Doutya
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium"
              >
                How it Works
              </a>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium"
              >
                Pricing
              </Link>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium"
              >
                Reviews
              </a>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="relative pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 text-red-700 rounded-full text-sm font-semibold mb-8">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Perfect for Competitive Exam&apos;s Preparation
                </div>

                <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    One News,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                    Every Angle
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
              >
                Master current affairs for competetive exams.
                Understand every news story from multiple perspectives -
                environmental, political, economic, and social viewpoints for
                comprehensive exam preparation.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
                >
                  Start Your Preparation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-2xl text-lg font-semibold hover:border-red-300 hover:bg-red-50 transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center space-x-8 text-sm text-gray-500"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  UPSC focused
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Multiple perspectives
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Current affairs mastery
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
                {/* Glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30 backdrop-blur-sm"></div>

                <div className="relative z-10">
                  {/* Demo Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Live Perspective Demo
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        See how one story looks from different angles
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        {isAutoPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setCurrentPerspective(0)}
                        className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Perspective Selector */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {perspectives.map((perspective, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentPerspective(index)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                          currentPerspective === index
                            ? `bg-gradient-to-r ${perspective.color} text-white shadow-lg transform scale-105`
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                        whileHover={{
                          scale: currentPerspective === index ? 1.05 : 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-xs font-semibold opacity-90">
                          {perspective.tag}
                        </div>
                        <div className="text-sm font-bold mt-1">
                          {perspective.viewpoint}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Article Preview */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPerspective}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <img
                          src={perspectives[currentPerspective].image}
                          alt={perspectives[currentPerspective].viewpoint}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${perspectives[currentPerspective].color} text-white text-xs font-bold rounded-full`}
                        >
                          {perspectives[currentPerspective].viewpoint}{" "}
                          Perspective
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-gray-900 leading-tight">
                          {perspectives[currentPerspective].title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {perspectives[currentPerspective].description}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />2 min read
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              1.2k
                            </div>
                          </div>
                          <button className="text-red-600 text-sm font-semibold hover:text-red-700 flex items-center">
                            Read more
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Enhanced Progress Dots */}
                  <div className="flex justify-center space-x-2 mt-8">
                    {perspectives.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentPerspective(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentPerspective === index
                            ? "bg-red-600 w-8"
                            : "bg-gray-300 w-2 hover:bg-gray-400"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Competitive Exam Tools
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Everything you need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Competitive Exam success
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master current affairs for competetive with our
              comprehensive suite of tools designed for these four critical
              examinations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="group relative"
              >
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-500 hover:shadow-2xl ${
                    hoveredFeature === index
                      ? "border-red-200 scale-105"
                      : "border-gray-100"
                  }`}
                >
                  {/* Feature Image */}
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center font-semibold text-red-600 group"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              <Layers className="w-4 h-4 mr-2" />
              Study Method
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Master Current Affairs,
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Ace Competitive Exams
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "AI Content Curation",
                description:
                  "Our AI analyzes thousands of news sources and curates content specifically relevant for competetive exams.",
                icon: Brain,
                color: "from-red-500 to-pink-500",
                image:
                  "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
              },
              {
                step: "02",
                title: "Perspective Analysis",
                description:
                  "Each topic is analyzed from multiple angles - political, economic, environmental, and social - essential for competitive exam's preparation.",
                icon: Filter,
                color: "from-blue-500 to-cyan-500",
                image:
                  "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
              },
              {
                step: "03",
                title: "Exam-Ready Knowledge",
                description:
                  "Study current affairs with confidence, create notes, and build the comprehensive understanding needed for competitive exam's success.",
                icon: Lightbulb,
                color: "from-green-500 to-emerald-500",
                image:
                  "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                <div className="text-sm font-bold text-red-600 mb-3">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Trusted by successful
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                UPSC & defense aspirants
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                 {` "${testimonial.content}"`}
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to see the
              <br />
              <span className="text-red-200">full picture?</span>
            </h2>
            <p className="text-xl text-red-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of competetive exam aspirants who have
              transformed their current affairs preparation. Master multiple
              perspectives and ace your exams today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-700 px-12 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl"
              >
                Start Your Preparation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-12 py-4 rounded-2xl text-lg font-bold hover:bg-white hover:text-red-700 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full"
          />
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Doutya</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Master current affairs for competetive exams with
                intelligent news perspectives. Get comprehensive preparation
                from every angle.
              </p>
              <div className="flex space-x-4">
                {[Share2, Users, Globe, MessageCircle].map((Icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2, y: -3 }}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    News Map
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trending
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Doutya. All rights reserved.
              Built with ❤️ for competitive exam aspirants.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
