import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  Telegram,
  Twitter,
} from "@mui/icons-material";

import "./Footer.css";

const Footer = () => {
  const links = [
    {
      id: 1,
      color: "blue",
      icon: <Facebook />,
      link: "https://facebook.com/AgboNduu",
    },
    {
      id: 2,
      color: "red",
      icon: <Instagram />,
      link: "https://instagram.com/AgboNduu",
    },
    {
      id: 3,
      color: "blue",
      icon: <Twitter />,
      link: "https://twitter.com/agbozion",
    },
    {
      id: 4,
      color: "green",
      icon: <Telegram />,
      link: "https://telegram.me/Nducrypto",
    },
  ];

  return (
    <div className="footerContainer">
      <div className="center">
        <div className="title">Links</div>
        <div className="socialContainer">
          {links.map((item) => (
            <div key={item.id} className="socialIcon">
              <a
                className="socialIcon"
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="left">
        <h1>MABENCH</h1>
        <div className="desc">We deal on varities of products</div>
      </div>
      <div className="right">
        <div className="title">Contact</div>
        <div className="contactItem">
          <Phone style={{ marginRight: "10px" }} /> +234 8064534676
        </div>

        <div className="contactItem">
          <MailOutline style={{ marginRight: "10px" }} /> ndubinho9@gmail.com
        </div>
        <div className="contactItem">
          <Room style={{ marginRight: "10px" }} /> 62 Dallas Street ,
          Portharcourt 54654
        </div>
      </div>
    </div>
  );
};

export default Footer;
