<img width="2326" height="942" alt="image" src="https://github.com/user-attachments/assets/7bc28d25-22c3-4817-8ea7-c9f331d16a18" />

# Liam’s Match Day

## A Gamified Independent Living Platform

> *Technology should adapt to people. Not the other way around.*

<div align="center">

![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-8B5CF6?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white)
![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-Backend-34A853?style=flat-square&logo=google&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google_Sheets-Database-107c41?style=flat-square&logo=googlesheets&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-C2185B?style=flat-square)
![Views](https://github-tracker-blush.vercel.app/api/badge/liams-match-day)
![Clones](https://github-tracker-blush.vercel.app/api/badge/liams-match-day?metric=clones)


</div>

> [!IMPORTANT]
> **Repository Notice**
>
> This is a public architecture showcase. The live production application contains private routines, sensitive health records, family-specific data, and safeguarding configurations. Those structural details are intentionally excluded from this open repository.
> 
> This documentation exists solely to demonstrate technical architecture, human-centred interface design, and secure automation frameworks.

**Built By**

Nicola Berry - Empower Digital Solutions

React · TypeScript · Vite · Tailwind · Zustand · Google Apps Script · Google Sheets

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Project Overview

Liam’s Match Day is a bespoke Progressive Web App (PWA) engineered to support a young adult with autism, epilepsy, learning disabilities, and right-sided hemiplegia as he builds crucial daily independence. 

The platform seamlessly combines interactive task management, health logging, clinical appointment visibility, automated rewards, live football fixtures, and real-time carer visibility into one highly personalized digital ecosystem. 

It explicitly rejects the cold layout of a standard clinical care plan. Instead, **it feels exactly like his own football app.**

### Repository Purpose
This codebase stands as a professional architecture masterclass showcasing:
*   **User-Centred Product Design:** Mapping a technical tool directly to a user's emotional passion points.
*   **Accessibility-First Interface Planning:** Developing an adaptive design engine built specifically for complex neurodivergent and physical parameters.
*   **React PWA Architecture:** Enabling a completely installable mobile environment featuring robust local state synchronization.
*   **Google Apps Script Backend Design:** Providing serverless operational endpoints with zero infrastructure overhead.
*   **Google Sheets as a Lightweight Cloud Database:** Delivering a transparent data ledger that family members can natively read and manage.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## The Problem

Many independence tools are built around reminders, compliance and checklists.

That can work on paper, but it does not always work for the person expected to use them.

Young people with epilepsy, learning difficulties or additional support needs may struggle with:

- Remembering medication
- Completing hygiene routines
- Keeping track of appointments
- Building daily habits
- Logging seizures consistently
- Staying motivated
- Feeling independent without feeling monitored

The challenge was not just technical. The real question was:

> How do you build something someone actually wants to open every day?

For Liam, the answer was football.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## The Solution

Liam's Match Day turns daily routines into a football-themed experience.

- Tasks become match training.
- Medication becomes training suppliments.
- Points become performance stats.
- Rewards become contract bonuses or trophies.
- Progress becomes goal scoring.
- Chores become Extra Time.
- Health logging (seizures) becomes red cards.
- Completed tasks = points, which beomes the transfer budget.

The result is a personalised independence app that supports routine, motivation and visibility without feeling clinical or childish.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Core Concept

```
Daily Routine
     ↓
Football-Themed Task Cards
     ↓
Points, Progress and Rewards
     ↓
Google Sheets Sync
     ↓
Carer Visibility and Long-Term Tracking
```

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## System Architecture

```
┌──────────────────────────────────────┐
│              Mobile PWA              │
│                                      │
│  React · TypeScript · Tailwind       │
│  Zustand · localStorage · PWA Cache  │
└──────────────────┬───────────────────┘
                    │
                    │ Sync Service
                    ▼
┌────────────────────────────────────────┐
│        Google Apps Script API          │
│                                        │
│  Serverless Web App                    │
│  Handles reads, writes and calendar    │
└──────────────────┬─────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼            ▼           ▼
┌────────────┐ ┌──────────┐ ┌──────────────────┐
│  Sheets    │ │ Calendar │ │  External APIs   │
│  Backend   │ │  Events  │ │ Football/Weather │
└────────────┘ └──────────┘ └──────────────────┘
```

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Key Product Layers

### Independence Engine

The core task system helps the user complete daily routines using large, clear, football-themed cards. Tasks are grouped by time of day and designed to be completed with minimal friction.

Key design choices:

- Large touch targets
- Simple tap interactions
- Clear visual feedback
- Undo option for mistakes
- Points awarded instantly
- Progress shown visually

### Health Layer

The health layer provides a simple way to log seizures during the day. The goal is not to replace medical systems, but to make day-to-day tracking easier and more consistent.

It supports:

- Daily seizure count
- Simple increase/decrease controls
- Recent history
- Data stored for future conversations with carers or professionals

### Match Day Layer

Football is the emotional engagement layer of the product. The app uses football language, visuals and rewards to make everyday tasks feel more familiar and motivating.

It includes:

- Match-style progress
- Manager-style encouragement
- League form tracking
- Trophy rewards
- Football fixture integration
- Team-based visual language

### Calendar Layer

The app connects to Google Calendar through Apps Script so upcoming appointments can appear directly inside the interface. This reduces reliance on separate apps and helps important events stay visible.

Examples include:

- GP appointments
- Football sessions
- Social activities
- School, college or support meetings
- Travel reminders

### Cloud Sync Layer

Google Sheets acts as the lightweight backend. This was an intentional architecture decision.

It gives carers a familiar, real-time view of progress without needing a custom admin panel or paid database.

The backend stores:

- Task completion
- Points history
- Seizure logs
- Calendar events
- Configuration data

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Engineering Decisions

| Decision | Reason |
|---------|-------------|
| Progressive Web App | Installable on mobile without app store complexity |
| React + TypeScript | Component-based, type-safe frontend |
| Vite | Fast development and lightweight build process |
| Zustand | Simple persistent state management |
| Tailwind CSS | Rapid custom interface design |
| Google Apps Script | Serverless backend with low operational cost |
| Google Sheets | Familiar, shareable database for carers |
| localStorage fallback | App remains usable offline |
| Football-first UX | Personal interest drives engagement |
| No complex admin portal | Keeps the system maintainable and affordable |

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Why Google Sheets?

For this project, Google Sheets was not a shortcut. It was the right tool.

A traditional database would have added cost, complexity and maintenance. Google Sheets gave the family:

- Real-time visibility
- Easy editing
- Familiar interface
- No hosting cost
- No separate dashboard login
- Simple export options
- Long-term maintainability

The backend also had to work around a real constraint: the young person's Gmail and Calendar were the natural integration point, so the sheet lives in his account - but it's shared back to the carer's own view. That means the carer never has to ask to borrow his phone to pull up notes for a clinical appointment, which matters both practically (he's a young adult, not a child, and it's his device) and emotionally (asking isn't always possible in the moment). Logging happens in the app, in real time, rather than being reconstructed later from memory during a stressful call. The result is a system that doesn't put the carer in the position of being the sole keeper of critical health information, and doesn't rely on them being calm and organised in the middle of a crisis to find it.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Accessibility Considerations

The interface was designed with additional support needs in mind.

Accessibility decisions included:

- Large buttons
- High contrast sections
- Minimal typing
- Reduced navigation depth
- Clear visual grouping
- Mobile-first layout
- Forgiving interactions
- Undo options
- Familiar language and imagery

The app was designed to reduce cognitive load while still feeling age-appropriate.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Privacy and Safeguarding

This project involves sensitive personal routines and health-related information.

For that reason, the public version does not include:

- Real health records
- Real calendar entries
- Private family routines
- API keys
- Deployment URLs
- Personal identifiers
- Production spreadsheet links

The repository is shared as a technical and product case study only.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Tech Stack

| Area | Technology |
|---------|-------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Google Apps Script |
| Data Store | Google Sheets |
| Calendar | Google Calendar |
| Sports Data | API-Football |
| Weather | OpenWeatherMap |
| PWA | Service Worker, Web App Manifest |

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Example Data Flow

```
User completes task
     ↓
Zustand updates local state
     ↓
localStorage persists immediately
     ↓
Sync service sends update to Apps Script
     ↓
Apps Script writes to Google Sheets
     ↓
Carer can view progress in the Sheet
```

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Example Modules

```
src/
├── components/
│   ├── task-cards/
│   ├── health/
│   ├── football/
│   ├── rewards/
│   └── layout/
│
├── stores/
│   └── useMatchDayStore.ts
│
├── services/
│   ├── syncService.ts
│   ├── footballService.ts
│   ├── weatherService.ts
│   └── calendarService.ts
│
├── data/
│   └── demoTasks.ts
│
└── utils/
    └── pointsEngine.ts
```

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

<img width="2780" height="1536" alt="image" src="https://github.com/user-attachments/assets/7f0c8b4b-3c85-43d7-a981-b19f4f2eb2c5" />

<img width="2780" height="1536" alt="image" src="https://github.com/user-attachments/assets/89d67e50-9646-419b-a866-f24379c718be" />

<img width="2780" height="1536" alt="image" src="https://github.com/user-attachments/assets/3d252863-a800-4835-bd6b-ca7357a149f0" />


## Portfolio Value

This project demonstrates more than frontend development.

It shows the full product thinking behind a bespoke support system:

- Understanding the user's actual needs
- Turning motivation into interface design
- Choosing practical infrastructure
- Building privacy-conscious architecture
- Creating a system carers can maintain
- Designing for independence, not dependency

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Status

Private production build complete.
Public repo maintained as a portfolio architecture showcase.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Licence

All rights reserved.

This project was created as a bespoke family support tool and is shared publicly for portfolio and architecture demonstration only.

<p align="center">   <img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=6&color=E91E63" /> </p>

## Author

**Nicola Berry**

Empower Digital Solutions

[empowerdigitalsolutions.co.uk](https://empowerdigitalsolutions.co.uk)

Building practical, user-centred systems with React, Google Workspace and automation.



