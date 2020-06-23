import React from 'react';
import '../css/index.css';
import $ from "jquery";
import Side from "./sidecontainer";
import '../css/bootstrap.min.css';
import {Link} from 'react-router-dom'

function Headere(){

	const onclick=()=>{
		var main=$(".mainSectionContainer");
		var nav= $(".sideNavContainer");

		if(main.hasClass("leftPadding")){
			nav.hide()
		}
		else{
			nav.show();
		}

		main.toggleClass("leftPadding");
	}
	return ( <div>
		<nav>
		<div className="mastHeadContainer">
			<button className="navShowHide"  onClick={onclick}>
				<img src="images/icon/menu.png" alt="menu"/>
			</button>
			<Link to="/" className="logoContainer">
				<img src="images/icon/youtube.png" alt="youtube" />
			</Link>
			<div className="searchBarContainer">
			<form action="search.js" method="GET">
					<input type="text" name="terma" className="searchBar" placeholder="Search..."/> 
					<button className="searchButton">
						<img src="images/icon/serch.png" alt="search"/>
					</button>
				</form>
			</div>
			<div className="rightIcons">
			<Link to="/upload">
				
					<img src="images/icon/upload.png" alt="upload"  />
		    </Link>
				<a href="profile.js">
					<img src="images/icon/profile.png" alt="profile"/>
				</a>
			</div>
		</div>
		<div className="sideNavContainer" style={{display:"none"}}>
			<Side/>
		</div>
		</nav>
		</div>);
		
}
export default Headere;