# BoilerScheduler - Assignment Management Application

## Overview

BoilerScheduler is a modern web application for managing class assignments and schedules. It provides students with a centralized dashboard to track assignments, view due dates, and organize their academic workload. The application features a clean, intuitive interface with calendar views and assignment prioritization based on urgency.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses a React-based single-page application (SPA) with TypeScript for type safety. The application employs a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing between dashboard and calendar views
- **State Management**: TanStack React Query for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui for consistent, accessible design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
The server implements a RESTful API using Express.js with TypeScript:

- **API Layer**: Express routes handle CRUD operations for classes and assignments
- **Data Layer**: Abstracted storage interface allows for flexible data persistence
- **Validation**: Zod schemas shared between client and server ensure data consistency
- **Development Setup**: Vite integration for hot module replacement and development tooling

### Data Storage Solutions
The application uses a flexible storage architecture:

- **Database**: PostgreSQL configured through Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Development**: In-memory storage implementation for testing and development

### Authentication and Authorization
Currently implements basic session management:

- **Sessions**: PostgreSQL-backed session storage using connect-pg-simple
- **Security**: Express middleware for request logging and error handling

### Data Models
The application manages two primary entities:

- **Classes**: Academic courses with names, codes, professors, and color coding
- **Assignments**: Tasks linked to classes with titles, descriptions, due dates, and completion status

### UI/UX Design Patterns
The interface follows modern design principles:

- **Theme System**: CSS custom properties for light/dark mode support
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Component Library**: Comprehensive set of reusable UI components
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database toolkit and query builder
- **connect-pg-simple**: PostgreSQL session store for Express

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting utilities

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production builds

### State Management
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library

### Runtime Environment
- **Node.js**: Server runtime with ES modules
- **Express.js**: Web application framework
- **tsx**: TypeScript execution environment for development