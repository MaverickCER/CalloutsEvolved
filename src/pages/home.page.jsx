import React from "react";
import Present from "../components/interface/present.compontent";
import TermsOfService from "../components/interface/termsofservice.component";
import PrivacyPolicy from "../components/interface/privacypolicy.component";
import Header from "../components/interface/header.component";
import Footer from "../components/interface/footer.component";
import { Link } from "react-router-dom";
import "./styles.css";
import Notify from "../components/interface/notify.component";
import Hero from "../components/home/hero.component";
import AAC from "../components/home/aac.component";
import Average from "../components/home/average.component";
import Gamers from "../components/home/gamers.component";
import Game from "../components/home/game.component";
import Process from "../components/home/process.component";
import Testimonials from "../components/home/testimonials.component";
import CallToAction from "../components/home/calltoaction.component";

const Home = ({ variant }) => {
  const renderSwitch = (param) => {
    return variant === "404" ? (
      <Notify variant="danger" heading="404">
        Uh Oh! That link doesn't go anywhere :( Feel free to check out our
        service below.
      </Notify>
    ) : variant === "unavailable" ? (
      <Notify variant="danger" heading="404">
        That session is no longer availble. Please see our features below and
        consider creating an account.
      </Notify>
    ) : variant === "tos" ? (
      <Present label="" title="Terms of Service">
        <TermsOfService />
      </Present>
    ) : variant === "unsubscribed" ? (
      <Present label="" title="NOTICE:">
        <>
          <p>Our sincere apologies, but there was a complication with your subsciption.</p>
          <p>We encourage you to verify the cancelation of your subscription through paypal: </p>
          <a href="https://www.paypal.com/li/smarthelp/article/how-do-i-cancel-a-recurring-payment,-subscription,-or-automatic-billing-agreement-i-have-with-a-merchant-faq1067">Cancel subscription with a merchant</a>
          <p>If you subscribed as a guest, you will need to call Paypal toll-free customer support between 8.00 and 4.30 GMT Monday to Friday: </p>
          <a href="tel:00353 1 436 9111">00353 1 436 9111</a>
          <p>Per Paypal, If you are hearing or speech impaired, you need to reach out through an IP relay service.</p>
          <br />
          <p>You will only recieve this message once as your Subscription ID has been removed from our records. You may resubscribe after verifying the old subscription was canceled.</p>
        </>
      </Present>
    ) : variant === "privacy" ? (
      <Present label="" title="Terms of Service">
        <PrivacyPolicy />
      </Present>
    ) : null;
  };

  return (
    <>
      {renderSwitch(variant)}
      <Header>
        <li>
          <Link to="/getstarted" className="btn btn-accent">
            Sign&nbsp;In
          </Link>
        </li>
      </Header>
      <main>
        <Hero />
        <AAC />
        <Average />
        <Gamers />
        <Game />
        <Process />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Home;
