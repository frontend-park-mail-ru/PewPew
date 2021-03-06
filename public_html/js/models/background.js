define(function (require) {
        var Backbone = require('backbone'),
            createjs = require('createjs'),
            theme = require('models/theme');

        var BackgroundThemes = Backbone.Model.extend({
            defaults: {
                items: [],
                //1 объект на поле 200*200
                norm: 200,
                width: 0,
                height: 0
            },
            generateItem: function (minX, minY, maxX, maxY) {
                var norm = this.get("norm"),
                    countNewItem = ((maxX - minX)/norm  ^ 0) * ((maxY - minY)/norm ^ 0),
                    items = this.get("items"),
                    i;
                //TODO функция генерирования координат
                for (i = countNewItem; i > 0; i--) {
                    items.push({
                        x : (Math.random() * (maxX - minX) + minX ^ 0),
                        y : (Math.random() * (maxY - minY) + minY ^ 0),
                        imgIndex : Math.random() * theme.items.length ^ 0
                    });
                }
                items.sort(this.comparePosition);
                this.set("items", items);
            },
            comparePosition: function (a, b) {
                if (a.y > b.y) {
                    return -1;
                } else {
                    return 1;
                }
            },
            getItems: function() {
                return this.get("items");
            },
            resizeCanvas: function(newWidth, newHeight) {
                var norm = this.get("norm"),
                    currentWidth = this.get("width"),
                    currentHeight = this.get("height"),
                    fillCanvasWidth = ((newWidth / norm ^ 0)  + 1) * norm,
                    fillCanvasHeight = ((newHeight / norm ^ 0 ) + 1) * norm;
                //заполняем незаполненное
                this.generateItem(0, currentHeight, fillCanvasWidth, fillCanvasHeight);
                this.generateItem(currentWidth, 0, fillCanvasWidth, currentHeight);
                //экран увеличился
                this.set("height", fillCanvasHeight);
                this.set("width", fillCanvasWidth);
                //вызов перерисовки
                this.trigger("changeBackground");
            },
            resizeBackground: function(newWidth, newHeight) {
                if ((newWidth <= this.get("width")) && (newHeight <= this.get("height"))) {
                    //экран уменьшился нечего перерисовывать
                    return;
                } else {
                    this.resizeCanvas(newWidth, newHeight);
                }
            }
        });
        return new BackgroundThemes();
    }
);
