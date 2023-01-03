import "./announcement.css";

const Announcement = () => {
  return (
    <div className="annContainer">
      Super Deal! Free Shipping on Orders Over &#8358;
      {Intl.NumberFormat().format(10000)}
    </div>
  );
};

export default Announcement;
