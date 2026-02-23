import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // প্রতিবার পেজ চেঞ্জ হলে স্ক্রলকে একদম উপরে পাঠিয়ে দেবে
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}