import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/interface/header.component";
import { GetStartedUI } from "../components/auth/auth.collection";
import Footer from "../components/interface/footer.component";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../utils/firebase.util";
import "./styles.css";

const GetStarted = ({ variant }) => {
  let params = useParams();
  const history = useHistory();

  React.useEffect(() => {
    if (params.id) {
      firestore
        .doc(`sessions/${params.id}`)
        .get()
        .then((doc) => {
          if (
            !doc.exists ||
            doc.data().sesData.arr.length >= doc.data().sesData.spc
          ) {
            history.push("/unavailable");
          }
        });
    }
    if (auth.currentUser) {
      if (auth.currentUser.email === null) {
        auth.currentUser.delete();
      }
    }
  });

  return (
    <>
      <Header>
        <li>
          <Link to="/">Home</Link>
        </li>
      </Header>
      <main>
        <GetStartedUI variant={variant} />
      </main>
      <Footer />
    </>
  );
};

export default GetStarted;
