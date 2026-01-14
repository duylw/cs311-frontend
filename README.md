# Research Assistant Frontend

**Course:** CS331: Ki thuat lap trinh tri tue nhan tao

A modern React-based web application for chatting with research papers using AI. This application allows users to create collections of research papers, search for papers by topic, and have intelligent conversations about their content.

## Team Members

| Name | Student ID |
|------|-----------|
| Member 1 | 21XXXXXX |
| Member 2 | 21XXXXXX |
| Member 3 | 21XXXXXX |

## Features

- 🤖 **AI-Powered Chat**: Ask questions about your research papers and get intelligent answers
- 📚 **Paper Management**: Search, add, and organize research papers into collections
- 💬 **Chat History**: Persistent conversation history for each collection
- 🎨 **Modern UI**: Beautiful, responsive interface with smooth animations
- 📝 **Markdown Support**: Rich text formatting with LaTeX math support
- 🗑️ **Easy Management**: Delete papers and collections with a single click
- 🔍 **Smart Search**: Automatically find and add relevant research papers by topic
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering with math support (KaTeX)
- **KaTeX** - Mathematical equation rendering

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API server running (default: `http://localhost:8000`)

## Installation

1. **Clone the repository**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create a `.env` file in the root directory:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
   
   Or copy from the example:
   ```bash
   cp .env.example .env
   ```
   
   > **Note:** You can change the API URL to wherever you host your backend server.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Usage Guide

### Creating a New Chat

1. On the home page, click the **"New Chat"** button
2. A new collection will be created and you'll be redirected to the chat page
3. Each chat represents a collection of related research papers

### Adding Papers

1. In the chat page, the **Papers & Sources** sidebar appears on the left
2. Click the **"+ Add Source"** button to open the search modal
3. Enter a research topic or description (e.g., "Machine learning in healthcare", "Neural networks for image recognition")
4. Click **"Search Papers"** - the system will automatically find and add relevant papers
5. Added papers will appear in the sidebar

### Chatting with Papers

1. Once papers are added to your collection, type your question in the chat input at the bottom
2. Press **Enter** or click the **"Send"** button to submit your question
3. The AI will analyze your papers and provide an intelligent answer based on the content
4. Use **Shift + Enter** to add a new line in your message without sending
5. Chat history is automatically saved and will be restored when you return

### Managing Papers

- **View Paper**: Click on any paper card in the sidebar to open the PDF in a new tab
- **Delete Paper**: Hover over a paper card and click the trash icon (🗑️) that appears in the top-right corner
- **Confirmation**: You'll be asked to confirm before deleting

### Managing Collections

- **View All Chats**: Click the home/back button to see all your collections
- **Delete Chat**: On the home page, hover over a collection card and click the trash icon
- **Confirmation**: Deletion requires confirmation as it cannot be undone

### Sidebar Control

- **Hide Sidebar**: Click the X button in the sidebar header to hide the Papers panel
- **Show Sidebar**: Click the hamburger menu icon (☰) in the chat header to show it again

## Project Structure

```
src/
├── api/                    # API client and endpoint definitions
│   ├── client.ts          # Base API client with HTTP methods
│   ├── collections.ts     # Collections API endpoints
│   ├── papers.ts          # Papers API endpoints
│   └── queries.ts         # Chat query API endpoints
├── components/             # Reusable React components
│   ├── AddPaperModal.tsx  # Modal for searching and adding papers
│   ├── ChatInput.tsx      # Message input component with auto-resize
│   ├── ChatMessages.tsx   # Message list with markdown rendering
│   ├── ChatSideBar.tsx    # Chat navigation sidebar (unused)
│   └── PapersSidebar.tsx  # Papers management sidebar
├── pages/                  # Page components
│   ├── Home.tsx           # Home page with collections list
│   └── ChatPage.tsx       # Main chat interface page
├── types/                  # TypeScript type definitions
│   └── index.ts           # Shared types and interfaces
├── App.css                 # Global styles
├── App.tsx                 # Main app component with routing
├── index.css              # Tailwind CSS imports
└── main.tsx               # Application entry point
```

## API Integration

The frontend expects a backend API with the following endpoints:

### Collections
- `GET /collections` - List all collections
- `GET /collections/:id` - Get collection details
- `POST /collections` - Create new collection
- `DELETE /collections/:id` - Delete collection
- `GET /collections/:id/chat-history` - Get chat message history
- `POST /collections/:id/ingest-topic` - Search and add papers by topic

### Papers
- `GET /papers/collections/:id/papers` - List papers in a collection
- `DELETE /papers/collections/:id/papers/:paperId` - Delete a specific paper

### Queries
- `POST /query/ask` - Send a chat query and get AI response

Configure the API base URL in the `.env` file using the `VITE_API_BASE_URL` variable.

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```
   
   This compiles TypeScript and bundles the application into the `dist/` folder.

2. **Preview the build locally**
   ```bash
   npm run preview
   ```
   
   This serves the production build locally for testing.

3. **Deploy**
   
   The `dist/` folder contains production-ready static files. Deploy to any static hosting service:
   - **Vercel**: Connect your GitHub repo and deploy automatically
   - **Netlify**: Drag and drop the `dist` folder or connect via Git
   - **AWS S3 + CloudFront**: Upload to S3 and configure CloudFront
   - **GitHub Pages**: Use GitHub Actions to deploy on push
   - **Any other static hosting service**

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1` |

Create a `.env` file in the project root and set these variables according to your environment.

## Styling

This project uses **TailwindCSS** for styling with a custom dark theme:

- **Color Scheme**: Dark mode with gray, indigo, and purple gradients
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design that adapts to all screen sizes
- **Components**: Consistent design language across all components

To customize the theme, edit the `tailwind.config.js` file.

## Key Features Implementation

### Markdown with Math Support
- Uses `react-markdown` for rendering markdown
- Integrated with `remark-math` and `rehype-katex` for LaTeX equations
- Supports inline math `$...$` and block math `$$...$$`

### Auto-Scroll Chat
- Automatically scrolls to the latest message when new messages arrive
- Preserves scroll position when viewing history
- Only auto-scrolls for new messages, not on initial load

### Smart Paper Search
- Backend-powered semantic search for research papers
- Automatically extracts and stores paper metadata
- Intelligent topic-based paper recommendations

## Troubleshooting

### Cannot connect to API
- **Solution**: Ensure the backend server is running
- Check the `VITE_API_BASE_URL` in your `.env` file
- Verify CORS is properly configured on the backend
- Check browser console for specific error messages

### Math equations not rendering
- **Solution**: Ensure KaTeX CSS is loaded (included by default)
- Verify LaTeX syntax is correct
- Check that `rehype-katex` plugin is installed

### Build errors
- **Solution**: Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```
- Clear Vite cache:
  ```bash
  rm -rf node_modules/.vite
  ```

### Port already in use
- **Solution**: Change the port in `vite.config.ts` or kill the process using port 5173

### TypeScript errors
- **Solution**: Run type checking:
  ```bash
  npm run build
  ```
- Check `tsconfig.json` for proper configuration

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Modern browsers with ES2022 support are required.

## Performance Optimization

- **Code Splitting**: Routes are lazy-loaded
- **Tree Shaking**: Unused code is eliminated in production builds
- **Minification**: JavaScript and CSS are minified
- **Compression**: Enable gzip/brotli compression on your server

## Security Considerations

- API endpoints should be protected with authentication
- Use HTTPS in production
- Implement rate limiting on the backend
- Sanitize user inputs before sending to the API
- Keep dependencies up to date

## Development Tips

- Use React DevTools for debugging component state
- Enable Vite's HMR for instant updates during development
- Use TypeScript strict mode for better type safety
- Follow the existing code structure when adding new features
- Test responsive design using browser DevTools

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure:
- Code follows the existing style
- TypeScript types are properly defined
- Components are documented
- No console errors or warnings

## License

This project is developed as part of the CS331 course at UIT (University of Information Technology).

## Acknowledgments

- Course: CS331 - Ki thuat lap trinh tri tue nhan tao
- University of Information Technology (UIT)
- React and Vite communities for excellent tooling
- TailwindCSS for the utility-first CSS framework

---

**Happy Coding! 🚀**

