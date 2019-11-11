# Dominion.AFRICA
Dominion gives journalist and civic activists useful facts and data about land ownership in Africa. Accessible at https://dominion.investigate.africa

# Development

- [x] create-react-app
- [x] gh-pages
- [x] spa-github-pages

## Chart Definitions

The charts in the app are defined in the json file `charts.json` in the `src/data/` folder. When you define the charts, they will be assigned a unique id when your run `yarn start` or `yarn deploy` or `yarn build`. This id will be used to identify this chart especially important when used in an embed. Don't chnage the id once the code is deployed otherwise any shared embeds with this Id will fail.

Note: Using router in gh-pages see [spa-github-pages](https://github.com/rafrex/spa-github-pages). It requires the app to have a `404.html` file with a custom script and a custom script in the `index.html` that will allow the router to work in gh-pages.