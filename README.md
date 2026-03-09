# Anira - Anime Streaming Platform

A modern anime streaming web application built with TanStack Start, featuring dynamic video playback, episode listings, and detailed anime information.

## Features

- **Browse Anime**: Search and explore a comprehensive anime catalog
- **Stream Episodes**: Watch anime episodes with HLS streaming and quality selection
- **Episode Management**: Navigate through episodes with episode listings and recommendations
- **Responsive Design**: Beautiful UI with Tailwind CSS and daisyUI themes

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **Routing**: [TanStack Router](https://tanstack.com/router) - File-based routing with SSR
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) - Server state management
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) - Component library
- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime

## Getting Started

Install dependencies and run the development server:

```bash
bun install
bun --bun run dev
```

The app will be available at `http://localhost:5173`

## Building For Production

Build the application for production:

```bash
bun --bun run build
```

## Testing

Run tests with [Vitest](https://vitest.dev/):

```bash
bun --bun run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/) for component styling. A custom "anira" theme is defined in `src/theme.css`.



## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    getServerTime().then(setTime)
  }, [])
  
  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

## Project Structure

```
src/
├── routes/                 # File-based routes (TanStack Router)
│   ├── __root.tsx         # Root layout
│   ├── index.tsx          # Home page
│   └── tv/                # TV/anime routes
│       ├── $id/           # Anime detail pages
│       └── [id]/watch/    # Episode watch pages
├── components/            # Reusable React components
├── api/                   # API integrations
├── styles.css            # Global styles with Tailwind
├── theme.css             # Custom daisyUI theme
└── constants/            # Constants and types
```

## Environment Setup

Create a `.env` file in the root directory for any required API endpoints:

```bash
# Example environment variables
VITE_API_BASE_URL=https://your-anime-api.com
```

## Development Tips

- Hot Module Replacement (HMR) is enabled for fast development
- Server-side rendering (SSR) is configured for optimal performance
- Components use TanStack Router's `useParams()` and `useLoaderData()` hooks
- Video streaming uses video.js with HLS quality selection

## Learn More

- [TanStack Documentation](https://tanstack.com)
- [TanStack Start Guide](https://tanstack.com/start)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI Components](https://daisyui.com/)
