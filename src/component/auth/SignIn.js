import React, { Component } from "react";
import {Redirect} from "react-router-dom";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import firebase from "../auth/Firebase";

import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAIovGMSbEc29QLHIP8Cmr2rAUrAwYBePU",
    authDomain: "spl2-4b5b7.firebaseapp.com",
    databaseURL: "https://spl2-4b5b7.firebaseio.com",
    projectId: "spl2-4b5b7",
    storageBucket: "spl2-4b5b7.appspot.com",
    messagingSenderId: "788693166408",
    appId: "1:788693166408:web:dc9d6e564c7b66ac652b7d",
    measurementId: "G-5VVH8QPP08"
};
firebase.initializeApp(firebaseConfig)

class SignIn extends Component {
    constructor(props) {
        super(props);
        var provider = new firebase.auth.GoogleAuthProvider();
    }
    state = { isSignedIn: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
            // firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: result => {
                firebase
                    .auth()
                    .signInWithPopup(firebase.auth.GoogleAuthProvider.PROVIDER_ID)
                    .then(function (result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = result.credential.accessToken;
                        console.log("Token: " + token);
                        // The signed-in user info.
                        var user = result.user;
                        console.log("User: " + user);
                        // ...
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
            }
        }
    };
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user });
            console.log("user Details", user);
        });
    };
    render() {
        return (
            <div>
                {this.state.isSignedIn ? (
                    <div className="firebaseLogin">
                        <div className="welcome">
                            <h2>Welcome to ClassTant</h2>
                        </div>
                        <div className="userCorner">
                            {firebase.auth().currentUser.displayName}
                            <img
                                src={firebase.auth().currentUser.photoURL}
                                className="avatar"
                            />
                            <button
                                className="btn btn-primary left"
                                onClick={() => firebase.auth().signOut()}>
                                Sign Out!
                            </button>
                        </div>
                        <div>
                            <Redirect
                                to={{
                                    pathname: "/homepage",
                                    state: {
                                        name: firebase.auth().currentUser.displayName,
                                        dp: firebase.auth().currentUser.photoURL,
                                        uid: firebase.auth().currentUser.uid
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                        <div>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                            <Redirect to={{ pathname: "/" }} />
                        </div>
                    )}
            </div>
        );
    }
}
export default SignIn;