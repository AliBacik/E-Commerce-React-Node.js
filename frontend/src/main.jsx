import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Layout } from "./layouts/Layout";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProvider from "./context/CartProvider";

import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <CartProvider>
      <Layout>
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
