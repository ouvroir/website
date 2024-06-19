# Installation, mise à jour et debug

## Installation & dev

```bash
git clone https://github.com/ouvroir/website.git && cd website/

git git submodule update --init --recursive

./copyAssets.sh

npm install
npm run dev
```

## Build & preview

```bash
./copyAssets.sh

npm run build
npm run preview
```

Le site est redéployé à chaque commit effectué sur main (cf. [deploy.yml](.github/workflows/deploy.yml)).

## Retirer le submodule et l'ajouter de nouveau

_Permet de corriger des problème de refs..._

```bash
git rm src/lib/labouvroir
git add --force https://github.com/ouvroir/labouvroir.git src/lib/labouvroir
```
