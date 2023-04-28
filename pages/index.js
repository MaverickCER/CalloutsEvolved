import React, { useEffect } from 'react';

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Callouts Evolved | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container" style={{ textAlign: 'center' }}>
        <p>Callouts Evolved is undergoing a massive update! Please stay tuned.</p>
        <p>Feel free to explore this skeleton site to see all the new features.</p>

        <h2>Our Dream</h2>
        <p>
          Callouts Evolved will strive to allow gamers to communicate effectively using their
          preferred methods
        </p>

        <h2>What does this mean?</h2>
        <h3>At Launch:</h3>
        <p>Deaf gamers will be able to receive visual callouts in place of verbal callouts</p>
        <p>
          Deaf gamers will be able to send verbal callouts via speech synthesis with custom voices
        </p>
        <p>
          Any gamer that doesn&apos;t want to use a mic, for any reason, can also use speech synthesis
        </p>
        <p>
          All gamers will be able to make callouts in other languages without any setup on their
          part
        </p>
        <h3>Future Goals</h3>
        <p>Allow gamers to speak in a first party voice chat</p>
        <p>Allow gamers to alter their voice with speech filters</p>
        <p>
          Allow gamers to receive all spoken words and synthesized words in their preferred language
        </p>
        <p>
          Incorperate deepfake technology to make it appear like the speaker is speaking in the
          preferred language.
        </p>
        <p>
          Deepfaking the speech will makeit easier to read lips for gamers that prefer to receive
          coms in other languages
        </p>
        <p>Allow gamers to share their screens and cameras while in a voice chat</p>
        <p>Allow gamers to use sign language like speech to text</p>
        <p>Allow gamers to convert sign language into speech synthesis</p>
        <p>
          Incorperate deepfake technology to make it appear like the user is signing in the prefered
          sign.
        </p>

        <h2>What&apos;s the timeframe?</h2>
        <p>
          05/31/2023 is our expected release date for the shared Augmentative and Alternative
          Communication interface. 01/01/2025 is the expected Open Source date that will allow
          everyone to submit PRs against the main github repository.
        </p>

        <h2>What&apos;s the price?</h2>
        <p>A free plan is guaranteed and won&apos;t require signing up</p>
        <p>For the first month after launch, all features will be free</p>
        <p>After that, we plan to charge $4.99 per month to unlock all features</p>
        <p>This is due to unthrottled real time communication features</p>
        <p>
          A new feature will allow continuous speech to text for every user in the session but may
          be cost prohibitive at launch.
        </p>
      </div>
    </>
  );
}
