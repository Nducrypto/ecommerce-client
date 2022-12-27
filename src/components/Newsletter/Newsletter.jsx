import { Send } from "@mui/icons-material";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletterContainer">
      <h1 className="newsltterTitle">Newsletter</h1>
      <div className="description">
        Get latest updates from your favorite products.
      </div>
      <div className="inputContainer">
        <input placeholder="Your email" />
        <button className="button">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
