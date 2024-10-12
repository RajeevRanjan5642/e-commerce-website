import React from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {
    return ( 
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis nostrum quam id labore cumque vero qui unde, modi corrupti rerum nemo iure necessitatibus autem consequuntur ipsam praesentium omnis odit quia.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates impedit qui hic omnis fugiat, cupiditate error illum dignissimos aperiam excepturi sed repellendus soluta totam nam eos, minus est ratione. Illum!</p>
            </div>
        </div> 
    );
}
 
export default DescriptionBox;