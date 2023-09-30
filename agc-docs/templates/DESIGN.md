# Design Plan

| Developer         | AGC User Name     |  Issue             | Pull Requests     |
|-------------------|-------------------|-------------------|-------------------|
| [username](https://github.com/username) | [@Username](https://accessgamechat.com/users/username) | [Issue #](https://github.com/MaverickCER/agc-web/issues/#) | [PR #](https://github.com/MaverickCER/agc-web/pull/#) |


## Table of Contents

1. [Issue Description](#issue-discription)
2. [Background](#background)
3. [Business Scope](#business-scope)
4. [Current Implementation](#current-implementation)
5. [Potential Approaches](#potential-approaches)
6. [Development Specifications](#development-specifications)
7. [Key Changes](#key-changes)
8. [Visual Aids](#visual-aids)
9. [Impact of Changes](#impact-of-changes)
10. [Related Issues](#related-issues)

## Issue Description
Copy and paste all of the relavent information provided in the corresponding issue.  
If the issue is reported by a non-technical user, explain the technical aspects of what is going on and the technical issue that needs to be resolved.

## Background
Explain what is already implemented in the system related to this issue. Be sure to explain any jargon related specific to AGC and our components. Describe the current user experience and the exact steps required to reproduce the issue in the minimal possible steps. 

## Business Scope
Explain the monetary changes that will happen after the connected pull requests are merged. Indicate how resource utilization will be impacted and how the changes of this task impact impact the user experience. 

## Current Implementation
Describe how the system is currently working or what is wrong with the current implementation. This should be descriptive only shouldn't go into detail about any of the changes that are required.

## Parential Approaches
Take a moment to seriously consider all the possible approaches to resolving the issue. Detail them here along with the pros and cons of each approach. Prioritize CSS solutions over JavaScript, keep costs to a minimum, and provide the best possible user experience. 

## Development Specifications

### Subtable of Contents
1. [Changes Made](#changes-made)
2. [New Functions and Components](#new-functions-and-components)
3. [Database Changes](#database-changes)
4. [Critical Deployment Changes](#critical-deployment-changes)
5. [Testing Considerations](#testing-considerations)

### Changes Made
| Framework | Relative URL | Changes Required |
|-----------|--------------|------------------|
| agc-web   | src/utils/call.ts | Fixed typo  |

### New Functions and Components
| Framework | Relative URL | Description |
|-----------|--------------|-------------|
| agc-web   | src/utils/call.ts | See #1 |

1. Created call.js to wrap axios with error handling and requires the user to log back in when recieving status code 401.

### Database Changes
Strongly consider schema changes before implementing them. The user interfaces should use data as it's recieved from the backend with minimal modifications. Data being used in sessions should be well defined but rely on sending the data via sockets or webRTC rather than database changes for the fastest performance.

### Critical Deployment Changes
There may be instances where deployment will need to change to better support new features. One instance could be adding a service worker or a ndoejs server intercepter to provide custom meta data. If deployment must change, it must be detailed in DEPLOYMENT.md.

### Testing Considerations
Not every function will require an automated test, but automated tests will ensure that the functionality is not unintentionally changed. Strongly consider adding automated tests for your new functions. If a test already exists for functions you're modifying you must update the corresponding function to ensure the test passes and fails as expected.

## Key Changes
Copy and paste key changes to the code or key parts of new features to adequately show the software approach of your solution.

## Visual Aids
Use mermaid or other flowchart tools to explain the new user experience, new feature, or changes being made. While it's encouraged to use images and charts throughout the document, this area should contain all the resources used with context.

## Impact of Changes
Mention the impact of changes done in the software and client whereever applicable. Here, software refers to the AGC services, functions, or user interface that will be changed as a result of resolving this issue. This should be thorough and analyze every file that imports or utilizes the services, functions, or user interface components that will be changed. This important practice, called Requirements Traceability, should be taken seriously approached in an organized fashion for every file that is changed.

## Related Issues
While tracing requirements for the [Impact of Changes](#impact-of-changes) mention any connected issues that could provide additional information and context for this issue.



Be sure to include this DESIGN-#.md file in every branch associated with this issue and update it as you go along. Thank you so much for your time and effort to help make our dreams a reality.