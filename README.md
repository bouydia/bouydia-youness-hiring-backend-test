<h1>Express.js MongoDB REST API</h1>

<p>This project is a REST API built with Express.js and MongoDB. It provides a robust backend solution for handling HTTP requests and interacting with a MongoDB database.</p>

<h2>Features</h2>

<ul>
  <li>RESTful API endpoints</li>
  <li>MongoDB integration for data persistence</li>
  <li>Environment variable configuration using .env.local</li>
</ul>

<h2>Prerequisites</h2>

<p>Before you begin, ensure you have met the following requirements:</p>

<ul>
  <li>Node.js installed (v18.17.1)</li>
  <li>nodemoon installed globaly</li>
  <li>Git for version control</li>
</ul>

<h2>Installation</h2>

<ol>
  <li>Clone the repository:
    <pre><code>git clone [https://github.com/bouydia/bouydia-youness-hiring-backend-test]</code></pre>
  </li>
  <li>Navigate to the project directory:
    <pre><code>cd bouydia-youness-hiring-backend-test</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Create a <code>.env</code> file in the root directory and add your MongoDB URI:
    <pre><code>MONGODB_URI=your_mongodb_uri_here</code></pre>
  </li>
</ol>

<h2>Usage</h2>

<p>To start the server, run:</p>

<pre><code>npm run server</code></pre>

<p>The API will be available at <code>http://localhost:3000</code> (or the port specified in your environment variables).</p>

<h2>API Endpoints</h2>

<p>Describe your API endpoints here. For example:</p>

<ul>
  <li><code>POST /api/auth/login</code>: login the user</li>
  <li><code>GET /api/auth/register</code>: register new user</li>
  
  <li><code>GET /api/article/</code>: Retrieve all the articles</li>
  <li><code>POST /api/article/</code>: Create one article</li>

  <li><code>GET /api/user/:id</code>: Retrieve a specific User data</li>
</ul>

<h2>Configuration</h2>

<p>The application uses environment variables for configuration. Make sure to set up your <code>.env.local</code> file with the necessary variables:</p>

<pre><code>MONGODB_URI=your_mongodb_uri_here
PORT=3000 (optional, defaults to 3000)</code></pre>

<h2>Contributing</h2>

<p>Contributions to this project are welcome. Please follow these steps:</p>

<ol>
  <li>Fork the repository</li>
  <li>Create a new branch (<code>git checkout -b feature/your-feature-name</code>)</li>
  <li>Commit your changes (<code>git commit -am 'Add some feature'</code>)</li>
  <li>Push to the branch (<code>git push origin feature/your-feature-name</code>)</li>
  <li>Create a new Pull Request</li>
</ol>

<h2>License</h2>

<p>MIT</p>

<h2>Contact</h2>

<p>If you have any questions or feedback, please contact  at younessbouydia@gmail.com</p>
