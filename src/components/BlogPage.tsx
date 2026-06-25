import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, Clock, Search, BookOpen, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlogPost } from "../types";
import { getBlogPosts } from "../sanityClient";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    loadBlogs();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="blogpage-container">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          // BLOGS LIST VIEW
          <motion.div
            key="blog-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                Islamic Knowledge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-sans tracking-tight">
                Worldwide Quran Academy Blog
              </h2>
              <p className="text-emerald-950/60 text-sm leading-relaxed font-sans">
                Read our latest articles on Quran memorization guides, the beauty of Tajweed rules, parenting advice, and classic Islamic values.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative" id="blog-search-box">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-950/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-white text-emerald-950 shadow-sm"
              />
            </div>

            {/* Blogs Grid */}
            {loading ? (
              <div className="flex justify-center py-20" id="blog-loading-spinner">
                <div className="w-8 h-8 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20 text-emerald-950/50" id="blog-empty-state">
                <BookOpen className="w-12 h-12 mx-auto text-emerald-950/20 mb-3" />
                <p className="text-sm font-medium">No articles matched your search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-list-grid">
                {filteredPosts.map((post) => (
                  <article
                    key={post._id}
                    id={`blog-card-${post._id}`}
                    className="bg-white rounded-2xl border border-emerald-950/10 overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col h-full cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-emerald-950/50">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {post.author}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-emerald-950 group-hover:text-emerald-800 transition-colors leading-snug">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-emerald-950/70 font-sans leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read More button */}
                      <div className="border-t border-emerald-950/5 pt-4 mt-5">
                        <button className="text-xs font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors flex items-center gap-1">
                          Read Full Article
                          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          // BLOG DETAIL READER VIEW
          <motion.div
            key="blog-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
              id="back-to-blogs-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </button>

            {/* Post Header */}
            <header className="space-y-4 border-b border-emerald-950/5 pb-6" id="blog-reader-header">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author & Date metadata */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-emerald-950/60 font-sans font-medium">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-700" />
                  Written by {selectedPost.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  Published {formatDate(selectedPost.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  5 Min Read
                </span>
              </div>
            </header>

            {/* Main Article Content */}
            <article className="prose prose-emerald max-w-none text-emerald-950/80 leading-relaxed font-sans text-base sm:text-lg space-y-6" id="blog-reader-body">
              {/* Parse paragraph line breaks neatly */}
              {selectedPost.body.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("### ")) {
                  return (
                    <h3 key={pIdx} className="text-xl sm:text-2xl font-bold text-emerald-950 pt-4">
                      {para.replace("### ", "")}
                    </h3>
                  );
                } else if (para.startsWith("## ")) {
                  return (
                    <h2 key={pIdx} className="text-2xl sm:text-3xl font-extrabold text-emerald-950 pt-6">
                      {para.replace("## ", "")}
                    </h2>
                  );
                } else if (para.match(/^\d+\.\s/)) {
                  // Basic numbered list parse
                  return (
                    <div key={pIdx} className="pl-4 border-l-2 border-emerald-900/30 py-1 italic bg-[#fcfbf7]/40 rounded-r-xl">
                      <p>{para}</p>
                    </div>
                  );
                }
                return (
                  <p key={pIdx} className="whitespace-pre-line">
                    {para}
                  </p>
                );
              })}
            </article>

            {/* Bottom Sharing panel */}
            <footer className="border-t border-emerald-950/5 pt-6 flex justify-between items-center text-xs text-emerald-950/50" id="blog-reader-footer">
              <span>Thank you for reading the Worldwide Quran Academy Blog!</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="flex items-center gap-1 px-3 py-1.5 border border-emerald-950/10 hover:border-emerald-900/30 rounded-lg font-bold hover:text-emerald-900 transition-all bg-white shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Link
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
