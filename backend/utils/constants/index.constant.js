const WelcomeMail = ({ username }) => {
  return `
 
    <table
      style="
        width: 100%;
        max-width: 600px;
        margin: 30px auto;
        background-color: #f7f7f7;
        color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      "
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td
          style="
            text-align: center;
            padding: 20px 0;
            background-color: white;
          "
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSqvol4HRBHfwbi_hSF9AZWgA-xpiywKL8hg&s"
            alt="Logo"
            style="max-width: 150px"
          />
        </td>
      </tr>
      <tr>
        <td
          style="
            padding: 30px;
            font-size: 16px;
            font-weight: 500;
            background-image: url('/pacific/images/Group 707.png');
            background-repeat: no-repeat;
            background-position: center center;
          "
        >
          <div style="text-align: center">
            <h2 style="font-size: 22px; font-weight: 500; color: #000000">
             Welcome To the App
            </h2>
          </div>
          <p style="font-size: 15px; font-weight: 300; color: #000000">
            Dear ${username},
          </p>
          <p style="font-size: 15px; font-weight: 300; color: #000000">
           Welcome to Snipe! We're thrilled to have you on board. Snipe makes web scraping easy, efficient, and enjoyable—so you can focus on what matters most: turning data into insights. Happy scraping!
          
          </p>
          
          <p style="font-size: 15px; font-weight: 300; color: #000000">
            Thanks,<br />Team Snipe
          </p>
          <div style="margin-top: 30px; text-align: center">
            <span
              style="
                display: inline-flex;
                align-items: center;
                gap: 5px;
                margin-right: 20px;
              "
            >
       
              <span style="color: #000000">Help center</span>
            </span>
            <span style="display: inline-flex; align-items: center; gap: 5px">
           
              <a
                href="mailto:aayush@vrittechnologies.com"
                style="text-decoration: none; color:#000000"
              >
                aayush@vrittechnologies.com
              </a>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td
          style="
            text-align: center;
            padding: 10px 0;
            margin-top: 20px;
            border-top: 1px solid #000000;
            color:            #fff;
            background-color:  #000000;
          "
        >
          <p>
            <a href="http://127.0.0.1:5500/index.html"
              ><img
                src="https://api.lifequestclinicallab.com.np/components/custom-gallery/Anonymous_User_image.png"
                alt="Instagram"
                style="width: 20px; height: 20px"
            /></a>
          
            <a
              href="http://127.0.0.1:5500/index.html"
              ><img
                src="https://api.lifequestclinicallab.com.np/components/custom-gallery/Facebook_Logo_2023.png"
                alt="Facebook"
                style="width: 20px; height: 20px"
            /></a>
            <!-- <a href="#"><img src="https://pacific-job-hunt-bucket.s3.amazonaws.com/media/gallery/images/Social_icon_2.png" alt="LinkedIn" style="width: 20px; height: 20px;" /></a> -->

          </p>
          <p>Copyright &copy; 2024 Snipe. All rights reserved.</p>
          <a
            href="https://vrittechnologies.com"
            target="_blank"
            style="color: #00aaff; text-decoration: none"
          >
            <p>
              Made with <span style="color: #ca1010">&hearts;</span> By Vrit Tech
            </p>
          </a>
        </td>
      </tr>
    </table>
  `;
};
const OTPMail = ({ otp, username }) => {
  return `
    <table
      style="
        width: 100%;
        max-width: 600px;
        margin: 30px auto;
        background-color: #f7f7f7;
        color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      "
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td
          style="
            text-align: center;
            padding: 20px 0;
            background-color: white;
          "
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSqvol4HRBHfwbi_hSF9AZWgA-xpiywKL8hg&s"
            alt="Logo"
            style="max-width: 150px"
          />
        </td>
      </tr>
      <tr>
        <td
          style="
            padding: 30px;
            font-size: 16px;
            font-weight: 500;
            background-image: url('/pacific/images/Group 707.png');
            background-repeat: no-repeat;
            background-position: center center;
          "
        >
          <div style="text-align: center">
            <h2 style="font-size: 22px; font-weight: 500; color: #000000">
             Welcome To the App
            </h2>
          </div>
          <p style="font-size: 15px; font-weight: 300; color: #000000">
            Dear ${username},
          </p>
          <p style="font-size: 15px; font-weight: 300; color: #000000">
           Please use this code to complete your login or registration.
This code will expire in 5 minutes.
If you didn’t request this, you can safely ignore the message.
Happy scraping!
— The Snipe Team
          
                <table
                  style="width: 100%; margin: 20px 0"
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >
                  <tr>
                    <td style="text-align: center">
                    ${Array.from(
                      String(otp),
                      (char) => `
                      <input
                        type="text"
                        maxlength="1"
                        readonly
                        value="${char}"
                        style="
                          width: 40px;
                          height: 40px;
                          font-size: 18px;
                          border: 1px solid #ccc;
                          border-radius: 5px;
                          text-align: center;
                          font-weight: bold;
                          color: #6e3fe4;
                          outline: none;
                        "
                      />
                    `
                    ).join("")}
                    </td>
                  </tr>
                </table>
              
          </p>
          
          <p style="font-size: 15px; font-weight: 300; color: #000000">
            Thanks,<br />Team Snipe
          </p>
          <div style="margin-top: 30px; text-align: center">
            <span
              style="
                display: inline-flex;
                align-items: center;
                gap: 5px;
                margin-right: 20px;
              "
            >
       
              <span style="color: #000000">Help center</span>
            </span>
            <span style="display: inline-flex; align-items: center; gap: 5px">
           
              <a
                href="mailto:aayush@vrittechnologies.com"
                style="text-decoration: none; color:#000000"
              >
                aayush@vrittechnologies.com
              </a>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td
          style="
            text-align: center;
            padding: 10px 0;
            margin-top: 20px;
            border-top: 1px solid #000000;
            color:            #fff;
            background-color:  #000000;
          "
        >
          <p>
            <a href="http://127.0.0.1:5500/index.html"
              ><img
                src="https://api.lifequestclinicallab.com.np/components/custom-gallery/Anonymous_User_image.png"
                alt="Instagram"
                style="width: 20px; height: 20px"
            /></a>
          
            <a
              href="http://127.0.0.1:5500/index.html"
              ><img
                src="https://api.lifequestclinicallab.com.np/components/custom-gallery/Facebook_Logo_2023.png"
                alt="Facebook"
                style="width: 20px; height: 20px"
            /></a>
            <!-- <a href="#"><img src="https://pacific-job-hunt-bucket.s3.amazonaws.com/media/gallery/images/Social_icon_2.png" alt="LinkedIn" style="width: 20px; height: 20px;" /></a> -->

          </p>
          <p>Copyright &copy; 2024 Snipe. All rights reserved.</p>
          <a
            href="https://vrittechnologies.com"
            target="_blank"
            style="color: #00aaff; text-decoration: none"
          >
            <p>
              Made with <span style="color: #ca1010">&hearts;</span> By Vrit Tech
            </p>
          </a>
        </td>
      </tr>
    </table>
  `;
};
export { WelcomeMail, OTPMail };
