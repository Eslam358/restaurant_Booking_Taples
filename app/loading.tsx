"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Loading } from "@/components/loading-screen"

const images = [
    "/temporary/p1.png",
    "/temporary/p2.png",
    "/temporary/p3.png",
    "/temporary/p4.png",
    "/temporary/p5.png",
    "/temporary/p6.png",
    "/temporary/p7.png",
    "/temporary/p8.png",
    "/temporary/p9.png",
]

export default function LoadingScreen() {
    const randomImage = images[Math.floor(Math.random() * images.length)]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center transition-colors duration-500
      bg-gradient-to-b from-red-500 via-amber-400 to-yellow-200 
      dark:from-[#1a1a1a] dark:via-[#2b2b2b] dark:to-[#3a3a3a]
    ">
            {/* دائرة التحميل */}
            <div className="relative flex justify-center items-center w-32 h-32 border-[6px] border-white/60 border-t-transparent rounded-full animate-spin shadow-xl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                    className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg"
                >
                    <Image
                        src={randomImage}
                        alt="Restaurant logo"
                        fill
                        className="object-cover rounded-full"
                    />
                </motion.div>
            </div>
            <Loading />
            {/* نص متحرك */}
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-3xl md:text-4xl font-bold mt-10 tracking-wide 
          text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]
          dark:text-amber-200
        "
            >
                Cooking Something Delicious 🍕
            </motion.h2>

            {/* نص فرعي */}
            <p className="mt-4 text-sm text-white/90 dark:text-gray-300">
                Please wait while we prepare your experience...
            </p>
        </div>
    )
}
