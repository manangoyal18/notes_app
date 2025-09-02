# Notes App Frontend

A modern React frontend for the Notes App, providing a clean and intuitive interface for managing notes with full CRUD functionality.

## Features

- ✅ Complete CRUD operations for notes
- ✅ Responsive design that works on desktop and mobile
- ✅ Real-time error handling and loading states
- ✅ Form validation and user feedback
- ✅ Optimistic locking conflict resolution
- ✅ Clean, modern UI with intuitive navigation
- ✅ React Router for seamless page navigation

## Tech Stack

- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS3 (no external frameworks)
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── Layout.js          # Common layout wrapper with navigation
│   ├── NoteCard.js        # Individual note card component
│   └── NoteForm.js        # Reusable form for create/edit
├── pages/
│   ├── NotesListPage.js   # Main notes list view
│   ├── CreateNotePage.js  # Create new note
│   ├── ViewNotePage.js    # View single note
│   └── EditNotePage.js    # Edit existing note
├── services/
│   └── notesApi.js        # API service layer
├── styles/
│   └── App.css           # Global styles
├── utils/
│   └── constants.js      # Configuration constants
├── App.js                # Main app with routing
└── index.js             # React entry point
```

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Notes App backend running (see backend README)

### Installation

1. **Clone and navigate to frontend directory:**
   ```bash
   cd notes-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure backend API URL:**
   
   Create a `.env` file in the frontend root directory:
   ```bash
   REACT_APP_API_BASE_URL=http://localhost:8080
   ```
   
   Or set it as an environment variable:
   ```bash
   export REACT_APP_API_BASE_URL=http://localhost:8080
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `http://localhost:8080` |

### API Integration

The frontend communicates with the Spring Boot backend through these endpoints:

- `GET /notes` - Fetch all notes
- `GET /notes/{id}` - Fetch single note
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update existing note
- `DELETE /notes/{id}` - Delete note

## Features

### 1. Notes List
- Displays all notes in a responsive grid layout
- Shows note title, content preview, and timestamps
- Quick actions: View, Edit, Delete
- Empty state with call-to-action

### 2. Create Note
- Form with title (required) and content fields
- Real-time validation
- Success redirect to notes list

### 3. View Note
- Full note display with formatted content
- Shows creation and last update timestamps
- Quick actions to edit or delete

### 4. Edit Note
- Pre-populated form with existing note data
- Handles optimistic locking conflicts
- Success redirect to note view

### 5. Error Handling
- Network error handling
- Form validation errors
- 404 not found errors
- Concurrent update conflicts
- User-friendly error messages

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build/` directory with optimized production files.

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard:**
   - `REACT_APP_API_BASE_URL`: Your production backend URL

### Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Set environment variable: `REACT_APP_API_BASE_URL`

### Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/notes-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Development

### Component Architecture

The app follows a layered architecture:

1. **Pages**: Route-level components that handle data fetching and page logic
2. **Components**: Reusable UI components
3. **Services**: API communication layer
4. **Utils**: Configuration and utility functions

### Adding New Features

1. **New API endpoint**: Update `notesApi.js`
2. **New page**: Create in `pages/` and add route to `App.js`
3. **New component**: Create in `components/` and import where needed
4. **New styles**: Add to `App.css` following existing patterns

### Code Style

- Use functional components with hooks
- Handle loading and error states consistently
- Use meaningful variable and function names
- Keep components focused and single-purpose
- Use proper prop types for better development experience

## RAG Pipeline for Notes App

### Overview

A Retrieval-Augmented Generation (RAG) pipeline could enhance the Notes App by enabling intelligent note search and question-answering capabilities. Users could ask natural language questions about their notes and get relevant information extracted from their note collection.

### Architecture

```
User Query → Query Processing → Retrieval → Generation → Response
```

### 1. Document Preprocessing

#### Chunking Strategy
- **Chunk Size**: 200-500 characters per chunk
- **Overlap**: 50-100 character overlap between chunks
- **Method**: Sliding window with sentence boundary preservation
- **Preprocessing**: 
  - Remove extra whitespace and formatting
  - Preserve paragraph structure
  - Handle special characters and emojis

```python
def chunk_note(note_content, chunk_size=400, overlap=75):
    chunks = []
    sentences = split_into_sentences(note_content)
    
    current_chunk = \"\"
    for sentence in sentences:
        if len(current_chunk + sentence) > chunk_size and current_chunk:
            chunks.append(current_chunk.strip())
            # Keep overlap from previous chunk
            current_chunk = current_chunk[-overlap:] + sentence
        else:
            current_chunk += sentence
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks
```

#### Metadata Enhancement
Each chunk includes:
- Note ID and title
- Creation/modification timestamps
- Chunk position within note
- Content type (text, list, code, etc.)

### 2. Embedding Generation

#### Model Selection
- **Primary**: OpenAI `text-embedding-ada-002`
  - Dimension: 1536
  - Max tokens: 8191
  - Cost-effective for production
- **Alternative**: `text-embedding-3-small` (better performance)
  - Dimension: 1536 
  - Improved accuracy over ada-002

#### Implementation
```python
import openai

def generate_embeddings(chunks):
    embeddings = []
    for chunk in chunks:
        response = openai.Embedding.create(
            model=\"text-embedding-ada-002\",
            input=chunk
        )
        embeddings.append(response['data'][0]['embedding'])
    return embeddings
```

### 3. Vector Store

#### Option A: FAISS (Local/Self-hosted)
```python
import faiss
import numpy as np

# Create FAISS index
dimension = 1536
index = faiss.IndexFlatIP(dimension)  # Inner product similarity

# Add embeddings
embeddings_matrix = np.array(embeddings).astype('float32')
faiss.normalize_L2(embeddings_matrix)  # Normalize for cosine similarity
index.add(embeddings_matrix)
```

**Pros**: 
- No external dependencies
- Fast local search
- No API costs

**Cons**: 
- Requires local storage management
- No built-in metadata filtering

#### Option B: Pinecone (Managed)
```python
import pinecone

pinecone.init(api_key=\"your-api-key\")
index = pinecone.Index(\"notes-embeddings\")

# Upsert vectors with metadata
index.upsert(vectors=[
    (id, embedding, {\"note_id\": note_id, \"title\": title, \"chunk_text\": chunk})
    for id, embedding, note_id, title, chunk in processed_chunks
])
```

**Pros**: 
- Managed service
- Built-in metadata filtering
- Scalable

**Cons**: 
- External dependency
- API costs

### 4. Retrieval Configuration

#### Similarity Search Settings
- **Top-k**: 3-5 most relevant chunks
- **Similarity Threshold**: 0.7 (cosine similarity)
- **Diversity**: Use MMR (Maximal Marginal Relevance) to avoid redundant results

```python
def retrieve_relevant_chunks(query, top_k=3, similarity_threshold=0.7):
    # Generate query embedding
    query_embedding = generate_embeddings([query])[0]
    
    # Search vector store
    scores, indices = index.search(
        np.array([query_embedding]).astype('float32'), 
        k=top_k
    )
    
    # Filter by threshold and return results
    relevant_chunks = []
    for score, idx in zip(scores[0], indices[0]):
        if score >= similarity_threshold:
            relevant_chunks.append({
                \"chunk\": chunks[idx],
                \"metadata\": metadata[idx],
                \"score\": float(score)
            })
    
    return relevant_chunks
```

### 5. Prompt Engineering

#### System Prompt
```
You are a helpful assistant for a Notes app. You help users find information from their personal notes.

Guidelines:
- Answer based only on the provided note context
- If information isn't in the notes, say so clearly
- Include note titles when referencing specific notes
- Be concise but complete
- Maintain the original tone and style from the notes
```

#### User Query Template
```
User Question: \"{user_query}\"

Relevant Notes Context:
{context_chunks}

Please provide a helpful answer based on the note content above.
```

#### Context Formatting
```python
def format_context(relevant_chunks):
    context = \"\"
    for i, chunk in enumerate(relevant_chunks, 1):
        note_title = chunk['metadata']['title']
        chunk_text = chunk['chunk']
        context += f\"Note {i} - \\\"{note_title}\\\":\\n{chunk_text}\\n\\n\"
    return context
```

### 6. Response Generation

#### Model Selection
- **Primary**: GPT-3.5-turbo (cost-effective)
- **Alternative**: GPT-4 (higher quality, more expensive)

```python
def generate_response(user_query, relevant_chunks):
    context = format_context(relevant_chunks)
    
    messages = [
        {\"role\": \"system\", \"content\": SYSTEM_PROMPT},
        {\"role\": \"user\", \"content\": f\"\"\"
        User Question: \"{user_query}\"
        
        Relevant Notes Context:
        {context}
        
        Please provide a helpful answer based on the note content above.
        \"\"\"}
    ]
    
    response = openai.ChatCompletion.create(
        model=\"gpt-3.5-turbo\",
        messages=messages,
        temperature=0.3,  # Low temperature for factual responses
        max_tokens=500
    )
    
    return response.choices[0].message.content
```

### 7. Evaluation Metrics

#### Recall@k
Measures how many relevant notes are retrieved in the top-k results.

```python
def calculate_recall_at_k(query, ground_truth_note_ids, retrieved_chunks, k=3):
    retrieved_note_ids = set([chunk['metadata']['note_id'] 
                            for chunk in retrieved_chunks[:k]])
    relevant_retrieved = len(retrieved_note_ids.intersection(ground_truth_note_ids))
    total_relevant = len(ground_truth_note_ids)
    
    return relevant_retrieved / total_relevant if total_relevant > 0 else 0
```

#### Manual Relevance Assessment
- **Scale**: 0-3 (Not relevant, Somewhat relevant, Relevant, Highly relevant)
- **Criteria**: 
  - Does the retrieved content answer the user's question?
  - Is the information accurate and complete?
  - Are the most important notes retrieved?

#### Response Quality Metrics
- **Accuracy**: Does the generated response correctly reflect the note content?
- **Completeness**: Does it address all aspects of the user's question?
- **Coherence**: Is the response well-structured and easy to understand?

### 8. Implementation Integration

#### Backend API Extension
```python
@app.route('/notes/search', methods=['POST'])
def semantic_search():
    data = request.json
    user_query = data['query']
    
    # Retrieve relevant chunks
    relevant_chunks = retrieve_relevant_chunks(user_query)
    
    # Generate response
    response = generate_response(user_query, relevant_chunks)
    
    return jsonify({
        'query': user_query,
        'answer': response,
        'sources': [
            {
                'note_id': chunk['metadata']['note_id'],
                'title': chunk['metadata']['title'],
                'relevance_score': chunk['score']
            }
            for chunk in relevant_chunks
        ]
    })
```

#### Frontend Integration
```jsx
const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/notes/search', { query });
      setResult(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder=\"Ask about your notes...\"
      />
      <button onClick={handleSearch}>Search</button>
      
      {result && (
        <div>
          <h3>Answer:</h3>
          <p>{result.answer}</p>
          
          <h4>Sources:</h4>
          {result.sources.map(source => (
            <div key={source.note_id}>
              <Link to={`/notes/${source.note_id}`}>
                {source.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 9. Example Queries

#### Sample Interactions
```
User: \"What did I write about deadlines?\"
Response: \"Based on your notes, you mentioned several deadlines:

From 'Project Planning': The final report is due March 15th, and you noted that the presentation should be ready by March 10th to allow time for practice.

From 'Meeting Notes - Feb 20': The team agreed to set intermediate deadlines every Friday for status updates.\"

User: \"What are my book recommendations?\"
Response: \"You have book recommendations in your 'Reading List' note:

1. Clean Code by Robert Martin - You noted it's essential for software development
2. Design Patterns by Gang of Four - Marked as 'must read for architecture'
3. Spring in Action - Listed for learning Spring Boot framework\"
```

### 10. Performance Considerations

#### Optimization Strategies
- **Caching**: Cache embeddings and frequent query results
- **Incremental Updates**: Only re-embed modified notes
- **Batch Processing**: Process multiple notes simultaneously
- **Index Optimization**: Use appropriate FAISS index types for dataset size

#### Scalability
- **Database**: Store embeddings in PostgreSQL with pgvector extension
- **Async Processing**: Use background jobs for embedding generation
- **Rate Limiting**: Implement API rate limiting for OpenAI calls
- **Monitoring**: Track token usage and response times

This RAG pipeline would transform the Notes App into an intelligent knowledge management system, enabling users to quickly find information across their entire note collection using natural language queries.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

MIT License - see LICENSE file for details