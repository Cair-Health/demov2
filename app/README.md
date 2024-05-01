# Documentation for `page.jsx`

## Overview

The `page.jsx` file is a home React component for the copilot interface. This component is aimed entirely at retrieving Adhit's Code and making it look good .

## Table of Contents

- [Component Structure](#component-structure)
- [Key Features](#key-features)
- [Dependencies](#dependencies)
- [State Management](#state-management)
- [Effects and Async Data Handling](#effects-and-async-data-handling)
- [Styling and Layout](#styling-and-layout)
- [Event Handlers](#event-handlers)

## Component Structure

```jsx
<Home>
  <VerticalNav />
  <Transition> <!-- FAQ Section -->
    <div> <!-- FAQ Content -->
      <Image />
      <h1>FAQ</h1>
      <!-- Various FAQs -->
    </div>
  </Transition>
  <Transition> <!-- Modal Content -->
    <Resizable>
      <div>
        <iframe src={modalContent} />
      </div>
    </Resizable>
  </Transition>
  <div> <!-- Main Content Area -->
    <div> <!-- Cair Banner -->
      <Image src={CairLogo} />
    </div>
    <RecentQueries_policies />
    <div> <!-- Query and Response Section -->
      <PencilSquareIcon />
      <ReactMarkdown />
    </div>
    <Transition> <!-- Notes Section -->
      <NotesSection />
    </Transition>
    <div> <!-- Instructions Modal -->
      <button onClick={closeInstructions}>Close</button>
    </div>
    <Dropdown />
    <div> <!-- Text Input and Submission -->
      <QuestionMarkCircleIcon />
      <ArrowUpIcon />
    </div>
    <div> <!-- Tutorial Section -->
      <div onClick={setSelectedDocType}>
        Policies | Contracts | Rates
      </div>
    </div>
  </div>
</Home>
```

## Key Features

1. **Interactive FAQ Section**: Toggleable FAQ sections with detailed instructions on how to use the application effectively.
2. **Dynamic Response Handling**: Responses from the server are fetched and displayed dynamically. The response text includes markdown rendering and URL processing to fetch additional content.
3. **Chatbot-like Interaction**: Users can submit queries, and the application processes these through API calls, displaying responses and related questions.
4. **Resizable Modal for External Content**: Uses an `<iframe>` inside a resizable modal to display external content.
5. **Progressive Loading Indicators**: Displays loading progress creatively as percentages which update based on the query processing stage.
6. **Error Handling**: Provides feedback on errors encountered during data fetching or processing.

## Dependencies

- `React`: For building the UI component.
- `Next.js`: For image optimization and page-based routing.
- `AWS Amplify`: For backend integration and possibly authentication and storage (S3).
- `react-spinners`: For displaying loading states.
- `react-markdown` and `remark-gfm`: For rendering markdown content.
- `@heroicons/react`: For using SVG icons throughout the UI.
- `@headlessui/react`: For accessible UI transitions and modals.

## State Management

The component uses React's `useState` to manage various states including:
- User input
- Session details
- Query results and history
- UI states for modals, loading indicators, and FAQs

## Effects and Async Data Handling

`useEffect` hooks are used extensively to:
- Configure AWS Amplify
- Fetch initial data when the component mounts
- Handle URL parameters
- Scroll interactions
- Periodically check the status of a background process on the server

## Styling and Layout

The component utilizes Tailwind CSS for styling. Layouts are managed using Flexbox and CSS Grid, providing a responsive design that adapts to different screen sizes.

## Event Handlers

Event handlers in the component manage:
- User (This is important, for now we are handling user state through URLQueryParams that are changed through the Nav.)
- FAQ toggling
- Modal opening and closing
- Form submissions
- Input changes
- Navigation between different document types (Policies, Contracts, Rates)

This detailed documentation should provide a clear understanding of the functionality and structure of the `page.jsx` file used in the application.