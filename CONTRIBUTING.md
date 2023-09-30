# Contributing Guidelines

Thank you for considering contributing to our project! We appreciate your interest and support. By contributing, you can help improve this project and make it even better. This document outlines the guidelines for contributing to Access Game Chat, so please take a moment to read it before you get started. All code contributors will get a custom badge on their name when their PR is merged. All writers will have unique metrics tracked and a writer specifc profile complete with pen name.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Enhancements](#suggesting-enhancements)
   - [Code Contributions](#code-contributions)
   - [Writing Articles](#writing-articles )
3. [Getting Started](#getting-started)
4. [Development Setup](#development-setup)
5. [Submitting Pull Requests](#submitting-pull-requests)
6. [Review Process](#review-process)
7. [Coding Guidelines](#coding-guidelines)
8. [License](#license)

## Code of Conduct

Please note that this project adheres to the [Contributor Covenant Code of Conduct](CONDUCT.md). By participating in this project, you are expected to uphold this code. Please report any unacceptable behavior to moderators.

## How to Contribute

Welcome aboard, fellow gamer! We're all about making this community-driven project a blast to be a part of. Whether you're here to report bugs, suggest enhancements, drop some code, or craft engaging articles, we're thrilled to have you! Just stick to the guidelines below, and let's make gaming more accessible together:

### Reporting Bugs

Found a bug? No worries, we've got your back:

1. **Check the Issue Tracker**: Before you file a new bug report, give our issue tracker a quick look to see if it's already been reported.

2. **Create a Bug Report**: If it's a fresh bug, go ahead and create a new issue. Make sure to spill all the beans: describe how you stumbled upon the bug, what you expected to happen, and what actually went down.

3. **Catchy Title**: Whip up a catchy title so everyone knows what's up.

### Suggesting Enhancements

Got a grand idea to level up the gaming experience? Here's the plan:

1. **Search for Existing Ideas**: Check if someone's already had the same eureka moment on our issue tracker.

2. **Pitch Your Enhancement**: If it's a new idea, pitch it as an enhancement request. Paint us a picture of what it is, why it's awesome, and maybe even how to make it happen.

### Code Contributions

Ready to dive into the code? Awesome! Here's your mission:

1. **Fork and Clone**: Fork our repo to your GitHub lair and clone it to your local playground.

2. **Branch Out**: Create a fresh branch with a name that screams what you're up to.

3. **Design**: Clone the DESIGN.md file and rename it to match the issue you're working on like DESIGN-#.md. Fill out the DESIGN as much as possible for every file you touched and include requirement regression. DESIGN files should be included with every pull request associated with this issue.

4. **Code Magic**: Make your code changes following our guidelines.

5. **Test the Waters**: Ensure your changes don't unleash chaos and that our existing tests stay green.

6. **Commit & Push**: Add clear and concise commit messages and push your branch to your GitHub fork.

7. **Catch the Original**: Bring the main repo up to speed by pulling it into your branch and resolve any conflicts like a champ.

8. **Pull Request Party**: Open a pull request to merge your branch back into the main project. Describe what you've done, give a shout-out to the related issue, and add an image to show off your work.

9. **Test**: Another project maintainer will clone the TEST.md file and rename it to match the issue being working on. Fill out the TEST as much as possible for every file touched. Checkout the issue branch, test thoroughly, and then add the TEST.md file to every pull request related to this issue. Be sure to check back to reveiw their notes for any issues that may have come up.

This entire process is laborous and intensive, but following it will lead to the best quality code and ensure that every issue is thoroughly thought out before being executed. In exchange for your efforts, you'll get a developer's badge on Access Game Chat, a mention in [CONTRIBUTORS](CONTRIBUTORS.md), and hopefully more goodies along the way.

### Writing Articles

Firstly, we want to express our gratitude that you want to write unique content for our blog. In exchange, you will get a writer specific page that will allow you to draft up a markdown document and showcase your achievements, liked posts, captivated audience members, and all the work you've contributed. Thank you.

1. **Scope and Focus**: Dive into accessibility in gaming, especially communication accessibility. Let your passion for games shine through.

2. **Tone It Up**: Keep it positive and inspirational. We're here to celebrate games and inspire change, not throw shade.

3. **Audience Mix**: Gamers are our main readers, but devs might peek in. Appreciate games, nudge devs gently.

4. **Keep It Snappy**: Short attention spans call for strategic breaks, images, and bullets. Let's keep articles around 1000 characters, but reader-friendly.

5. **No Copycat Games**: Plagiarism? Nah. If you use someone else's content, be sure to document the approval. Remember that this must specifically allow Access Game Chat to reuse the content, image, video, or work.

6. **Stay Legal and Fair**: Constructive criticism rocks, but avoid the dark side. Be ethical, objective, and fair. Conflicts will need to be sorted out between the reporter, author, and peer reviewers.

7. **Search Engine Stardom**: Boost your metrics! Add SEO juice with image alts, descriptions, captions, and killer previews. Research and sprinkle keywords throughout the article to garner more attention.

8. **Peer Power**: Peer review time! Be a copy editor, check spelling, consistency, facts, documentation, and more. Help articles shine. All peer reviewed content should be E10+.

9. **Finish with a Bang**: End articles with a call to action. Let's supercharge communication accessibility in games!

10. **Start your First Article Now**: Head to [https://www.accessgamechat.com/write](https://www.accessgamechat.com/write) to start writing your first article today.

## Getting Started

Ready to roll? Follow these steps:

1. **Fork and Clone**: Hit the "Fork" button up top to get your repo copy.

2. **Clone Your Copy**: Use `git clone` to snag your forked repo to your local rig:

   ~~~
   git clone https://github.com/MaverickCER/access-game-chat.git
   ~~~

3. **Connect to the Mothership**: Add the main project repo as a remote so you stay in the loop:

   ~~~
   git remote add upstream https://github.com/MaverickCER/access-game-chat.git
   ~~~

4. **Branch Out**: Create a new branch for your game-changing moves:

   ~~~
   git checkout -b feature-name
   ~~~

   Get ready to dive into action.

Now you're all set to shape the future of gaming!

## Development Setup

Grab your .env.template and set up your local environment variables for the project.

## Submitting Pull Requests

Ready to drop your PR bomb? Here's the plan:

1. **Rebase Your Branch**: Before sending your PR, bring your branch up to speed with the latest from the main project repo:

   ~~~
   git fetch upstream
   git rebase upstream/main
   ~~~

2. **Conflict Resolution**: If any conflicts rear their heads, tame them and commit your fixes.

3. **Test Your Mojo**: Check that your changes still rock and all tests pass.

4. **Doc Duty**: If your changes touch docs, give them some love.

5. **PR Launch**: Fire off a pull request to the original project repo. Show off with images if your changes bring the bling. Also, if it's your first contribution, add your name to [CONTRIBUTORS](CONTRIBUTORS.md) along with your username so that you can recieve your developer badge.

6. **Feedback Loop**: Be ready for feedback and tweaks. Harmony is key.

## Review Process

Every contribution goes through a quality check. Expect feedback and be quick to respond.

## Coding Guidelines

1. **Space Oddity**: Use two spaces for indentation; no tabs allowed.

2. **Name That Thing**: Give variables, functions, and classes meaningful names. Stay consistent.

3. **Comment Chat**: Clarify complex code with comments. Keep them in sync with code changes.

4. **Stay Organized**: Modular code rocks. Keep functions and classes focused.

5. **Error Handling**: Own your errors; don't crash the party. Log, correct, and be user-friendly.

6. **Kill Code Clones**: Reuse code; don't copy-paste. Keep it lean and mean.

7. **Bug-Fix Ballet**: Test thoroughly, comment out bug-causing code, and explain why it's gone.

8. **Testing Spirit**: Write unit tests and automate where possible. Check before merging.

9. **Conventions Rule**: Follow folder and file conventions. Harmony in diversity.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE.md). If you're not comfortable with this license, please do not contribute to the project.

Thank you for contributing to our project! Your help is greatly appreciated.
