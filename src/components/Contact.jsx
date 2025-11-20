import "../css/about-contact.css";
const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Got questions or suggestions? We’d love to hear from you.</p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:
admin@dawahnigeria.com"
          >
            admin@dawahnigeria.com
          </a>
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a
            href="https://dawahnigeria.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dawahnigeria.com
          </a>
        </li>
        <li>
          <strong>Location:</strong> Ibadan, Oyo State, Nigeria
          <div style={{ marginTop: "10px" }}>
            <iframe
              title="Dawah Nigeria Location"
              src="https://www.google.com/maps?q=Ibadan,Oyo+State,Nigeria&output=embed"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
