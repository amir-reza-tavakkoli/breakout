import { motion } from "framer-motion";
import { useState } from "react";

import { LOCALSTORGAE_PREFIX } from "~/root";

const heartVariant = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(255, 255, 255, 1)",
    },
};

type LikeProps = {
  name: string;
};

export const Like = ({ name }: LikeProps) => {
  const [liked, setLiked] = useState<boolean>(
    typeof window !== "undefined" && localStorage !== undefined &&
      !!localStorage.getItem(LOCALSTORGAE_PREFIX + name)
  );

  function handleLike() {
    if (typeof window === "undefined" || localStorage === undefined) {
      throw new Error("Window is not defined");
    }

    if (!name) {
      throw new Error("name is possibly empty");
    }

    try {
      if (liked) {
        localStorage.removeItem(LOCALSTORGAE_PREFIX + name);
        setLiked(false);
      } else {
        localStorage.setItem(LOCALSTORGAE_PREFIX + name, "true");
        setLiked(true);
      }
    }
    catch (error) {
      throw new Error("Something went wrong")
    }
  }

  return (
      <motion.button
          type="button"
          onClick={handleLike}
          initial={{ scale: 1 }}
          whileHover={{
              scale: 1.2,
              transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 1.2 }}
          whileFocus={{ scale: 1.2 }}
      >
          <span className="nonvisual">Like Item</span>
          <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              role="presentation"
          >
              <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke="#292D32"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <motion.path
                  fill={liked ? "red" : undefined}
                  d="M12.33 17.45c-.18.06-.49.06-.67 0-1.56-.53-5.06-2.76-5.06-6.54 0-1.67 1.34-3.02 3-3.02.98 0 1.85.47 2.4 1.21.54-.73 1.42-1.21 2.4-1.21 1.66 0 3 1.35 3 3.02 0 3.78-3.5 6.01-5.07 6.54z"
                  stroke="#292D32"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={heartVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{
                      default: { duration: 2, ease: "easeInOut" },
                      fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
              />
          </motion.svg>
      </motion.button>
  );
};
