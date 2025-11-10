
// src/components/WolfTransition/WolfTransition.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./WolfTransition.css";

export default function WolfTransition() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000); // 3.5s duration
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {show && (
        <div className="wolf-transition">
          <div className="page-slide"></div>

          <div className="wolf-run">
            {/* <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1762746206/30374998_Iwf9MVEY7ydoULV_oydwvj.gif" alt="Running wolf" /> */}
            <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1762745869/wolf_run_tryacw.gif" alt="Running wolf" />
            <div className="wolf-trail"></div>
          </div>
        </div>
      )}
    </>
  );
}
