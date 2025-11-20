
// src/components/WolfTransition/WolfTransition.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./WolfTransition.css";

export default function WolfTransition() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3500); // 4s duration
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {show && (
        <div className="wolf-transition">
          <div className="wolf-run">
            {/* <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1762746206/30374998_Iwf9MVEY7ydoULV_oydwvj.gif" alt="Running wolf" /> */}
            <img src="https://res.cloudinary.com/dooet0x6x/image/upload/v1763248133/30374998_Iwf9MVEY7ydoULV_utxpx3.gif" alt="Running wolf" />
            <div className="wolf-trail"></div>
          </div>
        </div>
      )}
    </>
  );
}
