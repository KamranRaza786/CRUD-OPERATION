{ 
    "version": 2, 
    "name": "AI Chat-bot", 
    "builds": [ 
       { "src": "server.mjs", "use": "@vercel/node" } 
    ], 
    "routes": [ 
       { "src": "/(.*)", "dest": "/server.mjs" } 
    ] 
  }