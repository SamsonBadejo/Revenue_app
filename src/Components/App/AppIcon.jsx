import React from "react";
import Image1 from "../../Assets/App image 1.png";
import Image2 from "../../Assets/App image 2.png";
import Image3 from "../../Assets/App image 3.png";
import Image4 from "../../Assets/App image 4.png";
import "./AppIcon.css";

const AppIcon = () => {
  return (
    <div className="app-icon">
      <div class="image-container">
        <div class="tooltip-container">
          <img class="app-img" src={Image1} alt="appimage1" />
          <div class="tooltip">
            <span>Link in Bio</span>
            <div class="tooltip-arrow"></div>
          </div>
        </div>

        <div class="tooltip-container">
          <img class="app-img" src={Image2} alt="appimage2" />
          <div class="tooltip">
            <span>Store</span>
            <div class="tooltip-arrow"></div>
          </div>
        </div>

        <div class="tooltip-container">
          <img class="app-img" src={Image3} alt="appimage3" />
          <div class="tooltip">
            <span>Media Kit</span>
            <div class="tooltip-arrow"></div>
          </div>
        </div>

        <div class="tooltip-container">
          <img class="app-img" src={Image4} alt="appimage4" />
          <div class="tooltip">
            <span>Invoicing</span>
            <div class="tooltip-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIcon;
