# **App Name**: IPL Auction Command Center

## Core Features:

- Live Auction Dashboard: Display a real-time table with key metrics for each house: name, money spent/left, budget used, eligibility status, total points, and rank. Data is sourced from Firestore.
- Individual House Detail Pages: Dedicated pages for each house showing a detailed budget summary (initial, spent, remaining), squad composition tracker (batsmen, bowlers, etc.), and squad validity status. Data is sourced from Firestore.
- Rulebook & Event Info: Host a static section containing the official IPL Auction Showdown Rulebook, bidding rules, squad composition rules, points system explanation, penalties, and dispute resolution clauses. Data is sourced from static files within the Next.js application.
- Live Rank Adjustment Tool: An AI-powered tool that reviews eligibility, point totals, and moderator input to suggest potential ranking adjustments, displayed to the admin.
- Data Synchronization with Firestore: Enable real-time data synchronization with Firebase Firestore, ensuring data updates instantly when values change in the backend.
- Admin Interface: A protected interface where administrators can update house details, eligibility, and ranking which is sourced from Firestore.

## Style Guidelines:

- Primary color: Deep royal blue (#4169E1) for a professional and trustworthy look, echoing the seriousness of the competition.
- Background color: Light blue-gray (#D3D3D3) for a clean and unobtrusive backdrop.
- Accent color: Bright orange (#FF4500) for CTAs, highlights, and critical updates, adding energy and catching the eye.
- Body and headline font: 'Inter' sans-serif for a modern, machined, objective look that suits both headlines and body text
- Use sports-themed icons to represent different metrics and statuses.
- Prioritize a clear visual hierarchy, emphasizing Rank, Eligibility, and Points, and using progress bars to display budget usage.
- Implement smooth transitions and badge updates with minimal animations.