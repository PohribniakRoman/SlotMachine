# Casino Slot Machine

## Quick Start

```bash
yarn install
yarn dev
# Visit http://localhost:3000/slots
```

## Features Implemented

**Core Gameplay**

- 3-reel slot machine with 4 symbols (Cherry, Lemon, Orange, Watermelon)
- Progressive reward system (10-40 credits based on symbol)
- Sequential reel animations with 1-2-3 second delays
- Win/loss detection with visual feedback

**Game Mechanics**

- Dynamic house edge that increases as player wins more
- Server-side probability manipulation (0% → 30% → 60% cheat rate)
- Bank and balance system with cash out functionality
- Session persistence across browser refreshes
- Game history tracking with last 5 results

**Technical Features**

- Real-time API communication with error handling
- Form validation using Zod schemas
- Responsive design for mobile and desktop
- Loading states and disabled button management
- Type-safe client-server communication

## Key Challenges Resolved

**Sequential Animation Timing**
Creating realistic slot machine behavior where reels stop one by one instead of simultaneously. Solved using staggered setTimeout calls with index-based delays.

**State Management Complexity**
Coordinating between spinning animations, API calls, and game state updates. Used React Query for server state and Zustand for client state with careful effect management.

**House Edge Implementation**
Implementing server-side cheating logic that feels natural to players. Created a probability system that re-rolls winning combinations based on player's current credit balance.

**Dynamic UI Controls**
Managing button states across different game phases (spinning, sufficient balance, broke, etc.). Implemented conditional rendering with proper disabled states and visual feedback.

**Type Safety Across Stack**
Ensuring consistent data types between client and server. Used shared TypeScript interfaces and Zod validation schemas for runtime type checking.

## Best Practices Demonstrated

**Component Architecture**

- Single responsibility components (RollingCell, RollingControls, RollingHistory)
- Proper component composition and data flow
- Memo optimization for performance in animation-heavy components

**State Management**

- Separation of server state (React Query) and client state (Zustand)
- Persistent state with localStorage integration
- Proper cleanup in useEffect hooks to prevent memory leaks

**API Design**

- RESTful endpoint structure with proper HTTP methods
- Input validation with meaningful error messages
- Consistent response format with success/error states
- Error handling with appropriate status codes

**Styling Organization**

- SCSS with variables and mixins for maintainable styles
- Component-scoped styling to prevent conflicts
- Responsive design patterns
- Smooth animations using CSS transitions

**Type Safety**

- Comprehensive TypeScript interfaces for all data structures
- Runtime validation using Zod schemas
- Proper error boundary patterns
- Type-safe API communication

**Code Quality**

- Clear function and variable naming
- Proper separation of concerns
- Consistent code formatting
- Minimal but effective comments

## Tech Stack

- Frontend: Next.js, TypeScript, React Query, Zustand
- Backend: Next.js API routes with Zod validation
- Styling: SCSS with custom variables and mixins
- Animation: CSS transitions and keyframes

## Development Time

Built in 3.5 hours with focus on core functionality, smooth user experience, and clean code architecture. Prioritized working features over extensive testing or advanced optimizations
