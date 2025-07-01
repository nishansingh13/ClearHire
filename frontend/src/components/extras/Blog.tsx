import Navbar from '../Navbar';
import { useState } from 'react';

const featuredPost = {
  title: "The Future of Remote Hiring: 5 Trends Shaping 2024",
  excerpt: "Discover how AI, virtual interviews, and global talent pools are revolutionizing the way companies find and hire top talent.",
  author: "Sarah Johnson",
  date: "Dec 15, 2023",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  category: "Industry Insights"
};

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Interview Questions for Tech Roles",
    excerpt: "Master the art of technical interviews with these proven questions that reveal candidate potential.",
    author: "Michael Chen",
    date: "Dec 12, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573496359419-edc6b530e99a?w=400&h=250&fit=crop",
    category: "Hiring Tips",
    tags: ["Interviews", "Tech", "Recruitment"]
  },
  {
    id: 2,
    title: "Building Inclusive Hiring Practices",
    excerpt: "Create a diverse and inclusive workplace by implementing these evidence-based hiring strategies.",
    author: "Dr. Amanda Rodriguez",
    date: "Dec 10, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    category: "Diversity & Inclusion",
    tags: ["Diversity", "Culture", "Best Practices"]
  },
  {
    id: 3,
    title: "AI in Recruitment: Opportunities and Challenges",
    excerpt: "Explore how artificial intelligence is transforming talent acquisition and what it means for recruiters.",
    author: "David Park",
    date: "Dec 8, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    category: "Technology",
    tags: ["AI", "Innovation", "Future"]
  },
  {
    id: 4,
    title: "Salary Negotiation: A Guide for Both Sides",
    excerpt: "Navigate salary discussions with confidence using these proven strategies for employers and candidates.",
    author: "Lisa Thompson",
    date: "Dec 5, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    category: "Career Advice",
    tags: ["Salary", "Negotiation", "Career"]
  },
  {
    id: 5,
    title: "Remote Team Building: Best Practices",
    excerpt: "Learn how to create strong, cohesive remote teams that drive results and maintain company culture.",
    author: "James Wilson",
    date: "Dec 3, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop",
    category: "Remote Work",
    tags: ["Remote", "Team Building", "Culture"]
  },
  {
    id: 6,
    title: "The ROI of Employee Referral Programs",
    excerpt: "Discover why employee referrals are the most effective recruitment channel and how to optimize your program.",
    author: "Emma Davis",
    date: "Nov 30, 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop",
    category: "Strategy",
    tags: ["Referrals", "ROI", "Strategy"]
  }
];

const categories = ["All", "Industry Insights", "Hiring Tips", "Technology", "Career Advice", "Remote Work", "Diversity & Inclusion", "Strategy"];

const popularPosts = [
  { title: "5 Red Flags in Job Interviews", views: "12.5K" },
  { title: "Creating Compelling Job Descriptions", views: "10.2K" },
  { title: "The Cost of Bad Hires", views: "8.7K" },
  { title: "Onboarding Best Practices", views: "7.3K" }
];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => 
    (selectedCategory === "All" || post.category === selectedCategory) &&
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Featured Post */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">ClearHire Insights</h1>
              <p className="text-xl text-green-100">Expert insights, industry trends, and recruitment best practices</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-500">
                        By {featuredPost.author} • {featuredPost.date} • {featuredPost.readTime}
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="lg:flex lg:space-x-12">
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              {/* Search and Filter */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Search
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          By {post.author} • {post.date}
                        </div>
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                          Read More →
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              {/* Newsletter Signup */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-4">Get the latest recruitment insights delivered to your inbox.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {popularPosts.map((post, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{post.title}</h4>
                        <p className="text-gray-500 text-xs">{post.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(1).map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
