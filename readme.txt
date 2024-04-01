b3IU9J74QpfZPdgy
Supabase password for Grandview Cemetery Register project
using ejs
need .env to hold sensitive data, like supabase project password/key
when using environmental variables, also need .gitignore, so passwords arent pushed to github

first goto nodejs.org and install node, which has npm, so i can do npm init
now run: npm init -y
that created package.json
(installed git at this point, so ill have git bash terminal)
from bash terminal: npm i dotenv express ejs @supabase/supabase-js
now we have package-lock.json and node_modules
add node_modules to gitignore

goto home page of supabase and scroll down to find project api info, that includes url and api key
add these to .env variables

build your views/index.ejs file first.

Then server.js
