# Test Plan

| Tester            | AGC User Name     |  Issue             | Pull Requests     |
|-------------------|-------------------|-------------------|-------------------|
| [username](https://github.com/username) | [@Username](https://accessgamechat.com/users/username) | [Issue #](https://github.com/MaverickCER/agc-web/issues/#) | [PR #](https://github.com/MaverickCER/agc-web/pull/#) |


## Table of Contents

1. [Notice](#notice)
2. [Issue Description](#issue-discription)
3. [Impact of Changes](#impact-of-changes)
4. [Areas of Concern](#areas-of-concern)
5. [Logical Summaries](#logical-summaries)
6. [Testing Steps](#testing-steps)
7. [Assessment](#assessment)

## Notice
The tester and developer should be two different people. After filling out the [Issue Description](#issue-discription), [Impact of Changes](#impact-of-changes), and [Areas of Concern](#areas-of-concern) but before you conduct any tests be sure to review the corresponding pull request and request changes from the developer to improve code quality, add comments, and enforce the rules outlined within the CONTRIBUTING.md document. After the changes are requested and you are satisfied that the pull request meets all of our requirements you may continue.

## Issue Description
Copy and paste the issue description from the corresponding DESIGN file.
Read and understand the issue as well as the technical explaination provided by the developer.
Indicate that you have read the explaination, reviewed the corresponding code, and agree that the proposed change is the best way to resolve the issue.

## Impact of Changes
Copy and paste the impact of changes from the correspodning DESIGN file.
Indicate that you have read and understand the imact of changes to be made by merging this pull request and have verified requirement traceability was performed properly. Requirement traceability is an important practice that involves verifying the impact of changes by checking every import statement and function related to changed files.

## Areas of Concern
Indicate any potential issues that could arrise based on your review of the issue description, impact of changes, and the related code. Obviously the worst case scenario is that merging the code will cause the entire service to crash, but beyond that what are the potential impacts to resource utilization, the user experience, and monetary requirements.

## Logical Summaries
Many issues will have general rules that can be applied to the changes made that will be true in most cases. One such example is when making a sentiment analyzer that indicates if a string is negative, neutral, or positive then you could write logical summaries as follows.
Overly negative statements like "This is the worst" should return a negative sentament.
Overly positive statements like "You're the best" should return a positive sentament.
Short statements like "Ok" or "Sure" should have a neutral sentament.
These three summaries help frame the overall goal and guide the core of your testing steps.

## Testing Steps
Review the testing considerations from the DESIGN file and double check that the developer was approaching the logic in a similar mannar as the [Logical Summaries](#logical-summaries). Afterwards, pull their branch, merge development into the issue branch, resolve any conflicts, and then try to reproduce the issue while detailing the steps you take. Use screenshots to provide proof of work and try to cover all possible scenarios. Along the way, keep an eye on the [Areas of Concern](#areas-of-concern) and look for any new bugs that could arrise from the [Impact of Changes](#impact-of-changes). If this is a new feature, there should be enough details in the testing considerations section of the DESIGN file to help walk you through the testing process. Once you are done testing the changes specific to this test, please perform regression testing on the screen or page to ensure that all buttons and functionality continue to work as expected.

## Assessment
Indicate whether this task is ready to be merged, ask any questions you may have for the developer, and bring up any issues you may have with the final result. Once you are done, save this TEST-#.md file to every branch associated with this issue and add a comment for the developer to review. When you're satisfied with the work add your approval to the pull request.

Be sure to include this TEST-#.md file in every branch associated with this issue and update it as you go along. Thank you so much for your time and effort to help make our dreams a reality.