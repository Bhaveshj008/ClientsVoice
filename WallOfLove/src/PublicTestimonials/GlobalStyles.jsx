const GlobalStyles = ({ isIframe }) => (
    <style>
      {`
      
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .testimonial-card {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .vertical-card-content {
          display: flex;
          flex-direction: column;
        }
        .quote-mark {
          opacity: 0.1;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        @media (min-width: 768px) {
          .vertical-card-content {
            flex-direction: row;
            gap: 2.5rem;
            align-items: flex-start;
          }
          .info-section {
            flex: 0 0 220px;
          }
          .testimonial-section {
            flex: 1;
            padding-left: 2.5rem;
            border-left: 2px solid rgba(255, 255, 255, 0.1);
          }
          .profile-section {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
            text-align: left;
          }
          .profile-section .image-container {
            margin-bottom: 0;
          }
          .profile-info {
            flex: 1;
          }
          .profile-info h3,
          .profile-info p {
            text-align: left;
          }
        }
        ${isIframe ? `
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
            width: 100%;
          }
        ` : ''}
      `}
    </style>
  );
  
  export default GlobalStyles;