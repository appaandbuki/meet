import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
                <h1 id="welcome-headline">Welcome to the Meet app</h1>
                <h2 id="welcome-text">Please login below to view deverloper events near you!</h2>
                <div className="button_cont" align="center">
                    <div class="google-btn">
                        <div class="google-icon-wrapper">
                            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in"/>
                        </div>

                        <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" class="btn-text" aria-label="google sign in">
                            <b>Sign in with google</b>
                        </button>
                    </div>
                </div>
               
            </div>
        )
        : null
}
export default WelcomeScreen;