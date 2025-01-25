import React, { useEffect, useState } from "react";

function OtpTimeLeft({ otpDuration }) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date(otpDuration);
    const updateCountdown = () => {
      const currentTime = new Date();
      const difference = targetTime - currentTime;

      if (difference > 0) {
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
        clearInterval(intervalId);
      }
    };
    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(intervalId);
  }, [otpDuration]);

  return (
    <span className="text-[#2D262D] text-center text-xs sm:text-sm">
      Код ашиглах хугацаа:{" "}
      {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
      {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
    </span>
  );
}
export default OtpTimeLeft;
