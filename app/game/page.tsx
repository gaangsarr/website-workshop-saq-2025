"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Link2,
  Bot,
  Zap,
  RefreshCw,
  Plug,
  Play,
  Trophy,
  BookOpen,
  Home,
  Volume2,
  VolumeX,
} from "lucide-react";

type GameState = "menu" | "learn" | "quiz" | "result";

interface FlashcardData {
  id: number;
  title: string;
  Icon: any;
  front: string;
  back: string;
  color: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentCard, setCurrentCard] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Setup audio
  useEffect(() => {
    audioRef.current = new Audio("/game-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 1;

    // Auto play when component mounts
    const playAudio = () => {
      audioRef.current?.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });
    };

    playAudio();

    // Cleanup
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const flashcardsData: FlashcardData[] = [
    {
      id: 1,
      title: "n8n",
      Icon: Link2,
      front: "Platform Automation Workflow",
      back: "n8n adalah platform workflow automation yang memungkinkan kamu menghubungkan berbagai aplikasi dan layanan untuk mengotomatisasi tugas repetitif tanpa perlu coding kompleks.",
      color: "bg-biru",
    },
    {
      id: 2,
      title: "AI Agent",
      Icon: Bot,
      front: "Asisten Digital Cerdas",
      back: "AI Agent adalah sistem berbasis kecerdasan buatan yang dapat melakukan tugas secara mandiri, belajar dari data, dan membuat keputusan untuk membantu pekerjaan sehari-hari.",
      color: "bg-teal",
    },
    {
      id: 3,
      title: "Automation",
      Icon: Zap,
      front: "Otomatisasi Kerja",
      back: "Automation adalah proses menggunakan teknologi untuk menjalankan tugas berulang secara otomatis, menghemat waktu dan mengurangi kesalahan manual dalam pekerjaan.",
      color: "bg-pink",
    },
    {
      id: 4,
      title: "Workflow",
      Icon: RefreshCw,
      front: "Alur Kerja Otomatis",
      back: "Workflow adalah serangkaian langkah atau proses yang terstruktur untuk menyelesaikan suatu tugas. Dengan automation, workflow bisa berjalan otomatis dari awal hingga akhir.",
      color: "bg-kuning",
    },
    {
      id: 5,
      title: "API Integration",
      Icon: Plug,
      front: "Koneksi Antar Aplikasi",
      back: "API Integration memungkinkan berbagai aplikasi dan layanan saling berkomunikasi dan berbagi data, sehingga bisa bekerja bersama dalam satu workflow automation.",
      color: "bg-merah",
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Apa itu n8n?",
      options: [
        "Bahasa pemrograman baru",
        "Platform workflow automation",
        "Framework frontend",
        "Database management system",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Fungsi utama AI Agent adalah?",
      options: [
        "Membuat website",
        "Mendesain grafis",
        "Melakukan tugas secara mandiri dengan AI",
        "Menyimpan data",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Keuntungan automation adalah?",
      options: [
        "Membuat pekerjaan lebih lambat",
        "Menghemat waktu dan mengurangi kesalahan",
        "Membuat sistem lebih kompleks",
        "Menambah biaya operasional",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Workflow dalam automation adalah?",
      options: [
        "Alur kerja terstruktur yang berjalan otomatis",
        "Cara menulis kode",
        "Metode backup data",
        "Jenis database",
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      question: "API Integration berguna untuk?",
      options: [
        "Menghapus data",
        "Menghubungkan berbagai aplikasi",
        "Mempercepat internet",
        "Menghemat storage",
      ],
      correctAnswer: 1,
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setGameState("result"), 500);
    }
  };

  const resetGame = () => {
    setGameState("menu");
    setCurrentCard(0);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsFlipped(false);
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCard < flashcardsData.length - 1) {
      setTimeout(() => setCurrentCard(currentCard + 1), 200);
    }
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (currentCard > 0) {
      setTimeout(() => setCurrentCard(currentCard - 1), 200);
    }
  };

  // Music Toggle Button Component
  const MusicButton = () => (
    <motion.button
      transition={{ delay: 0.5 }}
      onClick={toggleMute}
      className="fixed top-25 right-6 z-50 p-4 bg-white hover:bg-gray-50 rounded-2xl shadow-lg transition-all group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-gray-600" />
      ) : (
        <Volume2 className="w-6 h-6 text-biru" />
      )}

      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isMuted ? "Unmute Music" : "Mute Music"}
      </div>
    </motion.button>
  );

  // Menu Screen
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <MusicButton />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-black shadow-xl"
        >
          <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-biru rounded-full">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-heading font-bold text-4xl text-biru">
              Quiz Game
            </h1>
            <p className="text-gray-600">
              Pelajari konsep dasar automation dan AI, lalu uji pemahamanmu!
            </p>
            <div className="space-y-4 pt-4">
              <button
                onClick={() => setGameState("learn")}
                className="w-full bg-biru hover:bg-blue-700 text-white font-heading font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Mulai Belajar
              </button>
              <div className="text-sm text-gray-500">
                5 Kartu Materi • 5 Pertanyaan Quiz
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Learning Screen
  if (gameState === "learn") {
    const card = flashcardsData[currentCard];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <MusicButton />

        <div className="max-w-2xl w-full space-y-6">
          {/* Progress */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Kartu {currentCard + 1} dari {flashcardsData.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-biru h-2 rounded-full transition-all"
                style={{
                  width: `${
                    ((currentCard + 1) / flashcardsData.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="perspective-1000 h-[400px]"
          >
            <motion.div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className={`absolute w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center border-2 border-black ${card.color}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="mb-6 p-4 bg-white/20 rounded-full">
                  <card.Icon className="w-16 h-16 text-white" />
                </div>
                <h3 className="font-heading font-bold text-3xl text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-white text-lg">{card.front}</p>
                <p className="mt-8 text-white/80 text-sm">
                  Klik untuk lihat detail
                </p>
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full rounded-3xl p-8 flex items-center justify-center text-center bg-white border-2 border-black"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="space-y-4">
                  <div className="inline-block p-3 bg-gray-100 rounded-full">
                    <card.Icon className="w-10 h-10 text-gray-700" />
                  </div>
                  <p className="text-gray-800 leading-relaxed">{card.back}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevCard}
              disabled={currentCard === 0}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-heading font-bold transition-all"
            >
              Sebelumnya
            </button>
            {currentCard === flashcardsData.length - 1 ? (
              <button
                onClick={() => setGameState("quiz")}
                className="px-6 py-3 bg-pink hover:bg-pink/90 text-white rounded-xl font-heading font-bold transition-all flex items-center gap-2"
              >
                Mulai Quiz
                <Play className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextCard}
                className="px-6 py-3 bg-biru hover:bg-blue-700 text-white rounded-xl font-heading font-bold transition-all"
              >
                Selanjutnya
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (gameState === "quiz") {
    const question = quizQuestions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <MusicButton />

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-3xl p-8 border-2 border-black shadow-xl"
        >
          {/* Progress */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Pertanyaan {currentQuestion + 1} dari {quizQuestions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink h-2 rounded-full transition-all"
                style={{
                  width: `${
                    ((currentQuestion + 1) / quizQuestions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <h3 className="font-heading font-bold text-2xl mb-6 text-gray-800">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-biru hover:bg-blue-50 transition-all font-body"
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Result Screen
  if (gameState === "result") {
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
        <MusicButton />

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Score Summary Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 border-2 border-black shadow-xl text-center"
          >
            <div className="inline-block p-4 bg-kuning rounded-full mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="font-heading font-bold text-3xl text-gray-800 mb-4">
              Quiz Selesai!
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div>
                <div className="text-5xl font-bold text-biru">{score}</div>
                <p className="text-gray-600 text-sm">Benar</p>
              </div>
              <div className="text-3xl text-gray-300">/</div>
              <div>
                <div className="text-5xl font-bold text-gray-400">
                  {quizQuestions.length}
                </div>
                <p className="text-gray-600 text-sm">Total</p>
              </div>
            </div>
            <div className="inline-block px-6 py-2 bg-kuning rounded-full">
              <span className="text-white font-heading font-bold text-2xl">
                {percentage.toFixed(0)}%
              </span>
            </div>
          </motion.div>

          {/* Review Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-heading font-bold text-2xl text-gray-800 text-center mb-6">
              Review Jawaban
            </h3>

            {quizQuestions.map((question, qIndex) => {
              const userAnswer = answers[qIndex];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + qIndex * 0.1 }}
                  className={`bg-white rounded-2xl p-6 border-2 ${
                    isCorrect ? "border-green-500" : "border-red-500"
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {qIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-lg text-gray-800">
                        {question.question}
                      </h4>
                    </div>
                    {isCorrect ? (
                      <div className="flex-shrink-0 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        Benar
                      </div>
                    ) : (
                      <div className="flex-shrink-0 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                        Salah
                      </div>
                    )}
                  </div>

                  {/* Options Review */}
                  <div className="space-y-2 ml-11">
                    {question.options.map((option, optIndex) => {
                      const isUserAnswer = userAnswer === optIndex;
                      const isCorrectAnswer =
                        question.correctAnswer === optIndex;

                      let bgColor = "bg-gray-50";
                      let borderColor = "border-gray-200";
                      let textColor = "text-gray-700";
                      let badge = null;

                      if (isCorrectAnswer) {
                        bgColor = "bg-green-50";
                        borderColor = "border-green-500";
                        textColor = "text-green-800";
                        badge = (
                          <span className="text-xs text-green-600 font-bold">
                            ✓ Jawaban Benar
                          </span>
                        );
                      }

                      if (isUserAnswer && !isCorrect) {
                        bgColor = "bg-red-50";
                        borderColor = "border-red-500";
                        textColor = "text-red-800";
                        badge = (
                          <span className="text-xs text-red-600 font-bold">
                            ✗ Jawaban Kamu
                          </span>
                        );
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-xl border-2 ${bgColor} ${borderColor} ${textColor} flex items-center justify-between`}
                        >
                          <span className="text-sm">{option}</span>
                          {badge}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="sticky bottom-4"
          >
            <Link href="/" className="w-full block">
              <button className="w-full bg-biru hover:bg-blue-700 text-white font-heading font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl">
                <Home className="w-5 h-5" />
                Home
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
