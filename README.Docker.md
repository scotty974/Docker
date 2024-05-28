### create .env
tu fais ton setup d'environnement pour définir la base url : DATABASE_URL="postgresql://{user}:{motdepasse}@localhost:{port}/{nomdebase}?schema=public"
les codes de la base sont dans le compose.yml


### Building and running your application
Pour lancer l'application tu fais la commande 
npm run db:dev:up    

une fois que la base tourne sur le docker tu fais  : 
npx prisma migrate dev
pour mettre les model de la base sur la base et le docker 

et voila ton application tourne 

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

 