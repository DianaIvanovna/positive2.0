rm -rf ./public_html/wp-content/themes/pozitiv/js
npm run deploy
scp -r ./public_html/wp-content/themes/pozitiv/js glamyrrkru_poztv@pozitiv.uni-studio.ru:/public_html/wp-content/themes/pozitiv/js
