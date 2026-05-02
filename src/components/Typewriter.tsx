import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  caret?: boolean;
}

export default function Typewriter({ text, speed = 35, delay = 0, className, caret = true }: Props) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [text, speed, delay]);

  return (
    <span className={`${className ?? ""} ${caret && !done ? "blink-caret" : ""}`}>
      {out}
    </span>
  );
}