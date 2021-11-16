# MYR - My Reality
MYR is an online editor for editing and viewing virtual worlds and effects. The system provides a beginner friendly interface with robust capabilities and is meant for exploration into the fun of programming.

MYR can be found online at [LearnMYR.org](https://learnmyr.org). For more information about the project or the team behind it, please visit [LearnMYR.org/about](https://learnmyr.org/about).

## ECG
The Engaging Computing Group develops new technologies to enable learners—youth, teachers, undergraduates, and others— in order for them to be creative in science, engineering, and computing, and studies how these technologies improve learning. For more information about the Engaging Computing Group, please visit the [ECG website](https://sites.uml.edu/engaging-computing).

## Status
[![CircleCI](https://circleci.com/gh/engaging-computing/MYR.svg?style=shield)](https://circleci.com/gh/engaging-computing/MYR)

## Change Log - 2.4.0 -> 3.0.0
- Removed undocumented aliases for `box` and `prisim`
    - All scenes using these aliases have been automatically changed to reflect the new API
- Changed the behavior of `getRandomColor` to only return a random color
- Added `setRandomColor` to behave like `getRandomColor` did previously
    - A migration has updated scenes to be properly using these functions
        - If your scene broke as a result of this update, please let us know [support@learnmyr.org](mailto:support@learnmyr.org)
- Misc. Package dependency updates
- Moved Model and Asset reference to their own page
- Removed broken links to non-existent example pages



## Acknowledgments
MYR uses [Aframe](https://aframe.io), a fantastic open source project, to render objects and effects in the three dimensional space.  
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  
This material is based upon work supported by the National Science Foundation under Grant No. 1433592.  
