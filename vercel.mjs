{ 
    "version": 2, 
    "name": "crud operations", 
    "builds": [ 
       { "src": "server.mjs", "use": "@vercel/node" } 
    ], 
    "routes": [ 
       { "src": "/(.*)", "dest": "/index.mjs" } 
    ] 
  }