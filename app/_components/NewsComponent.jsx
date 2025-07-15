"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { useChildren } from "@/context/CreateContext";
import { IoIosCloseCircle } from "react-icons/io";
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import toast from "react-hot-toast";
import GlobalApi from "../api/_services/GlobalApi";
import { FiCopy } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewsDetails({ id, showNames }) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedAge, selectedRegion } = useChildren();
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: "", meaning: "" });
  const [report_text, setReport_text] = useState("");
  const [showReportPopup, setShowReportPopup] = useState(false);

  const router = useRouter();

  const handleReport = async () => {
    try {
      const response = await GlobalApi.ReportNews({
        news_id: id,
        report_text,
      });
      console.log(response.data);
      if (response?.data) {
        toast.success("News reported successfully.");
      }
      setReport_text("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to report the news.Please try again");
    } finally {
      setShowReportPopup(false);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/fetchNews/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: parseInt(id), age: selectedAge }),
        });
        const data = await response.json();
        if (response.ok) {
          setArticle(data.newsData);
        } else {
          setError(data.error || "Failed to fetch news");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, selectedAge]);

  const categoriesList = () => {
    if (!showNames) return null; // Handle cases where data is null or undefined
    const categoryNames = showNames;
    const result = categoryNames.split(",");

    return (
      <>
        {result.map((item, index) => (
          <div
            key={index} // Always add a unique key when rendering lists
            className="  text-[7.9px] text-white text-xs font-medium bg-red-800 bg-opacity-80 px-2 py-[2px] rounded-md"
          >
            {item.trim()} {/* Remove extra spaces */}
          </div>
        ))}
      </>
    );
  };

  const handleWordClick = (word, meaning) => {
    setPopupContent({ word, meaning });
    setShowPopup(true);
  };

  const replaceWordsWithSpans = (text) => {
    const wordsWithMeanings = article.meanings || [];
    const words = text.split(/\b/); // Split text into words and non-word characters
    return words.map((word, index) => {
      const meaningObj = wordsWithMeanings.find(
        (meaning) => meaning.word.toLowerCase() === word.toLowerCase()
      );
      if (meaningObj) {
        return (
          <span
            key={index}
            className="font-bold text-blue-500 cursor-pointer"
            onClick={() =>
              handleWordClick(meaningObj.word, meaningObj.description)
            }
          >
            {word}
          </span>
        );
      }
      return word;
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-200 via-white to-red-100 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">{error}</h2>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-200 via-white to-red-100 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Article not found. Please try another one!
        </h2>
      </div>
    );
  }

  const {
    title,
    category,
    image_url,
    date,
    description,
    questions,
    meanings,
    created_at,
  } = article;
  const shareUrl = `https://www.doutya.com/kids/${id}`;

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    return new Date(date).toLocaleString("en-IN", options).replace(",", "");
  };
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard!"); // Optional success toast
      })
      .catch((err) => {
        // toast.error('Failed to copy link.'); // Optional error toast
        console.log(err); // Optional error toast
      });
  };
  return (
    <div className="text-gray-800 relative mb-14">
      {/* Main container with max width and centering */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop: Single column, Mobile: Full width */}
        <div className="w-full">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-4xl max-md:text-3xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500 mt-2">{date}</p>
          </div>

          {/* Categories */}
          <div className="mb-3 flex gap-2">{categoriesList()}</div>

          {/* Image */}
          <Image
            src={`https://wowfy.in/testusr/images/${image_url}`}
            alt={title}
            width={800}
            height={300}
            className="rounded-md mb-6 w-full"
          />

          {/* Created date */}
          <div className="text-xs text-slate-500 mb-4">{formatDate(created_at)}</div>

          {/* Share and Report Icons */}
          <div className="flex items-center space-x-8 w-fit mb-6">
            {/* Share Icon */}
            <div className="text-gray-500 cursor-pointer relative group">
              <FaShareAlt size={16} />
              {/* Share Options */}
              <div className="hidden group-hover:flex gap-2 absolute -top-10 left-0 bg-white border shadow-lg rounded-md p-2 z-50">
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton url={shareUrl} title={title}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="Copy Link"
                  title="Copy Link"
                >
                  <FiCopy size={20} />
                </button>
              </div>
            </div>

            {/* Report Icon */}
            <div
              onClick={() => {
                setShowReportPopup(true);
                console.log("Report popup triggered");
              }}
              className="text-gray-500 cursor-pointer rotate-90"
            >
              <FaEllipsisH size={16} />
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            className="text-lg text-gray-700 space-y-6 leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {description.split("\n\n").map((para, index) => (
              <p key={index} className="text-justify">
                {replaceWordsWithSpans(para)}
              </p>
            ))}
          </motion.div>

          {/* Questions Section - Now at bottom with improved mobile styling */}
          {questions && questions.length > 0 && (
            <motion.div
              className="bg-gray-100 p-4 md:p-6 rounded-md shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                Questions for revision
              </h2>
              <ol className="list-decimal pl-4 md:pl-6 space-y-2 md:space-y-4">
                {questions.map((question, index) => (
                  <li key={index} className="text-base md:text-lg text-gray-700">
                    {question}
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </div>
      </div>

      {/* Popups remain the same */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl relative w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-white"
              >
                <IoIosCloseCircle size={24} color="#dc2626" />
              </button>
              <h2 className="text-lg font-bold text-gray-800">
                {popupContent.word.charAt(0).toUpperCase() +
                  popupContent.word.slice(1)}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">Meaning</span>:{" "}
                {popupContent.meaning}
              </p>
            </motion.div>
          </motion.div>
        )}

        {showReportPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999999999999999]">
            <motion.div
              className="bg-white max-w-sm w-full p-6 rounded-lg shadow-xl space-y-6 relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {/* Report Icon */}
              <div className="flex justify-center">
                <div className="p-4 bg-red-100 rounded-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636a9 9 0 11-12.728 0M12 9v2m0 4h.01"
                    />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 text-lg font-semibold text-center">
                Are you sure you want to report this?
              </p>
              <p className="text-gray-500 text-sm text-center">
                Reporting will send this content for review. This action cannot
                be undone.
              </p>

              {/* Optional Textarea */}
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Optional: Provide additional information about your report..."
                value={report_text}
                onChange={(e) => setReport_text(e.target.value)}
              />

              {/* Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleReport}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-shadow shadow-md hover:shadow-lg"
                >
                  Yes, Report
                </button>
                <button
                  onClick={() => setShowReportPopup(false)}
                  className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:from-gray-400 hover:to-gray-500 transition-shadow shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
